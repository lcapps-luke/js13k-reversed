package lcann.reversed;
import js.html.CanvasRenderingContext2D;

/**
 * ...
 * @author Luke Cann
 */
class PlayerBullet extends GameObject{
	public var radius(default, null):Float;
	
	public function new() {
		super();
		radius = 7;
	}
	
	override public function update(c:CanvasRenderingContext2D, s:Float):Void {
		super.update(c, s);
		
		if(y < 0){
			room.remove(this);
			return;
		}
		
		c.drawImage(Assets.bulletPlayer, x - 7, y - 11);
	}
	
}