"use strict";
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