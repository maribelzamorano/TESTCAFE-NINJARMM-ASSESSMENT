import axios from "axios"
import HomePage from "../page_objects/pages/HomePage"

const homePage = new HomePage()

fixture `Automation Assessment Test 1`
    .page`http://localhost:3001`
        .beforeEach(async t => {
            await t.setTestSpeed(1)
        })

const API_BASE_URL = 'http://localhost:3000'

test('Verify list of devices', async t =>{
    /** API call. */
    const response = await axios.get(`${API_BASE_URL}/devices`)
    const devices = response.data
    
    
    for (let deviceData of devices){
        /** 
         * Get device info from UI with the device name from response.
         * @param {string} deviceData.system_name - The name of the device obtained from the API CALL response.
         */
        let {deviceContent, deviceName, deviceType, deviceCapacity} =
         await homePage.getDeviceByName(deviceData.system_name)
        
        await t
            .expect(deviceContent.visible).ok()
            .expect(deviceName.exists).ok()
            .expect(deviceName.innerText).eql(deviceData.system_name)
            .expect(deviceType.innerText).eql(deviceData.type)
            .expect(deviceCapacity.innerText).eql(deviceData.hdd_capacity + " GB")
            .expect(deviceContent.innerText).contains('EDIT')
            .expect(deviceContent.innerText).contains('REMOVE') 
    }
})