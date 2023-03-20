const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    start () {
        cc.audioEngine.playMusic(this.bgm, true);
        this.scheduleOnce(()=>{
            cc.director.loadScene("game2");
        }, 1.5);
    }
}
