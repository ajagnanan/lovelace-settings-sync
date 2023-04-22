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

Use [HACS](https://hacs.xyz) or follow this [guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins)

```yaml
resources:
  url: /local/settings-sync.js
  type: module
```

## Options

| Name          | Type    | Requirement  | Description                                                                                     |
| ------------- | ------- | ------------ | ----------------------------------------------------------------------------------------------- |
| type          | string  | **Required** | `custom:custom:settings-sync`                                                                   |
| enabled       | boolean | **Required** | Enable card                                                                                     |
| sensor        | sensor  | **Required** | The Sensor that holds the User Settings JSON retrieved by the REST API                          |
| username      | string  | **Optional** | Optional Username or default is the Logged In User (this matches up with the JSON)              |

[commits-shield]: https://img.shields.io/github/commit-activity/y/ajagnanan/ha-settings-sync.svg?style=for-the-badge
[commits]: https://github.com/ajagnanan/ha-settings-sync/commits/master
[license-shield]: https://img.shields.io/github/license/ajagnanan/ha-settings-sync.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/badge/maintainer-ajagnanan-blue.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/ajagnanan/ha-settings-sync.svg?style=for-the-badge
[releases]: https://github.com/ajagnanan/ha-settings-sync/releases

## Configuration

```yaml
type: custom:settings-sync
enabled: true
sensor: sensor.settings_sync
username: admin
```

## References

Project based on: https://community.home-assistant.io/t/wth-why-most-settings-are-browser-instance-dependant/468419/16
