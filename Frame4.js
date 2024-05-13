class Frame4 {
    constructor(ipAddress) {
        this.baseUrl = 'http://' + ipAddress + ':2812';
        this.processId = -1;
    }

    getProcessList() {
        return new Promise((resolve, reject) => {
            axios.get(this.baseUrl + '/process-list')
                .then(function (response) {
                console.log(response);
                resolve(response.data);
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    attachToProcess(processName) {
        this.processId = -1;
        this.getProcessList().then(function(response) {
            response.find(function (item) {
                if (item.name == processName) {
                    this.processId = item.pid;
                }
            })
        })
    }

    getProcessInfo() {
        return new Promise((resolve, reject) => {
            if (this.processId == -1) {
                reject("Please attach to a process first");
                return;
            }
            axios.get(this.baseUrl + '/process-info?pid=' + this.processId)
                .then(function(response) {
                    resolve(response.data);
                }).catch(function(error) {
                    reject(error);
                })
        });
    }

    getProcessMaps() {
        return new Promise((resolve, reject) => {
            if (this.processId == -1) {
                reject("Please attach to a process first");
                return;
            }
            axios.get(this.baseUrl + "/process-maps?pid=" + this.processId)
                .then(function(response) {
                    resolve(response.data);
                }).catch(function(error) {
                    reject(error);
                })
        })
    }

    readMemory(address, length) {
        return new Promise((resolve, reject) => {
            if (this.processId == -1) {
                reject("Please attach to a process first");
                return;
            }
            axios.get(this.baseUrl + "/read-memory?pid=" + this.processId + "&address=" + address + "&length=" + length)
                .then(function(response) {
                    resolve(response.data);
                }).catch(function(error) {
                    reject(error);
                })
        })
    }

    writeMemory(address, bytes) {
        return new Promise((resolve, reject) => {
            if (this.processId == -1) {
                reject("Please attach to a process first");
                return;
            }
            axios.get(this.baseUrl + "/write-memory?pid=" + this.processId + "&address=" + address + "&bytes=" + bytes)
                .then(function(response) {
                    resolve(response.data);
                }).catch(function(error) {
                    reject(error);
                })
        })
    }

    allocateMemory(length) {
        return new Promise((resolve, reject) => {
            if (this.processId == -1) {
                reject("Please attach to a process first");
                return;
            }
            axios.get(this.baseUrl + "/allocate-memory?pid=" + this.processId + "&length=" + length)
                .then(function(response) {
                    resolve(response.data);
                }).catch(function(error) {
                    reject(error);
                })
        })
    }

    freeMemory(address, length) {
        return new Promise((resolve, reject) => {
            if (this.processId == -1) {
                reject("Please attach to a process first");
                return;
            }
            axios.get(this.baseUrl + "/free-memory?pid=" + this.processId + "&address=" + address + "&length=" + length)
                .then(function(response) {
                    resolve(response.data);
                }).catch(function(error) {
                    reject(error);
                })
        })
    }

    sendNotify(messageType, message) {
        return new Promise((resolve, reject) => {
            axios.get(this.baseUrl + "/notify?messageType=" + messageType + "&message=" + btoa(message + "\x00"))
                .then(function(response) {
                    resolve(response.data);
                }).catch(function(error) {
                    reject(error);
                })
        })
    }
    
}