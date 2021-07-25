import axios from "axios"

class Server{
    constructor(){
        this.API_BASE_URL = 'http://localhost:3000'
    }

    async getDevices(){
        const response = await axios.get(`${this.API_BASE_URL}/devices`)
        const devices = response.data
        return devices
    }

    async changeDeviceName(newName, device){
        device.system_name = newName
        await axios.put(`http://localhost:3000/devices/${device.id}`, device)
    }

    async removeDevice(deviceId){
        await axios.delete(`http://localhost:3000/devices/${deviceId}`)
    }
}
export default Server