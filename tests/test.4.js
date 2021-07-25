import HomePage from "../page_objects/pages/HomePage"
import Server from "../server/Server"

const homePage = new HomePage()
const server = new Server()

fixture `Automation Assessment Test 4`
    .page`http://localhost:3001`

test('Remove last device from the list', async t =>{
    const devices = await server.getDevices()
    const lastDevice = devices[devices.length - 1]    // Get last device from the list.

    server.removeDevice(lastDevice.id)
    homePage.refresh()

    await t.expect(lastDevice.exists).notOk()
})
