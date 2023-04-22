# Home Assistant Settings Sync

A Custom Card that provides Browser Setting Sync for Home Assistant Users.

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE.md)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/hacs/integration)

![Project Maintenance][maintenance-shield]
[![GitHub Activity][commits-shield]][commits]

## Minimum Home Assistant Version

Home Assistant version 0.110.0 or higher is required as of release 1.0.0 of settings-sync

## Installation

### HACS

Settings Sync is available in [HACS](https://hacs.xyz) (Home Assistant Community Store).

1. Install HACS if you don't have it already
2. Open HACS in Home Assistant
3. Go to "Frontend" section
4. Click 3 dots on top right and custom repository
5. Add `https://github.com/ajagnanan/lovelace-settings-sync` with catagory `Lovelace`
6. Search for "Settings Sync" and install

### Manual

1. Download `settings-sync.js` file from the [`latest release`](https://github.com/ajagnanan/lovelace-settings-sync/releases).
2. Put `settings-sync.js` file into your `config/www` folder.
3. Add reference to `settings-sync.js` in Dashboard. There's two way to do that:
    - **Using UI:** _Settings_ → _Dashboards_ → _More Options icon_ → _Resources_ → _Add Resource_ → Set _Url_ as `/local/settings-sync.js` → Set _Resource type_ as `JavaScript Module`.
      **Note:** If you do not see the Resources menu, you will need to enable _Advanced Mode_ in your _User Profile_
    - **Using YAML:** Add following code to `lovelace` section.
  
        ```yaml
        resources:
            - url: /local/settings-sync.js
              type: module
        ```

## Options

| Name          | Type    | Requirement  | Description                                                                                     |
| ------------- | ------- | ------------ | ----------------------------------------------------------------------------------------------- |
| type          | string  | **Required** | `custom:settings-sync`                                                                          |
| enabled       | boolean | **Required** | Enable card                                                                                     |
| sensor        | sensor  | **Required** | The Sensor that holds the User Settings JSON retrieved by the REST API                          |
| render_ui     | boolean | **Required** | If the UI should be rendered                                                                    |
| username      | string  | **Optional** | Optional Username or default is the Logged In User (this matches up with the JSON)              |

[commits-shield]: https://img.shields.io/github/commit-activity/y/ajagnanan/lovelace-settings-sync.svg?style=for-the-badge
[commits]: https://github.com/ajagnanan/lovelace-settings-sync/commits/master
[license-shield]: https://img.shields.io/github/license/ajagnanan/lovelace-settings-sync.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/badge/maintainer-ajagnanan-blue.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/ajagnanan/lovelace-settings-sync.svg?style=for-the-badge
[releases]: https://github.com/ajagnanan/lovelace-settings-sync/releases

## Configuration

### Sensor

This card requires a REST endpoint which will serve the Settings JSON. A REST Sensor will be needed that will then retrieve these settings into Home Assistant. An example of the [rest sensor](samples/rest_sensor.yaml) and [settings.json](samples/settings.json) are provided. The `Key` is the `Name` (all lowercase) of the User for whom the Setting is for.

**The REST Sensor is needed because Attributes allow a String lenght greater than 255, which is the limit of the State value.**

#### REST API

CloudFlare Workers offer a way to host the REST endpoint. See [cf_worker.js](samples/cf_worker.js) for a basic example of the worker code. **This can be hosted anywhere though, whether on a Cloud or Local service**.

### Card

```yaml
type: custom:settings-sync
enabled: true
sensor: sensor.settings_sync
render_ui: true
username: admin
```

## References

- Project based on: https://community.home-assistant.io/t/wth-why-most-settings-are-browser-instance-dependant/468419/16
- HA Custom Card: https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/
