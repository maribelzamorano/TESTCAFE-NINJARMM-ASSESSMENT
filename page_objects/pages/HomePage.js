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

    
    /**
     * Get a device by name from the device list
     * @param {string} name - The name of the device(system_name).
     * @return {deviceContent, deviceName, deviceType, deviceCapacity} The name, type, capacity and device content with buttons of a device in the same row.
     */
    async getDeviceByName(name){
        let deviceName = Selector('.device-name').withText(name)
        let deviceType  = deviceName.sibling().withAttribute('class', 'device-type')
        let deviceCapacity  = deviceName.sibling().withAttribute('class', 'device-capacity')
        let deviceContent  = deviceName.parent(1)

        return { deviceContent, deviceName, deviceType, deviceCapacity }
    }
    
    
    /**
     * Get a device from the device list by position in DOM 
     * @param {int} i position in the device list.
     * @return {device, deviceName, deviceType, deviceCapacity} The name, type, capacity and device content with buttons of a device in the same row.
     */
    async getDeviceInfo(i){
        let device = this.deviceList.child(i)
        let deviceInfo = Selector(device.child('div').child('span'))
        let deviceName  = deviceInfo.withAttribute('class', 'device-name')
        let deviceType  = deviceInfo.withAttribute('class', 'device-type')
        let deviceCapacity  = deviceInfo.withAttribute('class', 'device-capacity')
           
        return { device, deviceName, deviceType, deviceCapacity }
    }
    
    
    /**
     * Reload the home page.
     */
    async refresh () {
        await ClientFunction(() => {
          document.location.reload();
        })();
    }
}

export default HomePage