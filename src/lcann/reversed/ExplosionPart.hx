package lcann.reversed;
import js.html.CanvasRenderingContext2D;

/**
 * ...
 * @author Luke Cann
 */
class ExplosionPart extends ReversableGameObject{
	private var alpha:Float;
	
	public function new(x:Float, y:Float, randomDistance:Float = 0, initialYSpeed:Float = 0) {
		super();
		
		if(randomDistance != 0){
			this.x = (x - randomDistance) + Math.random() * (randomDistance * 2);
			this.y = (y - randomDistance) + Math.random() * (randomDistance * 2);
		}else{
			this.x = x;
			this.y = y;
		}
		
		ySpeed = initialYSpeed;
		addForce(5 + Math.random() * 5, Math.random() * (Math.PI * 2));
		alpha = 1;
	}
	
	override function reversableUpdate(c:CanvasRenderingContext2D, s:Float):Void {
		super.reversableUpdate(c, s);
		
		alpha -= 0.4 * s;
		if(alpha <= 0 && s > 0){
			die();
		}
		if(alpha > 1){
			alpha = 1;
		}
		
		c.globalAlpha = alpha < 0 ? 0 : alpha;
		c.drawImage(Assets.explosionPart, x - 8, y - 8);
		c.globalAlpha = 1;
	}
}