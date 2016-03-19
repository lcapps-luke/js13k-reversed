package lcann.reversed.control;

import js.Browser;
import js.html.KeyboardEvent;


/**
 * ...
 * @author Luke Cann
 */
class Keyboard{
	private var keyDown:Array<Bool>;
	
	public function new() {
		keyDown = new Array<Bool>();
		
		Browser.window.addEventListener("keydown", onKeyDown);
		Browser.window.addEventListener("keyup", onKeyUp);
	}
	
	private function onKeyDown(e:KeyboardEvent):Void{
		e.preventDefault();
		keyDown[e.keyCode] = true;
	}
	
	private function onKeyUp(e:KeyboardEvent):Void{
		e.preventDefault();
		keyDown[e.keyCode] = false;
	}
	
	public function isKeyDown(keyCode:Int):Bool{
		if(keyDown.length < keyCode){
			return false;
		}
		
		return keyDown[keyCode] == true ? true : false;
	}
}