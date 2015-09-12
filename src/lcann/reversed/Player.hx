package lcann.reversed;
import js.html.CanvasRenderingContext2D;
import js.html.Image;
import js.html.KeyboardEvent;
import lcann.reversed.GameRoom;
import lcann.reversed.enemy.EnemyBullet;
import lcann.reversed.enemy.Enemy;
import js.Browser;

/**
 * ...
 * @author Luke Cann
 */
class Player extends GameObject {
	private static var baseMoveSpeed:Float = 80;
	private static var focusMoveSpeed:Float = 50;
	private static var grazeRadius:Float = 16;
	private static var hitRadius:Float = 2;
	private static var fireDelay:Float = 0.5;
	private static var bombDuration:Float = 5;
	
	public var graze(default, null):Int;
	public var score(default, null):Int;
	
	private var fireTimer:Float;
	public var bombCooldown(default, null):Float;
	public var bombQty(default, null):Float;
	private var bombTimer:Float;
	
	private var alive:Bool;
	
	public function new() {
		super();
		
		fireTimer = 0;
		graze = 0;
		score = 0;
		bombCooldown = 0;
		bombQty = 1;
		bombTimer = 0;
		
		alive = true;
	}
	
	override function set_room(room:GameRoom):GameRoom {
		x = room.width * 0.5;
		y = room.height * 0.8;
		return super.set_room(room);
	}
	
	public override function update(c:CanvasRenderingContext2D, s:Float):Void {
		doControls();
		super.update(c, s);
		
		if(!alive){
			return;
		}
		
		//Shooting
		fireTimer += s;
		if(Main.keyboard.isKeyDown(KeyboardEvent.DOM_VK_Z)){
			if(fireTimer >= fireDelay){
				fireTimer = 0;
				var bullet:PlayerBullet = new PlayerBullet();
				bullet.x = x;
				bullet.y = y;
				bullet.ySpeed = -400;
				room.add(bullet, "playerBullet");
			}
		}
		
		//Bombing
		if(bombCooldown > 0){
			bombCooldown -= s;
		}
		if(bombTimer > 0){
			bombTimer -= s;
		}
		var bomb = false;
		if(Main.keyboard.isKeyDown(KeyboardEvent.DOM_VK_X)){
			if(bombCooldown <= 0 && bombQty >= 1){
				bombCooldown = bombDuration * 4;
				bomb = true;
				cast(room, PlayRoom).reverse(bombDuration);
				bombQty -= 1;
				bombTimer = bombDuration * 1.5;
			}
		}
		
		//Interaction
		for(o in room.getObjectIterator("bullet")){
			if(Type.getClass(o) == EnemyBullet){
				bulletCollide(cast(o));
			}
			
			if(bomb && Std.is(o, ReversableGameObject)){
				cast(o, ReversableGameObject).startReverse(bombDuration);
			}
		}
		
		for(e in room.getObjectIterator("enemy")){
			if(Std.is(e, Enemy)){
				enemyCollide(cast(e));
			}
			
			if(bomb && Std.is(e, ReversableGameObject)){
				cast(e, ReversableGameObject).startReverse(bombDuration);
			}
		}
		
		for(t in room.getObjectIterator("score")){
			if(Type.getClass(t) == PointToken){
				scoreCollide(cast(t));
			}
		}
		
		//Draw
		c.drawImage(Assets.player, x - grazeRadius, y - grazeRadius);
		if (bombTimer > 0) {
			c.strokeStyle = "#0000FF";
			c.beginPath();
			c.arc(x, y, grazeRadius * 2, 0, Math.PI * 2);
			c.stroke();
		}
	}
	
	private function doControls():Void{
		var mx:Float = 0.0;
		var my:Float = 0.0;
		if(Main.keyboard.isKeyDown(KeyboardEvent.DOM_VK_UP) && y > grazeRadius){
			my -= 1.0;
		}
		if(Main.keyboard.isKeyDown(KeyboardEvent.DOM_VK_RIGHT) && x < room.width - grazeRadius){
			mx += 1.0;
		}
		if(Main.keyboard.isKeyDown(KeyboardEvent.DOM_VK_DOWN) &&  y < room.height - grazeRadius){
			my += 1.0;
		}
		if(Main.keyboard.isKeyDown(KeyboardEvent.DOM_VK_LEFT) && x > grazeRadius){
			mx -= 1.0;
		}
		if(mx != 0.0 || my != 0.0){
			var md:Float = Math.atan2(my, mx);
			var ms:Float = Main.keyboard.isKeyDown(KeyboardEvent.DOM_VK_SHIFT) ? focusMoveSpeed : baseMoveSpeed;
			
			xSpeed = Math.cos(md) * ms;
			ySpeed = Math.sin(md) * ms;
		}else{
			xSpeed = 0;
			ySpeed = 0;
		}
	}
	
	private function bulletCollide(b:EnemyBullet):Void{
		var dist:Float = distanceToObject(b);
		
		if(dist < grazeRadius + b.radius && !b.grazed){
			b.grazed = true;
			graze += 1;
			score += 3;
			
			bombQty += 1 / ((Math.ffloor(bombQty) + 1) * 20 + Math.ffloor(bombQty) * 20);
			if(bombQty > 3){
				bombQty = 3;
			}
		}
		
		hitCheck(b, b.radius);
	}
	
	private function enemyCollide(e:Enemy):Void{
		hitCheck(e, e.radius);
	}
	
	private function hitCheck(o:GameObject, otherRadius:Float):Void{
		var dist:Float = distanceToObject(o);
		
		if(bombTimer > 0 && dist < grazeRadius * 2){
			room.remove(o);
		}
		
		if (dist < hitRadius + otherRadius) {
			for(i in 0...20){
				room.add(new ExplosionPart(x, y, 16));
			}
			
			alive = false;
			Browser.window.setTimeout(room.restart, 3000);
		}
	}
	
	private function scoreCollide(s:PointToken):Void {
		if(distanceToObject(s) < grazeRadius + 4){
			score += Math.ceil(bombQty);
			room.remove(s);
		}
	}
}