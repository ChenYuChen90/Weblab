
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3cd2fFlgBpPIYNN/GI2S42+', 'Player');
// Scripts/Player.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playerSpeed = 300;
        _this.dieSound = null;
        _this.gameMgr = null;
        _this.jumpFrame = null;
        _this.fallDown = false;
        _this.anim = null;
        _this.moveDir = 1;
        _this.rebornPos = cc.v2(0, -146);
        _this.rb = null;
        return _this;
    }
    Player.prototype.start = function () {
        this.anim = this.getComponent(cc.Animation);
        this.rb = this.getComponent(cc.RigidBody);
    };
    Player.prototype.update = function (dt) {
        this.node.x += this.playerSpeed * this.moveDir * dt;
        this.node.scaleX = (this.moveDir >= 0) ? 1 : -1;
        // raycast: check whether the player is standing on the platform?
        var point1 = this.node.position;
        point1.addSelf(cc.v2(12, 2));
        point1 = this.node.parent.convertToWorldSpaceAR(point1);
        var point2 = this.node.position;
        point2.addSelf(cc.v2(-12, 2));
        point2 = this.node.parent.convertToWorldSpaceAR(point2);
        var isHit = this.raycastTest(point1, cc.v2(0, -5)) || this.raycastTest(point2, cc.v2(0, -5));
        // if(isHit){
        //     if(this.fallDown){
        //         this.gameMgr.getComponent("GameMgr").updateEnergyBar(0);
        //         this.fallDown = false;
        //     }
        // }else{
        //     this.fallDown = true;
        // }
        this.fallDown = !isHit;
        this.playerAnimation();
    };
    Player.prototype.raycastTest = function (start, direction) {
        var result = this.gameMgr.getComponent("GameMgr").physicManager.rayCast(start, start.add(direction), cc.RayCastType.AllClosest);
        for (var i = 0; i < result.length; i++) {
            var colliderName = result[i].collider.node.name;
            if (colliderName != this.node.name) {
                return true;
            }
        }
        return false;
    };
    Player.prototype.reborn = function () {
        this.node.position = this.rebornPos;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2();
    };
    Player.prototype.playerJump = function (velocity) {
        if (!this.fallDown)
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, velocity);
    };
    Player.prototype.playerDie = function () {
        cc.audioEngine.playEffect(this.dieSound, false);
    };
    Player.prototype.playerAnimation = function () {
        if (this.fallDown) {
            this.anim.stop();
            this.node.getChildByName('effect').active = false;
            this.getComponent(cc.Sprite).spriteFrame = this.jumpFrame;
        }
        else {
            if (this.gameMgr.getComponent("GameMgr").gathering) {
                if (!this.anim.getAnimationState('gather').isPlaying) {
                    this.node.getChildByName('effect').active = true;
                    this.anim.play('gather');
                }
            }
            else {
                if (!this.anim.getAnimationState('walk').isPlaying) {
                    if (!this.anim.getAnimationState('gather').isPlaying) {
                        this.gameMgr.getComponent("GameMgr").updateEnergyBar(0);
                    }
                    this.node.getChildByName('effect').active = false;
                    this.anim.play('walk');
                }
            }
        }
    };
    Player.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        if (otherCollider.node.name == "wall") {
            this.moveDir *= -1;
        }
    };
    __decorate([
        property()
    ], Player.prototype, "playerSpeed", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Player.prototype, "dieSound", void 0);
    __decorate([
        property(cc.Node)
    ], Player.prototype, "gameMgr", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Player.prototype, "jumpFrame", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.default = Player;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFvQywwQkFBWTtJQUFoRDtRQUFBLHFFQThIQztRQTNIRyxpQkFBVyxHQUFXLEdBQUcsQ0FBQztRQUcxQixjQUFRLEdBQWlCLElBQUksQ0FBQztRQUc5QixhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLGVBQVMsR0FBbUIsSUFBSSxDQUFDO1FBRWpDLGNBQVEsR0FBWSxLQUFLLENBQUM7UUFFbEIsVUFBSSxHQUFpQixJQUFJLENBQUM7UUFFMUIsYUFBTyxHQUFHLENBQUMsQ0FBQztRQUVaLGVBQVMsR0FBWSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXBDLFFBQUUsR0FBaUIsSUFBSSxDQUFDOztJQXdHcEMsQ0FBQztJQXJHRyxzQkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCx1QkFBTSxHQUFOLFVBQU8sRUFBRTtRQUVMLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhELGlFQUFpRTtRQUNqRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdGLGFBQWE7UUFDYix5QkFBeUI7UUFDekIsbUVBQW1FO1FBQ25FLGlDQUFpQztRQUNqQyxRQUFRO1FBQ1IsU0FBUztRQUNULDRCQUE0QjtRQUM1QixJQUFJO1FBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUV2QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELDRCQUFXLEdBQVgsVUFBWSxLQUFjLEVBQUUsU0FBa0I7UUFDMUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hJLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUNyQztZQUNJLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRCxJQUFHLFlBQVksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFDakM7Z0JBQ0ksT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELHVCQUFNLEdBQU47UUFFSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDN0QsQ0FBQztJQUVELDJCQUFVLEdBQVYsVUFBVyxRQUFnQjtRQUV2QixJQUFHLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRCwwQkFBUyxHQUFUO1FBRUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsZ0NBQWUsR0FBZjtRQUVJLElBQUcsSUFBSSxDQUFDLFFBQVEsRUFDaEI7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDN0Q7YUFFRDtZQUNJLElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxFQUNqRDtnQkFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLEVBQ25EO29CQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUM1QjthQUNKO2lCQUVEO2dCQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsRUFDakQ7b0JBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxFQUFDO3dCQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQzNEO29CQUVELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7b0JBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUMxQjthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQsK0JBQWMsR0FBZCxVQUFlLE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYTtRQUUvQyxJQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFDcEM7WUFDSSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQTFIRDtRQURDLFFBQVEsRUFBRTsrQ0FDZTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsU0FBUyxFQUFDLENBQUM7NENBQ0E7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyQ0FDTTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzZDQUNRO0lBWmhCLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0E4SDFCO0lBQUQsYUFBQztDQTlIRCxBQThIQyxDQTlIbUMsRUFBRSxDQUFDLFNBQVMsR0E4SC9DO2tCQTlIb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lTWdyIGZyb20gXCIuL0dhbWVNZ3JcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IFxyXG57XHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgcGxheWVyU3BlZWQ6IG51bWJlciA9IDMwMDtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuQXVkaW9DbGlwfSlcclxuICAgIGRpZVNvdW5kOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZ2FtZU1ncjogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAganVtcEZyYW1lOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XHJcblxyXG4gICAgZmFsbERvd246IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIGFuaW06IGNjLkFuaW1hdGlvbiA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBtb3ZlRGlyID0gMTtcclxuXHJcbiAgICBwcml2YXRlIHJlYm9yblBvczogY2MuVmVjMiA9IGNjLnYyKDAsIC0xNDYpO1xyXG5cclxuICAgIHByaXZhdGUgcmI6IGNjLlJpZ2lkQm9keSA9IG51bGw7XHJcblxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICB0aGlzLmFuaW0gPSB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgIHRoaXMucmIgPSB0aGlzLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5vZGUueCArPSB0aGlzLnBsYXllclNwZWVkICogdGhpcy5tb3ZlRGlyICogZHQ7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9ICh0aGlzLm1vdmVEaXIgPj0gMCkgPyAxIDogLTE7XHJcblxyXG4gICAgICAgIC8vIHJheWNhc3Q6IGNoZWNrIHdoZXRoZXIgdGhlIHBsYXllciBpcyBzdGFuZGluZyBvbiB0aGUgcGxhdGZvcm0/XHJcbiAgICAgICAgbGV0IHBvaW50MSA9IHRoaXMubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICBwb2ludDEuYWRkU2VsZihjYy52MigxMiwgMikpO1xyXG4gICAgICAgIHBvaW50MSA9IHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHBvaW50MSk7XHJcbiAgICAgICAgbGV0IHBvaW50MiA9IHRoaXMubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICBwb2ludDIuYWRkU2VsZihjYy52MigtMTIsIDIpKTtcclxuICAgICAgICBwb2ludDIgPSB0aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwb2ludDIpO1xyXG4gICAgICAgIGxldCBpc0hpdCA9IHRoaXMucmF5Y2FzdFRlc3QocG9pbnQxLCBjYy52MigwLCAtNSkpIHx8IHRoaXMucmF5Y2FzdFRlc3QocG9pbnQyLCBjYy52MigwLCAtNSkpO1xyXG4gICAgICAgIC8vIGlmKGlzSGl0KXtcclxuICAgICAgICAvLyAgICAgaWYodGhpcy5mYWxsRG93bil7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmdhbWVNZ3IuZ2V0Q29tcG9uZW50KFwiR2FtZU1nclwiKS51cGRhdGVFbmVyZ3lCYXIoMCk7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmZhbGxEb3duID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgdGhpcy5mYWxsRG93biA9IHRydWU7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuZmFsbERvd24gPSAhaXNIaXQ7XHJcblxyXG4gICAgICAgIHRoaXMucGxheWVyQW5pbWF0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmF5Y2FzdFRlc3Qoc3RhcnQ6IGNjLlZlYzIsIGRpcmVjdGlvbjogY2MuVmVjMil7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuZ2FtZU1nci5nZXRDb21wb25lbnQoXCJHYW1lTWdyXCIpLnBoeXNpY01hbmFnZXIucmF5Q2FzdChzdGFydCwgc3RhcnQuYWRkKGRpcmVjdGlvbiksIGNjLlJheUNhc3RUeXBlLkFsbENsb3Nlc3QpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgY29sbGlkZXJOYW1lID0gcmVzdWx0W2ldLmNvbGxpZGVyLm5vZGUubmFtZTtcclxuICAgICAgICAgICAgaWYoY29sbGlkZXJOYW1lICE9IHRoaXMubm9kZS5uYW1lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmVib3JuKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5vZGUucG9zaXRpb24gPSB0aGlzLnJlYm9yblBvcztcclxuICAgICAgICB0aGlzLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpLmxpbmVhclZlbG9jaXR5ID0gY2MudjIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5ZXJKdW1wKHZlbG9jaXR5OiBudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuZmFsbERvd24pXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKDAsIHZlbG9jaXR5KTtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5ZXJEaWUoKVxyXG4gICAge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5kaWVTb3VuZCxmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheWVyQW5pbWF0aW9uKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmZhbGxEb3duKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltLnN0b3AoKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdlZmZlY3QnKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuanVtcEZyYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLmdhbWVNZ3IuZ2V0Q29tcG9uZW50KFwiR2FtZU1nclwiKS5nYXRoZXJpbmcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmFuaW0uZ2V0QW5pbWF0aW9uU3RhdGUoJ2dhdGhlcicpLmlzUGxheWluZylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2VmZmVjdCcpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltLnBsYXkoJ2dhdGhlcicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuYW5pbS5nZXRBbmltYXRpb25TdGF0ZSgnd2FsaycpLmlzUGxheWluZylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5hbmltLmdldEFuaW1hdGlvblN0YXRlKCdnYXRoZXInKS5pc1BsYXlpbmcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVNZ3IuZ2V0Q29tcG9uZW50KFwiR2FtZU1nclwiKS51cGRhdGVFbmVyZ3lCYXIoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2VmZmVjdCcpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbS5wbGF5KCd3YWxrJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25CZWdpbkNvbnRhY3QoY29udGFjdCwgc2VsZkNvbGxpZGVyLCBvdGhlckNvbGxpZGVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKG90aGVyQ29sbGlkZXIubm9kZS5uYW1lID09IFwid2FsbFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlRGlyICo9IC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=