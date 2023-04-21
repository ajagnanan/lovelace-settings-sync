# Settings-Sync

https://community.home-assistant.io/t/wth-why-most-settings-are-browser-instance-dependant/468419/16

```js
this._hass?.callWS({
    type: 'auth/current_user'
}).then(funcion(resp) {
    console.log(resp);
});

```

```js
const response = await this._hass?.callWS({
    type: 'input_select/update',
    input_select_id: 'test',
    name: 'Test',
    options: ['1', '2', '3'],
});

if (response) {
console.log('updated: ', response);
}
```

```js
const response = await this._hass?.callApi('GET', 'states/' + this._config?.input_text);

if (response) {
    console.log('Setting: ', response);
}

{"entity_id":"input_text.json_text","state":"{\"name\": \"this is text\"}","attributes":{"editable":true,"min":0,"max":255,"pattern":null,"mode":"text","icon":"mdi:code-json","friendly_name":"Json-text"},"last_changed":"2023-04-21T04:22:12.378329+00:00","last_updated":"2023-04-21T04:22:12.378329+00:00","context":{"id":"01GYH0RQMTTX6NY913GFHV0ED4","parent_id":null,"user_id":null}}
```

```json
{"type":"input_select/create","name":"Test2","icon":"mdi:vector-point-select","options":["1","2"],"input_select_id": "test2"}


{"type":"input_text/create","name":"Json-text","icon":"mdi:code-json","max":"255","id":41}


{"type":"config/entity_registry/get","entity_id":"input_text.json_text","id":51}
{"id":40,"type":"result","success":true,"result":{"area_id":null,"config_entry_id":null,"device_id":null,"disabled_by":null,"entity_category":null,"entity_id":"input_text.json_text","has_entity_name":false,"hidden_by":null,"icon":null,"id":"1d1e4c049460ba0012663ee6d7aeeafb","name":null,"options":{},"original_name":"Json-text","platform":"input_text","translation_key":null,"unique_id":"json_text","aliases":[],"capabilities":null,"device_class":null,"original_device_class":null,"original_icon":"mdi:code-json"}}


{"type":"auth/current_user"}
```
