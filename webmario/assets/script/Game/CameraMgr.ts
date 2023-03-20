const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    playerNode: cc.Node = null;

    update (dt) {
        if(!this.playerNode) return;

        let targetPos = this.playerNode.getPosition();
        if(targetPos.x > 0 && targetPos.x < 2240){
            let currentPos = this.node.getPosition();
            currentPos.lerp(targetPos, 0.1, currentPos);
            currentPos.y = cc.misc.clampf(targetPos.y, 0, 0);

            this.node.setPosition(currentPos);
        }
    }
}
