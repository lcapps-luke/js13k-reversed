package lcann.reversed.enemy;
import js.html.CanvasRenderingContext2D;
import js.html.Image;

/**
 * ...
 * @author Luke Cann
 */
class EnemyTunnelShooter extends EnemyShooter{
	private var shootQty:Int;
	private var targetDirection:Float;
	private var lx:Float;
	private var ly:Float;
	private var rx:Float;
	private var ry:Float;
	
	public function new() {
		super();
		
		life = 5;
		
		ySpeed = 20;
		shootTimer = 5;
		
		shootQty = 10;
		targetDirection = 0;
		
		value = 5;
	}
	
	override function draw(c:CanvasRenderingContext2D):Void {
		c.drawImage(Assets.enemyTunnelShooter, x - 16, y - 16);
	}
	
	override function shoot():Void {
		super.shoot();
		
		if(ySpeed > 0){
			ySpeed = 0;
			targetDirection = directionToObject(target);
			
			lx = GameObject.lengthDirX(16, targetDirection + Math.PI / 2);
			ly = GameObject.lengthDirY(16, targetDirection + Math.PI / 2);
			rx = GameObject.lengthDirX(16, targetDirection - Math.PI / 2);
			ry = GameObject.lengthDirY(16, targetDirection - Math.PI / 2);
		}
		
		var lb = new EnemyBullet(Assets.bulletSmall, 4, true);
		lb.x = x + lx;
		lb.y = y + ly;
		lb.addForce(30, targetDirection);
		room.add(lb, "bullet");
		
		var rb = new EnemyBullet(Assets.bulletSmall, 4, true);
		rb.x = x + rx;
		rb.y = y + ry;
		rb.addForce(30, targetDirection);
		room.add(rb, "bullet");
		
		shootQty -= 1;
		if(shootQty <= 0){
			shootTimer = 5;
			shootQty = 10;
			ySpeed = 20;
		}else{
			shootTimer = 0.4;
		}
	}
}