package lcann.reversed;

import js.html.CanvasRenderingContext2D;
import js.html.Image;

/**
 * ...
 * @author Luke Cann
 */
class GameObject implements Updateable{
	public var x : Float;
	public var y : Float;
	
	public var xSpeed : Float;
	public var ySpeed : Float;
	public var direction(get, set):Float;
	public var speed(get, set):Float;
	
	public var gravity:Float;
	public var gravityDirection:Float;
	
	public var room(default, set):GameRoom;
	public var partition:String;
	
	private function new(){
		x = 0;
		y = 0;
		xSpeed = 0;
		ySpeed = 0;
		gravity = 0;
		gravityDirection = 0;
	}
	
	public function update(c:CanvasRenderingContext2D, s:Float):Void{
		x += xSpeed * s;
		y += ySpeed * s;
		
		if(gravity != 0){
			addForce(gravity * s, gravityDirection);
		}
	}
	
	private function get_direction():Float{
		return Math.atan2(ySpeed, xSpeed);
	}
	
	private function set_direction(direction:Float):Float{
		var speed:Float = speed;
		xSpeed = lengthDirX(speed, direction);
		ySpeed = lengthDirY(speed, direction);
		return direction;
	}
	
	private function get_speed():Float{
		return Math.sqrt(Math.pow(xSpeed, 2) + Math.pow(ySpeed, 2));
	}
	
	private function set_speed(speed:Float):Float{
		var direction:Float = direction;
		xSpeed = lengthDirX(speed, direction);
		ySpeed = lengthDirY(speed, direction);
		return speed;
	}
	
	public function distanceToObject(o:GameObject):Float{
		return distanceToPoint(o.x, o.y);
	}
	
	public function distanceToPoint(xx:Float, yy:Float):Float{
		return Math.sqrt(Math.pow(x - xx, 2) + Math.pow(y - yy, 2));
	}
	
	public function directionToObject(o:GameObject):Float{
		return Math.atan2(o.y - y, o.x - x);
	}
	
	public static function lengthDirX(length:Float, direction:Float):Float{
		return Math.cos(direction) * length;
	}
	
	public static function lengthDirY(length:Float, direction:Float):Float{
		return Math.sin(direction) * length;
	}
	
	private function set_room(room:GameRoom):GameRoom{
		return this.room = room;
	}
	
	public function addForce(speed:Float, direction:Float):Void{
		xSpeed += lengthDirX(speed, direction);
		ySpeed += lengthDirY(speed, direction);
	}
	
	public function drawRotation(c:CanvasRenderingContext2D, image:Image, x:Float, y:Float, angle:Float):Void{
		c.save();
		c.translate(this.x, this.y);
		c.rotate(angle);
		c.drawImage(image, x, y);
		c.restore();
	}
}