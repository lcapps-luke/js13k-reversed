package lcann.reversed;
import js.html.CanvasRenderingContext2D;

/**
 * ...
 * @author Luke Cann
 */
class PointToken extends GameObject{

	public function new(x:Float, y:Float) {
		super();
		
		this.x = x;
		this.y = y;
		
		gravityDirection = Math.PI * 0.5;
		gravity = 4;
		
		addForce(18, Math.PI * 1.25 + Math.random() * (Math.PI * 0.5));
	}
	
	override public function update(c:CanvasRenderingContext2D, s:Float):Void {
		super.update(c, s);
		
		if(speed > 18){
			speed = 18;
		}
		
		c.drawImage(Assets.pointToken, x - 4, y - 4);
		
		if(x > room.width + 4 || x < -4 || y > room.height + 4){
			room.remove(this);
		}
	}
}