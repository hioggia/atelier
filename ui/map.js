var mapLayer = cc.Layer.extend({

    init: function () {
        this._super();

        getData('map_list','',this.renderUI.bind(this));
        
        return true;
    },
    renderUI: function(data){
        var size = cc.Director.getInstance().getWinSize();

        var index = -1,
        	menu = cc.Menu.create();
        menu.setPosition(0, 0);
		for(var key in data){
			index++;
			var mapNameLabel = cc.LabelTTF.create(data[key].name, 'sans-serif', 14);
			mapNameLabel.setColor( new cc.Color3B(100,100,255) );
			var mapNameItem = cc.MenuItemLabel.create(mapNameLabel, jumpAreaScene(key), this);
			menu.addChild(mapNameItem);
			mapNameItem.setPosition( index * 120 + 80, size.height - Math.floor(index/3)*60 - 25 );

			var mapStaminaLabel = cc.LabelTTF.create('耐力：'+ data[key].stamina, 'sans-serif', 10);
			mapStaminaLabel.setPosition( index * 120 + 80, size.height - Math.floor(index/3)*60 - 40);
			this.addChild(mapStaminaLabel, 1);
		}

		this.addChild(menu, 1);

        addMenu(this);
    }
});

var areaLayer = cc.Layer.extend({

	dungeonName: '',

	myHp: 0,
	myMaxHp: 0,
	myAtk: {"1":0,"2":0,"3":0},
	myRunes: [],

	monUnits: [],
	monUnitMax: 0,

	getItems: [],

	turn: -1,
	turnRunes: [],
	turnBreak: 0,

	//ui
	dungeonBattles: null,
	monsterName: null,
	monsterHp: null,
	monsterHpBar: null,
	myHpLabel: null,
	myHpBar: null,
	runeOperator: null,
	runeActived: null,

    init: function (data) {
        this._super();

        this.dungeonName = data.dungeonName;

        this.myHp = data.myHp;
        this.myMaxHp = data.myHp;
        this.myAtk["1"] = data.myAtk1;
        this.myAtk["2"] = data.myAtk2;
        this.myAtk["3"] = data.myAtk3;
        this.myRunes = data.myRunes;
        this.monUnits = data.monUnits;
        this.monUnitMax = data.monUnits.length;

        this.turn = -1;
        this.turnRunes = [];
        this.turnBreak = rule.turnBreakTimes;

        this.renderUI();
        
        return true;
    },
    renderUI: function(){

    	var size = cc.Director.getInstance().getWinSize();

    	var dungeonNameLabel = cc.LabelTTF.create(this.dungeonName, 'sans-serif', 14);
    	dungeonNameLabel.setPosition(size.width - 50, size.height - 15);
    	this.addChild(dungeonNameLabel, 1);
    	this.dungeonBattles = cc.LabelTTF.create( this.monUnitMax-this.monUnits.length + '/' + this.monUnitMax, 'sans-serif', 10 );
    	this.dungeonBattles.setPosition(size.width - 50, size.height - 35);
    	this.addChild(this.dungeonBattles, 1);

    	this.monsterName = cc.LabelTTF.create( this.monUnits[0].name, 'sans-serif', 14 );
    	this.monsterName.setPosition(50, size.height - 15);
    	this.addChild(this.monsterName, 1);

    	var monsterHpBar = cc.LayerColor.create( new cc.Color4B(40,40,40,255), 200, 5 );
    	monsterHpBar.setPosition(110, size.height - 23);
    	this.addChild(monsterHpBar, 1);

    	this.monsterHpBar = cc.LayerColor.create( new cc.Color4B(127,0,0,127), 200, 4 );
    	this.monsterHpBar.setPosition(110, size.height - 23);
    	this.addChild(this.monsterHpBar, 1);

    	this.monsterHp = cc.LabelTTF.create( this.monUnits[0].hp + '/' + this.monUnits[0].maxHp, 'sans-serif', 10 );
    	this.monsterHp.setPosition(210, size.height - 15);
    	this.addChild(this.monsterHp, 1);

    	this.runeOperator = cc.Menu.create();
		this.runeOperator.setPosition(10, 50);
		this.addChild(this.runeOperator, 1);

		this.runeActived = cc.Layer.create();
		this.runeActived.setPosition(10, 180);
		this.addChild(this.runeActived, 1);

		var myHpBar = cc.LayerColor.create( new cc.Color4B(40,40,40,255), 200, 5 );
		myHpBar.setPosition( size.width - 210, 150 );
		this.addChild(myHpBar, 1);

    	this.myHpBar = cc.LayerColor.create( new cc.Color4B(127,0,0,127), 200, 4 );
    	this.myHpBar.setPosition( size.width - 210, 150 );
    	this.addChild(this.myHpBar, 1);

    	this.myHpLabel = cc.LabelTTF.create( this.myHp + '/' + this.myMaxHp, 'sans-serif', 10 );
    	this.myHpLabel.setPosition( size.width - 110, 158 );
    	this.addChild(this.myHpLabel, 1);

    	var atkIcon1 = cc.Sprite.create(ui.icon.atk['1']);
    	atkIcon1.setPosition(20, 158);
    	this.addChild(atkIcon1, 1);

    	var atkLabel1 = cc.LabelTTF.create(this.myAtk['1'], 'sans-serif', 14);
    	atkLabel1.setPosition(50, 158);
    	this.addChild(atkLabel1, 1);

    	var atkIcon2 = cc.Sprite.create(ui.icon.atk['2']);
    	atkIcon2.setPosition(100, 158);
    	this.addChild(atkIcon2, 1);

    	var atkLabel2 = cc.LabelTTF.create(this.myAtk['2'], 'sans-serif', 14);
    	atkLabel2.setPosition(130, 158);
    	this.addChild(atkLabel2, 1);

    	var atkIcon3 = cc.Sprite.create(ui.icon.atk['3']);
    	atkIcon3.setPosition(180, 158);
    	this.addChild(atkIcon3, 1);

    	var atkLabel3 = cc.LabelTTF.create(this.myAtk['3'], 'sans-serif', 14);
    	atkLabel3.setPosition(210, 158);
    	this.addChild(atkLabel3, 1);

    	this.newTurn();
    	this.fillRune();
    },
    newTurn: function(){
    	this.turn++;
    	this.turnRunes[this.turn] = [];
    	this.turnBreak = rule.turnBreakTimes;
    },
    fillRune: function(){
    	var _self = this;
    	this.runeOperator.removeAllChildren();
    	for(var i=0,len=Math.min(14, this.myRunes.length);i<len;i++){
    		var runesImage = cc.MenuItemImage.create( runeImage[this.myRunes[i]], runeImage.down[this.myRunes[i]], function(i){
    			return function(sender){
    				_self.selectRune(i);
    			}
    		}(i) );
    		runesImage.setPosition( i%7*50+25, Math.floor(i/7)*60 );
    		this.runeOperator.addChild(runesImage);
		}
    },
    showActiveRune: function(){
    	this.runeActived.removeAllChildren();
    	for(var i=0,runes=this.turnRunes[this.turn],len=runes.length;i<len;i++){
    		var activeRune = cc.Sprite.create( runeImage.down[runes[i]] );
    		activeRune.setPosition(i%10*46+20, 66-Math.floor(i/10)*50);
    		this.runeActived.addChild(activeRune);
		}
    },
    selectRune: function(index){
    	var nowSelect = this.myRunes.splice(index,1)[0],
    		lastSelect = this.turnRunes[this.turn][this.turnRunes[this.turn].length-1];
		if( lastSelect == undefined || runeDefine[nowSelect].ten == runeDefine[lastSelect].ten || runeDefine[nowSelect].one == runeDefine[lastSelect].one ){
			this.turnRunes[this.turn].push( nowSelect );
			if(this.turnRunes[this.turn].length==14){
				this.endTurn();
			}
			if(this.myRunes.length==0){
				this.endTurn();
			}
			this.showActiveRune();
		}else{
			this.turnBreak--;
			if(this.turnBreak <= 0){
				//clearTimeout(selectTimeLimit);
				//beginAtk();
				//return;
				this.endTurn();
			}
			if(this.myRunes.length==0){
				this.endTurn();
			}
		}
		this.fillRune();
    },
    endTurn: function(){

    	var list = this.turnRunes[this.turn],
			combo = {"1": 0, "2": 0, "3": 0},
			multi = {"1": 1, "2": 1, "3": 1};

		for(var i=0,len=list.length;i<len;i++){
			combo[runeDefine[ list[i] ].ten]++;
		}

		for(var i=0,len=list.length;i<len;i+=3){
			var a=runeDefine[ list[i] ],b=runeDefine[ list[i+1] ],c=runeDefine[ list[i+2] ];
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

		var damage = this.myAtk["1"]*combo["1"]*multi["1"]
				+ this.myAtk["2"]*combo["2"]*multi["2"]
				+ this.myAtk["3"]*combo["3"]*multi["3"];

		this.monUnits[0].hp-=damage;
		this.monsterHp.setString( this.monUnits[0].hp +'/'+ this.monUnits[0].maxHp );
		this.monsterHpBar.changeWidth( Math.max(1, this.monUnits[0].hp/this.monUnits[0].maxHp*200 ) );

		if(this.monUnits[0].hp<=0){

			if(this.monUnits[0].drop != 0){
				this.getItems.push(this.monUnits[0].drop);
			}
			this.monUnits.shift();
			this.dungeonBattles.setString( this.monUnitMax-this.monUnits.length +'/'+ this.monUnitMax );

			if(this.monUnits.length == 0){
				alert('战斗胜利！');
				setData('map_area_clear','','',liveDungeon);
			}else{
				this.monsterName.setString( this.monUnits[0].name );
				this.monsterHp.setString( this.monUnits[0].hp +'/'+ this.monUnits[0].maxHp );
				this.monsterHpBar.changeWidth( Math.max(1, this.monUnits[0].hp/this.monUnits[0].maxHp*200 ) );
				this.newTurn();
			}

			return;
		}

		this.myHp -= this.monUnits[0].atk;
		this.myHpLabel.setString( this.myHp +'/'+ this.myMaxHp );
		this.myHpBar.changeWidth( Math.max(1, this.myHp/this.myMaxHp*200 ) );

		if(this.myHp<=0){
			alert("你已经死了！");
			liveDungeon();
			return;
		}

		this.newTurn();
		if(this.myRunes.length==0){
			this.endTurn();
		}
    },
    onExit: function(){

		this.dungeonBattles = null;
		this.monsterName = null;
		this.monsterHp = null;
		this.monsterHpBar = null;
		this.myHpLabel = null;
		this.myHpBar = null;
		this.runeOperator = null;
		this.runeActived = null;

    	this._super();
    	console.log('area exit');
    }

});

function liveDungeon(data){
	if(data){
		if(data.items.length>0){
			var itemsName=[];
			for(var i=0,len=data.items.length;i<len;i++){
				itemsName.push(itemDefine[ data.items[i] ].name);
			}
			alert('获得道具： '+itemsName.join(','));
		}
		alert('获得经验： '+data.exp);
		if(data.levelUp>0){
			alert('等级提升！你的行动力已经回复满！');
		}
	}
	var scene = new mainScene();
	cc.Director.getInstance().replaceScene(scene);
}

function jumpAreaScene(key){
	return function(sender){

    	setData('map_enter_area', key, '', function(data){
			if('error' in data){
				alert(data.error.msg);
			}else{
				var scene = cc.Scene.create(),
					layer = new areaLayer();
				scene.addChild(layer);
				cc.Director.getInstance().replaceScene(scene);
				layer.init(data);
			}
    	});
	}
}

var mapScene = cc.Scene.extend({
	onEnter: function(){
        this._super();
        var layer = new mapLayer();
        layer.init();
        this.addChild(layer);
	}
});