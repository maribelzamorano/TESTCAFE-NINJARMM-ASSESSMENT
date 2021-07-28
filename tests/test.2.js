import homePage from '../page_objects/pages/HomePage'
import addDevicePage from '../page_objects/pages/AddDevicePage'
import { nanoid } from 'nanoid'
import server from '../server/Server'

fixture`Automation Assessment Test 2`.page`http://localhost:3001`

function randomCapacity() {
	return (Math.floor(Math.random() * 512) + 100).toString()
}

function randomType() {
	const deviceTypes = ['WINDOWS WORKSTATION', 'WINDOWS_SERVER', 'MAC']
	return deviceTypes[Math.floor(Math.random() * deviceTypes.length)]
}

test('Create a new device and verify it', async t => {
	await t.click(homePage.addDeviceButton)
	const randomDeviceName = 'MAC-MARIBEL/' + nanoid().toString()
	const randomDeviceCapacity = randomCapacity()
	const randomDeviceType = randomType()

	await addDevicePage.addDevice(randomDeviceName, randomDeviceType, randomDeviceCapacity)

	await t.expect(homePage.deviceName(randomDeviceName).visible).ok()
	await t.expect(homePage.deviceType.withExactText(randomDeviceType).visible).ok()
	await t.expect(homePage.deviceCapacity.withExactText(randomDeviceCapacity + ' GB').visible).ok()

	// Remove device after its creation and verification in order to mantain the devices list without pollution
	const devices = await server.getDevices()
	for (const device of devices) {
		if (device.system_name == randomDeviceName) {
			await server.removeDevice(device.id)
			await t.expect(device.exists).notOk()
		}
	}
})
