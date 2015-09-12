package lcann.reversed.background;

import js.html.CanvasRenderingContext2D;
import lcann.reversed.ReversableGameObject;

/**
 * ...
 * @author Luke Cann
 */
class BackgroundScroll extends ReversableGameObject {
	private var width:Float;
	private var viewHeight:Float;
	private var length:Float;
	private var scrollSpeed:Float;
	
	private var nodeLeft:List<Point>;
	private var nodeRight:List<Point>;
	
	private var leftNodeRoot:Float;
	private var rightNodeRoot:Float;
	private var nodeMaxOffset:Float;
	private var nodeGap:Float;
	
	private var colour:String;
	
	public function new(viewWidth:Float, viewHeight:Float, gapWidth:Float, nodeGap:Float, speed:Float, loopDuration:Float, colour:String) {
		super();
		
		nodeLeft = new List<Point>();
		nodeRight = new List<Point>();
		
		width = viewWidth;
		this.viewHeight = viewHeight;
		this.scrollSpeed = speed;
		length = viewHeight + speed * (loopDuration * 2);
		this.colour = colour;
		
		var nodeCount:Int = Math.floor(length / nodeGap);
		
		nodeMaxOffset = nodeGap * 0.4;
		leftNodeRoot = (viewWidth / 2 - gapWidth / 2) - nodeMaxOffset / 2;
		rightNodeRoot = (viewWidth / 2 + gapWidth / 2) - nodeMaxOffset / 2;
		
		this.nodeGap = nodeGap;
		
		var lastLeft:Point = null;
		var lastRight:Point = null;
		for (i in 0...nodeCount + 1) {
			var left = new Point();
			left.x = leftNodeRoot + Math.random() * nodeMaxOffset;
			left.y = (-nodeGap) + nodeGap * i + Math.random() * nodeMaxOffset;
			left.parent = lastLeft;
			nodeLeft.add(left);
			
			var right = new Point();
			right.x = rightNodeRoot + Math.random() * nodeMaxOffset;
			right.y = (-nodeGap) + nodeGap * i + Math.random() * nodeMaxOffset;
			right.parent = lastRight;
			nodeRight.add(right);
			
			lastLeft = left;
			lastRight = right;
		}
		
	}
	
	override public function reversableUpdate(c:CanvasRenderingContext2D, s:Float):Void {
		var d:Float = scrollSpeed * s;
		
		c.fillStyle = colour;
		
		updateSide(c, d, nodeLeft, leftNodeRoot, 0);
		updateSide(c, d, nodeRight, rightNodeRoot, width);
	}
	
	private function updateSide(c:CanvasRenderingContext2D, d:Float, nodeList:List<Point>, nodeRoot:Float, edge:Float):Void {
		for(l in nodeList){
			if(l.y <= 0 && l.y + d > 0 && d > 0 && l.parent == null){
				var n = new Point();
				n.x = nodeRoot + Math.random() * nodeMaxOffset;
				n.y = (l.y - nodeGap) + Math.random() * nodeMaxOffset;
				nodeList.add(n);
				l.parent = n;
			}
			
			l.y += d;
			
			if(l.y > length){
				nodeList.remove(l);
				continue;
			}
			
			if (l.y > 0 && l.parent != null && l.parent.y < viewHeight) {
				c.beginPath();
				
				c.moveTo(edge, l.y + 1);
				c.lineTo(l.x, l.y + 1);
				c.lineTo(l.parent.x, l.parent.y - 1);
				c.lineTo(edge, l.parent.y - 1);
				
				c.closePath();
				c.fill();
			}
		}
	}
}