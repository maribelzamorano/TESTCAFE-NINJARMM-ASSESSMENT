import HomePage from "../page_objects/pages/HomePage"
import NewDevicePage from "../page_objects/pages/NewDevicePage"

const homePage = new HomePage()
const newDevicePage = new NewDevicePage()

fixture `Automation Assessment Test 2`
    .page`http://localhost:3001`

test('Create a new device and verify it', async t =>{
    await t.click(homePage.addDeviceButton)
    newDevicePage.addDevice('MAC-MARIBEL','MAC','512')

    await t.expect(homePage.deviceList.innerText).contains('MAC-MARIBEL')
    await t.expect(homePage.deviceName('MAC-MARIBEL').visible).ok()
    await t.expect(homePage.deviceType.withExactText('MAC').visible).ok()
    await t.expect(homePage.deviceCapacity.withExactText('512 GB').visible).ok()
})
