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
| username      | string  | **Optional** | Optional Username or default is the Logged In User                                              |

## References

Project based on: https://community.home-assistant.io/t/wth-why-most-settings-are-browser-instance-dependant/468419/16
