(function (console) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
_$List_ListIterator.__name__ = true;
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
haxe_ds__$StringMap_StringMapIterator.__name__ = true;
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var lcann_reversed_Assets = function() { };
lcann_reversed_Assets.__name__ = true;
lcann_reversed_Assets.getImage = function(name) {
	var image = new Image();
	image.src = name;
	return image;
};
var lcann_reversed_Updateable = function() { };
lcann_reversed_Updateable.__name__ = true;
var lcann_reversed_GameObject = function() {
	this.x = 0;
	this.y = 0;
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.gravity = 0;
	this.gravityDirection = 0;
};
lcann_reversed_GameObject.__name__ = true;
lcann_reversed_GameObject.__interfaces__ = [lcann_reversed_Updateable];
lcann_reversed_GameObject.lengthDirX = function(length,direction) {
	return Math.cos(direction) * length;
};
lcann_reversed_GameObject.lengthDirY = function(length,direction) {
	return Math.sin(direction) * length;
};
lcann_reversed_GameObject.prototype = {
	update: function(c,s) {
		this.x += this.xSpeed * s;
		this.y += this.ySpeed * s;
		if(this.gravity != 0) this.addForce(this.gravity * s,this.gravityDirection);
	}
	,get_direction: function() {
		return Math.atan2(this.ySpeed,this.xSpeed);
	}
	,get_speed: function() {
		return Math.sqrt(Math.pow(this.xSpeed,2) + Math.pow(this.ySpeed,2));
	}
	,set_speed: function(speed) {
		var direction = this.get_direction();
		this.xSpeed = lcann_reversed_GameObject.lengthDirX(speed,direction);
		this.ySpeed = lcann_reversed_GameObject.lengthDirY(speed,direction);
		return speed;
	}
	,distanceToObject: function(o) {
		return this.distanceToPoint(o.x,o.y);
	}
	,distanceToPoint: function(xx,yy) {
		return Math.sqrt(Math.pow(this.x - xx,2) + Math.pow(this.y - yy,2));
	}
	,directionToObject: function(o) {
		return Math.atan2(o.y - this.y,o.x - this.x);
	}
	,set_room: function(room) {
		return this.room = room;
	}
	,addForce: function(speed,direction) {
		this.xSpeed += lcann_reversed_GameObject.lengthDirX(speed,direction);
		this.ySpeed += lcann_reversed_GameObject.lengthDirY(speed,direction);
	}
	,drawRotation: function(c,image,x,y,angle) {
		c.save();
		c.translate(this.x,this.y);
		c.rotate(angle);
		c.drawImage(image,x,y);
		c.restore();
	}
	,__class__: lcann_reversed_GameObject
};
var lcann_reversed_ReversableGameObject = function() {
	lcann_reversed_GameObject.call(this);
	this.lifeTimer = 0;
	this.deathTimer = 0;
	this.forward = true;
	this.alive = true;
	this.reverseTimer = 0;
	this.timeSpeed = 1;
};
lcann_reversed_ReversableGameObject.__name__ = true;
lcann_reversed_ReversableGameObject.__super__ = lcann_reversed_GameObject;
lcann_reversed_ReversableGameObject.prototype = $extend(lcann_reversed_GameObject.prototype,{
	update: function(c,s) {
		if(this.forward) {
			if(this.timeSpeed < 1) {
				this.timeSpeed += lcann_reversed_ReversableGameObject.easeTime * s;
				if(this.timeSpeed > 1) this.timeSpeed = 1;
			}
		} else {
			if(this.timeSpeed > -1) {
				this.timeSpeed -= lcann_reversed_ReversableGameObject.easeTime * s;
				if(this.timeSpeed < -1) this.timeSpeed = -1;
			}
			this.reverseTimer -= s;
			if(this.reverseTimer <= 0) this.forward = true;
		}
		if(this.alive) {
			this.lifeTimer += s * this.timeSpeed;
			if(this.lifeTimer > 0) {
				lcann_reversed_GameObject.prototype.update.call(this,c,s * this.timeSpeed);
				this.reversableUpdate(c,s * this.timeSpeed);
			}
		} else {
			lcann_reversed_GameObject.prototype.update.call(this,c,s * this.timeSpeed);
			this.deathTimer += s * this.timeSpeed;
			if(this.deathTimer <= 0) this.alive = true;
			if(this.deathTimer > lcann_reversed_ReversableGameObject.maxReverseDuration) this.room.remove(this);
		}
	}
	,reversableUpdate: function(c,s) {
	}
	,startReverse: function(duration) {
		this.forward = false;
		this.reverseTimer = duration;
		this.timeSpeed = 0;
	}
	,die: function() {
		this.alive = false;
		this.deathTimer = 0;
	}
	,__class__: lcann_reversed_ReversableGameObject
});
var lcann_reversed_ExplosionPart = function(x,y,randomDistance,initialYSpeed) {
	if(initialYSpeed == null) initialYSpeed = 0;
	if(randomDistance == null) randomDistance = 0;
	lcann_reversed_ReversableGameObject.call(this);
	if(randomDistance != 0) {
		this.x = x - randomDistance + Math.random() * (randomDistance * 2);
		this.y = y - randomDistance + Math.random() * (randomDistance * 2);
	} else {
		this.x = x;
		this.y = y;
	}
	this.ySpeed = initialYSpeed;
	this.addForce(5 + Math.random() * 5,Math.random() * (Math.PI * 2));
	this.alpha = 1;
};
lcann_reversed_ExplosionPart.__name__ = true;
lcann_reversed_ExplosionPart.__super__ = lcann_reversed_ReversableGameObject;
lcann_reversed_ExplosionPart.prototype = $extend(lcann_reversed_ReversableGameObject.prototype,{
	reversableUpdate: function(c,s) {
		lcann_reversed_ReversableGameObject.prototype.reversableUpdate.call(this,c,s);
		this.alpha -= 0.4 * s;
		if(this.alpha <= 0 && s > 0) this.die();
		if(this.alpha > 1) this.alpha = 1;
		if(this.alpha < 0) c.globalAlpha = 0; else c.globalAlpha = this.alpha;
		c.drawImage(lcann_reversed_Assets.explosionPart,this.x - 8,this.y - 8);
		c.globalAlpha = 1;
	}
	,__class__: lcann_reversed_ExplosionPart
});
var lcann_reversed_GameRoom = function(width,height) {
	this.objectPartition = new haxe_ds_StringMap();
	this.width = width;
	this.height = height;
	this.restart();
};
lcann_reversed_GameRoom.__name__ = true;
lcann_reversed_GameRoom.__interfaces__ = [lcann_reversed_Updateable];
lcann_reversed_GameRoom.prototype = {
	update: function(c,s) {
		var $it0 = this.objectPartition.iterator();
		while( $it0.hasNext() ) {
			var p = $it0.next();
			var _g_head = p.h;
			var _g_val = null;
			while(_g_head != null) {
				var o;
				o = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				try {
					o.update(c,s);
				} catch( e ) {
					if (e instanceof js__$Boot_HaxeError) e = e.val;
				}
			}
		}
	}
	,add: function(obj,partition) {
		if(partition == null) partition = "default";
		var list = this.objectPartition.get(partition);
		if(list == null) {
			list = new List();
			this.objectPartition.set(partition,list);
		}
		list.add(obj);
		obj.set_room(this);
		obj.partition = partition;
	}
	,remove: function(obj,partition) {
		var list = this.objectPartition.get(partition == null?obj.partition:partition);
		list.remove(obj);
		obj.set_room(null);
		obj.partition = null;
	}
	,getObjectIterator: function(partition) {
		if(partition == null) partition = "default";
		var list = this.objectPartition.get(partition);
		if(list == null) {
			list = new List();
			this.objectPartition.set(partition,list);
		}
		return new _$List_ListIterator(list.h);
	}
	,restart: function() {
		var $it0 = this.objectPartition.iterator();
		while( $it0.hasNext() ) {
			var p = $it0.next();
			p.clear();
		}
	}
	,__class__: lcann_reversed_GameRoom
};
var lcann_reversed_Main = function() {
	this.canvasElement = window.document.getElementById("lcann_reversed");
	this.context = this.canvasElement.getContext("2d",null);
	this.room = new lcann_reversed_PlayRoom(this.canvasElement.width,this.canvasElement.height);
	window.setInterval($bind(this,this.onUpdate),null,16.666666666666668);
};
lcann_reversed_Main.__name__ = true;
lcann_reversed_Main.main = function() {
	var main = new lcann_reversed_Main();
};
lcann_reversed_Main.prototype = {
	onUpdate: function() {
		var s = 0.016666666666666666;
		this.context.fillStyle = "#000";
		this.context.fillRect(0,0,this.canvasElement.width,this.canvasElement.height);
		this.room.update(this.context,s);
	}
	,__class__: lcann_reversed_Main
};
var lcann_reversed_PlayRoom = function(width,height) {
	this.control = new lcann_reversed_control_Controls();
	this.nextSet = new List();
	lcann_reversed_GameRoom.call(this,width,height - 24);
	this.farBack = new lcann_reversed_background_BackgroundScroll(width,height,width / 4,128,12,10,"#131313");
	this.nearBack = new lcann_reversed_background_BackgroundScroll(width,height,width / 1.5,128,15,10,"#212121");
	this.bestScore = 0;
	this.lastScore = 0;
};
lcann_reversed_PlayRoom.__name__ = true;
lcann_reversed_PlayRoom.__super__ = lcann_reversed_GameRoom;
lcann_reversed_PlayRoom.prototype = $extend(lcann_reversed_GameRoom.prototype,{
	restart: function() {
		if(this.player != null) {
			this.lastScore = this.player.score;
			if(this.lastScore > this.bestScore) this.bestScore = this.lastScore;
		}
		lcann_reversed_GameRoom.prototype.restart.call(this);
		this.player = new lcann_reversed_Player(this.control);
		this.add(this.player,"player");
		this.waveDifficultyPerSecond = 0;
		this.waveTimer = 0;
		this.waveDifficultyAccumulator = 0;
		this.menu = true;
	}
	,start: function() {
		this.waveDifficultyPerSecond = 0.34;
		this.waveTimer = 0;
		this.waveDifficultyAccumulator = 0;
		this.createNextSet();
		this.menu = false;
	}
	,createNextSet: function() {
		this.nextSet.clear();
		this.nextSetDifficulty = 0;
		var minDifficulty = this.waveDifficultyPerSecond * lcann_reversed_PlayRoom.minSetDistance;
		var maxDifficulty = this.waveDifficultyPerSecond * lcann_reversed_PlayRoom.maxSetDistance;
		var d = Math.floor(minDifficulty + Math.random() * (maxDifficulty - minDifficulty));
		var r = Math.ceil(Math.random() * 3);
		var _g = 0;
		while(_g < r) {
			var i = _g++;
			this.nextSetDifficulty += this.queueEnemy(d - this.nextSetDifficulty,r - i);
		}
		this.waveDifficultyPerSecond += 0.002;
	}
	,queueEnemy: function(max,remaning) {
		var min = max - 4 * (remaning - 1);
		var d = Std["int"](Math.max(Math.floor(Math.random() * Math.min(max,4)) + 1,min));
		var e;
		switch(d) {
		case 1:
			e = new lcann_reversed_enemy_EnemyKamikazi();
			break;
		case 2:
			e = new lcann_reversed_enemy_EnemyOneShot();
			break;
		case 3:
			e = new lcann_reversed_enemy_EnemyThreeBurstShooter();
			break;
		case 4:
			e = new lcann_reversed_enemy_EnemyTunnelShooter();
			break;
		default:
			return 0;
		}
		var x = 0;
		var _g = 0;
		while(_g < 10) {
			var i = _g++;
			x = this.width / 4 + Math.random() * (this.width / 2);
			var _g1_head = this.nextSet.h;
			var _g1_val = null;
			while(_g1_head != null) {
				var e1;
				e1 = (function($this) {
					var $r;
					_g1_val = _g1_head[0];
					_g1_head = _g1_head[1];
					$r = _g1_val;
					return $r;
				}(this));
				if(e1.distanceToPoint(x,-16) > 32) break;
			}
		}
		e.x = x;
		e.y = -16;
		this.nextSet.add(e);
		return d;
	}
	,update: function(c,s) {
		this.farBack.update(c,s);
		this.nearBack.update(c,s);
		lcann_reversed_GameRoom.prototype.update.call(this,c,s);
		this.waveTimer += s;
		if(this.waveTimer > 0 && (this.waveDifficultyAccumulator + this.nextSetDifficulty) / this.waveTimer < this.waveDifficultyPerSecond) {
			var _g_head = this.nextSet.h;
			var _g_val = null;
			while(_g_head != null) {
				var e;
				e = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				this.add(e,"enemy");
			}
			this.waveDifficultyAccumulator += this.nextSetDifficulty;
			this.createNextSet();
		}
		c.fillStyle = "#696969";
		c.fillRect(0,this.height,this.width,24);
		c.fillStyle = "#0000FF";
		var bombMeterWidth = this.width * 0.5 - 24;
		c.fillRect(4,this.height + 4,bombMeterWidth * (this.player.bombQty / 3),16);
		c.strokeStyle = "#000000";
		var _g = 1;
		while(_g < 4) {
			var i = _g++;
			var lx = 4 + bombMeterWidth * (i / 3);
			c.beginPath();
			c.moveTo(lx,this.height + 4);
			c.lineTo(lx,this.height + 20);
			c.stroke();
			if(this.player.bombQty >= i) c.fillStyle = "#FFFFFF"; else c.fillStyle = "#000000";
			c.fillText(i == null?"null":"" + i,lx - 12,this.height + 16);
		}
		c.strokeRect(4,this.height + 4,bombMeterWidth,16);
		c.fillText("Score: " + this.player.score,this.width * 0.5 + 4,this.height + 20);
		if(this.menu) {
			c.fillStyle = "#000000";
			c.globalAlpha = 0.5;
			c.fillRect(0,0,this.width,this.height);
			c.globalAlpha = 1;
			c.fillStyle = "#FFFFFF";
			c.fillText("Press 'Shoot' to Start",this.width / 2 - c.measureText("Press 'Z' to Start").width / 2,this.height * 0.33);
			var scoreText = "Best Score: " + this.bestScore;
			c.fillText(scoreText,this.width / 2 - c.measureText(scoreText).width / 2,this.height * 0.66);
			if(this.lastScore > 0) {
				scoreText = "Last Score: " + this.lastScore;
				c.fillText(scoreText,this.width / 2 - c.measureText(scoreText).width / 2,this.height * 0.66 + 24);
			}
			if(this.control.isShooting()) this.start();
		}
	}
	,reverse: function(duration) {
		this.waveTimer -= duration * 2;
		this.farBack.startReverse(duration);
		this.nearBack.startReverse(duration);
	}
	,__class__: lcann_reversed_PlayRoom
});
var lcann_reversed_Player = function(controls) {
	lcann_reversed_GameObject.call(this);
	this.fireTimer = 0;
	this.graze = 0;
	this.score = 0;
	this.bombCooldown = 0;
	this.bombQty = 1;
	this.bombTimer = 0;
	this.alive = true;
	this.control = controls;
};
lcann_reversed_Player.__name__ = true;
lcann_reversed_Player.__super__ = lcann_reversed_GameObject;
lcann_reversed_Player.prototype = $extend(lcann_reversed_GameObject.prototype,{
	set_room: function(room) {
		this.x = room.width * 0.5;
		this.y = room.height * 0.8;
		return lcann_reversed_GameObject.prototype.set_room.call(this,room);
	}
	,update: function(c,s) {
		this.doControls();
		lcann_reversed_GameObject.prototype.update.call(this,c,s);
		if(!this.alive) return;
		this.fireTimer += s;
		if(this.control.isShooting()) {
			if(this.fireTimer >= lcann_reversed_Player.fireDelay) {
				this.fireTimer = 0;
				var bullet = new lcann_reversed_PlayerBullet();
				bullet.x = this.x;
				bullet.y = this.y;
				bullet.ySpeed = -400;
				this.room.add(bullet,"playerBullet");
			}
		}
		if(this.bombCooldown > 0) this.bombCooldown -= s;
		if(this.bombTimer > 0) this.bombTimer -= s;
		var bomb = false;
		if(this.control.isBombing()) {
			if(this.bombCooldown <= 0 && this.bombQty >= 1) {
				this.bombCooldown = lcann_reversed_Player.bombDuration * 4;
				bomb = true;
				(js_Boot.__cast(this.room , lcann_reversed_PlayRoom)).reverse(lcann_reversed_Player.bombDuration);
				this.bombQty -= 1;
				this.bombTimer = lcann_reversed_Player.bombDuration * 1.5;
			}
		}
		var $it0 = this.room.getObjectIterator("bullet");
		while( $it0.hasNext() ) {
			var o = $it0.next();
			if((o == null?null:js_Boot.getClass(o)) == lcann_reversed_enemy_EnemyBullet) this.bulletCollide(o);
			if(bomb && js_Boot.__instanceof(o,lcann_reversed_ReversableGameObject)) (js_Boot.__cast(o , lcann_reversed_ReversableGameObject)).startReverse(lcann_reversed_Player.bombDuration);
		}
		var $it1 = this.room.getObjectIterator("enemy");
		while( $it1.hasNext() ) {
			var e = $it1.next();
			if(js_Boot.__instanceof(e,lcann_reversed_enemy_Enemy)) this.enemyCollide(e);
			if(bomb && js_Boot.__instanceof(e,lcann_reversed_ReversableGameObject)) (js_Boot.__cast(e , lcann_reversed_ReversableGameObject)).startReverse(lcann_reversed_Player.bombDuration);
		}
		var $it2 = this.room.getObjectIterator("score");
		while( $it2.hasNext() ) {
			var t = $it2.next();
			if((t == null?null:js_Boot.getClass(t)) == lcann_reversed_PointToken) this.scoreCollide(t);
		}
		c.drawImage(lcann_reversed_Assets.player,this.x - lcann_reversed_Player.grazeRadius,this.y - lcann_reversed_Player.grazeRadius);
		if(this.bombTimer > 0) {
			c.strokeStyle = "#0000FF";
			c.beginPath();
			c.arc(this.x,this.y,lcann_reversed_Player.grazeRadius * 2,0,Math.PI * 2);
			c.stroke();
		}
	}
	,doControls: function() {
		var ctrl = this.control.getMovement();
		var spd;
		if(this.control.isFocus()) spd = lcann_reversed_Player.focusMoveSpeed; else spd = lcann_reversed_Player.baseMoveSpeed;
		this.xSpeed = ctrl.x * spd;
		this.ySpeed = ctrl.y * spd;
		if(this.xSpeed < 0 && this.x < lcann_reversed_Player.grazeRadius) this.xSpeed = 0;
		if(this.xSpeed > 0 && this.x > this.room.width - lcann_reversed_Player.grazeRadius) this.xSpeed = 0;
		if(this.ySpeed < 0 && this.y < lcann_reversed_Player.grazeRadius) this.ySpeed = 0;
		if(this.ySpeed > 0 && this.y > this.room.height - lcann_reversed_Player.grazeRadius) this.ySpeed = 0;
	}
	,bulletCollide: function(b) {
		var dist = this.distanceToObject(b);
		if(dist < lcann_reversed_Player.grazeRadius + b.radius && !b.grazed) {
			b.grazed = true;
			this.graze += 1;
			this.score += 3;
			this.bombQty += 1 / ((Math.floor(this.bombQty) + 1) * 20 + Math.floor(this.bombQty) * 20);
			if(this.bombQty > 3) this.bombQty = 3;
		}
		this.hitCheck(b,b.radius);
	}
	,enemyCollide: function(e) {
		this.hitCheck(e,e.radius);
	}
	,hitCheck: function(o,otherRadius) {
		var dist = this.distanceToObject(o);
		if(this.bombTimer > 0 && dist < lcann_reversed_Player.grazeRadius * 2) this.room.remove(o);
		if(dist < lcann_reversed_Player.hitRadius + otherRadius) {
			var _g = 0;
			while(_g < 20) {
				var i = _g++;
				this.room.add(new lcann_reversed_ExplosionPart(this.x,this.y,16));
			}
			this.alive = false;
			window.setTimeout(($_=this.room,$bind($_,$_.restart)),3000);
		}
	}
	,scoreCollide: function(s) {
		if(this.distanceToObject(s) < lcann_reversed_Player.grazeRadius + 4) {
			this.score += Math.ceil(this.bombQty);
			this.room.remove(s);
		}
	}
	,__class__: lcann_reversed_Player
});
var lcann_reversed_PlayerBullet = function() {
	lcann_reversed_GameObject.call(this);
	this.radius = 7;
};
lcann_reversed_PlayerBullet.__name__ = true;
lcann_reversed_PlayerBullet.__super__ = lcann_reversed_GameObject;
lcann_reversed_PlayerBullet.prototype = $extend(lcann_reversed_GameObject.prototype,{
	update: function(c,s) {
		lcann_reversed_GameObject.prototype.update.call(this,c,s);
		if(this.y < 0) {
			this.room.remove(this);
			return;
		}
		c.drawImage(lcann_reversed_Assets.bulletPlayer,this.x - 7,this.y - 11);
	}
	,__class__: lcann_reversed_PlayerBullet
});
var lcann_reversed_PointToken = function(x,y) {
	lcann_reversed_GameObject.call(this);
	this.x = x;
	this.y = y;
	this.gravityDirection = Math.PI * 0.5;
	this.gravity = 4;
	this.addForce(18,Math.PI * 1.25 + Math.random() * (Math.PI * 0.5));
};
lcann_reversed_PointToken.__name__ = true;
lcann_reversed_PointToken.__super__ = lcann_reversed_GameObject;
lcann_reversed_PointToken.prototype = $extend(lcann_reversed_GameObject.prototype,{
	update: function(c,s) {
		lcann_reversed_GameObject.prototype.update.call(this,c,s);
		if(this.get_speed() > 18) this.set_speed(18);
		c.drawImage(lcann_reversed_Assets.pointToken,this.x - 4,this.y - 4);
		if(this.x > this.room.width + 4 || this.x < -4 || this.y > this.room.height + 4) this.room.remove(this);
	}
	,__class__: lcann_reversed_PointToken
});
var lcann_reversed_background_BackgroundScroll = function(viewWidth,viewHeight,gapWidth,nodeGap,speed,loopDuration,colour) {
	lcann_reversed_ReversableGameObject.call(this);
	this.nodeLeft = new List();
	this.nodeRight = new List();
	this.width = viewWidth;
	this.viewHeight = viewHeight;
	this.scrollSpeed = speed;
	this.length = viewHeight + speed * (loopDuration * 2);
	this.colour = colour;
	var nodeCount = Math.floor(this.length / nodeGap);
	this.nodeMaxOffset = nodeGap * 0.4;
	this.leftNodeRoot = viewWidth / 2 - gapWidth / 2 - this.nodeMaxOffset / 2;
	this.rightNodeRoot = viewWidth / 2 + gapWidth / 2 - this.nodeMaxOffset / 2;
	this.nodeGap = nodeGap;
	var lastLeft = null;
	var lastRight = null;
	var _g1 = 0;
	var _g = nodeCount + 1;
	while(_g1 < _g) {
		var i = _g1++;
		var left = new lcann_reversed_background_Point();
		left.x = this.leftNodeRoot + Math.random() * this.nodeMaxOffset;
		left.y = -nodeGap + nodeGap * i + Math.random() * this.nodeMaxOffset;
		left.parent = lastLeft;
		this.nodeLeft.add(left);
		var right = new lcann_reversed_background_Point();
		right.x = this.rightNodeRoot + Math.random() * this.nodeMaxOffset;
		right.y = -nodeGap + nodeGap * i + Math.random() * this.nodeMaxOffset;
		right.parent = lastRight;
		this.nodeRight.add(right);
		lastLeft = left;
		lastRight = right;
	}
};
lcann_reversed_background_BackgroundScroll.__name__ = true;
lcann_reversed_background_BackgroundScroll.__super__ = lcann_reversed_ReversableGameObject;
lcann_reversed_background_BackgroundScroll.prototype = $extend(lcann_reversed_ReversableGameObject.prototype,{
	reversableUpdate: function(c,s) {
		var d = this.scrollSpeed * s;
		c.fillStyle = this.colour;
		this.updateSide(c,d,this.nodeLeft,this.leftNodeRoot,0);
		this.updateSide(c,d,this.nodeRight,this.rightNodeRoot,this.width);
	}
	,updateSide: function(c,d,nodeList,nodeRoot,edge) {
		var _g_head = nodeList.h;
		var _g_val = null;
		while(_g_head != null) {
			var l;
			l = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			if(l.y <= 0 && l.y + d > 0 && d > 0 && l.parent == null) {
				var n = new lcann_reversed_background_Point();
				n.x = nodeRoot + Math.random() * this.nodeMaxOffset;
				n.y = l.y - this.nodeGap + Math.random() * this.nodeMaxOffset;
				nodeList.add(n);
				l.parent = n;
			}
			l.y += d;
			if(l.y > this.length) {
				nodeList.remove(l);
				continue;
			}
			if(l.y > 0 && l.parent != null && l.parent.y < this.viewHeight) {
				c.beginPath();
				c.moveTo(edge,l.y + 1);
				c.lineTo(l.x,l.y + 1);
				c.lineTo(l.parent.x,l.parent.y - 1);
				c.lineTo(edge,l.parent.y - 1);
				c.closePath();
				c.fill();
			}
		}
	}
	,__class__: lcann_reversed_background_BackgroundScroll
});
var lcann_reversed_background_Point = function() {
};
lcann_reversed_background_Point.__name__ = true;
lcann_reversed_background_Point.prototype = {
	__class__: lcann_reversed_background_Point
};
var lcann_reversed_control_Controls = function() {
	this.keyboard = new lcann_reversed_control_Keyboard();
	this.airConsole = new AirConsole();
	this.airConsole.onMessage = $bind(this,this.onAirConsoleMessage);
	this.acMove = { x : 0, y : 0};
	this.acShoot = false;
	this.acBomb = false;
};
lcann_reversed_control_Controls.__name__ = true;
lcann_reversed_control_Controls.prototype = {
	onAirConsoleMessage: function(deviceId,message) {
		if(Object.prototype.hasOwnProperty.call(message,"joystick-left")) {
			var joystick = Reflect.field(message,"joystick-left");
			if(joystick.pressed) {
				this.acMove.x = joystick.message.x;
				this.acMove.y = joystick.message.y;
			} else {
				this.acMove.x = 0;
				this.acMove.y = 0;
			}
		}
		if(Object.prototype.hasOwnProperty.call(message,"Z")) {
			var button = Reflect.field(message,"Z");
			this.acShoot = button.pressed;
		}
		if(Object.prototype.hasOwnProperty.call(message,"X")) {
			var button1 = Reflect.field(message,"X");
			this.acBomb = button1.pressed;
		}
	}
	,isShooting: function() {
		return this.keyboard.isKeyDown(90) || this.acShoot;
	}
	,isBombing: function() {
		return this.keyboard.isKeyDown(88) || this.acBomb;
	}
	,isFocus: function() {
		return this.keyboard.isKeyDown(16);
	}
	,getMovement: function() {
		var mx = this.acMove.x;
		var my = this.acMove.y;
		if(this.keyboard.isKeyDown(38)) my -= 1.0;
		if(this.keyboard.isKeyDown(39)) mx += 1.0;
		if(this.keyboard.isKeyDown(40)) my += 1.0;
		if(this.keyboard.isKeyDown(37)) mx -= 1.0;
		if(mx != 0.0 || my != 0.0) {
			var md = Math.atan2(my,mx);
			return { x : Math.cos(md) * Math.abs(mx), y : Math.sin(md) * Math.abs(my)};
		} else return { x : 0, y : 0};
	}
	,__class__: lcann_reversed_control_Controls
};
var lcann_reversed_control_Keyboard = function() {
	this.keyDown = [];
	window.addEventListener("keydown",$bind(this,this.onKeyDown));
	window.addEventListener("keyup",$bind(this,this.onKeyUp));
};
lcann_reversed_control_Keyboard.__name__ = true;
lcann_reversed_control_Keyboard.prototype = {
	onKeyDown: function(e) {
		e.preventDefault();
		this.keyDown[e.keyCode] = true;
	}
	,onKeyUp: function(e) {
		e.preventDefault();
		this.keyDown[e.keyCode] = false;
	}
	,isKeyDown: function(keyCode) {
		if(this.keyDown.length < keyCode) return false;
		if(this.keyDown[keyCode] == true) return true; else return false;
	}
	,__class__: lcann_reversed_control_Keyboard
};
var lcann_reversed_enemy_Enemy = function() {
	lcann_reversed_ReversableGameObject.call(this);
	this.life = 2;
	this.radius = 16;
	this.value = 1;
};
lcann_reversed_enemy_Enemy.__name__ = true;
lcann_reversed_enemy_Enemy.__super__ = lcann_reversed_ReversableGameObject;
lcann_reversed_enemy_Enemy.prototype = $extend(lcann_reversed_ReversableGameObject.prototype,{
	set_room: function(room) {
		if(room != null) {
			var $it0 = room.getObjectIterator("player");
			while( $it0.hasNext() ) {
				var o = $it0.next();
				if((o == null?null:js_Boot.getClass(o)) == lcann_reversed_Player) {
					this.target = o;
					break;
				}
			}
		}
		return lcann_reversed_ReversableGameObject.prototype.set_room.call(this,room);
	}
	,reversableUpdate: function(c,s) {
		var $it0 = this.room.getObjectIterator("playerBullet");
		while( $it0.hasNext() ) {
			var o = $it0.next();
			if((o == null?null:js_Boot.getClass(o)) == lcann_reversed_PlayerBullet) {
				if(this.bulletCollide(o)) return;
			}
		}
		this.draw(c);
		if(this.y > this.room.height + this.radius) this.die();
	}
	,draw: function(c) {
		c.fillStyle = "#00FF00";
		c.fillRect(this.x - this.radius,this.y - this.radius,this.radius * 2,this.radius * 2);
	}
	,bulletCollide: function(o) {
		if(this.distanceToObject(o) < this.radius + o.radius) {
			this.room.remove(o);
			this.life -= 1;
			if(this.life <= 0) {
				var _g1 = 0;
				var _g = this.value;
				while(_g1 < _g) {
					var i = _g1++;
					this.room.add(new lcann_reversed_PointToken(this.x,this.y),"score");
				}
				var _g2 = 0;
				while(_g2 < 5) {
					var i1 = _g2++;
					this.room.add(new lcann_reversed_ExplosionPart(this.x,this.y,16,this.ySpeed),"particle");
				}
				this.room.remove(this);
				return true;
			}
		}
		return false;
	}
	,__class__: lcann_reversed_enemy_Enemy
});
var lcann_reversed_enemy_EnemyBullet = function(image,radius,rotate) {
	if(rotate == null) rotate = false;
	if(radius == null) radius = 8;
	lcann_reversed_ReversableGameObject.call(this);
	this.image = image;
	this.radius = radius;
	this.rotate = rotate;
	this.grazed = false;
};
lcann_reversed_enemy_EnemyBullet.__name__ = true;
lcann_reversed_enemy_EnemyBullet.__super__ = lcann_reversed_ReversableGameObject;
lcann_reversed_enemy_EnemyBullet.prototype = $extend(lcann_reversed_ReversableGameObject.prototype,{
	reversableUpdate: function(c,s) {
		if(this.rotate) this.drawRotation(c,this.image,-this.image.width / 2,-this.image.height / 2,this.get_direction()); else c.drawImage(this.image,this.x - this.image.width / 2,this.y - this.image.height / 2);
		if(this.x < -this.radius || this.x > this.room.width + this.radius || this.y < -this.radius || this.y > this.room.height + this.radius) this.die();
	}
	,__class__: lcann_reversed_enemy_EnemyBullet
});
var lcann_reversed_enemy_EnemyKamikazi = function() {
	lcann_reversed_enemy_Enemy.call(this);
	this.life = 2;
	this.ySpeed = 30;
	this.value = 2;
};
lcann_reversed_enemy_EnemyKamikazi.__name__ = true;
lcann_reversed_enemy_EnemyKamikazi.__super__ = lcann_reversed_enemy_Enemy;
lcann_reversed_enemy_EnemyKamikazi.prototype = $extend(lcann_reversed_enemy_Enemy.prototype,{
	draw: function(c) {
		c.drawImage(lcann_reversed_Assets.enemyBlocker,this.x - 16,this.y - 16);
	}
	,__class__: lcann_reversed_enemy_EnemyKamikazi
});
var lcann_reversed_enemy_EnemyShooter = function() {
	lcann_reversed_enemy_Enemy.call(this);
	this.shootTimer = -1;
};
lcann_reversed_enemy_EnemyShooter.__name__ = true;
lcann_reversed_enemy_EnemyShooter.__super__ = lcann_reversed_enemy_Enemy;
lcann_reversed_enemy_EnemyShooter.prototype = $extend(lcann_reversed_enemy_Enemy.prototype,{
	reversableUpdate: function(c,s) {
		lcann_reversed_enemy_Enemy.prototype.reversableUpdate.call(this,c,s);
		if(this.room == null) return;
		if(this.shootTimer > 0 && this.y < this.room.height * 0.75) {
			this.shootTimer -= s;
			if(this.shootTimer <= 0) this.shoot();
		}
	}
	,shoot: function() {
	}
	,__class__: lcann_reversed_enemy_EnemyShooter
});
var lcann_reversed_enemy_EnemyOneShot = function() {
	lcann_reversed_enemy_EnemyShooter.call(this);
	this.life = 5;
	this.ySpeed = 20;
	this.shootTimer = 3;
	this.value = 3;
};
lcann_reversed_enemy_EnemyOneShot.__name__ = true;
lcann_reversed_enemy_EnemyOneShot.__super__ = lcann_reversed_enemy_EnemyShooter;
lcann_reversed_enemy_EnemyOneShot.prototype = $extend(lcann_reversed_enemy_EnemyShooter.prototype,{
	shoot: function() {
		lcann_reversed_enemy_EnemyShooter.prototype.shoot.call(this);
		var b = new lcann_reversed_enemy_EnemyBullet(lcann_reversed_Assets.bulletNormal);
		b.x = this.x;
		b.y = this.y;
		b.addForce(40,this.directionToObject(this.target));
		this.room.add(b,"bullet");
		this.shootTimer = 5;
	}
	,draw: function(c) {
		c.drawImage(lcann_reversed_Assets.enemyOneShot,this.x - 16,this.y - 16);
	}
	,__class__: lcann_reversed_enemy_EnemyOneShot
});
var lcann_reversed_enemy_EnemyThreeBurstShooter = function() {
	lcann_reversed_enemy_EnemyShooter.call(this);
	this.shootTimer = 3;
	this.ySpeed = 20;
	this.value = 4;
};
lcann_reversed_enemy_EnemyThreeBurstShooter.__name__ = true;
lcann_reversed_enemy_EnemyThreeBurstShooter.__super__ = lcann_reversed_enemy_EnemyShooter;
lcann_reversed_enemy_EnemyThreeBurstShooter.prototype = $extend(lcann_reversed_enemy_EnemyShooter.prototype,{
	shoot: function() {
		lcann_reversed_enemy_EnemyShooter.prototype.shoot.call(this);
		var spread = 0.5;
		var startDir = this.directionToObject(this.target) - spread;
		var _g = 0;
		while(_g < 3) {
			var i = _g++;
			var b = new lcann_reversed_enemy_EnemyBullet(lcann_reversed_Assets.bulletNormal);
			b.x = this.x;
			b.y = this.y;
			b.addForce(30,startDir + spread * i);
			this.room.add(b,"bullet");
		}
		this.shootTimer = 7;
	}
	,draw: function(c) {
		c.drawImage(lcann_reversed_Assets.enemyThreeShot,this.x - 16,this.y - 16);
	}
	,__class__: lcann_reversed_enemy_EnemyThreeBurstShooter
});
var lcann_reversed_enemy_EnemyTunnelShooter = function() {
	lcann_reversed_enemy_EnemyShooter.call(this);
	this.life = 5;
	this.ySpeed = 20;
	this.shootTimer = 5;
	this.shootQty = 10;
	this.targetDirection = 0;
	this.value = 5;
};
lcann_reversed_enemy_EnemyTunnelShooter.__name__ = true;
lcann_reversed_enemy_EnemyTunnelShooter.__super__ = lcann_reversed_enemy_EnemyShooter;
lcann_reversed_enemy_EnemyTunnelShooter.prototype = $extend(lcann_reversed_enemy_EnemyShooter.prototype,{
	draw: function(c) {
		c.drawImage(lcann_reversed_Assets.enemyTunnelShooter,this.x - 16,this.y - 16);
	}
	,shoot: function() {
		lcann_reversed_enemy_EnemyShooter.prototype.shoot.call(this);
		if(this.ySpeed > 0) {
			this.ySpeed = 0;
			this.targetDirection = this.directionToObject(this.target);
			this.lx = lcann_reversed_GameObject.lengthDirX(16,this.targetDirection + Math.PI / 2);
			this.ly = lcann_reversed_GameObject.lengthDirY(16,this.targetDirection + Math.PI / 2);
			this.rx = lcann_reversed_GameObject.lengthDirX(16,this.targetDirection - Math.PI / 2);
			this.ry = lcann_reversed_GameObject.lengthDirY(16,this.targetDirection - Math.PI / 2);
		}
		var lb = new lcann_reversed_enemy_EnemyBullet(lcann_reversed_Assets.bulletSmall,4,true);
		lb.x = this.x + this.lx;
		lb.y = this.y + this.ly;
		lb.addForce(30,this.targetDirection);
		this.room.add(lb,"bullet");
		var rb = new lcann_reversed_enemy_EnemyBullet(lcann_reversed_Assets.bulletSmall,4,true);
		rb.x = this.x + this.rx;
		rb.y = this.y + this.ry;
		rb.addForce(30,this.targetDirection);
		this.room.add(rb,"bullet");
		this.shootQty -= 1;
		if(this.shootQty <= 0) {
			this.shootTimer = 5;
			this.shootQty = 10;
			this.ySpeed = 20;
		} else this.shootTimer = 0.4;
	}
	,__class__: lcann_reversed_enemy_EnemyTunnelShooter
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
/**
 * AirConsole.
 * @copyright 2015 by N-Dream AG, Switzerland. All rights reserved.
 * @version 1.3.0
 *
 * IMPORTANT:
 *
 * See http://developers.airconsole.com/ for API documentation
 *
 * Read http://developers.airconsole.com/#/guides/device_ids_and_states to
 * learn more about devices, device states, onReady, etc.
 *
 * If your prefer an event driven api with .on() .off() and .dispatch()
 * interface instead of sending messages, use:
 * http://github.com/AirConsole/airconsole-events/
 *
 */

/**
 * The configuration for the AirConsole constructor.
 * @typedef {object} AirConsole~Config
 * @property {string} orientation - AirConsole.ORIENTATION_PORTRAIT or
 *           AirConsole.ORIENTATION_LANDSCAPE.
 * @property {boolean|undefined} synchronize_time - If set to true, you can
 *           call getServerTime() to get the time on the game server.
 *           Default is false.
 * @property {boolean|undefiend} setup_document - Sets up the document so
 *           nothing is selectable, zoom is fixed to 1 and scrolling is
 *           disabled (iOS 8 clients drop out of fullscreen when scrolling).
 *           Default: true
 * @property {number|undefined} device_motion - If set, onDeviceMotion gets
 *           called every "device_motion" milliseconds with data from the
 *           accelerometer and the gyroscope. Recommended value: 100.
 *           Only for controllers.
 */
/**
 * Your gateway object to AirConsole.
 * There are getter and setter functions for all properties.
 * Do not access properties of this object directly.
 * @constructor
 * @param {AirConsole~Config} opts - Constructor config.
 */
function AirConsole(opts) {
  this.init_(opts);
}

/**
 * The device ID of the game screen.
 * @constant {number}
 */
AirConsole.SCREEN = 0;


/**
 * The portrait orientation.
 * @constant {string}
 */
AirConsole.ORIENTATION_PORTRAIT = "portrait";


/**
 * The landscape orientation.
 * @constant {string}
 */
AirConsole.ORIENTATION_LANDSCAPE = "landscape";


/**
 * Sends a message to another device.
 * @param device_id {number|undefined} - The device ID to send the message to.
 *                                       If "device_id" is undefined, the
 *                                       message is sent to all devices (except
 *                                       this one).
 * @param data
 */
AirConsole.prototype.message = function(device_id, data) {
  if (this.device_id !== undefined) {
    this.postMessage_({ action: "message", to: device_id, data: data });
  }
};


/**
 * Sends a message to all connected devices.
 * @param data
 */
AirConsole.prototype.broadcast = function(data) {
  this.message(undefined, data);
};


/**
 * Gets called when the game console is ready.
 * This event also also fires onConnect for all devices that already are
 * connected and have loaded your game.
 * This event also fires onCustomDeviceStateChange for all devices that are
 * connected, have loaded your game and have set a custom Device State.
 * @abstract
 * @param {string} code - The AirConsole join code.
 */
AirConsole.prototype.onReady = function(code) {};


/**
 * Gets called when a device has connected and loaded the game.
 * @abstract
 * @param {number} device_id - the device ID that loaded the game.
 */
AirConsole.prototype.onConnect = function(device_id) {};


/**
 * Gets called when a device has left the game.
 * @abstract
 * @param {number} device_id - the device ID that left the game.
 */
AirConsole.prototype.onDisconnect = function(device_id) {};


/**
 * Gets called when a message is received from another device
 * that called message() or broadcast().
 * If you dont want to parse messages yourself and prefer an event driven
 * approach, have a look at http://github.com/AirConsole/airconsole-events/
 * @abstract
 * @param {number} device_id - The device ID that sent the message.
 * @param {serializable} data - The data that was sent.
 */
AirConsole.prototype.onMessage = function(device_id, data) {};


/**
 * Gets called when a device updates it's custom DeviceState
 * by calling setCustomDeviceState or setCustomDeviceStateProperty.
 * Make sure you understand the power of device states:
 * http://developers.airconsole.com/#/guides/device_ids_and_states
 * @abstract
 * @param {number} device_id - the device ID that changed its custom
 *                             DeviceState.
 * @param {Object} custom_data - The custom DeviceState data value
 */
AirConsole.prototype.onCustomDeviceStateChange = function(device_id,
                                                          custom_data) {};

/**
 * Gets called when a device updates it's profile pic, nickname or email.
 * @abstract
 * @param {number} device_id - The device_id that changed its profile.
 */
AirConsole.prototype.onDeviceProfileChange = function(device_id) {};


/**
 * Gets called when a device joins/leaves a game session or updates its
 * DeviceState (custom DeviceState, profile pic, nickname, internal state).
 * This is function is also called every time onConnect, onDisconnect or
 * onCustomDeviceStateChange, onDeviceProfileChange is called.
 * It's like their root function.
 * @abstract
 * @param {number} device_id - the device_id that changed its DeviceState.
 * @param user_data {AirConsole~DeviceState} - the data of that device.
 *        If undefined, the device has left.
 */
AirConsole.prototype.onDeviceStateChange = function(device_id, device_data) {};


/**
 * Gets called if the request of requestEmailAddress() was granted.
 * For privacy reasons, you need to whitelist your game in order to receive
 * the email address of the user. To whitelist your game, contact
 * developers@airconsole.com. For development purposes, localhost is always
 * allowed.
 * @abstract
 * @param {string|undefined} email_address - The email address of the user if
 *        it was set.
 */
AirConsole.prototype.onEmailAddress = function(email_address) {};

/**
 * Gets called every X milliseconds with device motion data iff the
 * AirConsole was instantiated with the "device_motion" opts set to the
 * interval in milliseconds. Only works for controllers.
 * Note: Some browsers do not allow games to access accelerometer and gyroscope
 *       in an iframe (your game). So use this method if you need gyroscope
 *       or accelerometer data.
 * @abstract
 * @param {object} data - data.x, data.y, data.z for accelerometer
 *                        data.alpha, data.beta, data.gamma for gyroscope
 */
AirConsole.prototype.onDeviceMotion = function(data) {};


/**
 * Gets called when the screen sets the active players by calling
 * setActivePlayers().
 * @abstract
 * @param {number|undefined} player_number - The player number of this device.
 *                                           Can be undefined if this device
 *                                           is not part of the active players.
 */
AirConsole.prototype.onActivePlayersChange = function(player_number) {};


/**
 * Takes all currently connected controllers and assigns them a player number.
 * Can only be called by the screen. You don't have to use this helper
 * function, but this mechanism is very convenient if you want to know which
 * device is the first player, the second player, the third player ...
 * The assigned player numbers always start with 0 and are consecutive.
 * You can hardcode player numbers, but not device_ids.
 * Once the screen has called setActivePlayers you can get the device_id of
 * the first player by calling convertPlayerNumberToDeviceId(0), the device_id
 * of the second player by calling convertPlayerNumberToDeviceId(1), ...
 * You can also convert device_ids to player numbers by calling
 * convertDeviceIdToPlayerNumber(device_id). You can get all device_ids that
 * are active players by calling getActivePlayerDeviceIds().
 * The screen can call this function every time a game round starts.
 * @param {number} max_players - The maximum number of controllers that should
 *                               get a player number assigned.
 */
AirConsole.prototype.setActivePlayers = function(max_players) {
  if (this.getDeviceId() != AirConsole.SCREEN) {
    throw "Only the AirConsole.SCREEN can set the active players!";
  }
  this.device_id_to_player_cache = undefined;
  var players = this.getControllerDeviceIds();
  if (max_players !== undefined) {
    players = players.slice(0, Math.min(players.length, max_players));
  }
  this.devices[AirConsole.SCREEN]["players"] = players;
  this.set_("players", players);
};


/**
 * Returns an array of device_ids of the active players previously set by the
 * screen by calling setActivePlayers. The first device_id in the array is the
 * first player, the second device_id in the array is the second player, ...
 * @returns {Array}
 */
AirConsole.prototype.getActivePlayerDeviceIds = function() {
  return this.devices[AirConsole.SCREEN]["players"] || [];
}


/**
 * Returns the device_id of a player, if the player is part of the active
 * players previously set by the screen by calling setActivePlayers. If fewer
 * players are in the game than the passed in player_number or the active
 * players have not been set by the screen, this function returns undefined.
 * @param player_number
 * @returns {number|undefined}
 */
AirConsole.prototype.convertPlayerNumberToDeviceId = function(player_number) {
  return this.getActivePlayerDeviceIds()[player_number];
};


/**
 * Returns the player number for a device_id, if the device_id is part of the
 * active players previously set by the screen by calling setActivePlayers.
 * Player numbers are zero based and are consecutive. If the device_id is not
 * part of the active players, this function returns undefined.
 * @param device_id
 * @returns {number|undefined}
 */
AirConsole.prototype.convertDeviceIdToPlayerNumber = function(device_id) {
  if (!this.device_id_to_player_cache) {
    this.device_id_to_player_cache = {};
    var players = this.devices[AirConsole.SCREEN]["players"];
    for (var i = 0; i < players.length; ++i) {
      this.device_id_to_player_cache[players[i]] = i;
    }
  }
  return this.device_id_to_player_cache[device_id];
};


/**
 * Returns the device_id of this device.
 * Every device in an AirConsole session has a device_id.
 * The screen always has device_id 0. You can use the AirConsole.SCREEN
 * constant instead of 0.
 * All controllers also get a device_id. You can NOT assume that the device_ids
 * of controllers are consecutive or that they start at 1.
 *
 * DO NOT HARDCODE CONTROLLER DEVICE IDS!
 *
 * If you want to have a logic with "players numbers" (Player 0, Player 1,
 * Player 2, Player 3) use the setActivePlayers helper function! You can
 * hardcode player numbers, but not device_ids.
 *
 * Within an AirConsole session, devices keep the same device_id when they
 * disconnect and reconnect. Different controllers will never get the same
 * device_id in a session. Every device_id remains reserved for the device that
 * originally got it.
 *
 * For more info read
 * http:// developers.airconsole.com/#/guides/device_ids_and_states
 *
 * @return {number}
 */
AirConsole.prototype.getDeviceId = function() {
  return this.device_id;
};


/**
 * Returns the globally unique id of a device.
 * @param {number|undefined} device_id - The device id for which you want the
 *                                       uid. Default is this device.
 * @return {string|undefined}
 */
AirConsole.prototype.getUID = function(device_id) {
  if (device_id === undefined) {
    device_id = this.device_id;
  }
  var device_data = this.devices[device_id];
  if (device_data) {
    return device_data.uid;
  }
};


/**
 * Returns the nickname of a user.
 * @param {number|undefined} device_id - The device id for which you want the
 *                                       nickname. Default is this device.
 *                                       Screens don't have nicknames.
 * @return {string|undefined}
 */
AirConsole.prototype.getNickname = function(device_id) {
  if (device_id === undefined) {
    device_id = this.device_id;
  }
  var device_data = this.devices[device_id];
  if (device_data) {
    return device_data.nickname || ("Guest " + device_id);
  }
};


/**
 * Returns the url to a profile picture of the user.
 * @param {number|undefined} device_id - The device id for which you want the
 *                                       profile picture. Default is this
 *                                       device. Screens don't have profile
 *                                       pictures.
 * @param {number|undefined} size - The size of in pixels of the picture.
 *                                  Default is 64.
 * @return {string|undefined}
 */
AirConsole.prototype.getProfilePicture = function(device_id, size) {
  if (device_id === undefined) {
    device_id = this.device_id;
  }
  var device_data = this.devices[device_id];
  if (device_data) {
    var url = "https://www.airconsole.com/api/profile-picture?uid=" +
        device_data.uid + "&size=" + (size||64);
    if (device_data.picture) {
      url += "&v=" + device_data.picture;
    }
    return url;
  }
};


/**
 * Returns the device ID of the master controller.
 * @return {number|undefined}
 */
AirConsole.prototype.getMasterControllerDeviceId = function() {
  return this.getControllerDeviceIds()[0];
};


/**
 * Returns all controller device ids that have loaded your game.
 * @return {Array}
 */
AirConsole.prototype.getControllerDeviceIds = function() {
  var result = [];
  var game_url = this.getGameUrl_(document.location.href);
  for (var i = AirConsole.SCREEN + 1; i < this.devices.length; ++i) {
    if (this.devices[i] &&
        this.getGameUrl_(this.devices[i].location) == game_url) {
      result.push(i);
    }
  }
  return result;
};


/**
 * Returns the current time of the game server.
 * This allows you to have a synchronized clock: You can send the server
 * time in a message to know exactly at what point something happened on a
 * device. This function can only be called if the AirConsole was instantiated
 * with the "synchronize_time" opts set to true and after onReady was called.
 * @return {number} Timestamp in milliseconds.
 */
AirConsole.prototype.getServerTime = function() {
  if (this.server_time_offset === false) {
    throw "AirConsole constructor was not called with " +
    "{synchronize_time: true}";
  }
  return new Date().getTime() + this.server_time_offset;
};


/**
 * Gets the custom DeviceState of a device.
 * @param {number|undefined} device_id - The device ID of which you want the
 *                                       custom state. Default is this device.
 * @return {Object|undefined} The custom data previously set by the device.
 */
AirConsole.prototype.getCustomDeviceState = function(device_id) {
  if (device_id === undefined) {
    device_id = this.device_id;
  }
  var device_data = this.devices[device_id];
  if (device_data && this.getGameUrl_(document.location.href) ==
      this.getGameUrl_(device_data.location)) {
    return device_data["custom"];
  }
};


/**
 * Sets the custom DeviceState of this device.
 * @param {Object} data - The custom data to set.
 */
AirConsole.prototype.setCustomDeviceState = function(data) {
  if (this.device_id !== undefined) {
    this.devices[this.device_id]["custom"] = data;
    this.set_("custom", data);
  }
};


/**
 * Sets a property in the custom DeviceState of this device.
 * @param {String} key - The property name.
 * @param {mixed} value - The property value.
 */
AirConsole.prototype.setCustomDeviceStateProperty = function(key, value) {
  if (this.device_id !== undefined) {
    var state = this.getCustomDeviceState();
    if (state === undefined) {
      state = {};
    } else if (typeof state !== "object") {
      throw "Custom DeviceState needs to be of type object";
    }
    state[key] = value;
    this.setCustomDeviceState(state);
  }
};


/**
 * Request that all devices return to the AirConsole store.
 */
AirConsole.prototype.navigateHome = function() {
  this.set_("home", true);
};


/**
 * Request that all devices load a game by url.
 */
AirConsole.prototype.navigateTo = function(url) {
  this.set_("home", url);
};


/**
 * Shows or hides the default UI.
 * @param {boolean} visible - Whether to show or hide the default UI.
 */
AirConsole.prototype.showDefaultUI = function(visible) {
  this.set_("default_ui", visible);
};


/**
 * Sets the device orientation.
 * @param {string} orientation - AirConsole.ORIENTATION_PORTRAIT or
 *                               AirConsole.ORIENTATION_LANDSCAPE.
 */
AirConsole.prototype.setOrientation = function(orientation) {
  this.set_("orientation", orientation);
};


/**
 * Requests the email address of this device and calls onEmailAddress iff the
 * request was granted. For privacy reasons, you need to whitelist your
 * game in order to receive the email address of the user. To whitelist your
 * game, contact developers@airconsole.com. For development purposes, localhost
 * is always allowed.
 */
AirConsole.prototype.requestEmailAddress = function() {
  this.set_("email", true);
};

/**
 * Returns true if a user is logged in.
 * @param {number|undefined} device_id - The device_id of the user.
 *                                       Default is this device.
 * @returns {boolean}
 */
AirConsole.prototype.isUserLoggedIn = function(device_id) {
  if (device_id == undefined) {
    device_id = this.device_id;
  }
  var data = this.devices[device_id];
  if (data) {
    return data.auth;
  }
}

/**
 * Lets the user change his nickname, profile picture and email address.
 * If you need a real nickname of the user, use this function.
 * onDeviceProfileChange will be called if the user logs in.
 */
AirConsole.prototype.editProfile = function() {
  this.set_("login", true);
};

/**
 * DeviceState contains information about a device in this session.
 * Use the helper methods getUID, getNickname, getProfilePicture and
 * getCustomDeviceState to access this data.
 * @typedef {object} AirConsole~DeviceState
 * @property {string} uid - The globally unique ID of the user.
 * @property {string|undefined} custom - Custom device data that this API can
 *                                       set.
 * @property {string|undefined} nickname - The nickname of the user.
 * @property {boolean|undefined} slow_connection - If the user has a high
 *                                                 server latency.
 */


/* --------------------- ONLY PRIVATE FUNCTIONS BELLOW --------------------- */

/**
 * Initializes the AirConsole.
 * @param {AirConsole~Config} opts - The Config.
 * @private
 */
AirConsole.prototype.init_ = function(opts) {
  opts = opts || {};
  var me = this;
  window.addEventListener('error', function(e) {
    var stack = undefined;
    if (e.error && e.error.stack) {
      stack = e.error.stack;
    }
    me.postMessage_({
                      "action": "jserror",
                      "url": document.location.href,
                      "exception": {
                        "message": e.message,
                        "error": {
                          "stack": stack
                        },
                        "filename": e.filename,
                        "lineno": e.lineno,
                        "colno": e.colno
                      }
                    });
  });
  me.version = "1.3.0";
  me.devices = [];
  me.server_time_offset = opts.synchronize_time ? 0 : false;
  window.addEventListener(
      "message",
      function (event) {
        var data = event.data;
        var game_url = me.getGameUrl_(document.location.href);
        if (data.action == "device_motion") {
          me.onDeviceMotion(data.data);
        } else if (data.action == "message") {
          if (me.device_id !== undefined) {
            if (me.devices[data.from] &&
                game_url == me.getGameUrl_(me.devices[data.from].location)) {
              me.onMessage(data.from, data.data);
            }
          }
        } else if (data.action == "update") {
          if (me.device_id !== undefined) {
            var game_url_before = null;
            var game_url_after = null;
            var before = me.devices[data.device_id];
            if (before) {
              game_url_before = me.getGameUrl_(before.location);
            }
            if (data.device_data) {
              game_url_after = me.getGameUrl_(data.device_data.location);
            }
            me.devices[data.device_id] = data.device_data;
            me.onDeviceStateChange(data.device_id, data.device_data);
            if (game_url_before != game_url && game_url_after == game_url) {
              me.onConnect(data.device_id);
            } else if (game_url_before == game_url &&
                game_url_after != game_url) {
              me.onDisconnect(data.device_id);
            } else if (data.device_data &&
                data.device_data._is_custom_update &&
                game_url_after == game_url) {
              me.onCustomDeviceStateChange(data.device_id,
                                           data.device_data.custom);
            } else if (data.device_data &&
                data.device_data._is_players_update &&
                game_url_after == game_url) {
              me.device_id_to_player_cache = null;
              me.onActivePlayersChange(me.convertDeviceIdToPlayerNumber(
                  me.getDeviceId()));
            } else if (data.device_data &&
                data.device_data._is_profile_update &&
                game_url_after == game_url) {
              me.onDeviceProfileChange(data.device_id);
            }
          }
        } else if (data.action == "ready") {
          me.device_id = data.device_id;
          me.devices = data.devices;
          if (me.server_time_offset !== false) {
            me.server_time_offset = data.server_time_offset || 0;
          }
          me.onReady(data.code);
          var game_url = me.getGameUrl_(document.location.href);
          for (var i = 0; i < me.devices.length; ++i) {
            if (i != me.getDeviceId() && me.devices[i] &&
                me.getGameUrl_(me.devices[i].location) == game_url) {
              me.onConnect(i);
              var custom_state = me.getCustomDeviceState(i);
              if (custom_state !== undefined) {
                me.onCustomDeviceStateChange(i, custom_state);
              }
            }
          }
        } else if (data.action == "profile") {
          if (me.device_id) {
            var state = me.devices[me.device_id];
            state["auth"] = data.auth;
            state["nickname"] = data.nickname;
            state["picture"] = data.picture;
            me.onDeviceStateChange(me.device_id, state);
            me.onDeviceProfileChange(me.device_id);
          }
        } else if (data.action == "email") {
          me.onEmailAddress(data.email);
        }
      },
      false);
  this.set_("orientation", opts.orientation);
  if (opts.setup_document !== false) {
    this.setupDocument_();
  }
  this.postMessage_({
    action: "ready",
    version: me.version,
    device_motion: opts.device_motion,
    synchronize_time: opts.synchronize_time,
    location: document.location.href
  });
}


/**
 * @private
 * @param {String} url - A url.
 * @return {String} Returns the root game url over http.
 */
AirConsole.prototype.getGameUrl_ = function(url) {
  if (!url) {
    return;
  }
  url = url.split("#")[0];
  url = url.split("?")[0];
  if (url.indexOf("screen.html", url.length - 11) !== -1) {
    url = url.substr(0, url.length - 11);
  }
  if (url.indexOf("controller.html", url.length - 15) !== -1) {
    url = url.substr(0, url.length - 15);
  }
  if (url.indexOf("https://") == 0)  {
    url = "http://" + url.substr(8);
  }
  return url;
};

/**
 * Posts a message to the parent window.
 * @private
 * @param {Object} data - the data to be sent to the parent window.
 */
AirConsole.prototype.postMessage_ = function(data) {
  try {
    window.parent.postMessage(data, document.referrer);
  } catch(e) {
    console.log("Posting message to parent failed: " + JSON.stringify(data));
  }
};


/**
 * Sets a variable in the external AirConsole framework.
 * @private
 * @param {string} key - The key to set.
 * @param {serializable} value - The value to set.
 */
AirConsole.prototype.set_ = function(key, value) {
  this.postMessage_({ action: "set", key: key, value: value });
};


/**
 * Adds default css rules to documents so nothing is selectable, zoom is
 * fixed to 1 and preventing scrolling down (iOS 8 clients drop out of
 * fullscreen when scrolling).
 * @private
 */
AirConsole.prototype.setupDocument_ = function() {
  var style = document.createElement("style");
  style.type = "text/css";
  var css_code =
      "html {\n" +
      "  -ms-touch-action: pan-x;\n" +
      "}\n" +
      "body {\n" +
      "  -webkit-touch-callout: none;\n" +
      "  -webkit-text-size-adjust: none;\n" +
      "  -ms-text-size-adjust: none;\n" +
      "  -webkit-user-select: none;\n" +
      "  -moz-user-select: none;\n" +
      "  -ms-user-select: none;\n" +
      "  user-select: none;\n" +
      "  -webkit-highlight: none;\n" +
      "  -webkit-tap-highlight-color: rgba(0,0,0,0);\n" +
      "  -webkit-tap-highlight-color: transparent;\n" +
      "  -ms-touch-action: pan-y;\n" +
      "  -ms-content-zooming: none;\n" +
      "}\n" +
      "\n" +
      "input, textarea  {\n" +
      "  -webkit-user-select: text;\n" +
      "  -moz-user-select: text;\n" +
      "  -ms-user-select: text;\n" +
      "  user-select: text;\n" +
      "}\n" +
      "-ms-@viewport {\n" +
      "    width: device-width;\n" +
      "    initial-scale: 1;\n" +
      "    zoom: 1;\n" +
      "    min-zoom: 1;\n" +
      "    max-zoom: 1;\n" +
      "    user-zoom: fixed;\n" +
      "}";
  if (style.styleSheet) {
    style.styleSheet.cssText = css_code;
  } else {
    style.appendChild(document.createTextNode(css_code));
  }
  var meta = document.createElement("meta");
  meta.setAttribute("name", "viewport");
  meta.setAttribute("content", "width=device-width, minimum-scale=1, " +
                    "initial-scale=1, user-scalable=no");
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(meta);
  head.appendChild(style);
  document.addEventListener('touchmove', function (e) {
    e.preventDefault();
  });
};
;
var __map_reserved = {}
js_Boot.__toStr = {}.toString;
lcann_reversed_Assets.player = lcann_reversed_Assets.getImage("res/pla.png");
lcann_reversed_Assets.bulletPlayer = lcann_reversed_Assets.getImage("res/bpl.png");
lcann_reversed_Assets.pointToken = lcann_reversed_Assets.getImage("res/scr.png");
lcann_reversed_Assets.explosionPart = lcann_reversed_Assets.getImage("res/exp.png");
lcann_reversed_Assets.bulletNormal = lcann_reversed_Assets.getImage("res/bno.png");
lcann_reversed_Assets.bulletSmall = lcann_reversed_Assets.getImage("res/bsm.png");
lcann_reversed_Assets.enemyBlocker = lcann_reversed_Assets.getImage("res/ebl.png");
lcann_reversed_Assets.enemyOneShot = lcann_reversed_Assets.getImage("res/ess.png");
lcann_reversed_Assets.enemyThreeShot = lcann_reversed_Assets.getImage("res/ets.png");
lcann_reversed_Assets.enemyTunnelShooter = lcann_reversed_Assets.getImage("res/etl.png");
lcann_reversed_ReversableGameObject.maxReverseDuration = 10;
lcann_reversed_ReversableGameObject.easeTime = 0.5;
lcann_reversed_PlayRoom.maxSetDistance = 10;
lcann_reversed_PlayRoom.minSetDistance = 3;
lcann_reversed_Player.baseMoveSpeed = 80;
lcann_reversed_Player.focusMoveSpeed = 50;
lcann_reversed_Player.grazeRadius = 16;
lcann_reversed_Player.hitRadius = 2;
lcann_reversed_Player.fireDelay = 0.5;
lcann_reversed_Player.bombDuration = 5;
lcann_reversed_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
