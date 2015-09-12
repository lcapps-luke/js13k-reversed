package lcann.reversed.enemy;
import js.html.CanvasRenderingContext2D;
import lcann.reversed.ExplosionPart;
import lcann.reversed.GameObject;
import lcann.reversed.GameRoom;
import lcann.reversed.PointToken;
import lcann.reversed.ReversableGameObject;

/**
 * ...
 * @author Luke Cann
 */
class Enemy extends ReversableGameObject{
	private var life:Float;
	public var radius(default, null):Float;
	private var value:Int;
	
	private var target:GameObject;
	
	private function new() {
		super();
		life = 2;
		radius = 16;
		value = 1;
	}
	
	override function set_room(room:GameRoom):GameRoom {
		if(room != null){
			for(o in room.getObjectIterator("player")){
				if(Type.getClass(o) == Player){
					target = o;
					break;
				}
			}
		}
		
		return super.set_room(room);
	}
	
	override public function reversableUpdate(c:CanvasRenderingContext2D, s:Float):Void {
		for(o in room.getObjectIterator("playerBullet")){
			if(Type.getClass(o) == PlayerBullet){
				if(bulletCollide(cast(o))){
					return;
				}
			}
		}
		
		draw(c);
		
		if(y > room.height + radius){
			die();
		}
	}
	
	function draw(c:CanvasRenderingContext2D):Void{
		c.fillStyle = "#00FF00";
		c.fillRect(x - radius, y - radius, radius * 2, radius * 2);
	}
	
	private function bulletCollide(o:PlayerBullet):Bool{
		if(distanceToObject(o) < radius + o.radius){
			room.remove(o);
			life -= 1;
			
			if(life <= 0){
				for(i in 0...value){
					room.add(new PointToken(x, y), "score");
				}
				
				for(i in 0...5){
					room.add(new ExplosionPart(x, y, 16, ySpeed), "particle");
				}
				
				room.remove(this);
				return true;
			}
		}
		
		return false;
	}
}