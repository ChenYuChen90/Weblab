'use strict';

module.exports = {
  load () {
    // execute when package loaded
    // Editor.Scene.callSceneScript ('tilemap-helper', 'get-canvas-children', function (err) {
    //     if (err) {
    //       console.log(`Error: ${err}`);
    //     }
    //   }
    // );
  },

  unload () {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    // 'open' () {
    //   // open entry panel registered in package.json
    //   Editor.Panel.open('tilemap-helper');
    // },
    // 'say-hello' () {
    //   Editor.log('Hello World!');
    //   // send ipc message to panel
    //   Editor.Ipc.sendToPanel('tilemap-helper', 'tilemap-helper:hello');
    // },
    // 'clicked' () {
    //   Editor.log('Button clicked!');
    // },
    'scene:ready'() {
      Editor.Scene.callSceneScript ('tilemap-helper', 'get-canvas-children', function (err) {
          if (err) {
            console.log(`Error: ${err}`);
          }
        }
      );
    },
    'editor:build-finished'() {
      // Editor.Scene.callSceneScript ('tilemap-helper', 'get-canvas-children', function (err) {
      //     if (err) {
      //       console.log(`Error: ${err}`);
      //     }
      //   }
      // );
      
    },
    'asset-db:asset-changed'() {
      Editor.Scene.callSceneScript ('tilemap-helper', 'get-canvas-children', function (err) {
          if (err) {
            console.log(`Error: ${err}`);
          }
        }
      );
    }
  },
};