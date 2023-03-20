window.__require=function e(t,o,i){function r(a,c){if(!o[a]){if(!t[a]){var s=a.split("/");if(s=s[s.length-1],!t[s]){var p="function"==typeof __require&&__require;if(!c&&p)return p(s,!0);if(n)return n(s,!0);throw new Error("Cannot find module '"+a+"'")}a=s}var h=o[a]={exports:{}};t[a][0].call(h.exports,function(e){return r(t[a][1][e]||e)},h,h.exports,e,t,o,i)}return o[a].exports}for(var n="function"==typeof __require&&__require,a=0;a<i.length;a++)r(i[a]);return r}({GameMgr:[function(e,t,o){"use strict";cc._RF.push(t,"9eafa6oJfhL2YaT2IrMk8jP","GameMgr"),Object.defineProperty(o,"__esModule",{value:!0});var i=e("./Player"),r=cc._decorator,n=r.ccclass,a=r.property,c=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.noDieMode=!1,t.background=null,t.wall=null,t.player=null,t.platforms=null,t.platformPrefabs=[],t.startIcon=null,t.pauseIcon=null,t.scoreNode=null,t.highestScoreNode=null,t.energyBar=null,t.camera=null,t.bgm=null,t.debugCollider=null,t.gathering=!1,t.energyValue=0,t.backgroundSize=256,t.wallSize=384,t.physicManager=null,t.score=0,t.highestScore=0,t.pause=!1,t.inGame=!1,t.scoreInterval=280,t.nextTarget=0,t.posArr=[1,3,0,2],t.posIdx=0,t.mouseDown=!1,t}return __extends(t,e),t.prototype.onLoad=function(){this.physicManager=cc.director.getPhysicsManager(),this.physicManager.enabled=!0,this.physicManager.gravity=cc.v2(0,-200)},t.prototype.start=function(){var e=this;this.debugCollider=this.node.getChildByName("DebugCollider"),this.debugCollider.active=this.noDieMode,this.updateHighestScore(0),this.gatherEnergy=function(){var t=(e.energyValue+1)%13;e.updateEnergyBar(t)},this.node.on("mousedown",function(e){0==e.getButton()&&this.inGame&&(this.mouseDown=!0)},this),this.node.on("mouseup",function(e){0==e.getButton()&&this.inGame&&(this.mouseDown=!1,this.gathering&&(this.gathering=!1,this.unschedule(this.gatherEnergy),this.player.playerJump(50*this.energyValue)))},this),this.generatePlatforms(500)},t.prototype.update=function(){this.player.fallDown?(this.gathering=!1,this.unschedule(this.gatherEnergy)):this.mouseDown&&!this.gathering&&(this.gathering=!0,this.schedule(this.gatherEnergy,.05)),this.camera.y-this.wall.y>=this.wallSize&&(this.wall.y+=this.wallSize),this.camera.y-this.background.y>=this.backgroundSize&&(this.background.y+=this.backgroundSize),this.inGame?(this.player.node.y-this.camera.y>100&&(this.camera.y=this.player.node.y-100),this.camera.y-200>this.player.node.y&&this.player.node.active&&(this.player.playerDie(),this.gameOver()),this.player.node.y>=this.nextTarget&&(this.updateScore(this.score+1),this.nextTarget+=this.scoreInterval)):this.camera.y+=1,this.debugCollider.y=22},t.prototype.randomChoosePlatform=function(){for(var e=Math.random(),t=[8,1],o=t.reduce(function(e,t){return e+t}),i=1;i<t.length;i++)t[i]+=t[i-1];for(i=0;i<t.length;i++)if(t[i]/=o,e<=t[i])return i},t.prototype.generatePlatforms=function(e){this.platforms.removeAllChildren();for(var t=0;t<e;t++){var o=this.randomChoosePlatform(),i=cc.instantiate(this.platformPrefabs[o]);i.parent=this.platforms,i.position=cc.v2(-132+Math.floor(29*Math.random())-14+88*this.posArr[this.posIdx],40*t-105),this.posIdx=(this.posIdx+1)%4}},t.prototype.updateEnergyBar=function(e){this.energyValue=e,this.energyBar.width=8*this.energyValue},t.prototype.updateHighestScore=function(e){this.highestScore=e,this.highestScoreNode.getComponent(cc.Label).string=(Array(4).join("0")+this.highestScore.toString()).slice(-4)},t.prototype.updateScore=function(e){this.score=e,this.scoreNode.getComponent(cc.Label).string=(Array(4).join("0")+this.score.toString()).slice(-4)},t.prototype.gameStart=function(){this.startIcon.active=!1,this.generatePlatforms(500),this.inGame=!0,this.background.position=cc.v2(),this.wall.position=cc.v2(),this.camera.position=cc.v2(),this.score>this.highestScore&&this.updateHighestScore(this.score),this.updateScore(1),this.player.node.active=!0,this.player.reborn(),this.nextTarget=this.player.node.y+this.scoreInterval*this.score,cc.audioEngine.playMusic(this.bgm,!0)},t.prototype.gamePause=function(){this.pause?this.pause=!1:this.pause=!0,this.pause?(this.pauseIcon.active=!0,this.scheduleOnce(function(){cc.game.pause()},.1)):(this.pauseIcon.active=!1,cc.game.resume())},t.prototype.gameOver=function(){this.startIcon.active=!0,this.player.node.active=!1,this.inGame=!1,this.unschedule(this.gatherEnergy),this.updateEnergyBar(0),this.gathering=!1,cc.audioEngine.stopMusic()},t.prototype.gameEnd=function(){cc.game.end()},__decorate([a()],t.prototype,"noDieMode",void 0),__decorate([a(cc.Node)],t.prototype,"background",void 0),__decorate([a(cc.Node)],t.prototype,"wall",void 0),__decorate([a(i.default)],t.prototype,"player",void 0),__decorate([a(cc.Node)],t.prototype,"platforms",void 0),__decorate([a([cc.Prefab])],t.prototype,"platformPrefabs",void 0),__decorate([a(cc.Node)],t.prototype,"startIcon",void 0),__decorate([a(cc.Node)],t.prototype,"pauseIcon",void 0),__decorate([a(cc.Node)],t.prototype,"scoreNode",void 0),__decorate([a(cc.Node)],t.prototype,"highestScoreNode",void 0),__decorate([a(cc.Node)],t.prototype,"energyBar",void 0),__decorate([a(cc.Node)],t.prototype,"camera",void 0),__decorate([a({type:cc.AudioClip})],t.prototype,"bgm",void 0),__decorate([n],t)}(cc.Component);o.default=c,cc._RF.pop()},{"./Player":"Player"}],Platform:[function(e,t,o){"use strict";cc._RF.push(t,"a3e6dBne/JI4rscTjPZ8hyF","Platform"),Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,r=i.ccclass,n=(i.property,function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.isTouched=!1,t.anim=null,t.moveSpeed=50,t.camera=null,t}return __extends(t,e),t.prototype.start=function(){if(this.anim=this.getComponent(cc.Animation),this.camera=cc.find("Canvas/Main Camera"),"Conveyor"==this.node.name)this.node.scaleX=Math.random()>=.5?1:-1,this.moveSpeed*=this.node.scaleX;else if("Normal"==this.node.name&&Math.random()>.8){var e=Math.random()>.5?"v":"h",t=2*Math.random();this.platformMove(e,t)}},t.prototype.update=function(){this.camera.y-this.node.y>=190&&this.platformDestroy()},t.prototype.playAnim=function(){this.anim&&this.anim.play()},t.prototype.platformDestroy=function(){this.node.destroy()},t.prototype.platformMove=function(e,t){var o,i=this,r=cc.sequence(cc.moveBy(2,50,0).easing(cc.easeInOut(2)),cc.moveBy(2,-50,0).easing(cc.easeInOut(2))),n=cc.sequence(cc.moveBy(2,0,50).easing(cc.easeInOut(2)),cc.moveBy(2,0,-50).easing(cc.easeInOut(2)));"v"===e?o=cc.repeatForever(r):"h"==e&&(o=cc.repeatForever(n)),this.scheduleOnce(function(){i.node.runAction(o)},t)},t.prototype.onBeginContact=function(e,t,o){"player"==o.node.name&&(1==e.getWorldManifold().normal.y&&0==e.getWorldManifold().normal.x||(e.disabled=!0))},t.prototype.onEndContact=function(e,t,o){"Conveyor"==t.node.name&&(o.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,o.getComponent(cc.RigidBody).linearVelocity.y))},t.prototype.onPreSolve=function(e,t,o){"Conveyor"==t.node.name&&(o.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(this.moveSpeed,o.getComponent(cc.RigidBody).linearVelocity.y))},__decorate([r],t)}(cc.Component));o.default=n,cc._RF.pop()},{}],Player:[function(e,t,o){"use strict";cc._RF.push(t,"3cd2fFlgBpPIYNN/GI2S42+","Player"),Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,r=i.ccclass,n=i.property,a=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.playerSpeed=300,t.dieSound=null,t.gameMgr=null,t.jumpFrame=null,t.fallDown=!1,t.anim=null,t.moveDir=1,t.rebornPos=cc.v2(0,-146),t.rb=null,t}return __extends(t,e),t.prototype.start=function(){this.anim=this.getComponent(cc.Animation),this.rb=this.getComponent(cc.RigidBody)},t.prototype.update=function(e){this.node.x+=this.playerSpeed*this.moveDir*e,this.node.scaleX=this.moveDir>=0?1:-1;var t=this.node.position;t.addSelf(cc.v2(12,2)),t=this.node.parent.convertToWorldSpaceAR(t);var o=this.node.position;o.addSelf(cc.v2(-12,2)),o=this.node.parent.convertToWorldSpaceAR(o);var i=this.raycastTest(t,cc.v2(0,-5))||this.raycastTest(o,cc.v2(0,-5));this.fallDown=!i,this.playerAnimation()},t.prototype.raycastTest=function(e,t){for(var o=this.gameMgr.getComponent("GameMgr").physicManager.rayCast(e,e.add(t),cc.RayCastType.AllClosest),i=0;i<o.length;i++)if(o[i].collider.node.name!=this.node.name)return!0;return!1},t.prototype.reborn=function(){this.node.position=this.rebornPos,this.getComponent(cc.RigidBody).linearVelocity=cc.v2()},t.prototype.playerJump=function(e){this.fallDown||(this.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,e))},t.prototype.playerDie=function(){cc.audioEngine.playEffect(this.dieSound,!1)},t.prototype.playerAnimation=function(){this.fallDown?(this.anim.stop(),this.node.getChildByName("effect").active=!1,this.getComponent(cc.Sprite).spriteFrame=this.jumpFrame):this.gameMgr.getComponent("GameMgr").gathering?this.anim.getAnimationState("gather").isPlaying||(this.node.getChildByName("effect").active=!0,this.anim.play("gather")):this.anim.getAnimationState("walk").isPlaying||(this.anim.getAnimationState("gather").isPlaying||this.gameMgr.getComponent("GameMgr").updateEnergyBar(0),this.node.getChildByName("effect").active=!1,this.anim.play("walk"))},t.prototype.onBeginContact=function(e,t,o){"wall"==o.node.name&&(this.moveDir*=-1)},__decorate([n()],t.prototype,"playerSpeed",void 0),__decorate([n({type:cc.AudioClip})],t.prototype,"dieSound",void 0),__decorate([n(cc.Node)],t.prototype,"gameMgr",void 0),__decorate([n(cc.SpriteFrame)],t.prototype,"jumpFrame",void 0),__decorate([r],t)}(cc.Component);o.default=a,cc._RF.pop()},{}],use_reversed_rotateTo:[function(e,t){"use strict";cc._RF.push(t,"9a19aqP7g1Cx45fKgZDGSeR","use_reversed_rotateTo"),cc.RotateTo._reverse=!0,cc._RF.pop()},{}]},{},["GameMgr","Platform","Player","use_reversed_rotateTo"]);