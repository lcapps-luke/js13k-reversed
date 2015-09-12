package lcann.reversed;

import js.html.CanvasRenderingContext2D;

/**
 * ...
 * @author Luke Cann
 */
class GameRoom implements Updateable{
	private var objectPartition:Map<String, List<GameObject>>;
	
	public var width(default, null):Float;
	public var height(default, null):Float;
	
	public function new(width:Float, height:Float) {
		objectPartition = new Map<String, List<GameObject>>();
		
		this.width = width;
		this.height = height;
		
		restart();
	}
	
	public function update(c:CanvasRenderingContext2D, s:Float):Void{
		for(p in objectPartition){
			for(o in p){
				o.update(c, s);
			}
		}
	}
	
	public function add(obj:GameObject, partition:String = "default"):Void {
		var list:List<GameObject> = objectPartition.get(partition);
		if(list == null){
			list = new List<GameObject>();
			objectPartition.set(partition, list);
		}
		
		list.add(obj);
		obj.room = this;
		obj.partition = partition;
	}
	
	public function remove(obj:GameObject, partition:String = null):Void {
		var list:List<GameObject> = objectPartition.get(partition == null ? obj.partition : partition);
		
		list.remove(obj);
		obj.room = null;
		obj.partition = null;
	}
	
	public function getObjectIterator(partition:String = "default"):Iterator<GameObject> {
		var list:List<GameObject> = objectPartition.get(partition);
		if(list == null){
			list = new List<GameObject>();
			objectPartition.set(partition, list);
		}
		return list.iterator();
	}
	
	public function restart():Void{
		for(p in objectPartition){
			p.clear();
		}
	}
}