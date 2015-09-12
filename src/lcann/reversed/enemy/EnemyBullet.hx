package lcann.reversed.enemy;

import js.html.CanvasRenderingContext2D;
import js.html.Image;
import lcann.reversed.GameObject;
import lcann.reversed.ReversableGameObject;

/**
 * ...
 * @author Luke Cann
 */
class EnemyBullet extends ReversableGameObject {
	public var radius(default, null):Float;
	public var grazed:Bool;
	
	private var image:Image;
	private var rotate:Bool;

	public function new(image:Image, radius:Float = 8, rotate:Bool = false) {
		super();
		this.image = image;
		this.radius = radius;
		this.rotate = rotate;
		
		grazed = false;
	}
	
	override public function reversableUpdate(c:CanvasRenderingContext2D, s:Float):Void {
		if(rotate){
			drawRotation(c, image, -image.width / 2, -image.height / 2, direction);
		}else{
			c.drawImage(image, x -image.width / 2, y -image.height / 2);
		}
		
		if(x < -radius || x > room.width + radius || y < -radius || y > room.height + radius){
			die();
		}
	}
}