# NinjaRMM Automation Assessment

## Tests created
- Test 1: Verify list of devices
- Test 2: Create a new device and verify it
- Test 3: Update name of first device in the list
- Test 4: Remove last device from the list

### version
The TestCafe version.

```yaml
    version: "1.15.0"
```
### Run TestCafe Tests

Scripts to run the tests

```yaml
    name: Run Tests on Chrome
        with:
            args: "npm run test:chrome"

    name: Run Tests on Chrome Headless
        with:
            args: "npm run test:chrome:headless"

    name: Run Tests on Chrome 5 concurrent browsers
        with:
            args: "npm run test:chrome:5"
        
    name: Run Tests on different browsers Chrome, Firefox
        with:
            args: "npm run test:multilple"
```
