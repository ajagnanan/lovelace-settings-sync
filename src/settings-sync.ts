/* eslint-disable @typescript-eslint/no-explicit-any */
import { TemplateResult, LitElement, property, html } from 'lit-element';
import { HomeAssistant, LovelaceCard } from 'custom-card-helpers';

import { CardConfig } from './types';
import { CARD_VERSION } from './const';

/* eslint no-console: 0 */
console.info(
  `%c  SETTINGS-SYNC  \n%c  Version ${CARD_VERSION}     `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

class SettingsSync extends LitElement implements LovelaceCard {
  @property() protected _hass?: HomeAssistant;
  @property() protected _config?: CardConfig;

  @property() protected _lit_sensor?: string;
  @property() protected _lit_username?: string;

  private _initialized = false;
  private _settings: any;

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._lit_sensor = this._config?.sensor || '';
    this._lit_username = this._config?.username || this._hass?.user?.name?.toLowerCase();

    if (this._config?.enabled) {
      this._initialize();
    }
    // cannot load settings afterwards cause this method is non-async
  }

  public getCardSize(): number {
    return 1;
  }

  public setConfig(config: any): void {
    if (!config.enabled) {
      throw new Error('You need "enabled" defined');
    }
    if (!config.sensor) {
      throw new Error('You need "sensor" defined that holds the JSON config String');
    }
    if (config.render_ui == undefined) {
      throw new Error('You need "render_ui" defined to specify if a UI should be rendered');
    }

    this._config = config;
  }

  protected render(): TemplateResult | void {
    if (this._config?.render_ui) {
      return html`
        <ha-card style="padding: 12px">
          <div class="content">
            <div class="icon-container" role="button" tabindex="0" style="display: inline-block">
              <ha-tile-icon
                class="icon"
                data-domain="sensor"
                data-state="3.4.3"
                style="display: inline-block"
              ></ha-tile-icon>
              <ha-icon
                icon="mdi:information-variant"
                style="display: inline-block; vertical-align: top; margin: 8px 0 0 -33px"
              ></ha-icon>
            </div>
            <div class="info" style="display: inline-block; vertical-align: top; padding: 10px 13px">
              <span class="primary">Synced Sensor: </span>
              <span class="secondary" style="font-weight: bold">${this._lit_sensor}:${this._lit_username}</span>
            </div>
          </div>
        </ha-card>
      `;
    } else {
      return html``;
    }
  }

  public async loadSettings(settings: any = {}): Promise<void> {
    let settingsUpdated = false;
    const currentSettings = {};
    Object.keys(settings).forEach(key => {
      currentSettings[key] = localStorage.getItem(key);
      if (currentSettings[key] !== settings[key]) {
        localStorage.setItem(key, settings[key]);
        settingsUpdated = true;
      }
    });

    if (settingsUpdated) {
      console.warn('Settings updated:\n', JSON.stringify(currentSettings, null, 2));
      console.warn('Settings updated, reloading page...');
      location.reload();
    }
  }

  private async _initialize(): Promise<void> {
    if (this._hass === undefined) return;
    if (this._config === undefined) return;

    if (!this._initialized) {
      const settings = await this._getSettings();
      await this.loadSettings(settings);

      this._initialized = true;
    }
  }

  private async _getSettings(): Promise<any> {
    const response: any = await this._hass?.callApi('GET', 'states/' + this._config?.sensor);
    if (response?.state === 'OK') {
      const key = this._config?.username || this._hass?.user?.name?.toLowerCase();
      if (key) {
        this._settings = response?.attributes[key];
      }
    }

    return this._settings;
  }
}

customElements.define('settings-sync', SettingsSync);
