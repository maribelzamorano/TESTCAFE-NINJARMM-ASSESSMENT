import axios from 'axios'

class Server {
	constructor() {
		this.API_BASE_URL = 'http://localhost:3000/devices'
	}

	handleError() {
		if (error.response) {
			console.log(error.response.data)
			console.log(error.response.status)
			console.log(error.response.headers)
		} else if (error.request) {
			console.log(error.request)
		} else {
			console.log(`Error ${error.message}`)
		}
		throw new Error('API Error: ' + error.message)
	}

	/**
	 *
	 * @returns {Promise<devices>}
	 */
	async getDevices() {
		try {
			const response = await axios.get(`${this.API_BASE_URL}`)
			const devices = response.data
			return devices
		} catch (error) {
			this.handleError(error)
		}
	}

	/**
	 *
	 * @param {string} newName
	 * @param {object} device
	 * @returns {Promise<void>}
	 */
	async changeDeviceName(newName, device) {
		try {
			device.system_name = newName
			await axios.put(`${this.API_BASE_URL}/${device.id}`, device)
		} catch (error) {
			this.handleError(error)
		}
	}

	/**
	 *
	 * @param {string} deviceId
	 * @returns {Promise<void>}
	 */
	async removeDevice(deviceId) {
		try {
			await axios.delete(`${this.API_BASE_URL}/${deviceId}`)
		} catch (error) {
			this.handleError(error)
		}
	}
}

export default new Server()
