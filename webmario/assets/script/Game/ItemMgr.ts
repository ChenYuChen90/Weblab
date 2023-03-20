const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    ItemAni: cc.Animation;

    @property
    anima: string;

    @property
    isFirst: boolean = false;

    @property(cc.Prefab)
    PrefabNode:cc.Prefab;

    @property(cc.Prefab)
    scoreNode:cc.Prefab;

    setAni(anima){
        if(this.anima == anima) return;

        this.anima = anima;
        this.ItemAni.play(anima);
    }

    onLoad () {
        this.anima = 'ItemQues';
        this.ItemAni = this.node.getComponent(cc.Animation);
    }

    onBeginContact(contact, self, other){
        if(self.node.name == 'questionMushR' || self.node.name == 'questionMushL'){
            if(other.node.name == 'player'){
                //console.log(contact.getWorldManifold().normal);
                if(contact.getWorldManifold().normal.y<0 && contact.getWorldManifold().normal.x != 1){
                    // effect
                    this.scheduleOnce(()=>{
                        other.node.parent.getComponent("GameMgr").playEffect("kick");
                    }, 0.1)
                    this.scheduleOnce(()=>{
                        other.node.parent.getComponent("GameMgr").playEffect("coin");
                    }, 0.7)

                    // move
                    let easeRate: number = 0.5;
                    let action = cc.sequence(cc.moveBy(0.1, 0, 15).easing(cc.easeInOut(easeRate)), cc.moveBy(0.1, 0, -15).easing(cc.easeInOut(easeRate)))
                    self.node.runAction(action);
                    
                    if(!this.isFirst){
                        
                        // product mushroom
                        let mushroom = cc.instantiate(this.PrefabNode);
                        mushroom.parent = this.node.parent;
                        mushroom.setPosition(cc.v2(this.node.getPosition().x, this.node.getPosition().y + 32));
                        //mushroom.getComponent(cc.RigidBody).linearVelocity.y = 200;
                        /*let mushDir = Math.random() > 0.5 ? "right" : "left";
                        if(mushDir == 'right'){
                            mushroom.getComponent(cc.RigidBody).linearVelocity.x = 80;
                        } else {
                            mushroom.getComponent(cc.RigidBody).linearVelocity.x = -80;
                        }*/
                        // product score
                        let score = cc.instantiate(this.scoreNode);
                        score.parent = this.node.parent;
                        score.setPosition(cc.v2(this.node.getPosition().x, this.node.getPosition().y));
                        let SeaseRate: number = 2;
                        let Saction = cc.spawn(cc.moveBy(1.5, 0, 70).easing(cc.easeInOut(SeaseRate)), cc.fadeOut(1.5))
                        score.runAction(Saction);
                        this.scheduleOnce(()=>{
                            score.destroy();
                        }, 1.5)
                        let playerCom = other.getComponent("Player")
                        playerCom.addScore(100);

                        // anima
                        let anima = this.anima;
                        anima = "ItemIdle"
                        if(anima){
                            this.setAni(anima);
                        }

                        this.isFirst = true;
                    }
                }
            }
        } else if (self.node.name == 'mushroomBigR' || self.node.name == 'mushroomBigL'){
            if(other.node.name == 'player'){
                // effect
                other.node.parent.getComponent("GameMgr").playEffect("power");

                // product score
                let score = cc.instantiate(this.scoreNode);
                score.parent = this.node.parent;
                score.setPosition(cc.v2(this.node.getPosition().x, this.node.getPosition().y));
                let SeaseRate: number = 2;
                let Saction = cc.spawn(cc.moveBy(1.5, 0, 70).easing(cc.easeInOut(SeaseRate)), cc.fadeOut(1.5))
                score.runAction(Saction);
                this.scheduleOnce(()=>{
                    score.destroy();
                }, 1.5)
                
                let playerCom = other.getComponent("Player")
                playerCom.addScore(100);
                
                this.node.destroy();
            }
        } else if (self.node.name == 'quesMoney') {
            if(other.node.name == 'player'){
                //console.log(contact.getWorldManifold().normal);
                if(contact.getWorldManifold().normal.y<0 && contact.getWorldManifold().normal.x != 1){
                    // effect
                    this.scheduleOnce(()=>{
                        other.node.parent.getComponent("GameMgr").playEffect("kick");
                    }, 0.1)
                    this.scheduleOnce(()=>{
                        other.node.parent.getComponent("GameMgr").playEffect("coin");
                    }, 0.7)
                    // move
                    let easeRate: number = 0.5;
                    let action = cc.sequence(cc.moveBy(0.1, 0, 15).easing(cc.easeInOut(easeRate)), cc.moveBy(0.1, 0, -15).easing(cc.easeInOut(easeRate)))
                    self.node.runAction(action);
                    
                    if(!this.isFirst){
                        // product money
                        let money = cc.instantiate(this.PrefabNode);
                        money.parent = this.node.parent;
                        money.setPosition(cc.v2(this.node.getPosition().x, this.node.getPosition().y + 40));

                        let MeaseRate: number = 2;
                        let Maction = cc.sequence(cc.moveBy(0.5, 0, 100).easing(cc.easeInOut(MeaseRate)), cc.spawn(cc.moveBy(0.5, 0, -100).easing(cc.easeInOut(MeaseRate)), cc.fadeOut(0.8)))
                        money.runAction(Maction);
                        this.scheduleOnce(()=>{
                            money.destroy();
                        }, 1)
                        let playerCom = other.getComponent("Player")
                        playerCom.addScore(100);
                        

                        // product score
                        let score = cc.instantiate(this.scoreNode);
                        score.parent = this.node.parent;
                        score.setPosition(cc.v2(this.node.getPosition().x, this.node.getPosition().y));
                        let SeaseRate: number = 2;
                        let Saction = cc.spawn(cc.moveBy(1.5, 0, 70).easing(cc.easeInOut(SeaseRate)), cc.fadeOut(1.5))
                        score.runAction(Saction);
                        this.scheduleOnce(()=>{
                            score.destroy();
                        }, 1.5)

                        // anima
                        let anima = this.anima;
                        anima = "ItemIdle"
                        if(anima){
                            this.setAni(anima);
                        }

                        this.isFirst = true;
                    }
                }
            }
        } else if (self.node.name == 'flag') {
            if(other.node.name == 'player'){
                if(!this.isFirst){
                    // product clear
                    let clear = cc.instantiate(this.PrefabNode);
                    clear.parent = this.node.parent;
                    clear.setPosition(cc.v2(2240, 0));
                    
                    // effect
                    other.node.parent.getComponent("GameMgr").playEffect("levelClear");
                    other.node.parent.getComponent("GameMgr").stopBGM();
                    
                    // change scene
                    other.getComponent("Player").isWin = true;
                    this.scheduleOnce(()=>{
                        cc.director.loadScene("state");
                    }, 3)
                    this.isFirst = true;
                }
            }
        }
    }

    update (dt) {
        
    }
}
