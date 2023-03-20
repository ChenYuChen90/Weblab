
const {ccclass, property} = cc._decorator;

const Input = {};
const State = {
    stand: 1,
    attack: 2,
};

@ccclass
export default class NewClass extends cc.Component {

    @property
    playerAni: cc.Animation;
    @property
    anima: string;
    
    @property
    sp: cc.Vec2;
    @property
    lv: cc.Vec2;
    @property
    speed: number;
    @property
    jumpspeed: number;
    
    @property
    playerState: number;
    
    @property
    playerName: string;
    @property
    playerEmail: string;
    @property
    playerLife: number;
    @property
    playerScore: number;
    @property
    playerTimer: number;
    
    @property
    isDie: boolean;
    @property
    isJump: boolean;
    @property
    isWin: boolean;

    


    onLoad () {
        this.speed = 100;
        this.sp = cc.v2(0, 0);
        this.isJump = false;
        this.jumpspeed = 230;
        
        this.isDie = false;
        this.isWin = false;

        let nameFirebase:string;
        let emailFirebase:string;
        let playerLifeFirebase:number;
        let playerScoreFirebase:number;
        
        firebase.database().ref('/userlist/UID' + firebase.auth().currentUser.uid).once('value', e =>{
            emailFirebase = e.val().email;
            nameFirebase = e.val().username;
            playerLifeFirebase = e.val().playerLife;
            playerScoreFirebase = e.val().playerScore;
        }).then(()=>{
            this.playerEmail = emailFirebase;
            this.playerName = nameFirebase;
            this.playerLife = playerLifeFirebase;
            this.playerScore = playerScoreFirebase;
        }).catch((e)=>{
            console.log(e)
        })

        this.playerTimer = 300;

        this.playerState = State.stand;
        this.anima = 'idle';
        this.playerAni = this.node.getComponent(cc.Animation);

        cc.systemEvent.on('keydown', this.onKeydown, this);
        cc.systemEvent.on('keyup', this.onKeyup, this);
        this.minusTimer();
        

        Input[cc.macro.KEY.up] = 0;
        Input[cc.macro.KEY.right] = 0;
        Input[cc.macro.KEY.left] = 0;
    }
    protected onDestroy(): void {
        cc.systemEvent.off('keydown', this.onKeydown, this);
        cc.systemEvent.off('keyup', this.onKeyup, this);
    }
    
    minusTimer(){
        this.schedule(()=>{
            if(this.playerTimer >= 1){
                if(!this.isDie){
                    if(!this.isWin){
                        this.playerTimer -= 1;
                    }
                }
            }
        }, 1)
    }

    addScore(add:number){
        this.playerScore += add;
        firebase.database().ref('/userlist/UID' + firebase.auth().currentUser.uid).set({
            username:this.playerName,
            uid:firebase.auth().currentUser.uid,
            email:this.playerEmail,
            playerScore:this.playerScore,
            playerLife:this.playerLife
        })
    }

    onBeginContact(contact, self, other){
        if(other.node.name == 'wall'){
            if(this.isJump){
                this.isJump = false;
            }
        }
    }

    Hurting(minus:number){
        if(this.playerLife > 0){
            this.playerLife -= minus;
            let writeLife:number;
            if(this.playerLife == 0){
                writeLife = 5
            } else {
                writeLife = this.playerLife;
            }
            firebase.database().ref('/userlist/UID' + firebase.auth().currentUser.uid).set({
                username:this.playerName,
                uid:firebase.auth().currentUser.uid,
                email:this.playerEmail,
                playerScore:this.playerScore,
                playerLife:writeLife
            })
        }
    }

    onEndContact(contact, self, other){
        if(other.node.name == 'wall'){
            if(Input[cc.macro.KEY.up]){
                this.isJump = true;
            }
        }
    }

    setAni(anima){
        if(this.anima == anima) return;

        this.anima = anima;
        this.playerAni.play(anima);
    }

    onKeydown(e){
        Input[e.keyCode] = 1;
    }

    onKeyup(e){
        Input[e.keyCode] = 0;
    }

    update (dt) {
        let anima = this.anima;
        let scaleX = Math.abs(this.node.scaleX);
        this.lv = this.node.getComponent(cc.RigidBody).linearVelocity;

        if(Input[cc.macro.KEY.left]){
            if(Input[cc.macro.KEY.up]){
                this.sp.y = 1;
                anima = 'jump';
            } else {
                this.sp.y = 0;
                anima = 'run';
            }
            this.sp.x = -1;
            this.node.scaleX = -scaleX;
        } else if(Input[cc.macro.KEY.right]){
            if(Input[cc.macro.KEY.up]){
                this.sp.y = 1;
                anima = 'jump';
            } else {
                this.sp.y = 0;
                anima = 'run';
            }
            this.sp.x = 1;
            this.node.scaleX = scaleX;
        } else {
            if(Input[cc.macro.KEY.up]){
                this.sp.y = 1;
                anima = 'jump';
            } else {
                this.sp.y = 0;
                anima = 'idle';
            }
            this.sp.x = 0;
        }

        if (this.sp.x) {
            this.lv.x = this.sp.x * this.speed;
        } else {
            this.lv.x = 0;
        }
        
        if(this.sp.y && this.lv.y == 0 && !this.isDie){
            this.lv.y = this.jumpspeed;
            this.node.parent.getComponent("GameMgr").playEffect("jump")
        }

        // die
        if(this.isDie || this.playerTimer <= 0){
            anima = 'die';
        }
        if(!this.isDie){
            this.node.getComponent(cc.RigidBody).linearVelocity = this.lv;
            if(this.node.getPosition().y < -240){
                this.isDie = true;
                this.Hurting(1);
                if(this.playerLife == 0){
                    this.node.parent.getComponent("GameMgr").playEffect("die")
                    this.node.parent.getComponent("GameMgr").stopBGM()
                } else {
                    this.node.parent.getComponent("GameMgr").playEffect("loseOneLife")
                    this.node.parent.getComponent("GameMgr").stopBGM()
                }
            } else if( this.playerTimer <= 0){
                this.isDie = true;
                this.playerLife = 0;
                this.node.parent.getComponent("GameMgr").playEffect("die")
                this.node.parent.getComponent("GameMgr").stopBGM()
                firebase.database().ref('/userlist/UID' + firebase.auth().currentUser.uid).set({
                    username:this.playerName,
                    uid:firebase.auth().currentUser.uid,
                    email:this.playerEmail,
                    playerScore:this.playerScore,
                    playerLife:5
                })
            }
        }

        // anima
        if(anima){
            this.setAni(anima);
        }

        // change scene
        if(this.isDie && this.playerLife != 0){
            this.scheduleOnce(()=>{
                if(this.node.parent.getChildByName("UI_game").getChildByName("worldnum").getComponent(cc.Label).string == "1"){
                    cc.director.loadScene("start");
                } else {
                    cc.director.loadScene("start2");
                }
            }, 3);
        }
        if(this.playerLife == 0 || this.playerTimer <= 0){
            this.scheduleOnce(()=>{
                cc.director.loadScene("over");
            }, 3);
        }
    }
}
