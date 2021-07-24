import { Selector, t } from "testcafe"

class NewDevicePage{
    constructor(){
        this.systemName = Selector('#system_name')
        this.deviceTypeSelect = Selector('#type')
        this.deviceTypeOption = this.deviceTypeSelect.find('option')
        this.deviceCapacity = Selector('#hdd_capacity')
        this.saveButton = Selector('.submitButton')
    }

    async addDevice(name, type, capacity){
        await t
            .typeText(this.systemName, name, { paste: true, replace: true})
            .click(this.deviceTypeSelect)
            .click(this.deviceTypeOption.withText(type))
            .typeText(this.deviceCapacity, capacity, { paste: true, replace: true})
            .click(this.saveButton)
    }
}

export default NewDevicePage