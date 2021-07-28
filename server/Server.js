import axios from "axios"

class Server{
    constructor(){
        this.API_BASE_URL = 'http://localhost:3000/devices'
    }

    async getDevices(){
        const response = await axios.get(`${this.API_BASE_URL}`)
                                .catch(function (error) {
                                    if (error.response) {
                                        console.log(error.response.data);
                                        console.log(error.response.status);
                                        console.log(error.response.headers);
                                    } else if (error.request) {
                                        console.log(error.request);
                                    } else {
                                        console.log('Error', error.message);
                                    }
                                
                                });
        const devices = response.data
        return devices
    }

    async changeDeviceName(newName, device){
        device.system_name = newName
        await axios.put(`${this.API_BASE_URL}/${device.id}`, device)
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                
                });
    }

    async removeDevice(deviceId){
        await axios.delete(`${this.API_BASE_URL}/${deviceId}`)
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                
                });
    }
}
export default Server