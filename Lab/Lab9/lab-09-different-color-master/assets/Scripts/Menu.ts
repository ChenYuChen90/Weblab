const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component {
    
    // ===================== TODO =====================
    // 1. Add dynamic click event to StartButton to call this
    //    function
    loadGameScene(){
        cc.director.loadScene("game");
    }
    start () {
        let startbtn = new cc.Component.EventHandler();
        startbtn.target = this.node;
        startbtn.component = "Menu";
        startbtn.handler = "loadGameScene"

        cc.find("Canvas/UI/StartButton").getComponent(cc.Button).clickEvents.push(startbtn);
    }
    // ================================================
}
