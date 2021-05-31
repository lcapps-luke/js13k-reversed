package lcann.reversed;

import js.Browser;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;

/**
 * ...
 * @author Luke Cann
 */
class Main {
	public static var keyboard(default,null):Keyboard;
	
	private var canvasElement : CanvasElement;
	private var context : CanvasRenderingContext2D;
	private var room : GameRoom;
	public static var lastFrame:Float = 0;
	
	static function main() {
		keyboard = new Keyboard();
		new Main();
	}
	
	public function new() {
		canvasElement = cast(Browser.document.getElementsByTagName("canvas")[0]);
		context = canvasElement.getContext2d();
		
		room = new PlayRoom(canvasElement.width, canvasElement.height);
		
		Browser.window.requestAnimationFrame(onUpdate);
	}
	
	private function onUpdate(thisFrame:Float):Void {
		var s:Float = (thisFrame - lastFrame) / 1000;
		lastFrame = thisFrame;
		
		context.fillStyle = "#000";
		context.fillRect(0, 0, canvasElement.width, canvasElement.height);
		room.update(context, s);

		Browser.window.requestAnimationFrame(onUpdate);
	}
}