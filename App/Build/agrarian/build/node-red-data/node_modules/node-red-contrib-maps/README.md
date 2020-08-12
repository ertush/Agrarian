# node-red-contrib-maps
A Node-RED node implemented by Openlayers 5 to show Iot measures


![Node-RED Maps Dashboard](https://user-images.githubusercontent.com/1216181/52797842-0256df80-3077-11e9-8731-d54fb152eb2d.png)


## Description
This node package permit to use [Openlayers](https://openlayers.org/) **map** from Node-RED. The objective is create a new url for the map created, this url path could be configured and updated at runtime.

For the latest updates see the [CHANGELOG.md](https://github.com/masalinas/node-red-contrib-maps/blob/master/CHANGELOG.md)

## Installation
```
npm install node-red-contrib-maps --save
```

## Map configuration
The **Map attributes** are:
* Path: The Map Url to be access. An example where path is MAP could be:
```
http://localhost:1880/MAP
```

* Tittle: The map title
* Payload: The map dataset object

The **map payload attributes** are:
* channel: The channel legend
* dataset: The map dataset

The **payload dataset attributes** are:
* lon: longitude point
* lat: latitude point
* description: descripion value
* value: value point
* unit: value unit
* color: color marker

Read node help to check the dataset structure for each chart.
A Europe Temperature Map dataset could be like this:
```
[
    {
        "channel": "TEMP",
        "dataset": [
            {
                "lon": -3.703548,
                "lat": 40.417204,
                "name": "9fj04r",
                "description": "Temperature in Madrid",
                "value": 20.5,
                "unit": "°C",
                "iconColor": "Blue"
            },
            {
                "lon": -0.075906,
                "lat": 51.508319,
                "name": "04jgpe",
                "description": "Temperature in London",
                "value": 19,
                "unit": "°C",
                "iconColor": "Yellow"
            },
            {
                "lon": 2.34294,
                "lat": 48.859271,
                "name": "lfj82k",
                "description": "Temperature in Paris",
                "label": "Alert for strong frosts",
                "value": 11.7,
                "unit": "°C",
                "iconColor": "Red"
            },
            {
                "lon": 13.402786,
                "lat": 52.517987,
                "name": "0lw233",
                "description": "Temperature in Berlin",
                "value": 10.8,
                "unit": "°C",
                "iconColor": "Red"
            }
        ]
    }
]
```

## Dependencies
### Server side
* [socker.io](https://github.com/socketio/socket.io): socket.io server side
* [serve-static](https://github.com/expressjs/serve-static): Serve static files
* [cors](https://github.com/expressjs/cors): Node.js CORS middleware

### Client side
* [socker.io-client](https://github.com/socketio/socket.io-client): Socket.io client side
* [jquery](https://github.com/jquery/jquery): Multipurpose javascript library
* [bootstrap4](https://getbootstrap.com/): Build responsive, mobile-first projects on the web
* [popper.js](https://popper.js.org/): A kickass library used to manage poppers in the web applications
* [Openlayers](https://openlayers.org/): OpenLayers makes it easy to put a dynamic map in any web page
* [moment](https://momentjs.com/): Parse, validate, manipulate, and display dates and times in JavaScript.
* [jsPDF](https://parall.ax/products/jspdf): The leading HTML5 client solution for generating PDFs 

## Example
Under example folder you have a json flow to be imported in your node-red instance to test the nodes.