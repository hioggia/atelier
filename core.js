window.gameData = {};
window.gameRule = {};
window.myData = {};
window.stage = null;
window.stageCtx = null;
window.eventAreas = [];

function hasData(){
	return !!window.localStorage['my_save'];
}

function createNewGame(){

	var myData = {
		version: 1,
		name: "体验版玩家",
		stamina: 10,
		staminaMax: 10,
		recoveryStaminaBegin: 0,
		level: 1,
		exp: 0,
		items: [1001,1001,1001,2001],
		weapon: {
			"1": 1001,
			"2": 1001,
			"3": 1001
		},
		equipment: 2001,
		runePackages: 4
	};

	window.myData = myData;
	saveGame();

}

function loadGame(){
	window.myData = JSON.parse( window.localStorage['my_save'] );
}

function saveGame(){
	window.localStorage['my_save'] = JSON.stringify(window.myData);
}

function main(){

	if(!window.stage){
		window.stage = document.getElementById('stage');
		window.stageCtx = window.stage.getContext('2d');
		window.stage.addEventListener( 'click', eventHandler, false );
	}

	cleanScreen();

	if(window.myData.stamina != window.myData.staminaMax){
		var now = new Date().getTime(),
			elapsedMS = now - window.myData.recoveryStaminaBegin,
			recoveriedStamina = Math.floor(elapsedMS / window.gameRule.main.staminaRecoveryPerMS),
			maxCanRecoveryStamina = window.myData.staminaMax - window.myData.stamina;
		if(recoveriedStamina<maxCanRecoveryStamina){
			window.myData.stamina += recoveriedStamina;
			window.myData.recoveryStaminaBegin += recoveriedStamina * window.gameRule.main.staminaRecoveryPerMS;
			saveGame();
		}else{
			window.myData.stamina = window.myData.staminaMax;
			window.myData.recoveryStaminaBegin = 0;
			saveGame();
		}
	}

	stageCtx.save();
	stageCtx.textBaseline = "top";
	stageCtx.font = "14px sans-serif";
	stageCtx.fillText( "欢迎， " + window.myData.name + " [等级： " + window.myData.level + "]", 5, 5 );
	stageCtx.fillText( "经验值： " + window.myData.exp, 5, 25 );
	stageCtx.fillText( "耐力： " + window.myData.stamina + "/" + window.myData.staminaMax, 5, 45 );
	if(window.myData.stamina != window.myData.staminaMax){
		var chargeFullTime = new Date( (window.myData.staminaMax-window.myData.stamina)*window.gameRule.main.staminaRecoveryPerMS+window.myData.recoveryStaminaBegin );
		stageCtx.font = "10px sans-serif";
		stageCtx.fillText( "(" + (chargeFullTime.getDate()==new Date().getDate()?"今日":"明日") + chargeFullTime.getHours() + ":" + chargeFullTime.getMinutes() + " 回满)", 100, 48 );
	}

	stageCtx.font = "28px sans-serif";
	stageCtx.fillText( "世界地图", 5, 80 );

	stageCtx.font = "14px sans-serif";
	stageCtx.fillStyle = "blue";
	var index = 0, y, w;
	for(var key in window.gameData.map){
		y = 120 + index * 20;
		w = stageCtx.measureText(window.gameData.map[key].name).width;
		stageCtx.fillText( window.gameData.map[key].name , 10, y );
		window.eventAreas.push( new EventArea( 10, y, w, 14, mapSelect, [key] ) );
	}

	stageCtx.restore();

}

function mapSelect(key){	
	cleanScreen();

	if(window.myData.stamina<window.gameData.map[key].stamina){
		alert('耐力不足！');
		main();
		return;
	}

	window.myData.stamina -= window.gameData.map[key].stamina;
	if(window.myData.recoveryStaminaBegin == 0){
		window.myData.recoveryStaminaBegin = new Date().getTime();
	}
	saveGame();

	createDenguon(key, showResult);
}

