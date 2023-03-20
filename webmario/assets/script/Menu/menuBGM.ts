const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;
    start(){
        this.playBGM();
    }
    playBGM(){
        cc.audioEngine.playMusic(this.bgm, true);
    }
}
