const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    start () {
        this.scheduleOnce(()=>{
            cc.director.loadScene("state");
        }, 1.5);
    }
}
