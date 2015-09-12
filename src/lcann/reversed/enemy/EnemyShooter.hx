package lcann.reversed.enemy;
import js.html.CanvasRenderingContext2D;

/**
 * ...
 * @author Luke Cann
 */
class EnemyShooter extends Enemy{
	private var shootTimer : Float;	
	
	private function new() {
		super();
		shootTimer = -1;
	}
	
	override public function reversableUpdate(c:CanvasRenderingContext2D, s:Float):Void {
		super.reversableUpdate(c, s);
		
		if(room == null){
			return;
		}
		
		if(shootTimer > 0 && y < room.height * 0.75){
			shootTimer -= s;
			
			if(shootTimer <= 0){
				shoot();
			}
		}
	}
	
	private function shoot():Void{
		
	}
}