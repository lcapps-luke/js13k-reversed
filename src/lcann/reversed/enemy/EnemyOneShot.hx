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
		ySpeed = 40;
		shootTimer = 2;
		value = 3;
	}
	
	override function shoot():Void {
		super.shoot();
		
		var b:EnemyBullet = new EnemyBullet(Assets.bulletNormal);
		b.x = x;
		b.y = y;
		b.addForce(80, directionToObject(target));
		room.add(b, "bullet");
		
		shootTimer = 2;
	}
	
	override function draw(c:CanvasRenderingContext2D):Void {
		c.drawImage(Assets.enemyOneShot, x - 16, y - 16);
	}
}