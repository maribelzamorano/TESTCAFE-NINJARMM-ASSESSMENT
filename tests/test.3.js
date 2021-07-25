import HomePage from "../page_objects/pages/HomePage"
import Server from "../server/Server"

const homePage = new HomePage()
const server = new Server()

fixture `Automation Assessment Test 3`
    .page`http://localhost:3001`

test('Update name of first device in the list', async t =>{
    const devices = await server.getDevices()
    const firstDevice = await devices[0]    // Get first device from the list.

    /** Change the name of the device, update it and reload the page. */
    await server.changeDeviceName('Renamed Device', firstDevice)
    homePage.refresh()
    
    await t.expect(homePage.deviceName('Renamed Device').visible).ok()
})
