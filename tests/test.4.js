import HomePage from "../page_objects/pages/HomePage"

const homePage = new HomePage()

fixture `Automation Assessment Test 4`
    .page`http://localhost:3001`
        .beforeEach(async t => {
            await t.setTestSpeed(1)
        })

test('Remove last device from the list', async t =>{
    var devicesCount = await homePage.deviceList.childElementCount;
    let { deviceNameContent } = await homePage.getDeviceInfo(devicesCount-1)
    homePage.removeDevice(devicesCount-1)

    await t.expect(deviceNameContent.visible).notOk()
    await t.expect(deviceNameContent.exists).notOk()
})
