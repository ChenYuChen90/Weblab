const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    onBeginContact(contact, self, other){
        if(other.node.name == "player") {
          if(contact.getWorldManifold().normal.y!=1 || contact.getWorldManifold().normal.x!=0){
            contact.disabled = true;
          }
        }
      }
}
