
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Circle.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '164a92KgZ1DIro953xb26Ry', 'Circle');
// Scripts/Circle.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bg = null;
        return _this;
    }
    Circle.prototype.start = function () {
        this.bg = this.node.getChildByName("Background");
    };
    Circle.prototype.update = function (dt) {
        if (this.bg.width < this.node.width) {
            this.bg.width = (this.node.width - 10) * 0.1 + this.bg.width;
            this.bg.height = (this.node.height - 10) * 0.1 + this.bg.height;
        }
        if (this.bg.width > this.node.width) {
            this.bg.width = this.node.width;
            this.bg.height = this.node.height;
        }
    };
    Circle = __decorate([
        ccclass
    ], Circle);
    return Circle;
}(cc.Component));
exports.default = Circle;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQ2lyY2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFvQywwQkFBWTtJQUFoRDtRQUFBLHFFQWtCQztRQWhCRyxRQUFFLEdBQVksSUFBSSxDQUFDOztJQWdCdkIsQ0FBQztJQWRHLHNCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCx1QkFBTSxHQUFOLFVBQVEsRUFBRTtRQUNOLElBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUM7WUFDL0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDN0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDbkU7UUFDRCxJQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFDO1lBQy9CLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3JDO0lBQ0wsQ0FBQztJQWpCZ0IsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQWtCMUI7SUFBRCxhQUFDO0NBbEJELEFBa0JDLENBbEJtQyxFQUFFLENBQUMsU0FBUyxHQWtCL0M7a0JBbEJvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaXJjbGUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGJnOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgdGhpcy5iZyA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmKHRoaXMuYmcud2lkdGggPCB0aGlzLm5vZGUud2lkdGgpe1xyXG4gICAgICAgICAgICB0aGlzLmJnLndpZHRoID0gKHRoaXMubm9kZS53aWR0aCAtIDEwKSAqIDAuMSArIHRoaXMuYmcud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuYmcuaGVpZ2h0ID0gKHRoaXMubm9kZS5oZWlnaHQgLSAxMCkgKiAwLjEgKyB0aGlzLmJnLmhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZy53aWR0aCA+IHRoaXMubm9kZS53aWR0aCl7XHJcbiAgICAgICAgICAgIHRoaXMuYmcud2lkdGggPSB0aGlzLm5vZGUud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuYmcuaGVpZ2h0ID0gdGhpcy5ub2RlLmhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19