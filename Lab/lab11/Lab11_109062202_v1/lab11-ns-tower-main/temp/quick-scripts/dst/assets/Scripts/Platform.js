
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Platform.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a3e6dBne/JI4rscTjPZ8hyF', 'Platform');
// Scripts/Platform.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Platform = /** @class */ (function (_super) {
    __extends(Platform, _super);
    function Platform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isTouched = false;
        _this.anim = null;
        _this.moveSpeed = 50;
        _this.camera = null;
        return _this;
    }
    Platform.prototype.start = function () {
        this.anim = this.getComponent(cc.Animation);
        this.camera = cc.find('Canvas/Main Camera');
        if (this.node.name == "Conveyor") {
            this.node.scaleX = (Math.random() >= 0.5) ? 1 : -1;
            this.moveSpeed *= this.node.scaleX;
        }
        else if (this.node.name == "Normal") {
            var canMove = (Math.random() > 0.8) ? true : false;
            if (canMove) {
                var moveDir = (Math.random() > 0.5) ? "v" : "h";
                var delayTime = Math.random() * 2;
                this.platformMove(moveDir, delayTime);
            }
        }
    };
    Platform.prototype.update = function (dt) {
        if (this.camera.y - this.node.y >= 190) // platform out of screen
            this.platformDestroy();
    };
    Platform.prototype.playAnim = function () {
        if (this.anim)
            this.anim.play();
    };
    Platform.prototype.platformDestroy = function () {
        this.node.destroy();
    };
    Platform.prototype.platformMove = function (moveDir, delayTime) {
        var _this = this;
        var easeRate = 2;
        // ===================== TODO =====================
        // 1. Make platform move back and forth. You should use moveDir to decide move direction.
        //    'v' for vertical, and 'h' for horizontal.
        // 2. Use action system to make platfrom move forever.
        //    For horizontal case, you should first move right 50 pixel in 2s and then move back to initial position in 2s
        //    For vertical case, you should first move up 50 pixel in 2s and then move back to initial position in 2s
        //    You need to use "easeInOut" to modify your action with "easeRate" as parameter.
        // 3. Use scheduleOnce with delayTime to run this action. 
        // ================================================
        var action;
        var sequence1 = cc.sequence(cc.moveBy(2, 50, 0).easing(cc.easeInOut(easeRate)), cc.moveBy(2, -50, 0).easing(cc.easeInOut(easeRate)));
        var sequence2 = cc.sequence(cc.moveBy(2, 0, 50).easing(cc.easeInOut(easeRate)), cc.moveBy(2, 0, -50).easing(cc.easeInOut(easeRate)));
        if (moveDir === 'v') {
            action = cc.repeatForever(sequence1);
        }
        else if (moveDir == 'h') {
            action = cc.repeatForever(sequence2);
        }
        this.scheduleOnce(function () {
            _this.node.runAction(action);
        }, delayTime);
    };
    // ===================== TODO =====================
    // 1. In the physics lecture, we know that Cocos Creator
    //    provides four contact callbacks. You need to use callbacks to
    //    design different behaviors for different platforms.
    //
    //    Hints: The callbacks are "onBeginContact", "onEndContact", "onPreSolve", "onPostSolve".
    //
    // 2. There are two different types of platforms: "Normal" & Conveyor".
    //    For "Conveyor", you have to do "delivery effect" when player is in contact with it.
    //    Note that the platforms have "delivery effect" only when player stands on them. 
    //
    //    Hints: Change "linearVelocity" of the player's rigidbody to make him move.
    //    The move value is "moveSpeed".
    //
    // 3. All the platforms have only "upside" collision. You have to prevent the collisions from the other directions.
    //
    //    Hints: You can use "contact.getWorldManifold().normal" to judge collision direction.
    //
    // ================================================
    Platform.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.name == "player") {
            if (contact.getWorldManifold().normal.y != 1 || contact.getWorldManifold().normal.x != 0) {
                contact.disabled = true;
            }
        }
    };
    Platform.prototype.onEndContact = function (contact, self, other) {
        if (self.node.name == "Conveyor") {
            other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, other.getComponent(cc.RigidBody).linearVelocity.y);
        }
    };
    Platform.prototype.onPreSolve = function (contact, self, other) {
        if (self.node.name == "Conveyor") {
            other.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.moveSpeed, other.getComponent(cc.RigidBody).linearVelocity.y);
        }
    };
    Platform = __decorate([
        ccclass
    ], Platform);
    return Platform;
}(cc.Component));
exports.default = Platform;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGxhdGZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBaUhDO1FBL0dhLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFFN0IsVUFBSSxHQUFpQixJQUFJLENBQUM7UUFFMUIsZUFBUyxHQUFXLEVBQUUsQ0FBQztRQUV2QixZQUFNLEdBQVksSUFBSSxDQUFDOztJQXlHbkMsQ0FBQztJQXZHRyx3QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUU1QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFVBQVUsRUFBRTtZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3RDO2FBQ0ksSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxRQUFRLEVBQ2xDO1lBQ0ksSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ25ELElBQUcsT0FBTyxFQUNWO2dCQUNJLElBQUksT0FBTyxH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QUM7Q0FqSEQsQUFpSEMsQ0FqSHFDLEVBQUUsQ0FBQyxTQUFTLEdBaUhqRDtrQkFqSG9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxhdGZvcm0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHByb3RlY3RlZCBpc1RvdWNoZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIGFuaW06IGNjLkFuaW1hdGlvbiA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBtb3ZlU3BlZWQ6IG51bWJlciA9IDUwO1xyXG5cclxuICAgIHByaXZhdGUgY2FtZXJhOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmFuaW0gPSB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG5cclxuICAgICAgICB0aGlzLmNhbWVyYSA9IGNjLmZpbmQoJ0NhbnZhcy9NYWluIENhbWVyYScpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5ub2RlLm5hbWUgPT0gXCJDb252ZXlvclwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAoTWF0aC5yYW5kb20oKSA+PSAwLjUpID8gMSA6IC0xO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVTcGVlZCAqPSB0aGlzLm5vZGUuc2NhbGVYO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMubm9kZS5uYW1lID09IFwiTm9ybWFsXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgY2FuTW92ZSA9IChNYXRoLnJhbmRvbSgpID4gMC44KSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAgICAgaWYoY2FuTW92ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vdmVEaXIgPSAoTWF0aC5yYW5kb20oKSA+IDAuNSkgPyBcInZcIiA6IFwiaFwiO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRlbGF5VGltZSA9IE1hdGgucmFuZG9tKCkgKiAyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF0Zm9ybU1vdmUobW92ZURpciwgZGVsYXlUaW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpXHJcbiAgICB7ICAgXHJcbiAgICAgICAgaWYodGhpcy5jYW1lcmEueSAtIHRoaXMubm9kZS55ID49IDE5MCkgLy8gcGxhdGZvcm0gb3V0IG9mIHNjcmVlblxyXG4gICAgICAgICAgICB0aGlzLnBsYXRmb3JtRGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlBbmltKCkge1xyXG4gICAgICAgIGlmKHRoaXMuYW5pbSlcclxuICAgICAgICAgICAgdGhpcy5hbmltLnBsYXkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwbGF0Zm9ybURlc3Ryb3koKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxhdGZvcm1Nb3ZlKG1vdmVEaXI6IHN0cmluZywgZGVsYXlUaW1lOiBudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGVhc2VSYXRlOiBudW1iZXIgPSAyO1xyXG4gICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PSBUT0RPID09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgIC8vIDEuIE1ha2UgcGxhdGZvcm0gbW92ZSBiYWNrIGFuZCBmb3J0aC4gWW91IHNob3VsZCB1c2UgbW92ZURpciB0byBkZWNpZGUgbW92ZSBkaXJlY3Rpb24uXHJcbiAgICAgICAgLy8gICAgJ3YnIGZvciB2ZXJ0aWNhbCwgYW5kICdoJyBmb3IgaG9yaXpvbnRhbC5cclxuICAgICAgICAvLyAyLiBVc2UgYWN0aW9uIHN5c3RlbSB0byBtYWtlIHBsYXRmcm9tIG1vdmUgZm9yZXZlci5cclxuICAgICAgICAvLyAgICBGb3IgaG9yaXpvbnRhbCBjYXNlLCB5b3Ugc2hvdWxkIGZpcnN0IG1vdmUgcmlnaHQgNTAgcGl4ZWwgaW4gMnMgYW5kIHRoZW4gbW92ZSBiYWNrIHRvIGluaXRpYWwgcG9zaXRpb24gaW4gMnNcclxuICAgICAgICAvLyAgICBGb3IgdmVydGljYWwgY2FzZSwgeW91IHNob3VsZCBmaXJzdCBtb3ZlIHVwIDUwIHBpeGVsIGluIDJzIGFuZCB0aGVuIG1vdmUgYmFjayB0byBpbml0aWFsIHBvc2l0aW9uIGluIDJzXHJcbiAgICAgICAgLy8gICAgWW91IG5lZWQgdG8gdXNlIFwiZWFzZUluT3V0XCIgdG8gbW9kaWZ5IHlvdXIgYWN0aW9uIHdpdGggXCJlYXNlUmF0ZVwiIGFzIHBhcmFtZXRlci5cclxuICAgICAgICAvLyAzLiBVc2Ugc2NoZWR1bGVPbmNlIHdpdGggZGVsYXlUaW1lIHRvIHJ1biB0aGlzIGFjdGlvbi4gXHJcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGFjdGlvbjogY2MuQWN0aW9uO1xyXG4gICAgICAgIGxldCBzZXF1ZW5jZTEgPSBjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMiwgNTAsIDApLmVhc2luZyhjYy5lYXNlSW5PdXQoZWFzZVJhdGUpKSwgY2MubW92ZUJ5KDIsIC01MCwgMCkuZWFzaW5nKGNjLmVhc2VJbk91dChlYXNlUmF0ZSkpKTtcclxuICAgICAgICBsZXQgc2VxdWVuY2UyID0gY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDIsIDAsIDUwKS5lYXNpbmcoY2MuZWFzZUluT3V0KGVhc2VSYXRlKSksIGNjLm1vdmVCeSgyLCAwLCAtNTApLmVhc2luZyhjYy5lYXNlSW5PdXQoZWFzZVJhdGUpKSk7XHJcbiAgICAgICAgaWYobW92ZURpciA9PT0gJ3YnKXtcclxuICAgICAgICAgICAgYWN0aW9uID0gY2MucmVwZWF0Rm9yZXZlcihzZXF1ZW5jZTEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobW92ZURpciA9PSAnaCcpe1xyXG4gICAgICAgICAgICBhY3Rpb24gPSBjYy5yZXBlYXRGb3JldmVyKHNlcXVlbmNlMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICB9LCBkZWxheVRpbWUpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT0gVE9ETyA9PT09PT09PT09PT09PT09PT09PT1cclxuICAvLyAxLiBJbiB0aGUgcGh5c2ljcyBsZWN0dXJlLCB3ZSBrbm93IHRoYXQgQ29jb3MgQ3JlYXRvclxyXG4gIC8vICAgIHByb3ZpZGVzIGZvdXIgY29udGFjdCBjYWxsYmFja3MuIFlvdSBuZWVkIHRvIHVzZSBjYWxsYmFja3MgdG9cclxuICAvLyAgICBkZXNpZ24gZGlmZmVyZW50IGJlaGF2aW9ycyBmb3IgZGlmZmVyZW50IHBsYXRmb3Jtcy5cclxuICAvL1xyXG4gIC8vICAgIEhpbnRzOiBUaGUgY2FsbGJhY2tzIGFyZSBcIm9uQmVnaW5Db250YWN0XCIsIFwib25FbmRDb250YWN0XCIsIFwib25QcmVTb2x2ZVwiLCBcIm9uUG9zdFNvbHZlXCIuXHJcbiAgLy9cclxuICAvLyAyLiBUaGVyZSBhcmUgdHdvIGRpZmZlcmVudCB0eXBlcyBvZiBwbGF0Zm9ybXM6IFwiTm9ybWFsXCIgJiBDb252ZXlvclwiLlxyXG4gIC8vICAgIEZvciBcIkNvbnZleW9yXCIsIHlvdSBoYXZlIHRvIGRvIFwiZGVsaXZlcnkgZWZmZWN0XCIgd2hlbiBwbGF5ZXIgaXMgaW4gY29udGFjdCB3aXRoIGl0LlxyXG4gIC8vICAgIE5vdGUgdGhhdCB0aGUgcGxhdGZvcm1zIGhhdmUgXCJkZWxpdmVyeSBlZmZlY3RcIiBvbmx5IHdoZW4gcGxheWVyIHN0YW5kcyBvbiB0aGVtLiBcclxuICAvL1xyXG4gIC8vICAgIEhpbnRzOiBDaGFuZ2UgXCJsaW5lYXJWZWxvY2l0eVwiIG9mIHRoZSBwbGF5ZXIncyByaWdpZGJvZHkgdG8gbWFrZSBoaW0gbW92ZS5cclxuICAvLyAgICBUaGUgbW92ZSB2YWx1ZSBpcyBcIm1vdmVTcGVlZFwiLlxyXG4gIC8vXHJcbiAgLy8gMy4gQWxsIHRoZSBwbGF0Zm9ybXMgaGF2ZSBvbmx5IFwidXBzaWRlXCIgY29sbGlzaW9uLiBZb3UgaGF2ZSB0byBwcmV2ZW50IHRoZSBjb2xsaXNpb25zIGZyb20gdGhlIG90aGVyIGRpcmVjdGlvbnMuXHJcbiAgLy9cclxuICAvLyAgICBIaW50czogWW91IGNhbiB1c2UgXCJjb250YWN0LmdldFdvcmxkTWFuaWZvbGQoKS5ub3JtYWxcIiB0byBqdWRnZSBjb2xsaXNpb24gZGlyZWN0aW9uLlxyXG4gIC8vXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgb25CZWdpbkNvbnRhY3QoY29udGFjdCwgc2VsZiwgb3RoZXIpe1xyXG4gICAgaWYob3RoZXIubm9kZS5uYW1lID09IFwicGxheWVyXCIpIHtcclxuICAgICAgICBcclxuICAgICAgaWYoY29udGFjdC5nZXRXb3JsZE1hbmlmb2xkKCkubm9ybWFsLnkhPTEgfHwgY29udGFjdC5nZXRXb3JsZE1hbmlmb2xkKCkubm9ybWFsLnghPTApe1xyXG4gICAgICAgIGNvbnRhY3QuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkVuZENvbnRhY3QoY29udGFjdCwgc2VsZiwgb3RoZXIpIHtcclxuICAgIGlmKHNlbGYubm9kZS5uYW1lID09IFwiQ29udmV5b3JcIikge1xyXG4gICAgICAgIG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSkubGluZWFyVmVsb2NpdHkgPSBjYy52MigwLCBvdGhlci5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KS5saW5lYXJWZWxvY2l0eS55KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uUHJlU29sdmUoY29udGFjdCwgc2VsZiwgb3RoZXIpIHtcclxuICAgIGlmKHNlbGYubm9kZS5uYW1lID09IFwiQ29udmV5b3JcIikge1xyXG4gICAgICAgIG90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSkubGluZWFyVmVsb2NpdHkgPSBjYy52Mih0aGlzLm1vdmVTcGVlZCwgb3RoZXIuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSkubGluZWFyVmVsb2NpdHkueSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19