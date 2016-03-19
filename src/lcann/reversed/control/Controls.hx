package lcann.reversed.control;

import airconsole.AirConsole;
import js.html.KeyboardEvent;

/**
 * ...
 * @author Luke Cann
 */
class Controls{
	private var keyboard:Keyboard;
	private var airConsole:AirConsole;
	
	private var acMove:ControlMovement;
	private var acShoot:Bool;
	private var acBomb:Bool;
	
	public function new() {
		keyboard = new Keyboard();
		
		#if airconsole
		airConsole = new AirConsole();
		airConsole.onMessage = onAirConsoleMessage;
		#end
		
		acMove = { x: 0, y: 0};
		acShoot = false;
		acBomb = false;
	}
	
	private function onAirConsoleMessage(deviceId:Int, message:Dynamic){
		if (Reflect.hasField(message, "joystick-left")) {
			var joystick:AirConsoleJoystickEvent = Reflect.field(message, "joystick-left");
			if(joystick.pressed){
				acMove.x = joystick.message.x;
				acMove.y = joystick.message.y;
			}else{
				acMove.x = 0;
				acMove.y = 0;
			}
		}
		
		if (Reflect.hasField(message, "Z")) {
			var button:AirConsoleButtonEvent = Reflect.field(message, "Z");
			acShoot = button.pressed;
		}
		
		if (Reflect.hasField(message, "X")) {
			var button:AirConsoleButtonEvent = Reflect.field(message, "X");
			acBomb = button.pressed;
		}
	}
	
	public function isShooting():Bool{
		return keyboard.isKeyDown(KeyboardEvent.DOM_VK_Z) || acShoot;
	}
	
	public function isBombing():Bool{
		return keyboard.isKeyDown(KeyboardEvent.DOM_VK_X) || acBomb;
	}
	
	public function isFocus():Bool{
		return keyboard.isKeyDown(KeyboardEvent.DOM_VK_SHIFT);
	}
	
	public function getMovement():ControlMovement{
		var mx:Float = acMove.x;
		var my:Float = acMove.y;
		
		if(keyboard.isKeyDown(KeyboardEvent.DOM_VK_UP)){
			my -= 1.0;
		}
		if(keyboard.isKeyDown(KeyboardEvent.DOM_VK_RIGHT)){
			mx += 1.0;
		}
		if(keyboard.isKeyDown(KeyboardEvent.DOM_VK_DOWN)){
			my += 1.0;
		}
		if(keyboard.isKeyDown(KeyboardEvent.DOM_VK_LEFT)){
			mx -= 1.0;
		}
		
		if(mx != 0.0 || my != 0.0){
			var md:Float = Math.atan2(my, mx);
			return { 
				x: Math.cos(md) * Math.abs(mx),
				y: Math.sin(md) * Math.abs(my)
			};
		}else{
			return { x: 0, y: 0};
		}
	}
}