import HomePage from "../page_objects/pages/HomePage"
import Server from "../server/Server"

const homePage = new HomePage()
const server = new Server()

fixture `Automation Assessment Test 1`
    .page`http://localhost:3001`

test('Verify list of devices', async t =>{
    const devices = await server.getDevices()

    for (const device of devices){

        await t.expect(homePage.deviceName(device.system_name).visible).ok()
       
        const {deviceType, deviceCapacity} = await homePage.getDeviceProperties(device.system_name)
        await t.expect(deviceType.innerText).eql(device.type)
        await t.expect(deviceCapacity.innerText).eql(device.hdd_capacity + " GB")
        await homePage.areButtonsVisible(device.system_name)
    }

})