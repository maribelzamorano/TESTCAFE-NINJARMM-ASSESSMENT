import homePage from '../page_objects/pages/HomePage'
import server from '../server/Server'

fixture`Automation Assessment Test 4`.page`http://localhost:3001`

test('Remove last device from the list', async t => {
	const devices = await server.getDevices()
	const sortedDevices = devices.sort((device1, device2) => device1.hdd_capacity - device2.hdd_capacity) // Sort by hdd capacity
	const lastDevice = sortedDevices[devices.length - 1] // Get last device from the list.

	await server.removeDevice(lastDevice.id)
	await homePage.refresh()

	await t.expect(lastDevice.exists).notOk()
})
