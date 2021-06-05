var mqtt = require('mqtt')
var client  = mqtt.connect('ws://localhost:9100')

      
    
client.on('connect', function () {
    console.log('[+] Client connected');
        setInterval(() => {
          
        let payload_temperature = JSON.stringify(Math.round(Math.random() * 30))
        let payload_humid = JSON.stringify(Math.round(Math.random() * 70))
        let payload_atmp = JSON.stringify(Math.round(Math.random() * 110))
        let payload_soil = JSON.stringify(Math.round(Math.random() * 15))
        let payload_light = JSON.stringify(Math.round(Math.random() * 10))
        let payload_lat = JSON.stringify(-1.45);
        let payload_lng = JSON.stringify(36.97);
           
           client.publish("esp8266/temperature", payload_temperature);
           client.publish("esp8266/humidity", payload_humid);
           client.publish("esp8266/atpressure", payload_atmp);
           client.publish("esp8266/light", payload_light);
           client.publish("esp8266/soil", payload_soil);
           client.publish("esp8266/lat", payload_lat);
           client.publish("esp8266/lng", payload_lng);



          }, 60000);
        
 })

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
