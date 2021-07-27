import axios from "axios"
import HomePage from "../page_objects/pages/HomePage"

const homePage = new HomePage()

fixture `Automation Assessment Test 4`
    .page`http://localhost:3001`
        .beforeEach(async t => {
            await t.setTestSpeed(1)
        })

test('Remove last device from the list', async t =>{
    /** API call. */
    const response = await axios.get(`http://localhost:3000/devices`)
    const devices = response.data
    /** Get last device from the list. */
    const lastDevice = devices[devices.length - 1]

    /** Delete last device. */
    await axios.delete(`http://localhost:3000/devices/${lastDevice.id}`)
    homePage.refresh()

    await t.expect(lastDevice.visible).notOk()
    await t.expect(lastDevice.exists).notOk()
})
