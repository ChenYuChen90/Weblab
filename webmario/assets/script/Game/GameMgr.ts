const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    mapNode: cc.Node;
    
    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;
    @property({type:cc.AudioClip})
    jumpEffect: cc.AudioClip = null;
    @property({type:cc.AudioClip})
    loseOneLifeEffect: cc.AudioClip = null;
    @property({type:cc.AudioClip})
    kickEffect: cc.AudioClip = null;
    @property({type:cc.AudioClip})
    dieEffect: cc.AudioClip = null;
    @property({type:cc.AudioClip})
    powerEffect: cc.AudioClip = null;
    @property({type:cc.AudioClip})
    coinEffect: cc.AudioClip = null;
    @property({type:cc.AudioClip})
    stompEffect: cc.AudioClip = null;
    @property({type:cc.AudioClip})
    levelClearEffect: cc.AudioClip = null;

    private physicmanger: cc.PhysicsManager = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.physicmanger = cc.director.getPhysicsManager();
        this.physicmanger.enabled = true;
        this.physicmanger.gravity = cc.v2(0, -200);
        //this.physicmanger.debugDrawFlags = true;
        this.initMapNode(this.mapNode);
    }

    start(){
        this.playBGM();
    }

    playBGM(){
        cc.audioEngine.playMusic(this.bgm, true);
    }
    stopBGM(){
        cc.audioEngine.pauseMusic();
    }
    playEffect(effectName:string){
        if(effectName == 'jump'){
            cc.audioEngine.playEffect(this.jumpEffect, false);
        } else if(effectName == 'loseOneLife') {
            cc.audioEngine.playEffect(this.loseOneLifeEffect, false);
        } else if (effectName == 'kick'){
            cc.audioEngine.playEffect(this.kickEffect, false);
        } else if (effectName == 'die'){
            cc.audioEngine.playEffect(this.dieEffect, false);
        } else if (effectName == 'power'){
            cc.audioEngine.playEffect(this.powerEffect, false);
        } else if (effectName == 'coin'){
            cc.audioEngine.playEffect(this.coinEffect, false);
        } else if (effectName == 'stomp'){
            cc.audioEngine.playEffect(this.stompEffect, false);
        } else if (effectName == 'levelClear'){
            cc.audioEngine.playEffect(this.levelClearEffect, false);
        }
    }


    initMapNode(mapNode){
        let tiledMap = mapNode.getComponent(cc.TiledMap);
        let tiledSize = tiledMap.getTileSize();
        let layer = tiledMap.getLayer('wall');
        let layerSize = layer.getLayerSize();

        for(let i = 0; i < layerSize.width; i++){
            for(let j = 0; j < layerSize.height; j++){
                let tiled = layer.getTiledTileAt(i, j, true);
                if(tiled.gid != 0){
                    tiled.node.group = 'wall';
                    tiled.node.name = 'wall';

                    let body = tiled.node.addComponent(cc.RigidBody);
                    body.type = cc.RigidBodyType.Static;
                    
                    let collider = tiled.node.addComponent(cc.PhysicsBoxCollider);
                    collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2);
                    collider.size = tiledSize;
                    collider.Friction = 0;
                    collider.apply();
                }
            }
        }
    }

    update (dt) {}
}
