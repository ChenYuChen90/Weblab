
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/GameMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9eafa6oJfhL2YaT2IrMk8jP', 'GameMgr');
// Scripts/GameMgr.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("./Player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameMgr = /** @class */ (function (_super) {
    __extends(GameMgr, _super);
    function GameMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.noDieMode = false;
        _this.background = null;
        _this.wall = null;
        _this.player = null;
        _this.platforms = null;
        _this.platformPrefabs = [];
        _this.startIcon = null;
        _this.pauseIcon = null;
        _this.scoreNode = null;
        _this.highestScoreNode = null;
        _this.energyBar = null;
        _this.camera = null;
        _this.bgm = null;
        _this.debugCollider = null;
        _this.gathering = false;
        _this.energyValue = 0;
        _this.backgroundSize = 256;
        _this.wallSize = 384;
        _this.physicManager = null;
        _this.score = 0;
        _this.highestScore = 0;
        _this.pause = false;
        _this.inGame = false;
        _this.scoreInterval = 280;
        _this.nextTarget = 0;
        _this.posArr = [1, 3, 0, 2];
        _this.posIdx = 0;
        _this.mouseDown = false;
        return _this;
    }
    GameMgr.prototype.onLoad = function () {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, -200);
    };
    GameMgr.prototype.start = function () {
        var _this = this;
        this.debugCollider = this.node.getChildByName("DebugCollider");
        this.debugCollider.active = this.noDieMode;
        this.updateHighestScore(0);
        this.gatherEnergy = function () {
            var newValue = (_this.energyValue + 1) % 13;
            _this.updateEnergyBar(newValue);
        };
        this.node.on('mousedown', function (event) {
            if (event.getButton() == 0 && this.inGame) {
                this.mouseDown = true;
            }
        }, this);
        this.node.on('mouseup', function (event) {
            if (event.getButton() == 0 && this.inGame) {
                this.mouseDown = false;
                if (this.gathering) {
                    this.gathering = false;
                    // ===================== TODO =====================
                    // 1. When user releases mouse, you should unschedule "gatherEnergy" function.
                    // 2. Call the "playerJump" function in Player.ts with "this.energyValue * 50" as parameter.
                    // ================================================
                    this.unschedule(this.gatherEnergy);
                    this.player.playerJump(this.energyValue * 50);
                }
            }
        }, this);
        this.generatePlatforms(500);
    };
    GameMgr.prototype.update = function (dt) {
        if (this.player.fallDown) {
            this.gathering = false;
            // ===================== TODO =====================
            // 1. When player falls down,  you should unschedule "gatherEnergy" function.
            // ================================================
            this.unschedule(this.gatherEnergy);
        }
        else {
            if (this.mouseDown && !this.gathering) {
                this.gathering = true;
                // ===================== TODO =====================
                // 1. When user presses mouse,  you should call "gatherEnergy" function every 0.05s.
                // ================================================
                this.schedule(this.gatherEnergy, 0.05);
            }
        }
        if (this.camera.y - this.wall.y >= this.wallSize)
            this.wall.y += this.wallSize;
        if (this.camera.y - this.background.y >= this.backgroundSize)
            this.background.y += this.backgroundSize;
        if (this.inGame) {
            if (this.player.node.y - this.camera.y > 100)
                this.camera.y = this.player.node.y - 100;
            if (this.camera.y - 200 > this.player.node.y) {
                if (this.player.node.active) {
                    this.player.playerDie();
                    this.gameOver();
                }
            }
            if (this.player.node.y >= this.nextTarget) {
                this.updateScore(this.score + 1);
                this.nextTarget += this.scoreInterval;
            }
        }
        else {
            this.camera.y += 1;
        }
        this.debugCollider.y = 22;
    };
    GameMgr.prototype.randomChoosePlatform = function () {
        var rand = Math.random();
        //0: normal, 1: conveyor
        var prob = [8, 1];
        var sum = prob.reduce(function (a, b) { return a + b; });
        for (var i = 1; i < prob.length; i++)
            prob[i] += prob[i - 1];
        for (var i = 0; i < prob.length; i++) {
            prob[i] /= sum;
            if (rand <= prob[i])
                return i;
        }
    };
    GameMgr.prototype.generatePlatforms = function (num) {
        this.platforms.removeAllChildren();
        for (var i = 0; i < num; i++) {
            var randIdx = this.randomChoosePlatform();
            var platform = cc.instantiate(this.platformPrefabs[randIdx]);
            platform.parent = this.platforms;
            platform.position = cc.v2(-132 + Math.floor(Math.random() * 29) - 14 + 88 * this.posArr[this.posIdx], -105 + 40 * i);
            this.posIdx = (this.posIdx + 1) % 4;
        }
    };
    GameMgr.prototype.updateEnergyBar = function (value) {
        this.energyValue = value;
        this.energyBar.width = this.energyValue * 8;
    };
    GameMgr.prototype.updateHighestScore = function (score) {
        this.highestScore = score;
        this.highestScoreNode.getComponent(cc.Label).string = (Array(4).join("0") + this.highestScore.toString()).slice(-4);
    };
    GameMgr.prototype.updateScore = function (score) {
        this.score = score;
        this.scoreNode.getComponent(cc.Label).string = (Array(4).join("0") + this.score.toString()).slice(-4);
    };
    GameMgr.prototype.gameStart = function () {
        this.startIcon.active = false;
        this.generatePlatforms(500);
        this.inGame = true;
        this.background.position = cc.v2();
        this.wall.position = cc.v2();
        this.camera.position = cc.v2();
        if (this.score > this.highestScore)
            this.updateHighestScore(this.score);
        this.updateScore(1);
        this.player.node.active = true;
        this.player.reborn();
        this.nextTarget = this.player.node.y + this.scoreInterval * this.score;
        cc.audioEngine.playMusic(this.bgm, true);
    };
    GameMgr.prototype.gamePause = function () {
        if (this.pause)
            this.pause = false;
        else
            this.pause = true;
        if (this.pause) {
            this.pauseIcon.active = true;
            this.scheduleOnce(function () {
                cc.game.pause();
            }, 0.1);
        }
        else {
            this.pauseIcon.active = false;
            cc.game.resume();
        }
    };
    GameMgr.prototype.gameOver = function () {
        this.startIcon.active = true;
        this.player.node.active = false;
        this.inGame = false;
        this.unschedule(this.gatherEnergy);
        this.updateEnergyBar(0);
        this.gathering = false;
        cc.audioEngine.stopMusic();
    };
    GameMgr.prototype.gameEnd = function () {
        cc.game.end();
    };
    __decorate([
        property()
    ], GameMgr.prototype, "noDieMode", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "background", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "wall", void 0);
    __decorate([
        property(Player_1.default)
    ], GameMgr.prototype, "player", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "platforms", void 0);
    __decorate([
        property([cc.Prefab])
    ], GameMgr.prototype, "platformPrefabs", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "startIcon", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "pauseIcon", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "scoreNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "highestScoreNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "energyBar", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "camera", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], GameMgr.prototype, "bgm", void 0);
    GameMgr = __decorate([
        ccclass
    ], GameMgr);
    return GameMgr;
}(cc.Component));
exports.default = GameMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZU1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQThCO0FBRXhCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFZO0lBQWpEO1FBQUEscUVBcVJDO1FBbFJHLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFHM0IsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsVUFBSSxHQUFZLElBQUksQ0FBQztRQUdyQixZQUFNLEdBQVcsSUFBSSxDQUFDO1FBR3RCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIscUJBQWUsR0FBZ0IsRUFBRSxDQUFDO1FBR2xDLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLHNCQUFnQixHQUFZLElBQUksQ0FBQztRQUdqQyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFHdkIsU0FBRyxHQUFpQixJQUFJLENBQUM7UUFFekIsbUJBQWEsR0FBWSxJQUFJLENBQUM7UUFFOUIsZUFBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixpQkFBVyxHQUFXLENBQUMsQ0FBQztRQUVoQixvQkFBYyxHQUFHLEdBQUcsQ0FBQztRQUVyQixjQUFRLEdBQUcsR0FBRyxDQUFDO1FBRWYsbUJBQWEsR0FBc0IsSUFBSSxDQUFDO1FBRXhDLFdBQUssR0FBVyxDQUFDLENBQUM7UUFFbEIsa0JBQVksR0FBVyxDQUFDLENBQUM7UUFFekIsV0FBSyxHQUFZLEtBQUssQ0FBQztRQUl2QixZQUFNLEdBQVksS0FBSyxDQUFDO1FBRXhCLG1CQUFhLEdBQVcsR0FBRyxDQUFDO1FBRTVCLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLFlBQU0sR0FBYSxDQUFDLENBQUMs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SUFBSSxDQUFDOytDQUNTO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eUNBQ0c7SUFHckI7UUFEQyxRQUFRLENBQUMsZ0JBQU0sQ0FBQzsyQ0FDSztJQUd0QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29EQUNZO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDUTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ2U7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDUTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzJDQUNLO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUMsQ0FBQzt3Q0FDTDtJQXZDUixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBcVIzQjtJQUFELGNBQUM7Q0FyUkQsQUFxUkMsQ0FyUm9DLEVBQUUsQ0FBQyxTQUFTLEdBcVJoRDtrQkFyUm9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWdyIGV4dGVuZHMgY2MuQ29tcG9uZW50IFxyXG57XHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgbm9EaWVNb2RlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYmFja2dyb3VuZDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB3YWxsOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoUGxheWVyKVxyXG4gICAgcGxheWVyOiBQbGF5ZXIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcGxhdGZvcm1zOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLlByZWZhYl0pXHJcbiAgICBwbGF0Zm9ybVByZWZhYnM6IGNjLlByZWZhYltdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBzdGFydEljb246IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcGF1c2VJY29uOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHNjb3JlTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBoaWdoZXN0U2NvcmVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGVuZXJneUJhcjogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjYW1lcmE6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5BdWRpb0NsaXB9KVxyXG4gICAgYmdtOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG5cclxuICAgIGRlYnVnQ29sbGlkZXI6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIGdhdGhlcmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGVuZXJneVZhbHVlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgYmFja2dyb3VuZFNpemUgPSAyNTY7XHJcblxyXG4gICAgcHJpdmF0ZSB3YWxsU2l6ZSA9IDM4NDtcclxuXHJcbiAgICBwcml2YXRlIHBoeXNpY01hbmFnZXI6IGNjLlBoeXNpY3NNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHNjb3JlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgaGlnaGVzdFNjb3JlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgcGF1c2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIGdhdGhlckVuZXJneTtcclxuXHJcbiAgICBwcml2YXRlIGluR2FtZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgc2NvcmVJbnRlcnZhbDogbnVtYmVyID0gMjgwO1xyXG5cclxuICAgIHByaXZhdGUgbmV4dFRhcmdldDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIHBvc0FycjogbnVtYmVyW10gPSBbMSwgMywgMCwgMl07XHJcblxyXG4gICAgcHJpdmF0ZSBwb3NJZHg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBtb3VzZURvd246IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucGh5c2ljTWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCk7XHJcbiAgICAgICAgdGhpcy5waHlzaWNNYW5hZ2VyLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucGh5c2ljTWFuYWdlci5ncmF2aXR5ID0gY2MudjIgKDAsIC0yMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICB0aGlzLmRlYnVnQ29sbGlkZXIgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJEZWJ1Z0NvbGxpZGVyXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmRlYnVnQ29sbGlkZXIuYWN0aXZlID0gdGhpcy5ub0RpZU1vZGU7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlSGlnaGVzdFNjb3JlKDApO1xyXG5cclxuICAgICAgICB0aGlzLmdhdGhlckVuZXJneSA9ICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gKHRoaXMuZW5lcmd5VmFsdWUrMSkgJSAxMztcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVFbmVyZ3lCYXIobmV3VmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgIGlmKGV2ZW50LmdldEJ1dHRvbigpID09IDAgJiYgdGhpcy5pbkdhbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW91c2VEb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLm5vZGUub24oJ21vdXNldXAnLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgIGlmKGV2ZW50LmdldEJ1dHRvbigpID09IDAgJiYgdGhpcy5pbkdhbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmdhdGhlcmluZyl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2F0aGVyaW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PSBUT0RPID09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDEuIFdoZW4gdXNlciByZWxlYXNlcyBtb3VzZSwgeW91IHNob3VsZCB1bnNjaGVkdWxlIFwiZ2F0aGVyRW5lcmd5XCIgZnVuY3Rpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMi4gQ2FsbCB0aGUgXCJwbGF5ZXJKdW1wXCIgZnVuY3Rpb24gaW4gUGxheWVyLnRzIHdpdGggXCJ0aGlzLmVuZXJneVZhbHVlICogNTBcIiBhcyBwYXJhbWV0ZXIuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuZ2F0aGVyRW5lcmd5KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wbGF5ZXJKdW1wKHRoaXMuZW5lcmd5VmFsdWUgKiA1MCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVBsYXRmb3Jtcyg1MDApO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnBsYXllci5mYWxsRG93bil7XHJcbiAgICAgICAgICAgIHRoaXMuZ2F0aGVyaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PSBUT0RPID09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgICAvLyAxLiBXaGVuIHBsYXllciBmYWxscyBkb3duLCAgeW91IHNob3VsZCB1bnNjaGVkdWxlIFwiZ2F0aGVyRW5lcmd5XCIgZnVuY3Rpb24uXHJcbiAgICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5nYXRoZXJFbmVyZ3kpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLm1vdXNlRG93biAmJiAhdGhpcy5nYXRoZXJpbmcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2F0aGVyaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PSBUT0RPID09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgICAgICAgLy8gMS4gV2hlbiB1c2VyIHByZXNzZXMgbW91c2UsICB5b3Ugc2hvdWxkIGNhbGwgXCJnYXRoZXJFbmVyZ3lcIiBmdW5jdGlvbiBldmVyeSAwLjA1cy5cclxuICAgICAgICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmdhdGhlckVuZXJneSwgMC4wNSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5jYW1lcmEueSAtIHRoaXMud2FsbC55ID49IHRoaXMud2FsbFNpemUpXHJcbiAgICAgICAgICAgIHRoaXMud2FsbC55ICs9IHRoaXMud2FsbFNpemU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5jYW1lcmEueSAtIHRoaXMuYmFja2dyb3VuZC55ID49IHRoaXMuYmFja2dyb3VuZFNpemUpXHJcbiAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZC55ICs9IHRoaXMuYmFja2dyb3VuZFNpemU7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuaW5HYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5wbGF5ZXIubm9kZS55IC0gdGhpcy5jYW1lcmEueSA+IDEwMClcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FtZXJhLnkgPSB0aGlzLnBsYXllci5ub2RlLnkgLSAxMDA7XHJcbiAgICBcclxuICAgICAgICAgICAgaWYodGhpcy5jYW1lcmEueS0yMDAgPiB0aGlzLnBsYXllci5ub2RlLnkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucGxheWVyLm5vZGUuYWN0aXZlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBsYXllckRpZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZU92ZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5wbGF5ZXIubm9kZS55ID49IHRoaXMubmV4dFRhcmdldClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY29yZSh0aGlzLnNjb3JlICsgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRUYXJnZXQgKz0gdGhpcy5zY29yZUludGVydmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnkgKz0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZGVidWdDb2xsaWRlci55ID0gMjI7XHJcbiAgICB9XHJcblxyXG4gICAgcmFuZG9tQ2hvb3NlUGxhdGZvcm0oKVxyXG4gICAge1xyXG4gICAgICAgIGxldCByYW5kID0gTWF0aC5yYW5kb20oKTtcclxuXHJcbiAgICAgICAgLy8wOiBub3JtYWwsIDE6IGNvbnZleW9yXHJcbiAgICAgICAgbGV0IHByb2IgPSBbOCwgMV07XHJcbiAgICAgICAgbGV0IHN1bSA9IHByb2IucmVkdWNlKChhLGIpPT5hK2IpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCBwcm9iLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICBwcm9iW2ldICs9IHByb2JbaS0xXTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcHJvYi5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb2JbaV0gLz0gc3VtO1xyXG4gICAgICAgICAgICBpZihyYW5kIDw9IHByb2JbaV0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVQbGF0Zm9ybXMobnVtOiBOdW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wbGF0Zm9ybXMucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgcmFuZElkeCA9IHRoaXMucmFuZG9tQ2hvb3NlUGxhdGZvcm0oKTtcclxuICAgICAgICAgICAgbGV0IHBsYXRmb3JtID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF0Zm9ybVByZWZhYnNbcmFuZElkeF0pO1xyXG4gICAgICAgICAgICBwbGF0Zm9ybS5wYXJlbnQgPSB0aGlzLnBsYXRmb3JtcztcclxuICAgICAgICAgICAgcGxhdGZvcm0ucG9zaXRpb24gPSBjYy52MigtMTMyICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjkpIC0gMTQgKyA4OCAqIHRoaXMucG9zQXJyW3RoaXMucG9zSWR4XSwgLTEwNSs0MCppKTtcclxuICAgICAgICAgICAgdGhpcy5wb3NJZHggPSAodGhpcy5wb3NJZHggKyAxKSAlIDQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUVuZXJneUJhcih2YWx1ZTogbnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZW5lcmd5VmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmVuZXJneUJhci53aWR0aCA9IHRoaXMuZW5lcmd5VmFsdWUgKiA4O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUhpZ2hlc3RTY29yZShzY29yZTogbnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaGlnaGVzdFNjb3JlID0gc2NvcmU7XHJcbiAgICAgICAgdGhpcy5oaWdoZXN0U2NvcmVOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKEFycmF5KDQpLmpvaW4oXCIwXCIpICsgdGhpcy5oaWdoZXN0U2NvcmUudG9TdHJpbmcoKSkuc2xpY2UoLTQpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNjb3JlKHNjb3JlOiBudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zY29yZSA9IHNjb3JlO1xyXG4gICAgICAgIHRoaXMuc2NvcmVOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKEFycmF5KDQpLmpvaW4oXCIwXCIpICsgdGhpcy5zY29yZS50b1N0cmluZygpKS5zbGljZSgtNCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2FtZVN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN0YXJ0SWNvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlUGxhdGZvcm1zKDUwMCk7XHJcbiAgICAgICAgdGhpcy5pbkdhbWUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLmJhY2tncm91bmQucG9zaXRpb24gPSBjYy52MigpO1xyXG4gICAgICAgIHRoaXMud2FsbC5wb3NpdGlvbiA9IGNjLnYyKCk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24gPSBjYy52MigpO1xyXG5cclxuICAgICAgICBpZih0aGlzLnNjb3JlID4gdGhpcy5oaWdoZXN0U2NvcmUpXHJcbiAgICAgICAgdGhpcy51cGRhdGVIaWdoZXN0U2NvcmUodGhpcy5zY29yZSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTY29yZSgxKTtcclxuICAgICAgICB0aGlzLnBsYXllci5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIucmVib3JuKCk7XHJcbiAgICAgICAgdGhpcy5uZXh0VGFyZ2V0ID0gdGhpcy5wbGF5ZXIubm9kZS55ICsgdGhpcy5zY29yZUludGVydmFsICogdGhpcy5zY29yZTtcclxuXHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheU11c2ljKHRoaXMuYmdtLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBnYW1lUGF1c2UoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMucGF1c2UpXHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UgPSBmYWxzZTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UgPSB0cnVlO1xyXG4gICAgICAgIGlmKHRoaXMucGF1c2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlSWNvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9LCAwLjEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlSWNvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2MuZ2FtZS5yZXN1bWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2FtZU92ZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RhcnRJY29uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmluR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLmdhdGhlckVuZXJneSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVFbmVyZ3lCYXIoMCk7XHJcbiAgICAgICAgdGhpcy5nYXRoZXJpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcE11c2ljKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2FtZUVuZCgpXHJcbiAgICB7XHJcbiAgICAgICAgY2MuZ2FtZS5lbmQoKTtcclxuICAgIH1cclxufVxyXG4iXX0=