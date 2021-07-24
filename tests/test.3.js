import HomePage from "../page_objects/pages/HomePage"
import UpdateDevicePage from "../page_objects/pages/UpdateDevicePage"

const homePage = new HomePage()
const updateDevicePage = new UpdateDevicePage()

fixture `Automation Assessment Test 3`
    .page`http://localhost:3001`
        .beforeEach(async t => {
            await t.setTestSpeed(1)
        })

test('Update name of first device in the list', async t =>{
    homePage.editDevice(0)
    updateDevicePage.updateDeviceName('Renamed Device')
    let { deviceNameContent } = await homePage.getDeviceInfo(0)

    await t.expect(deviceNameContent.innerText).eql('Renamed Device')
})
