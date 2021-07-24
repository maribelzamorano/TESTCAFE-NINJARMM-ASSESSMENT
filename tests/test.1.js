import HomePage from "../page_objects/pages/HomePage"

const homePage = new HomePage()

fixture `Automation Assessment Test 1`
    .page`http://localhost:3001`
        .beforeEach(async t => {
            await t.setTestSpeed(1)
        })

test('Verify list of devices', async t =>{
    var devicesCount = await homePage.deviceList.childElementCount;

    for (let i = 0; i < devicesCount; i++){
        let {device, deviceNameContent, deviceTypeContent, deviceCapacityContent} =
         await homePage.getDeviceInfo(i)

        await t
          .expect(device.visible).ok()
          .expect(deviceNameContent.exists).ok()
          .expect(deviceTypeContent.exists).ok()
          .expect(deviceCapacityContent.exists).ok()
          .expect(device.innerText).contains('EDIT')
          .expect(device.innerText).contains('REMOVE')
    }
})