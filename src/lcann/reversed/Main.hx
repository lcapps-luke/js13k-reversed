package lcann.reversed;

import js.Browser;
import js.Lib;
import js.html.HTMLDocument;
import js.html.Window;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import js.html.CanvasPattern;

/**
 * ...
 * @author Luke Cann
 */
class Main {
	public static var keyboard(default,null):Keyboard;
	
	private var canvasElement : CanvasElement;
	private var context : CanvasRenderingContext2D;
	private var room : GameRoom;
	
	static function main() {
		keyboard = new Keyboard();
		
		var main:Main = new Main();
	}
	
	public function new() {
		canvasElement = cast(Browser.document.getElementById("lcann_reversed"));
		context = canvasElement.getContext2d();
		
		room = new PlayRoom(canvasElement.width, canvasElement.height);
		
		Browser.window.setInterval(onUpdate, 1000 / 60);
	}
	
	private function onUpdate():Void {
		var s:Float = 1 / 60;
		
		context.fillStyle = "#000";
		context.fillRect(0, 0, canvasElement.width, canvasElement.height);
		room.update(context, s);
	}
}