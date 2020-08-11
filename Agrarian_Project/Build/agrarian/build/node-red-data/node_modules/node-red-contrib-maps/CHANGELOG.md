### 0.1.0: First Release

**Enhancements**

 - Draw Openlayers from node.

**Fixes**

### 0.2.0: Second Release with some fixes

**Fixes**

 - Refactor the code to manage socket.io server better. Now each node is responsible to create
the socket.io server if not exist in the node-RED instance. The node save the socket.io server instance in the node-RED global context **io** variable. This new way to manage the socket-io server permit resolve two problems:
* The initial configuration of each template node will be load the first time.
* The node will be able to work with other nodes that use socket.io server too, Of course the global context **io** variable will be reserver by me.

 **Enhancements**

 ### 0.2.2: Second Release with some Enhancements

**Fixes**

 **Enhancements**

* Add moment library on client side to manage dates
* Add last updated date format label on the toolbar on the right. Set the export menu on the left. The rest tools added in the future will be on the left too.

To make compatible the dataset of this node with the map node [node-red-contrib-web-worldmap](https://flows.nodered.org/node/node-red-contrib-web-worldmap) I made some changes:
* Add new atribute called **name**: this attribute is showed in tooltip on click event marker near the **description, value and unit** attributes.
* Change color attribute name to iconColor to be compatible.
* Add new **label** attribute used like a tooltip on over event marker if exist.

The example is save again with these new updates to be tested
