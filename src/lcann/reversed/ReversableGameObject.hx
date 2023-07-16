package lcann.reversed;
import js.html.CanvasRenderingContext2D;

/**
 * ...
 * @author Luke Cann
 */
class ReversableGameObject extends GameObject{
	private var lifeTimer:Float;
	private var deathTimer:Float;
	
	private static inline var maxReverseDuration = 10;
	private var reverseTimer:Float;
	private static inline var easeTime:Float = 0.5;
	private var timeSpeed:Float;
	
	
	private var alive:Bool;
	private var forward:Bool;
	
	public function new() {
		super();
		
		lifeTimer = 0;
		deathTimer = 0;
		forward = true;
		alive = true;
		reverseTimer = 0;
		timeSpeed = 1;
	}
	
	override public function update(c:CanvasRenderingContext2D, s:Float):Void {		
		if(forward){
			if(timeSpeed < 1){
				timeSpeed += easeTime * s;
				if(timeSpeed > 1){
					timeSpeed = 1;
				}
			}
		}else{
			if(timeSpeed > -1){
				timeSpeed -= easeTime * s;
				if(timeSpeed < -1){
					timeSpeed = -1;
				}
			}
			
			reverseTimer -= s;
			if(reverseTimer <= 0){
				forward = true;
			}
		}
		
		if (alive) {
			lifeTimer += s * timeSpeed;
			
			if (lifeTimer > 0) {
				super.update(c, s * timeSpeed);
				reversableUpdate(c, s * timeSpeed);
			}
		}else {
			super.update(c, s * timeSpeed);
			
			deathTimer += s * timeSpeed;
			if(deathTimer <= 0){
				alive = true;
			}
			
			if(deathTimer > maxReverseDuration){
				room.remove(this);
			}
		}
	}
	
	private function reversableUpdate(c:CanvasRenderingContext2D, s:Float):Void{
		
	}
	
	public function startReverse(duration:Float):Void{
		forward = false;
		reverseTimer = duration;
		
		timeSpeed = 0;
	}
	
	public function die():Void{
		alive = false;
		deathTimer = 0;
	}
}