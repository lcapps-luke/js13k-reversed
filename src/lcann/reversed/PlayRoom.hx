package lcann.reversed;

import js.Browser;
import js.html.CanvasRenderingContext2D;
import lcann.reversed.background.BackgroundScroll;
import lcann.reversed.control.Controls;
import lcann.reversed.enemy.Enemy;
import lcann.reversed.enemy.EnemyKamikazi;
import lcann.reversed.enemy.EnemyOneShot;
import lcann.reversed.enemy.EnemyThreeBurstShooter;
import lcann.reversed.enemy.EnemyTunnelShooter;

/**
 * ...
 * @author Luke Cann
 */
class PlayRoom extends GameRoom{	
	private static var maxSetDistance:Float = 10;
	private static var minSetDistance:Float = 3;
	private var waveDifficultyPerSecond:Float;
	private var waveTimer:Float;
	private var waveDifficultyAccumulator:Float;
	private var nextSet:List<Enemy>;
	private var nextSetDifficulty:Int;
	
	private var farBack:BackgroundScroll;
	private var nearBack:BackgroundScroll;
	
	private var control:Controls;
	private var player:Player;
	private var bestScore:Int;
	private var lastScore:Int;
	private var menu:Bool;
	
	public function new(width:Float, height:Float) {
		control = new Controls();
		
		nextSet = new List<Enemy>();
		super(width, height - 24);
		
		farBack = new BackgroundScroll(width, height, width / 4, 128, 12, 10, "#131313");
		nearBack = new BackgroundScroll(width, height, width / 1.5, 128, 15, 10, "#212121");
		#if airconsole
		bestScore = 0;
		#else
		bestScore = Std.parseInt(Browser.window.localStorage.getItem("lcr_score"));
		#end
		lastScore = 0;
	}
	
	override public function restart():Void {
		#if !airconsole
		bestScore = Std.parseInt(Browser.window.localStorage.getItem("lcr_score"));
		#end
		
		if (player != null) {
			lastScore = player.score;	
			if (lastScore > bestScore) {
				#if !airconsole
				Browser.window.localStorage.setItem("lcr_score", Std.string(player.score));
				#end
				bestScore = lastScore;
			}
		}
		
		super.restart();
		
		player = new Player(control);
		add(player, "player");
		
		waveDifficultyPerSecond = 0;
		waveTimer = 0;
		waveDifficultyAccumulator = 0;
		
		menu = true;
	}
	
	private function start():Void{
		waveDifficultyPerSecond = 0.34;
		waveTimer = 0;
		waveDifficultyAccumulator = 0;
		
		createNextSet();
		menu = false;
	}
	
	private function createNextSet():Void{
		nextSet.clear();
		nextSetDifficulty = 0;
		
		var minDifficulty = waveDifficultyPerSecond * minSetDistance;
		var maxDifficulty = waveDifficultyPerSecond * maxSetDistance;
		var d:Int = Math.floor(minDifficulty + Math.random() * (maxDifficulty - minDifficulty));
		
		//create up to three enemys to match d (difficulty)
		var r:Int = Math.ceil(Math.random() * 3);
		for(i in 0...r){
			nextSetDifficulty += queueEnemy(d - nextSetDifficulty, r - i);
		}
		
		waveDifficultyPerSecond += 0.002;
	}
	
	private function queueEnemy(max:Int, remaning:Int):Int {
		var min:Int = max - 4 * (remaning - 1);
		var d:Int = Std.int(Math.max(Math.floor(Math.random() * Math.min(max, 4)) + 1, min));
		var e:Enemy;
		switch(d){
			case 1:
				e = new EnemyKamikazi();
			case 2:
				e = new EnemyOneShot();
			case 3:
				e = new EnemyThreeBurstShooter();
			case 4:
				e = new EnemyTunnelShooter();
			default:
				return 0;
		}
		
		var x:Float = 0;
		for(i in 0...10){
			x = width / 4 + Math.random() * (width / 2);
			
			for(e in nextSet){
				if(e.distanceToPoint(x, -16) > 32){
					break; 
				}
			}
		}
		
		e.x = x;
		e.y = -16;
		nextSet.add(e);
		
		return d;
	}
	
	override public function update(c:CanvasRenderingContext2D, s:Float):Void {
		farBack.update(c, s);
		nearBack.update(c, s);
		
		super.update(c, s);
		waveTimer += s;		
		
		if(waveTimer > 0 && (waveDifficultyAccumulator + nextSetDifficulty) / waveTimer < waveDifficultyPerSecond){
			//spawn set
			for(e in nextSet){
				add(e, "enemy");
			}
			waveDifficultyAccumulator += nextSetDifficulty;
			
			//queue next set
			createNextSet();
		}
		#if !airconsole
		c.font = "bold 12px Arial";
		#end
		c.fillStyle = "#696969";
		c.fillRect(0, height, width, 24);
		c.fillStyle = "#0000FF";
		var bombMeterWidth:Float = (width * 0.5 - 24);
		c.fillRect(4, height + 4, bombMeterWidth * (player.bombQty / 3), 16);
		c.strokeStyle = "#000000";
		for (i in 1...4) {
			var lx = 4 + bombMeterWidth * (i / 3);
			c.beginPath();
			c.moveTo(lx, height + 4);
			c.lineTo(lx, height + 20);
			c.stroke();
			
			c.fillStyle = (player.bombQty >= i) ? "#FFFFFF" : "#000000";
			c.fillText(Std.string(i), lx - 12, height + 16);
		}
		c.strokeRect(4, height + 4, bombMeterWidth, 16);
		#if !airconsole
		c.font = "bold 20px Arial";
		#end
		c.fillText("Score: " + player.score, width * 0.5 + 4, height + 20);
		
		if(menu){
			c.fillStyle = "#000000";
			c.globalAlpha = 0.5;
			c.fillRect(0, 0, width, height);
			c.globalAlpha = 1;
			
			c.fillStyle = "#FFFFFF";
			
			#if airconsole
			c.fillText("Press 'Shoot' to Start", width / 2 - c.measureText("Press 'Z' to Start").width / 2, height * 0.33);
			#else
			c.fillText("Press 'Z' to Start", width / 2 - c.measureText("Press 'Z' to Start").width / 2, height * 0.33);
			#end
			
			var scoreText = "Best Score: " + bestScore;
			c.fillText(scoreText, width / 2 - c.measureText(scoreText).width / 2, height * 0.66);
			if(lastScore > 0){
				scoreText = "Last Score: " + lastScore;
				c.fillText(scoreText, width / 2 - c.measureText(scoreText).width / 2, height * 0.66 + 24);
			}
			
			#if !airconsole
			c.font = "bold 15px Arial";
			c.fillText("Move = Arrow Keys", 20, height * 0.83);
			c.fillText("Shoot = Z", 20, height * 0.83 + 24);
			c.fillText("Chrono Bomb = X", 20, height * 0.83 + 48);
			c.fillText("Focus = L Shift", 20, height * 0.83 + 72);
			#end
			
			if(control.isShooting()){
				start();
			}
		}
	}
	
	public function reverse(duration:Float):Void{
		waveTimer -= duration * 2;
		
		farBack.startReverse(duration);
		nearBack.startReverse(duration);
	}
}