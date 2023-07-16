package lcann.reversed.enemy;
import js.html.CanvasRenderingContext2D;

/**
 * ...
 * @author Luke Cann
 */
class EnemyKamikazi extends Enemy{

	public function new() {
		super();
		life = 2;
		ySpeed = 60;
		value = 2;
	}
	
	override function draw(c:CanvasRenderingContext2D):Void {
		//super.draw(c);
		c.drawImage(Assets.enemyBlocker, x - 16, y - 16);
	}
}