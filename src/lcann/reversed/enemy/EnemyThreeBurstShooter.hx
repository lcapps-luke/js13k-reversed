package lcann.reversed.enemy;
import js.html.CanvasRenderingContext2D;
import js.html.Image;

/**
 * ...
 * @author Luke Cann
 */
class EnemyThreeBurstShooter extends EnemyShooter{

	public function new() {
		super();
		shootTimer = 3;
		ySpeed = 20;
		value = 4;
	}
	
	override function shoot():Void {
		super.shoot();
		
		var spread = 0.5;
		var startDir = directionToObject(target) - spread;
		for(i in 0...3){
			var b = new EnemyBullet(Assets.bulletNormal);
			b.x = x;
			b.y = y;
			b.addForce(30, startDir + (spread * i));
			room.add(b, "bullet");
		}
		
		shootTimer = 7;
	}
	
	override function draw(c:CanvasRenderingContext2D):Void {
		c.drawImage(Assets.enemyThreeShot, x - 16, y - 16);
	}
}