import { Selector, ClientFunction, t } from "testcafe";

class HomePage{
    constructor(){
        this.deviceList = Selector('div').withAttribute('class', 'list-devices')
        this.sortByOptions = Selector('#sort_by')
        this.addDeviceButton = Selector('.submitButton')
        this.deviceName = Selector('.device-name')
        this.deviceType = Selector('.device-type')
        this.deviceCapacity = Selector('.device-capacity')
    }

    async getDeviceInfo(i){
        let device = this.deviceList.child(i)
        let deviceInfo = Selector(device.child('div').child('span'))
        let deviceNameContent  = deviceInfo.withAttribute('class', 'device-name')
        let deviceTypeContent  = deviceInfo.withAttribute('class', 'device-type')
        let deviceCapacityContent  = deviceInfo.withAttribute('class', 'device-capacity')
           
        return { device, deviceNameContent, deviceTypeContent, deviceCapacityContent }
    }

    async editDevice(i){
        let device = this.deviceList.child(i)
        let deviceOptions = Selector(device.child('div').child('a'))
        await t.click(deviceOptions.withAttribute('class', 'device-edit'))
    }

    async removeDevice(i){
        let device = this.deviceList.child(i)
        let deviceOptions = Selector(device.child('div').child('button'))
        await t.click(deviceOptions.withAttribute('class', 'device-remove'))
    }
}

export default HomePage