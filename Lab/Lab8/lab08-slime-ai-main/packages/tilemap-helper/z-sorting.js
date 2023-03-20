module.exports = {
    'get-canvas-children': function (event) {
        // A small timeout is added so that z-sorting happens after TiledMap loads.
        setTimeout(() => {
            var canvas = cc.find('Canvas');
            if (!canvas) return;
            const objectGroups = canvas.getComponentsInChildren(cc.TiledObjectGroup)
            for (const objectGroup of objectGroups) {
                for (var node of objectGroup.node.children) {
                    node.zIndex = 10000 + -node.y;
                }
                objectGroup.node.sortAllChildren();
            }
            Editor.log('tilemap-helper: Applied Z-sorting to all tiled object groups.');
                
        }, 1000);
        
    }
};