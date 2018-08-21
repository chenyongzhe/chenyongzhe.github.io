window.onload = function() {
	var GAMESTATE = 0; //游戏状态 0 暂停 1 开始 2 结束
	//页面加载完成执行该方法中的内容
	var gameoverpage = document.getElementById("result-panel");
	var overscore = document.getElementById("overscore");
	var SCORE = 0;
	var score = document.getElementById("score");
	var pausebtn = document.getElementById("pause");
	var restart = document.getElementById("replay-btn");
	var startbtn = document.getElementById("start-btn");
	var startpage = document.getElementById("start-page");
	var scroolmap1 = document.getElementById("scroolmap1");
	var scroolmap2 = document.getElementById("scroolmap2");
	var map = document.getElementById("map");
	var image = {
		"hero": "img/hero.png",
		"bullet": "img/bullet1.png",
		"bomp": "img/wsparticle_07.png",
	};

	/*敌机图片数组*/
	var enemyImg = ["img/enemy1.png", "img/enemy2.png", "img/enemy3.png", "img/enemy4.png"];

	var gamescene = document.getElementById("gamescene");
	var hero = null;
	var enemies = []; //敌机的数组
	var bullets = []; //子弹的数组

	var fireTimer, updateTimer, addEnemyTimer, scroolMapTimer;
	restart.onclick = function() {
		if (GAMESTATE == 2) {
			//初始化
			enemies = [];
			bullets = [];
			map.innerHTML = '';
			gameoverpage.style.display = 'none';
			SCORE = 0;
			score.innerHTML = SCORE;
			startGame();
		}
	}
	startbtn.onclick = function() {
		startpage.style.display = "none";

		//游戏开始
		startGame();

	}

	pausebtn.onclick = function() {
		if (GAMESTATE = 0) {
			//由暂停到开始
			GAMESTATE = 1;

			fireTimer = setInterval(fire, 200);
			updateTimer = setInterval(update, 30);
			addEnemyTimer = setInterval(addEnemy, 500);
			scroolMapTimer = setInterval(scroolMapBG, 200);

		} else if (GAMESTATE = 1) {
			//由开始到暂停
			GAMESTATE = 0;
			clearInterval(fireTimer);
			clearInterval(updateTimer);
			clearInterval(addEnemyTimer);
			clearInterval(scroolMapTimer);

		}
	}

	/*元素（英雄战机、敌机）、子弹
	  英雄战机动作：移动、发射子弹，撞击敌机
	  
	  *  事件：随鼠标移动
	  * 
	 敌方战机动作： 移动、被子弹打中、被英雄撞毁
	  * 
	  * 
	  * 两个类：
	  * 飞机类、子弹类  原型方式创建*/

	/*飞机对象
	        参数  w:飞机的宽
	        h:飞机的高
	        x,y：飞机的xy坐标*/

	var Plane = function(w, h, x, y) {
		this.width = w;
		this.height = h;
		this.x = x;
		this.y = y;
		this.imgNode = null;
	};
	Plane.prototype = {
		//飞机的初始化
		init: function(imgSrc) {
			this.imgNode = document.createElement("img");
			this.imgNode.style.width = this.width + "px";
			this.imgNode.style.height = this.height + "px";
			this.imgNode.style.position = "absolute";
			this.imgNode.style.top = this.y + "px";
			this.imgNode.style.left = this.x + "px";
			this.imgNode.src = imgSrc;
			map.appendChild(this.imgNode);
		},
		move: function(speed) {
			this.y = this.imgNode.offsetTop + speed;
			this.imgNode.style.top = this.y + "px";
			return this.y;
		},
		remove: function(index) {
			this.imgNode.src = image.bomp;
			var that = this;
			if (this.imgNode.parentNode) {
				setTimeout(function() {

					map.removeChild(that.imgNode);
				}, 100);
				enemies.splice(index, 1);

			}
		},
		removeHreo: function() {
			this.imgNode.src = image.bomp;
			var that = this;
			if (that.imgNode.parentNode) {
				map.removeChild(that.imgNode);
			}

		}
	}

	/*子弹对象*/
	var Bullet = function(w, h, x, y) {
		this.width = w;
		this.height = h;
		this.x = x;
		this.y = y;
		this.imgNode = null;

	}
	Bullet.prototype = {
		init: function(imgSrc) {
			this.imgNode = document.createElement("img");
			this.imgNode.style.width = this.width + "px";
			this.imgNode.style.height = this.height + "px";
			this.imgNode.style.position = "absolute";
			this.imgNode.style.top = this.y + "px";
			this.imgNode.style.left = this.x + "px";
			this.imgNode.src = imgSrc;
			map.appendChild(this.imgNode);
		},
		move: function(speed) {
			this.y = this.imgNode.offsetTop - speed;
			this.imgNode.style.top = this.y + "px";
			return this.y;
		},
		remove: function(index) {
			if (this.imgNode.parentNode) {
				//从map层中消失
				map.removeChild(this.imgNode)
					//从数组中消失,从第几个元素开始删除第几元素.
				bullets.splice(index, 1);
			}

		}

	}

	//开始游戏
	function startGame() {
		/*
		 
		 * 1.子弹出现的位置 ： 子弹的X坐标为英雄战机的X坐标
		 *                 子弹的y坐标为英雄战机的y-10
		 * 
		 * 
		 * 2.子弹飞一会：改变top属性，做一个定时器
		 * */
		GAMESTATE = 1;

		hero = new Plane(80, 65, 100, 500);
		hero.init(image.hero);
		//			console.log("英雄战机的x坐标:" + hero.imgNode.offsetLeft);
		//			console.log("英雄战机的y坐标:" + hero.imgNode.style.left);
		fireTimer = setInterval(fire, 200);
		//每30毫秒执行一次刷新操作   使子弹移动
		updateTimer = setInterval(update, 30);

		//每500毫秒产生一个敌机
		addEnemyTimer = setInterval(addEnemy, 500);
		scroolTimer = setInterval(scrool, 50);
		/*敌机出现*/
		function addEnemy() {
			//实例化

			var x = Math.random() * 350;
			var index = Math.floor(Math.random() * 4);
			var enemy = new Plane(100, 85, x, 0);
			enemy.init(enemyImg[index]);
			//将实例化的敌机放入数组
			enemies.push(enemy);

		}

		//刷新位置
		function update() {
			//子弹移动
			for (var i = 0; i < bullets.length; i++) {
				var b = bullets[i];
				if (b) {
					var b_move = b.move(20);
					if (b_move <= 0) {
						b.remove(i);
					}
					//在有子弹的基础之上还得有敌机
					for (var k = 0; k < enemies.length; k++) {
						var e = enemies[k];
						if (e) {
							if (collision(e, b)) {
								//子弹与敌机相撞
								b.remove(i);
								e.remove(k);

								//加分
								SCORE++;
								score.innerHTML = SCORE;

							}
						}
					}

				}

			}
			//敌机移动
			for (var j = 0; j < enemies.length; j++) {
				var e = enemies[j];
				var e_move = e.move(5);
				if (e_move > 650) {
					//当敌机移动到下面的时候消失
					e.remove(j);
				}
				if (collision(e, hero)) {
					e.remove(j);
					hero.removeHreo();
					gameOver();
				}

			}
		}

		function fire() {
			var x = hero.imgNode.offsetLeft;
			var y = hero.imgNode.offsetTop - 10;

			var bullet = new Bullet(15, 30, x + 31, y);
			bullet.init(image.bullet);
			bullets.push(bullet);

		}

		/*
 * 两者相撞，返回true
 *  a.x + a.width > b.x     
	a.x < b.x+b.width
	a.y+a.height> b.y
	a.y < b.y+b.height

 */
		function collision(a, b) {
			if ((b.x < a.x + a.width) && (b.x > a.x - b.width) && (b.y < a.y + a.height) && (b.y > a.y - b.height)) {
				return true;
			} else {
				return false;
			}

		}

	}

	/*鼠标移动，战机移动
	 实现方式：利用监听器 */
	gamescene.addEventListener("mousemove", movePlan); //参数一：鼠标移动事件  参数二：执行的方法
	function movePlan() {
		/*
		 当鼠标移动时，将鼠标此时的位置坐标，赋值给英雄战机的坐标
		 获取鼠标的X和Y*/
		var clientX = window.event.clientX;
		var clientY = window.event.clientY;

		//把XY的值赋值给飞机
		hero.x = clientX - 40;
		hero.y = clientY - 35;

		var width = 512 - 80;
		var height = 768 - 65;

		/*令hero.x最大为512，hero.y为768*/
		hero.x = hero.x > width ? width : hero.x;
		hero.x = hero.x < 0 ? 0 : hero.x;

		hero.y = hero.y > height ? height : hero.y;
		hero.y = hero.y < 0 ? 0 : hero.y;

		hero.imgNode.style.left = hero.x + "px";
		hero.imgNode.style.top = hero.y + "px";
	}

	//游戏结束
	function gameOver() {
		console.log("game over");
		//清除定时
		clearInterval(fireTimer);
		clearInterval(addEnemyTimer);
		clearInterval(updateTimer);
		clearInterval(scroolTimer);
		//结果图展示
		overscore.innerHTML = SCORE;
		gameoverpage.style.display = 'block';
		GAMESTATE = 2;

	}

	function scrool() {
		if (scroolmap1.offsetTop > 760) {
			scroolmap1.style.top = "-760px";
		} else {
			scroolmap1.style.top = (scroolmap1.offsetTop + 1) + "px";
		}
		if (scroolmap2.offsetTop > 760) {
			scroolmap2.style.top = "-760px";
		} else {
			scroolmap2.style.top = (scroolmap2.offsetTop + 1) + "px";
		}

	}

}