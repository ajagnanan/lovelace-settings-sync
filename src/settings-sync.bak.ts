/* eslint-disable @typescript-eslint/no-explicit-any */
import { TemplateResult, customElement, LitElement, property, html, CSSResult, css, PropertyValues } from 'lit-element';
import { HomeAssistant, LovelaceCard } from 'custom-card-helpers';

import { CARD_VERSION } from './const';

/* eslint no-console: 0 */
console.info(
  `%c  SETTINGS-SYNC  \n%c  Version ${CARD_VERSION}     `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

class SettingsSync extends LitElement implements LovelaceCard {
  @property() protected _hass?: HomeAssistant;
  @property() protected _config?: any;
  @property() private _helpers?: any;
  private _initialized = false;

  set hass(hass: HomeAssistant) {
    this._hass = hass;

    this._initialize();
  }

  public getCardSize(): number {
    return 1;
  }

  // The user supplied configuration. Throw an exception and Home Assistant
  // will render an error card.
  public setConfig(config: any): void {
    this._config = config;

    this._loadCardHelpers();
  }

  public loadSettings(): void {
    let settingsUpdated = false;
    const defaultSettings = this._getSettings();
    const currentSettings = {};
    Object.keys(defaultSettings).forEach(key => {
      currentSettings[key] = localStorage.getItem(key);
      if (currentSettings[key] !== defaultSettings[key]) {
        localStorage.setItem(key, defaultSettings[key]);
        settingsUpdated = true;
      }
    });
    const urlSearchParams = new URLSearchParams(location.search);
    if (!settingsUpdated) {
      console.log('Settings are up to date.');
      return;
    }
    if (urlSearchParams.get('edit') === '1') {
      console.warn('Settings updated:\n', JSON.stringify(currentSettings, null, 2));
    } else {
      console.warn('Settings updated, reloading page...');
      location.reload();
    }
  }

  protected render(): TemplateResult | void {
    if (!this._config || !this._hass) {
      return html``;
    }

    return html`
      <ha-card style="" class="active type-tile">
        <div class="tile">
          <div class="background" role="button" tabindex="0"></div>
          <div class="content">
            <div class="icon-container" role="button" tabindex="0">
              <ha-tile-icon class="icon" data-domain="sensor" data-state="3.4.3"></ha-tile-icon>
            </div>
            <ha-tile-info class="info">
              <div class="info">
                <span class="primary">Dwains Dashboard Latest version</span>
                <span class="secondary">3.4.3 latest version</span>
              </div>
            </ha-tile-info>
          </div>
        </div>
      </ha-card>
    `;
  }

  private async _initialize(): Promise<void> {
    if (this._hass === undefined) return;

    if (!this._initialized) {
      debugger;
      const response = await this._hass?.callWS({
        type: 'input_select/update',
        input_select_id: 'test',
        name: 'Test',
        options: ['1', '2', '3'],
      });

      if (response) {
        console.log('updated: ', response);
      }

      this._initialized = true;
    }
  }

  private async _loadCardHelpers(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers();
  }

  private _getSettings(): any {
    const userName = this._hass?.user?.name;
    console.log(userName);

    debugger;

    return {
      defaultPanel: '"lovelace"',
      dockedSidebar: '"docked"',
      enableShortcuts: 'true',
      hiddenTabs: '{}',
      selectedLanguage: 'null',
      selectedTheme: '{"dark":true}',
      sidebarHiddenPanels: '["logbook","energy","map","history","alarmo","media-browser"]',
      sidebarPanelOrder:
        '["lovelace","dwains-dashboard","wall-dashboard","a0d7b954_vscode","e4641267_portainer","a0d7b954_ssh","hacs"]',
      suspendWhenHidden: 'true',
      vibrate: 'true',
    };
  }
}

customElements.define('settings-sync', SettingsSync);
