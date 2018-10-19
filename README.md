# AlfaBoard.Driver

## API

| Operation                    | URL                           | Example request  | Example response   |
| ---------------------------- | ----------------------------- | ---------------- |------------------ |
| Get IO value by IO name      | /`ioName`                     | /door-sensor     | 1 |
| Set IO value by IO name      | /`ioName`/`value`             | /main-light/123  | *none* |
| Get IO value by IO addr      | /get/`addr`                   | /get/4           | 12 |
| Set IO value by IO addr      | /set/`addr`/`value`           | /set/2/1         | *none* |
| Board info                   | /boardinfo | | |
| IO config                    | /ioconfig | | |
| IO rename                    | /`ioName`/rename/`newName` | /adc1/rename/light-sensor | [HTTP 200] |
| Edit or Add IO event         | /`ioName`/`eventName`/`newName` | /adc1/onChange/{pwmUpdate} | [HTTP 200] |
| Add config variable                 | `/config/{varName}/{value}`        | host/http://localhost:5000 | *none*  |
| Read config variable                | `/config/{varName}`     |  |
| Remove config variable              | `/config/{varName}/`     |   |
| Use config variable                 |                   | /door-sensor/onChange/{lightsDriver}/on  |   |

## Variables resolving order

User variables (from `user.config.json`) are resolved first. They may contain `{this.x}` placeholders.

## Config files

| File | Use | Structure |
| --- | --- | --- |
| `io.config.json` | IO Configuration | Json array |
| `user.config.json` | User variables | Key-value pairs as json object |
| `app.config.json` | Place for `httpPort`, `usbPort` etc | Key-value pairs as json object |

## IO Config

`io.config.json`

Single IO config:
```
 "0": {
        "name": "input1",
        "events": {
            "onChange": "http://localhost:3000/9/1",
            "onRising": "rise",
            "onFalling": "{host}/{this.name}/{this.event}/{this.value}"
        }
    }
```
Where:
| SYMBOL | Meaning |
| ---- | ---- |
| {this.value} | Value of this IO |

Example:
`"onFalling": "GET:{host}/{this.name}/{this.event}/{this.value}"`
will hit `http://myhost:1234/input1/onFalling/4` endpoint with GET HTTP method

BASH:{takePicture}|BASH:{sendPicture}