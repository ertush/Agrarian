# node-red-contrib-email-out

[![NPM](https://nodei.co/npm/node-red-contrib-email-out.png)](https://nodei.co/npm/node-red-contrib-email-out/)

[Node-Red][1] node contrib node to send emails with output using [nodemailer][2].

This node is based on [node-red-nodes-email][5] and [lambda-mailer][4] 

#Install

Run the following command in the root directory of your Node-RED install

    npm install --save node-red-contrib-email-out

### Common mail properties
Property | Method | Example
------------ | --- | ------------
to | msg.to | [ { "address": "receiver@example.com", "name": "Receiver" } ]
from | msg.from | [ { "address": "sender@example.com", "name": "Sender" } ]
subject | msg.subject | Hello world!
text+html | msg.body | How are you today?
html | msg.html | <code><html><body>How are you today?</body></html></code>
text | msg.text | How are you today?
attachments | msg.attachments[] | *** see attachments object properties ***
number of attachments | msg.attachments.length | 4

### All mail properties

  * **headers** - unprocessed headers in the form of - `{key: value}` - if there were multiple fields with the same key then the value is an array
  * **from** - an array of parsed `From` addresses - `[{address:'sender@example.com',name:'Sender Name'}]` (should be only one though)
  * **to** - an array of parsed `To` addresses
  * **cc** - an array of parsed `Cc` addresses
  * **bcc** - an array of parsed 'Bcc' addresses
  * **subject** - the subject line
  * **references** - an array of reference message id values (not set if no reference values present)
  * **inReplyTo** - an array of In-Reply-To message id values (not set if no in-reply-to values present)
  * **priority** - priority of the e-mail, always one of the following: *normal* (default), *high*, *low*
  * **body** - if provided, override text and html fields
  * **text** - text body
  * **html** - html body
  * **date** - date field as a `Date()` object. If date could not be resolved or is not found this field is not set. Check the original date string from `headers.date`
  * **attachments** - an array of attachments

### Attachments properties
```javascript
attachments = [{
    contentType: 'image/png',
    fileName: 'image.png',
    contentDisposition: 'attachment',
    contentId: '5.1321281380971@localhost',
    transferEncoding: 'base64',
    length: 126,
    generatedFileName: 'image.png',
    checksum: 'e4cef4c6e26037bcf8166905207ea09b',
    content: <Buffer ...>
}];
```
#Nodes
![alt tag](https://raw.githubusercontent.com/alessh/node-red-contrib-email-out/master/node.png)
![alt tag](https://raw.githubusercontent.com/alessh/node-red-contrib-email-out/master/flow.png)

### TODO

- add templates from lambda-mailer

#Author

[Alessandro Holanda][3]

[1]:http://nodered.org
[2]:https://www.npmjs.com/package/nodemailer
[3]:https://github.com/alessh
[4]:https://github.com/eahefnawy/lambda-mailer
[5]:https://github.com/node-red/node-red-nodes/tree/master/social/email