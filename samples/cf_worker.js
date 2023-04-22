export default {
  async fetch(request) {
    const data = {
      "status": "OK",
      "admin": {
        defaultPanel: "\"lovelace\"",
        dockedSidebar: "\"docked\"",
        enableShortcuts: 'true',
        hiddenTabs: '{}',
        selectedLanguage: 'null',
        selectedTheme: '{"dark":true}',
        sidebarHiddenPanels: '["logbook","energy","map","history","alarmo","media-browser"]',
        sidebarPanelOrder:
          '["lovelace","dwains-dashboard","wall-dashboard","a0d7b954_vscode","e4641267_portainer","a0d7b954_ssh","hacs"]',
        suspendWhenHidden: 'true',
        vibrate: 'true',
      },
      "user2": {
        defaultPanel: "\"lovelace\"",
        dockedSidebar: "\"always_hidden\"",
      }
    };

    const json = JSON.stringify(data, null, 2);

    return new Response(json, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
  },
};
