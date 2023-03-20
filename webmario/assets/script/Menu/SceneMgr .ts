const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    GoSignup(){
        cc.director.loadScene("Signup");
    }
    GoLogin(){
        cc.director.loadScene("Login");
    }
    GoGame1(){
        cc.director.loadScene("start");
        
    }
    GoGame2(){
        cc.director.loadScene("start2");
    }

    GoMenu(){
        cc.director.loadScene("menu");
    }

}