function showResult(resultData, exp){
	if(resultData){
		resultText = "获得道具： ";
		for(var i=0,len=resultData.length;i<len;i++){
			window.myData.items.push(resultData[i]);
			resultText += window.gameData.items[ resultData[i] ].name;
		}
		window.myData.exp += exp;
		alert(resultText);
		alert("获得经验： " + exp);
	}
	main();
}

function createDenguon(denguonKey, callback){
	var closureData = {
		me: {
			hp: window.gameData.items[window.myData.equipment].equipment.hp,
			maxHp: window.gameData.items[window.myData.equipment].equipment.hp,
			atk: {
				"1": window.gameData.items[window.myData.weapon["1"]].weapon.atk,
				"2": window.gameData.items[window.myData.weapon["2"]].weapon.atk,
				"3": window.gameData.items[window.myData.weapon["3"]].weapon.atk
			},
			runes: []
		},
		npc: {
			current: 0,
			monsters: []
		},
		turn: -1,
		runeSelect: {},
		breakTurn: 3
	},
	monsterId = window.gameData.map[denguonKey].monster,
	selectTimeLimit = 0;
	for(var i=0,len=monsterId.length;i<len;i++){
		var monId = monsterId[i],
		mon = {
			name: window.gameData.monsters[monId].name,
			atk: window.gameData.monsters[monId].atk,
			hp: window.gameData.monsters[monId].hp,
			maxHp: window.gameData.monsters[monId].hp
		};
		closureData.npc.monsters.push(mon);
	}
	for(var i=0,len=window.myData.runePackages;i<len;i++){
		for(var key in window.gameData.runes){
			closureData.me.runes.push(key);
		}
	}
	shuffle(closureData.me.runes);

	function showScreen(){
		cleanScreen();

		stageCtx.save();
		stageCtx.textBaseline = "top";
		stageCtx.font = "28px sans-serif";
		stageCtx.fillText( closureData.npc.monsters[closureData.npc.current].name, 5, 25 );

		stageCtx.font = "14px sans-serif";
		stageCtx.fillText( "HP: " + closureData.npc.monsters[closureData.npc.current].hp + "/" + closureData.npc.monsters[closureData.npc.current].maxHp, 5, 55 );

		stageCtx.fillText( "我的HP: " + closureData.me.hp + "/" + closureData.me.maxHp, 5, 220 );
		stageCtx.fillText( "ATK: " + closureData.me.atk["1"] + "(条) / " + closureData.me.atk["2"] + "(筒) / " + closureData.me.atk["3"] + "(万)", 5, 240 );

		stageCtx.lineWidth = 2;
		stageCtx.font = "12px sans-serif";
		for(var i=0,len=Math.min(14, closureData.me.runes.length);i<len;i++){
			stageCtx.strokeStyle = ["blue","green","red"][Math.floor(~~closureData.me.runes[i]/10)-1];
			stageCtx.strokeRect( 10+i*35, 270, 30, 30 );
			stageCtx.fillText( window.gameData.runes[closureData.me.runes[i]].name, 12+i*35, 280 );
			window.eventAreas.push( new EventArea( 10+i*35, 270, 30, 30, selectRune, [i] ) );
		}
		
		stageCtx.font = "14px sans-serif";
		for(var i=0,runes=closureData.runeSelect[closureData.turn],len=runes.length;i<len;i++){
			stageCtx.strokeStyle = ["blue","green","red"][Math.floor(~~runes[i]/10)-1];
			stageCtx.strokeRect( 5+i*40, 130, 32, 32 );
			stageCtx.fillText( window.gameData.runes[ runes[i] ].name, 7+i*40, 140 );
		}

		stageCtx.restore();
	}

	function selectRune(key){

		var nowSelect = closureData.me.runes.splice(key,1)[0],
			lastSelect = closureData.runeSelect[closureData.turn][closureData.runeSelect[closureData.turn].length-1];
		if( lastSelect == undefined || nowSelect.ten == lastSelect.ten || nowSelect.one == lastSelect.one ){
			closureData.runeSelect[closureData.turn].push( nowSelect );
		}else{
			closureData.breakTurn--;
			if(closureData.breakTurn <= 0){
				clearTimeout(selectTimeLimit);
				beginAtk();
				return;
			}
		}
		
		showScreen();
	}

	function beginAtk(){
		var list = closureData.runeSelect[closureData.turn],
			combo = {"1": 0, "2": 0, "3": 0},
			multi = {"1": 1, "2": 1, "3": 1};

		for(var i=0,len=list.length;i<len;i++){
			var data = window.gameData.runes[ list[i] ];
			combo[data.ten]++;
		}
		for(var i=0,len=list.length;i<len;i+=3){
			var a=window.gameData.runes[ list[i] ],b=window.gameData.runes[ list[i+1] ],c=window.gameData.runes[ list[i+2] ];
			if(!!a && !!b && !!c){
				if(a.ten == b.ten == c.ten){
					if(a.one == b.one == c.one){
						multi[a.ten]*=5;
					}else{
						var a1=a.one,b1=b.one,c1=c.one,t;
						if(a1>b1){
							t=b1;b1=a1;a1=t;
						}
						if(a1>c1){
							t=c1;c1=a1;a1=t;
						}
						if(b1>c1){
							t=c1;c1=b1;b1=t;
						}
						if(a1+2 == b1+1 == c1){
							multi[a.ten]*=3;
						}else{
							multi[a.ten]*=1.5;
						}
					}
				}
			}
		}

		var damage = closureData.me.atk["1"]*combo["1"]*multi["1"]
					+ closureData.me.atk["2"]*combo["2"]*multi["2"]
					+ closureData.me.atk["3"]*combo["3"]*multi["3"];
		console.log(damage,combo,multi);
		closureData.npc.monsters[closureData.npc.current].hp-=damage;
		if(closureData.npc.monsters[closureData.npc.current].hp<=0){
			newTurn();
			clearTimeout(selectTimeLimit);
			var itemGet = [];
			if(Math.random()<closureData.npc.monsters[closureData.npc.current].dropPercent){
				var size = closureData.npc.monsters[closureData.npc.current].drop.length;

				itemGet.push( closureData.npc.monsters[closureData.npc.current].drop[ Math.floor(Math.random()*size) ] );
			}
			alert("战斗胜利！");
			callback(itemGet, window.gameData.map[denguonKey].exp);
			return;
		}

		closureData.me.hp -= closureData.npc.monsters[closureData.npc.current].atk;
		if(closureData.me.hp<=0){
			newTurn();
			clearTimeout(selectTimeLimit);
			alert("你已经死了！");
			callback(false);
			return;
		}

		newTurn();
	}

	function newTurn(){
		closureData.turn++;
		closureData.breakTurn = 3;
		closureData.runeSelect[closureData.turn] = [];

		showScreen();
		selectTimeLimit = setTimeout(beginAtk, 1000 * 10);
	}

	newTurn();
}

function cleanScreen(){
	stageCtx.clearRect( 0, 0, stage.width, stage.height );
}

function eventHandler(ev){
	var x = ev.pageX - window.stage.offsetLeft,
		y = ev.pageY - window.stage.offsetTop;

	for(var i=0,len=window.eventAreas.length;i<len;i++){
		var ea = window.eventAreas[i];
		if(x>=ea.x1 && x<ea.x2 && y>=ea.y1 && y<ea.y2){
			window.eventAreas = [];
			ea.ev.apply(ea.ev, ea.args);
			break;
		}
	}
}

function EventArea( x, y, w, h, ev, args ){
	this.x1 = x;
	this.x2 = x+w;
	this.y1 = y;
	this.y2 = y+h;
	this.ev = ev;
	this.args = args;
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
