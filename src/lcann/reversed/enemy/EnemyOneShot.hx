package lcann.reversed.enemy;
import js.html.CanvasRenderingContext2D;

/**
 * ...
 * @author Luke Cann
 */
class EnemyOneShot extends EnemyShooter{
	public function new() {
		super();
		life = 5;
		ySpeed = 20;
		shootTimer = 3;
		value = 3;
	}
	
	override function shoot():Void {
		super.shoot();
		
		var b:EnemyBullet = new EnemyBullet(Assets.bulletNormal);
		b.x = x;
		b.y = y;
		b.addForce(40, directionToObject(target));
		room.add(b, "bullet");
		
		shootTimer = 5;
	}
	
	override function draw(c:CanvasRenderingContext2D):Void {
		c.drawImage(Assets.enemyOneShot, x - 16, y - 16);
	}
}