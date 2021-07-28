import homePage from '../page_objects/pages/HomePage'
import server from '../server/Server'
import { nanoid } from 'nanoid'

fixture`Automation Assessment Test 3`.page`http://localhost:3001`

test('Update name of first device in the list', async t => {
	const devices = await server.getDevices()
	const sortedDevices = devices.sort((device1, device2) => device1.hdd_capacity - device2.hdd_capacity) // Sort devices by hdd capacity
	const firstDevice = await sortedDevices[0] // Get first device from the list.

	/** Change the name of the device, update it and reload the page. */
	const randomDeviceName = 'Renamed Device/' + nanoid().toString()
	await server.changeDeviceName(randomDeviceName, firstDevice)
	await homePage.refresh()

	await t.expect(homePage.deviceName(randomDeviceName).visible).ok()
})
