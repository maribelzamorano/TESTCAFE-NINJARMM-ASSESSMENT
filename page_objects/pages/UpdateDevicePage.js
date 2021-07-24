import { Selector, t } from "testcafe"

class UpdateDevicePage{
    constructor(){
        this.systemName = Selector('#system_name')
        this.deviceTypeSelect = Selector('#type')
        this.deviceTypeOption = this.deviceTypeSelect.find('option')
        this.deviceCapacity = Selector('#hdd_capacity')
        this.saveButton = Selector('.submitButton')
    }

    async updateDeviceName(name){
        await t
            .typeText(this.systemName, name, { paste: true, replace: true})
            .click(this.saveButton)
    }
}

export default UpdateDevicePage