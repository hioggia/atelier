(function(){

	var
	version = 3,
	myData,
	items,
	map = {

		"1001": {
			name: "斯坦索姆",
			stamina: 1,
			monster: [1],
			exp: 100
		},

		"1002": {
			name: "奥杜尔",
			stamina: 2,
			monster: [1,1],
			exp: 210
		},

		"1003": {
			name: "冬拥湖",
			stamina: 3,
			monster: [1,2],
			exp: 320
		},

		"1004": {
			name: "东京热",
			stamina: 4,
			monster: [2,2],
			exp: 430
		},

		"1005": {
			name: "东京热 第二部",
			stamina: 6,
			monster: [2,3],
			exp: 640
		},

		"1006": {
			name: "东京热 大结局",
			stamina: 7,
			monster: [2,2,4],
			exp: 750
		},

		"1007": {
			name: "百鬼夜行",
			stamina: 7,
			monster: [2,4,5],
			exp: 800
		},

		"1008": {
			name: "百万鬼夜行",
			stamina: 10,
			monster: [1,2,3,4,5],
			exp: 1110
		}

	},
	monsters = {

		"1": {
			name: "安卡",
			hp: 14000,
			atk: 500,
			drop: [1,3],
			dropPercent: 0.4
		},

		"2": {
			name: "安倍",
			hp: 34000,
			atk: 800,
			drop: [1,2,3,4],
			dropPercent: 0.4
		},

		"3": {
			name: "早安少女",
			hp: 64000,
			atk: 1000,
			drop: [2,6],
			dropPercent: 0.6
		},

		"4": {
			name: "有超能力的魔法师",
			hp: 20000,
			atk: 1500,
			drop: [3,4,5],
			dropPercent: 0.8
		},

		"5": {
			name: "妖狐玉藻前",
			hp: 50000,
			atk: 1980,
			drop: [2,6,7],
			dropPercent: 0.8
		}

	},
	runes = [11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28,29,31,32,33,34,35,36,37,38,39],
	formula = {
		upgrade: function(level){
			return level*300+200;
		}
	};

	(function getItemData(){
		if('itemDefine' in window){
			items = copy(itemDefine);
		}else{
			setTimeout(getItemData,100);
		}
	})();

	function copy(object){
		var copied = {};

		if( object == null ){
			copied = null;
		}else if( object instanceof Array ){
			copied = [];
			for(var i=0, len=object.length; i<len; i++){
				if(typeof object[i] == 'object'){
					copied.push( copy(object[i]) );
				}else{
					copied.push(object[i]);
				}
			}
		}else{
			for(var key in object){
				if(typeof object[key] == 'object'){
					copied[key] = copy(object[key]);
				}else{
					copied[key] = object[key];
				}
			}
		}

		return copied;
	}

	//+ Jonas Raoni Soares Silva
	//@ http://jsfromhell.com/array/shuffle [v1.0]
	function shuffle(o){ //v1.0
	    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	}

	function hasData(){
		return !!window.localStorage['my_save'];
	}

	function createNewGame(){

		myData = {
			version: version,
			name: "体验版玩家",
			stamina: 10,
			staminaMax: 10,
			recoveryStaminaBegin: 0,
			level: 1,
			exp: 0,
			upgradeExp: 0,
			items: [1001,1001,1001,1001,2001],
			weapon: {
				"1": 1001,
				"2": 1001,
				"3": 1001,
				"4": 1001
			},
			equipment: 2001,
			runePackages: 4
		};

		myData.upgradeExp = formula.upgrade(myData.level);
		saveGame();

	}

	function loadGame(){
		myData = JSON.parse( window.localStorage['my_save'] );
		if(myData.version != version){
			createNewGame();
		}
		if(myData.stamina != myData.staminaMax){
			var now = new Date().getTime(),
				elapsedMS = now - myData.recoveryStaminaBegin,
				recoveriedStamina = Math.floor(elapsedMS / rule.staminaRecoveryPerMS),
				maxCanRecoveryStamina = myData.staminaMax - myData.stamina;
			if(recoveriedStamina<maxCanRecoveryStamina){
				myData.stamina += recoveriedStamina;
				myData.recoveryStaminaBegin += recoveriedStamina * rule.staminaRecoveryPerMS;
				saveGame();
			}else{
				myData.stamina = myData.staminaMax;
				myData.recoveryStaminaBegin = 0;
				saveGame();
			}
		}
	}

	function saveGame(){
		window.localStorage['my_save'] = JSON.stringify(myData);
	}

	function getMyData(callback){
		if(hasData()){
			loadGame();
			callback(myData);
		}else{
			createNewGame();
			callback(myData);
		}
	}

	function getMapList(callback){
		callback( copy(map) );
	}

	function getBagData(callback){
		callback( copy(myData.items) );
	}

	function setMapEnterArea(key, callback){
		if(map[key].stamina>myData.stamina){
			callback({'error':{'msg':'耐力不足'}});
		}else{
			myData.stamina-=map[key].stamina;
			if(myData.recoveryStaminaBegin == 0){
				myData.recoveryStaminaBegin = new Date().getTime();
			}
			saveGame();

			var closureData = {
				dungeonName: map[key].name,
				myHp: items[myData.equipment].equipment.hp,
				myAtk1: items[myData.weapon["1"]].weapon.atk,
				myAtk2: items[myData.weapon["2"]].weapon.atk,
				myAtk3: items[myData.weapon["3"]].weapon.atk,
				myAtk4: items[myData.weapon["4"]].weapon.atk,
				myRunes: [],
				monUnits: []
			};

			var clearBouns = {items:[],exp:map[key].exp};

			for(var i=0,len=myData.runePackages;i<len;i++){
				for(var k=0,max=runes.length;k<max;k++){
					closureData.myRunes.push(runes[k]);
				}
			}
			shuffle(closureData.myRunes);

			for(var i=0,len=map[key].monster.length;i<len;i++){
				var id = map[key].monster[i],
				mon = {
					name: monsters[id].name,
					atk: monsters[id].atk,
					hp: monsters[id].hp,
					maxHp: monsters[id].hp,
					drop: 0
				};
				if(monsters[id].dropPercent>Math.random()){
					var drop = monsters[id].drop[ Math.floor(Math.random()*monsters[id].drop.length) ];
					clearBouns.items.push(drop);
					mon.drop = drop;
				}
				closureData.monUnits.push(mon);
			}

			window.localStorage['dungeon_clear'] = JSON.stringify(clearBouns);

			callback(closureData);
		}
	}

	function setMapAreaClear(callback){
		if(window.localStorage['dungeon_clear']){
			var clearBouns = JSON.parse(window.localStorage['dungeon_clear']);
			for(var i=0,len=clearBouns.items.length;i<len;i++){
				myData.items.push(clearBouns.items[i]);
			}
			myData.exp += clearBouns.exp;
			clearBouns.levelUp = 0;
			while(myData.exp>=myData.upgradeExp){
				clearBouns.levelUp++;
				myData.level++;
				myData.exp -= myData.upgradeExp;
				myData.upgradeExp = formula.upgrade(myData.level);
				myData.stamina = myData.staminaMax;
				myData.recoveryStaminaBegin = 0;
			}
			saveGame();
			callback(clearBouns);
		}else{
			callback();
		}
	}

	window.dummyData = {
		get: function(key, params, callback){

			switch(key){
				case 'home': return getMyData(callback);
				case 'map_list': return getMapList(callback);
				case 'bag': return getBagData(callback);
			}

		},
		set: function(key, params, data, callback){

			switch(key){
				case 'map_enter_area': return setMapEnterArea(params, callback);
				case 'map_area_clear': return setMapAreaClear(callback);
			}

		}
	};

})();