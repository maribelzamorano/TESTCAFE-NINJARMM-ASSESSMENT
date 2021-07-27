import axios from "axios"
import HomePage from "../page_objects/pages/HomePage"

const homePage = new HomePage()

fixture `Automation Assessment Test 3`
    .page`http://localhost:3001`
        .beforeEach(async t => {
            await t.setTestSpeed(1)
        })

test('Update name of first device in the list', async t =>{
    /** API call. */
    const response = await axios.get(`http://localhost:3000/devices`)
    /** Get first device from the list. */
    const firstDevice = response.data[0]

    /** Change the name of the device, update it and reload the page. */
    firstDevice.system_name = 'Renamed Device'
    await axios.put(`http://localhost:3000/devices/${firstDevice.id}`, firstDevice)
    homePage.refresh()
    /** Get the first device from UI. */
    let { deviceName } = await homePage.getDeviceInfo(0)
    
    await t.expect(deviceName.innerText).eql('Renamed Device')
})
