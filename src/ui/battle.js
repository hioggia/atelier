var areaLayer = BaseUILayer.extend({

	dungeonName: '',

	runeSprite: null,

	myHp: 0,
	myMaxHp: 0,
	myAtk: {"1":0,"2":0,"3":0,"4":0},
	myRunes: [],

	monUnits: [],
	monUnitMax: 0,

	getItems: [],

	battleBL: null,

	handRunes: 14,

	//ui
	dungeonBattles: null,
	monsterName: null,
	monsterHpGauge: null,
	myHpGauge: null,
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
        this.myAtk["4"] = data.myAtk4;

        this.myRunes = data.myRunes;
        this.monUnits = data.monUnits;
        this.monUnitMax = data.monUnits.length;

        this.battleBL = new battleLogic();

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

    	this.monsterHpGauge = Gauge.create( 0, this.monUnits[0].hp, this.monUnits[0].maxHp, '' );
    	this.monsterHpGauge.setPosition(110, size.height - 23);
    	this.addChild(this.monsterHpGauge, 1);

    	this.runeOperator = cc.Menu.create();
		this.runeOperator.setPosition(10, 10);
		this.addChild(this.runeOperator, 1);

		this.runeActived = cc.Layer.create();
		this.runeActived.setPosition(10, 180);
		this.addChild(this.runeActived, 1);

    	this.myHpGauge = Gauge.create( 0, this.myHp, this.myMaxHp, '' );
    	this.myHpGauge.setPosition( size.width - 210, 150 );
    	this.addChild(this.myHpGauge, 1);

    	this.fillRune();
    },
    newTurn: function(){
    	this.battleBL.newTurn();
    	this.fillRune();
    },
    refreshRune: function(){
    	var _self = this;
    	this.runeOperator.removeAllChildren();
    	for(var i=0,len=Math.min(this.handRunes, this.myRunes[0].length);i<len;i++){
    		var runesImage = cc.MenuItemSprite.create( runeMaker(this.myRunes[0][i]), runeMaker(this.myRunes[0][i]), null, this.selectRune.bind(this));
    		runesImage.setUserData(i);
    		runesImage.setAnchorPoint(cc.p(0,0));
    		runesImage.setPosition( i%this.handRunes*33, Math.floor(i/this.handRunes)*50 );
    		if(this.battleBL.isInSelect(i)){
    			runesImage.setPosition(cc.p(runesImage.getPositionX(), runesImage.getPositionY()+5));
    		}
    		this.runeOperator.addChild(runesImage);
		}
    },
    fillRune: function(){
    	var _self = this;
    	this.runeOperator.removeAllChildren();
    	for(var i=0,len=Math.min(this.handRunes, this.myRunes[0].length);i<len;i++){
    		var runesImage = cc.MenuItemSprite.create( runeMaker(this.myRunes[0][i]), runeMaker(this.myRunes[0][i]), null, this.selectRune.bind(this));
    		runesImage.setUserData(i);
    		runesImage.setAnchorPoint(cc.p(0,0));
    		runesImage.setPosition( i%this.handRunes*33, Math.floor(i/this.handRunes)*50 );
    		this.runeOperator.addChild(runesImage);
		}
		this.battleBL.newPart();
		if(!this.battleBL.checkCanPlayable(this.myRunes[0].length)){
			this.endTurn();
		}
    },
    showActiveRune: function(){
    	this.runeActived.removeAllChildren();
    	var runes = this.battleBL.getTurnSelect();
    	for(var i=0,len=runes.length;i<len;i++){
    		var activeRune = cc.Sprite.create( runeMaker[runes[i]] );
    		activeRune.setPosition(i%10*46+20, 66-Math.floor(i/10)*50);
    		this.runeActived.addChild(activeRune);
		}
    },
    selectRune: function(sender){
    	var index = sender.getUserData();
    	var nowSelect = this.myRunes[0][index];
    	var selectResult = this.battleBL.select(index, nowSelect);
		if(selectResult == 1){
			//可继续出牌
			this.battleBL.runeConfirmed();
			var partSelect = this.battleBL.getPartSelectIndex();
			for(var i=0,len=partSelect.length;i<len;i++){
				this.myRunes[0].splice(partSelect[i], 1);
			}
			this.fillRune();
		}else if(selectResult == 2){
			//出牌结束
			this.battleBL.runeConfirmed();
			var partSelect = this.battleBL.getPartSelectIndex();
			for(var i=0,len=partSelect.length;i<len;i++){
				this.myRunes[0].splice(partSelect[i], 1);
			}
			this.endTurn();
		}else if(this.myRunes[0].length == 0){
			this.endTurn();
		}else{
			this.refreshRune();
		}
    },
    endTurn: function(){
    	var size = cc.Director.getInstance().getWinSize(),
    		result = this.battleBL.getTurnResult();

		var damage1 = this.myAtk["1"]*result.combo[0]*result.multi[0],
			damage2 = this.myAtk["2"]*result.combo[1]*result.multi[1],
			damage3 = this.myAtk["3"]*result.combo[2]*result.multi[2],
			damage4 = this.myAtk["4"]*result.combo[3]*result.multi[3];

		var damage = damage1+damage2+damage3+damage4;

		this.monUnits[0].hp-=damage;
		this.monsterHpGauge.changeValue( this.monUnits[0].hp );

		var playAttackSequenceArray = [];

		var showOutAtk = cc.LabelTTF.create(damage, 'Verdana', 20);
		showOutAtk.setPosition(110+100, size.height - 23);
		showOutAtk.setColor(cc.c4b(255,0,0,255));
		this.addChild(showOutAtk, 2);
		showOutAtk.runAction(cc.Sequence.create(
			cc.ScaleBy.create(0.3, 4),
			cc.DelayTime.create(1),
			cc.CallFunc.create(showOutAtk.removeFromParent, showOutAtk)
			));


		if(this.monUnits[0].hp<=0){

			if(this.monUnits[0].drop != 0){
				this.getItems.push(this.monUnits[0].drop);
			}
			this.monUnits.shift();
			this.dungeonBattles.setString( this.monUnitMax-this.monUnits.length +'/'+ this.monUnitMax );
			this.myRunes.shift();

			if(this.monUnits.length == 0){
				this.showMessage('战斗胜利！');
				setData('map_area_clear','','',liveDungeon);
			}else{
				this.monsterName.setString( this.monUnits[0].name );
				this.monsterHpGauge.changeValue(this.monUnits[0].hp, this.monUnits[0].maxHp);
				
				this.newTurn();
			}

			return;
		}

		this.myHp -= this.monUnits[0].atk;
		this.myHpGauge.changeValue(this.myHp);

		var showOutAtk2 = cc.LabelTTF.create(this.monUnits[0].atk, 'Verdana', 20);
		showOutAtk2.setPosition(size.width-210+100, 150);
		showOutAtk2.setColor(cc.c4b(255,0,0,255));

		this.addChild(showOutAtk2, 2);
		showOutAtk2.runAction(cc.Sequence.create(
			cc.Hide.create(),
			cc.DelayTime.create(0.5),
			cc.Show.create(),
			cc.ScaleBy.create(0.3, 4),
			cc.DelayTime.create(1),
			cc.CallFunc.create(showOutAtk2.removeFromParent, showOutAtk2)
			));

		if(this.myHp<=0){
			this.showMessage("你已经死了！");
			liveDungeon();
			return;
		}

		this.newTurn();
		if(this.myRunes[0].length==0){
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
		this.battleBL = null;

    	this._super();
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