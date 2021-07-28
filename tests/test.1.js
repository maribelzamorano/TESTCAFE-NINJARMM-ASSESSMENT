import homePage from '../page_objects/pages/HomePage'
import server from '../server/Server'

fixture`Automation Assessment Test 1`.page`http://localhost:3001`

test('Verify list of devices', async t => {
	const devices = await server.getDevices()
	const devicesCount = devices.length

	// Sort by hdd capacity
	const sortedDevices = devices.sort((device1, device2) => device1.hdd_capacity - device2.hdd_capacity)

	const devicesInUICount = await homePage.getDevicesCount()
	await t.expect(devicesInUICount).eql(devicesCount)

	for (const device of sortedDevices) {
		await t.expect(homePage.deviceName(device.system_name).visible).ok()
		const { deviceType, deviceCapacity } = await homePage.getDeviceProperties(device.system_name)
		await t.expect(deviceType.innerText).eql(device.type)
		await t.expect(deviceCapacity.innerText).eql(device.hdd_capacity + ' GB')
		await t.expect(deviceType.visible).ok()
		await t.expect(deviceCapacity.visible).ok()
		await homePage.areButtonsVisible(device.system_name)
	}
})
