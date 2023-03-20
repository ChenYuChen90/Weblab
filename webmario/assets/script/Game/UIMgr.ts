const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    playerNode: cc.Node;

    @property(cc.Node)
    worldnumNode: cc.Node = null;
    @property
    worldnum:number;

    @property(cc.Node)
    playerLifeNode: cc.Node = null;
    @property
    playerLife: number;

    @property(cc.Node)
    playerTimerNode: cc.Node = null;
    @property
    playerTimer: number;

    @property(cc.Node)
    playerScoreNode: cc.Node = null;
    @property
    playerScore: number;

    @property(cc.Node)
    playerNameNode: cc.Node = null;
    @property
    playerName: string;

    protected onLoad(): void {
        if(this.node.name == 'UI_game'){
            if(!this.playerNode) return;

            let targetPos = this.playerNode.getPosition();
            if(targetPos.x > 0 && targetPos.x < 2240){
                let currentPos = this.node.getPosition();
                currentPos.lerp(targetPos, 0.1, currentPos);
                currentPos.y = cc.misc.clampf(targetPos.y, 0, 0);

                this.node.setPosition(currentPos);
            }

            this.playerLife = this.node.parent.getChildByName("player").getComponent("Player").playerLife;
            this.playerLifeNode.getComponent(cc.Label).string = this.playerLife.toString();
            
            this.playerTimer = this.node.parent.getChildByName("player").getComponent("Player").playerTimer;
            this.playerTimerNode.getComponent(cc.Label).string = this.playerTimer.toString();
            
            this.playerScore = this.node.parent.getChildByName("player").getComponent("Player").playerScore;
            this.playerScoreNode.getComponent(cc.Label).string = this.playerScore.toString();
        } else if(this.node.name == 'UI_state'){
            if(!this.playerNode) return;
            let nameFirebase:string;
            let playerLifeFirebase:number;
            let playerScoreFirebase:number;
            
            firebase.database().ref('/userlist/UID' + firebase.auth().currentUser.uid).once('value', e =>{
                nameFirebase = e.val().username;
                playerLifeFirebase = e.val().playerLife;
                playerScoreFirebase = e.val().playerScore;
            }).then(()=>{/*
                console.log("read success!");
                console.log(user, playerLifeFirebase, playerScoreFirebase);
                */
               //console.log(nameFirebase, playerLifeFirebase, playerScoreFirebase);
               this.playerNameNode.getComponent(cc.Label).string = nameFirebase;
               this.playerLifeNode.getComponent(cc.Label).string = playerLifeFirebase.toString();
               this.playerScoreNode.getComponent(cc.Label).string = playerScoreFirebase.toString();
            }).catch((e)=>{
                console.log(e)
            })
        }
    }

    update (dt) {
        if(this.node.name == 'UI_game'){
            if(!this.playerNode) return;

            let targetPos = this.playerNode.getPosition();
            if(targetPos.x > 0 && targetPos.x < 2240){
                let currentPos = this.node.getPosition();
                currentPos.lerp(targetPos, 0.1, currentPos);
                currentPos.y = cc.misc.clampf(targetPos.y, 0, 0);

                this.node.setPosition(currentPos);
            }

            this.playerLife = this.node.parent.getChildByName("player").getComponent("Player").playerLife;
            this.playerLifeNode.getComponent(cc.Label).string = this.playerLife.toString();
            
            this.playerTimer = this.node.parent.getChildByName("player").getComponent("Player").playerTimer;
            this.playerTimerNode.getComponent(cc.Label).string = this.playerTimer.toString();
            
            this.playerScore = this.node.parent.getChildByName("player").getComponent("Player").playerScore;
            this.playerScoreNode.getComponent(cc.Label).string = this.playerScore.toString();
        } else if(this.node.name == 'UI_state'){
            if(!this.playerNode) return;
            let nameFirebase:string;
            let playerLifeFirebase:number;
            let playerScoreFirebase:number;
            
            firebase.database().ref('/userlist/UID' + firebase.auth().currentUser.uid).once('value', e =>{
                nameFirebase = e.val().username;
                playerLifeFirebase = e.val().playerLife;
                playerScoreFirebase = e.val().playerScore;
            }).then(()=>{
               console.log(nameFirebase, playerLifeFirebase, playerScoreFirebase);
               this.playerNameNode.getComponent(cc.Label).string = nameFirebase;
               this.playerLifeNode.getComponent(cc.Label).string = playerLifeFirebase.toString();
               this.playerScoreNode.getComponent(cc.Label).string = playerScoreFirebase.toString();
            }).catch((e)=>{
                console.log(e)
            })
        }
    }
}
