package lcann.reversed;

import js.html.CanvasRenderingContext2D;

/**
 * @author Luke Cann
 */

interface Updateable {
	public function update(c:CanvasRenderingContext2D, s:Float):Void;
}