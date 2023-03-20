const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    EmailNode: cc.Node;
    @property(cc.Node)
    PasswordNode: cc.Node;

    @property
    email: string;
    @property
    password: string;

    LogEnter(){
        console.log(this.email, this.password)
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        cc.director.loadScene("state");
    }
    
    update (dt) {
        this.email = this.EmailNode.getComponent(cc.Label).string;
        this.password = this.PasswordNode.getComponent(cc.Label).string;
    }
    
}
