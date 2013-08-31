(function(){

	var
	version = 4,
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
	runes = [11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28,29,31,32,33,34,35,36,37,38,39,41,42,43,44,45,46,47],
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
			items: [],
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

	function getMyData(callback, target){
		if(hasData()){
			loadGame();
			if(target){
				callback.call(target, myData);
			}else{
				callback(myData);
			}
		}else{
			createNewGame();
			if(target){
				callback.call(target, myData);
			}else{
				callback(myData);
			}
		}
	}

	function getMapList(callback, target){
		if(target){
			callback.call(target, copy(map));
		}else{
			callback( copy(map) );
		}
	}

	function getBagData(callback, target){
		if(target){
			callback.call(target, copy(myData.items));
		}else{
			callback( copy(myData.items) );
		}
	}

	function getEquipData(callback, target){
		var equipData = {
			e: {
				weapon: {
					"1": myData.weapon["1"],
					"2": myData.weapon["2"],
					"3": myData.weapon["3"],
					"4": myData.weapon["4"]
				},
				equipment: myData.equipment
			},
			b: {
				weapon: [],
				equipment: []
			}
		};
		for(var i=0,len=myData.items.length;i<len;i++){
			var curr = myData.items[i];
			if(itemDefine[curr].type == 'weapon'){
				equipData.b.weapon.push(curr);
			}
			if(itemDefine[curr].type == 'equipment'){
				equipData.b.equipment.push(curr);
			}
		}
		if(target){
			callback.call(target, equipData);
		}else{
			callback( equipData );
		}
	}

	function setMapEnterArea(key, callback, target){
		if(map[key].stamina>myData.stamina){
			if(target){
				callback.call(target,{'error':{'msg':'耐力不足'}});
			}else{
				callback({'error':{'msg':'耐力不足'}});
			}
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
				closureData.myRunes.push(makeRunes());
			}

			window.localStorage['dungeon_clear'] = JSON.stringify(clearBouns);

			if(target){
				callback.call(target, closureData);
			}else{
				callback(closureData);
			}

			function makeRunes(){
				var tempRune = [];
				for(var i=0,len=myData.runePackages;i<len;i++){
					for(var k=0,max=runes.length;k<max;k++){
						tempRune.push(runes[k]);
					}
				}
				shuffle(tempRune);
				return tempRune;
			}
		}
	}

	function setMapAreaClear(callback, target){
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
			if(target){
				callback.call(target, clearBouns);
			}else{
				callback(clearBouns);
			}
		}else{
			if(target){
				callback.call(target);
			}else{
				callback();
			}
		}
	}

	function setAlchemistBuild(key, callback, target){
		var material = alchemistDefine[key];
        for(var k=0,klen=material.length;k<klen;k++){
        	for(var i=0,len=myData.items.length;i<=len;i++){
        		if(i==len){
					if(target){
						callback.call(target,{'error':{'msg':'素材不足'}});
					}else{
						callback({'error':{'msg':'素材不足'}});
					}
        			return;
        		}
        		if(myData.items[i] == material[k]){
        			myData.items.splice(i, 1);
        			break;
        		}
        	}
        }
        myData.items.push(key);
		saveGame();
		if(target){
			callback.call(target, copy(myData.items));
		}else{
			callback(copy(myData.items));
		}
	}

	function setEquipData(params, data, callback, target){
		checkOwnItem = false;
		for(var i=0,len=myData.items.length;i<len;i++){
			if(myData.items[i] == data){
				checkOwnItem = true;
				myData.items.splice(i,1);
				break;
			}
		}
		if(!checkOwnItem){
			if(target){
				callback.call(target,{'error':{'msg':'你没有此道具'}});
			}else{
				callback({'error':{'msg':'你没有此道具'}});
			}
			return;
		}

		if(params == 0){
			myData.items.push( myData.equipment );
			myData.equipment = data;
		}else if(params < 5){
			myData.items.push( myData.weapon[params] );
			myData.weapon[params] = data;
		}
		saveGame();

		if(target){
			callback.call(target);
		}else{
			callback();
		}
	}

	window.dummyData = {
		get: function(key, params, callback, target){

			switch(key){
				case 'home': return getMyData(callback, target);
				case 'map_list': return getMapList(callback, target);
				case 'bag': return getBagData(callback, target);
				case 'equip': return getEquipData(callback, target);
			}

		},
		set: function(key, params, data, callback, target){

			switch(key){
				case 'map_enter_area': return setMapEnterArea(params, callback, target);
				case 'map_area_clear': return setMapAreaClear(callback, target);
				case 'alchemist_build': return setAlchemistBuild(data, callback, target);
				case 'equip_new_item': return setEquipData(params, data, callback, target);
			}

		}
	};

})();