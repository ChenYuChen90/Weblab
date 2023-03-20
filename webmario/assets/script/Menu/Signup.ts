const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    EmailNode: cc.Node;
    @property(cc.Node)
    UserNameNode: cc.Node;
    @property(cc.Node)
    PasswordNode: cc.Node;

    @property
    email: string;
    @property
    name: string;
    @property
    password: string;

    
    SignEnter(){
        //console.log(this.email, this.name, this.password);
        let name = this.name;
        let email = this.email;

        firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(()=>{
                //console.log("sign up success!")
                    firebase.database().ref('/userlist/UID' + firebase.auth().currentUser.uid).set({
                        username:name,
                        uid:firebase.auth().currentUser.uid,
                        email:email,
                        playerScore:0,
                        playerLife:5
                    })
            })
        cc.director.loadScene("state");
    }
    
    update (dt) {
        this.email = this.EmailNode.getComponent(cc.Label).string;
        this.name = this.UserNameNode.getComponent(cc.Label).string;
        this.password = this.PasswordNode.getComponent(cc.Label).string;
    }
    
}
