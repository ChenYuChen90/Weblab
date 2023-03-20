
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Menu.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '43c13HUa8dDhK8pvT2k3r48', 'Menu');
// Scripts/Menu.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ===================== TODO =====================
    // 1. Add dynamic click event to StartButton to call this
    //    function
    Menu.prototype.loadGameScene = function () {
        cc.director.loadScene("game");
    };
    Menu.prototype.start = function () {
        var startbtn = new cc.Component.EventHandler();
        startbtn.target = this.node;
        startbtn.component = "Menu";
        startbtn.handler = "loadGameScene";
        cc.find("Canvas/UI/StartButton").getComponent(cc.Button).clickEvents.push(startbtn);
    };
    Menu = __decorate([
        ccclass
    ], Menu);
    return Menu;
}(cc.Component));
exports.default = Menu;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQVk7SUFBOUM7O0lBaUJBLENBQUM7SUFmRyxtREFBbUQ7SUFDbkQseURBQXlEO0lBQ3pELGNBQWM7SUFDZCw0QkFBYSxHQUFiO1FBQ0ksRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNELG9CQUFLLEdBQUw7UUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDL0MsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFBO1FBRWxDLEVBQUUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQWZnQixJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBaUJ4QjtJQUFELFdBQUM7Q0FqQkQsQUFpQkMsQ0FqQmlDLEVBQUUsQ0FBQyxTQUFTLEdBaUI3QztrQkFqQm9CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbnUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT0gVE9ETyA9PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIDEuIEFkZCBkeW5hbWljIGNsaWNrIGV2ZW50IHRvIFN0YXJ0QnV0dG9uIHRvIGNhbGwgdGhpc1xyXG4gICAgLy8gICAgZnVuY3Rpb25cclxuICAgIGxvYWRHYW1lU2NlbmUoKXtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJnYW1lXCIpO1xyXG4gICAgfVxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIGxldCBzdGFydGJ0biA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgc3RhcnRidG4udGFyZ2V0ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIHN0YXJ0YnRuLmNvbXBvbmVudCA9IFwiTWVudVwiO1xyXG4gICAgICAgIHN0YXJ0YnRuLmhhbmRsZXIgPSBcImxvYWRHYW1lU2NlbmVcIlxyXG5cclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1VJL1N0YXJ0QnV0dG9uXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goc3RhcnRidG4pO1xyXG4gICAgfVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbn1cclxuIl19