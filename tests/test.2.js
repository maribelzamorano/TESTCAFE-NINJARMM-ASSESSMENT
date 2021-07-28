import HomePage from "../page_objects/pages/HomePage"
import AddDevicePage from "../page_objects/pages/AddDevicePage"
import { nanoid } from 'nanoid'
import Server from "../server/Server"

const homePage = new HomePage()
const addDevicePage = new AddDevicePage()
const server = new Server()

fixture `Automation Assessment Test 2`
    .page`http://localhost:3001`

test('Create a new device and verify it', async t =>{
    await t.click(homePage.addDeviceButton)
    const randomDeviceName = 'MAC-MARIBEL/' + (nanoid()).toString()
    const randomDeviceCapacity = (Math.floor(Math.random() * 512) + 100).toString()
    const deviceTypes = ['WINDOWS WORKSTATION', 'WINDOWS_SERVER', 'MAC']
    const randomDeviceType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)]

    await addDevicePage.addDevice(randomDeviceName, randomDeviceType, randomDeviceCapacity)

    await t.expect(homePage.deviceName(randomDeviceName).visible).ok()
    await t.expect(homePage.deviceType.withExactText(randomDeviceType).visible).ok()
    await t.expect(homePage.deviceCapacity.withExactText(randomDeviceCapacity + " GB").visible).ok()

    // Remove device after its creation and verification in order to mantain the devices list without pollution
    const devices = await server.getDevices()
    for (const device of devices){
        if(device.system_name == randomDeviceName){
            await server.removeDevice(device.id)
            await t.expect(device.exists).notOk()
        }
    }
})
