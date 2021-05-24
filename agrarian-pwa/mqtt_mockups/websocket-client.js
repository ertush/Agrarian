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
           
           client.publish("temperature", payload_temperature);
           client.publish("humidity", payload_humid);
           client.publish("atpressure", payload_atmp);
           client.publish("light", payload_light);
           client.publish("soil", payload_soil);



          }, 60000);
        
 })

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
