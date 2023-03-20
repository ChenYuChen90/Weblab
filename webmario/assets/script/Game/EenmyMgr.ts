const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    enemyAni: cc.Animation;
    @property
    anima: string;
    @property(cc.Prefab)
    scoreNode:cc.Prefab;

    @property
    EnemyIsDie: boolean;

    protected onLoad(): void {
        this.EnemyIsDie = false;
    }
    start () {
        
        if(this.node.name == "goomba"){
            let moveDir = (Math.random() > 0.5) ? "right" : "left";
            let delayTime = Math.random() * 2;
            this.GoombaMove(moveDir, delayTime);
            this.anima = 'goombaRun'
            this.enemyAni = this.node.getComponent(cc.Animation);
        } else if (this.node.name == "flower"){
            let moveDir = "up";
            let delayTime = Math.random() * 2;
            this.FlowerMove(moveDir, delayTime);
            this.anima = 'flowerRun'
            this.enemyAni = this.node.getComponent(cc.Animation);
        }
    }
    GoombaMove(moveDir: string, delayTime: number)
    {
        let easeRate: number = 3;
        let action: cc.Action;
        let sequenceR = cc.sequence(cc.moveBy(4, 80, 0).easing(cc.easeInOut(easeRate)), cc.moveBy(4, -80, 0).easing(cc.easeInOut(easeRate)));
        let sequenceL = cc.sequence(cc.moveBy(4, -80, 0).easing(cc.easeInOut(easeRate)), cc.moveBy(2, 80, 0).easing(cc.easeInOut(easeRate)));
        if(moveDir === 'right'){
            action = cc.repeatForever(sequenceR);
        } else if (moveDir == 'left'){
            action = cc.repeatForever(sequenceL);
        }
        this.scheduleOnce(()=>{
            this.node.runAction(action);
        }, delayTime);
        
    }
    FlowerMove(moveDir: string, delayTime: number){
        let easeRate: number = 2;
        let action: cc.Action;
        let dir = 'up';
        if(this.node.angle == 90){
            dir = 'left';
        } else if (this.node.angle == 270){
            dir = 'right';
        }
        let sequenceU = cc.sequence(cc.moveBy(2, 0, 51).easing(cc.easeInOut(easeRate)), cc.moveBy(2, 0, -51).easing(cc.easeInOut(easeRate)));
        let sequenceL = cc.sequence(cc.moveBy(2, -51, 0).easing(cc.easeInOut(easeRate)), cc.moveBy(2, 51, 0).easing(cc.easeInOut(easeRate)));
        let sequenceR = cc.sequence(cc.moveBy(2, 51, 0).easing(cc.easeInOut(easeRate)), cc.moveBy(2, -51, 0).easing(cc.easeInOut(easeRate)));
        if(dir === 'up'){
            action = cc.repeatForever(sequenceU);
        } else if (dir === 'left'){
            action = cc.repeatForever(sequenceL);
        } else if (dir === 'right'){
            action = cc.repeatForever(sequenceR);
        }
        this.scheduleOnce(()=>{
            this.node.runAction(action);
        }, delayTime);
    }
    setAni(anima){
        if(this.anima == anima) return;

        this.anima = anima;
        this.enemyAni.play(anima);
    }

    onBeginContact(contact, self, other){
        if(self.node.name == 'goomba'){
            if(other.node.name == 'player'){
                let playerCom = other.getComponent("Player")
                if(contact.getWorldManifold().normal.y>0 && contact.getWorldManifold().normal.x != 1){
                    this.EnemyIsDie = true;
                    this.scheduleOnce(()=>{
                        this.node.destroy();
                    }, 0.3)
                    
                    // product score
                    let score = cc.instantiate(this.scoreNode);
                    score.parent = this.node.parent;
                    score.setPosition(cc.v2(this.node.getPosition().x, this.node.getPosition().y));
                    let SeaseRate: number = 2;
                    let Saction = cc.spawn(cc.moveBy(1.5, 0, 70).easing(cc.easeInOut(SeaseRate)), cc.fadeOut(1.5))
                    score.runAction(Saction);
                    this.node.parent.parent.getComponent("GameMgr").playEffect("stomp")
                    this.scheduleOnce(()=>{
                        score.destroy();
                    }, 1.5)
                    playerCom.addScore(100);
                } else {
                    if(!playerCom.isDie){
                        playerCom.Hurting(1);
                        playerCom.isDie = true;
                        if(playerCom.playerLife == 0){
                            this.node.parent.parent.getComponent("GameMgr").playEffect("die")
                            this.node.parent.parent.getComponent("GameMgr").stopBGM()
                        } else {
                            this.node.parent.parent.getComponent("GameMgr").playEffect("loseOneLife")
                            this.node.parent.parent.getComponent("GameMgr").stopBGM()
                        }
                    }
                }
            }
        } else if (self.node.name == 'flower'){
                if(other.node.name == 'player'){
                    let playerCom = other.getComponent("Player")
                    if(!playerCom.isDie){
                        playerCom.Hurting(1);
                        playerCom.isDie = true;
                        if(playerCom.playerLife == 0){
                            this.node.parent.parent.getComponent("GameMgr").playEffect("die")
                            this.node.parent.parent.getComponent("GameMgr").stopBGM()
                        } else {
                            this.node.parent.parent.getComponent("GameMgr").playEffect("loseOneLife")
                            this.node.parent.parent.getComponent("GameMgr").stopBGM()
                        }
                    }
                }
        }
    }


    update (dt) {
        let anima = this.anima;
       
        if(this.node.name == 'goomba' && this.EnemyIsDie){
            anima = 'goombaDie'
        }
        
        if(anima){
            this.setAni(anima);
        }
    }
}
