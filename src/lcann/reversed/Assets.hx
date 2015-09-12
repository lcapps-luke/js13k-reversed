package lcann.reversed;
import js.html.Image;
import js.html.ImageElement;

/**
 * ...
 * @author Luke Cann
 */
class Assets {
	public static var player:Image = getImage("res/pla.png");
	public static var bulletPlayer:Image = getImage("res/bpl.png");
	public static var pointToken:Image = getImage("res/scr.png");
	public static var explosionPart:Image = getImage("res/exp.png");
	
	public static var bulletNormal:Image = getImage("res/bno.png");
	public static var bulletSmall:Image = getImage("res/bsm.png");
	
	public static var enemyBlocker:Image = getImage("res/ebl.png");
	public static var enemyOneShot:Image = getImage("res/ess.png");
	public static var enemyThreeShot:Image = getImage("res/ets.png");
	public static var enemyTunnelShooter:Image = getImage("res/etl.png");
	
	private function new() {
		
	}
	
	public static function getImage(name:String):Image{
		var image = new Image();
		image.src = name;
		return image;
	}
	
}