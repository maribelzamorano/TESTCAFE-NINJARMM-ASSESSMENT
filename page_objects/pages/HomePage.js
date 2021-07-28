import { Selector, ClientFunction, t } from "testcafe";
import Server from "../../server/Server";

const server = new Server()

class HomePage{
    constructor(){
        this.deviceList = Selector('div.list-devices')
        this.sortByOptions = Selector('#sort_by')
        this.addDeviceButton = Selector('.submitButton')
        this.deviceType = Selector('.device-type')
        this.deviceCapacity = Selector('.device-capacity')
        this.deviceName = name => Selector('.device-name').withExactText(name)
        this.editButtonInDevice = device => this.deviceName(device).parent().sibling().find('a').withExactText('EDIT')
        this.removeButtonInDevice = device => this.editButtonInDevice(device).sibling('button').withExactText('REMOVE')
    }

    
    /**
     * Get a device by name from the device list
     * @param {string} name - The name of the device(system_name).
     * @return {deviceContent, deviceName, deviceType, deviceCapacity} The name, type, capacity and device content with buttons of a device in the same row.
     */
    async getDeviceProperties(name){
        const deviceType  = this.deviceName(name).sibling().withAttribute('class', 'device-type')
        const deviceCapacity  = this.deviceName(name).sibling().withAttribute('class', 'device-capacity')
        return { deviceType, deviceCapacity }
    }
    
    
    /**
     * Check if device buttons edit and remove are visible
     * @param {string} deviceName - The name of the device(system_name).
     */
    async areButtonsVisible(deviceName){
        await t.expect(this.editButtonInDevice(deviceName).visible).ok()
        await t.expect(this.removeButtonInDevice(deviceName).visible).ok()
    }
    
    
    /**
     * Reload the home page.
     */
    async refresh () {
        await ClientFunction(() => {
          document.location.reload();
        })();
    }


    /**
     * Sort Devices in List.
     */
    async sortDevices(){
        const devices = await server.getDevices()
        for (const device of devices){
            const i=0
            const deviceUI = this.deviceList.child(i)
            const deviceNameUI  = deviceInfo.withAttribute('class', 'device-name')
            if(device.system_name != this.deviceName(deviceNameUI)){
                //COMO HACER PARA ACOMODAR EL DEVICE: SE REORDENA EN SEVIDOR O UI?
            }
            i++
        }
    }
}

export default HomePage