var homeLayer = cc.Layer.extend({

    init:function () {
        this._super();

        getData('home','',this.renderUI.bind(this));
        
        return true;
    },
    renderUI: function(data){
        var size = cc.Director.getInstance().getWinSize();

        var nameLabel = cc.LabelTTF.create(data.name, 'sans-serif', 14);
        nameLabel.setPosition(50, size.height - 15);
        this.addChild(nameLabel, 1);

        var lvLabel = cc.LabelTTF.create('Lv.' + data.level, 'sans-serif', 14);
        lvLabel.setPosition(180, size.height - 15);
        this.addChild(lvLabel, 1);

        var expBar = cc.LayerColor.create( new cc.Color4B(40,40,40,255), 200, 5 );
        expBar.setPosition(10, size.height - 43);
        this.addChild(expBar, 1);

        if(data.exp>0){
	        var currentExpBar = cc.LayerColor.create( new cc.Color4B(127,200,127,127), data.exp/data.upgradeExp*200, 4 );
	        currentExpBar.setPosition(10, size.height - 43);
	        this.addChild(currentExpBar, 1);
	    }

        var expLabel = cc.LabelTTF.create( '经验值： ' + data.exp +'/'+ data.upgradeExp, 'sans-serif', 9 );
        expLabel.setPosition(100, size.height - 35);
        this.addChild(expLabel, 1);

        var staminaBar = cc.LayerColor.create( new cc.Color4B(40,40,40,255), 200, 5 );
        staminaBar.setPosition(10, size.height - 60);
        this.addChild(staminaBar, 1);

        if(data.stamina>0){
        	var currentStaminaBar = cc.LayerColor.create( new cc.Color4B(127,127,200,127), data.stamina/data.staminaMax*200, 4 );
        	currentStaminaBar.setPosition(10, size.height - 60);
        	this.addChild(currentStaminaBar, 1);
        }

        var staminaText = '耐力： ' + data.stamina + '/' + data.staminaMax;
        if(data.stamina != data.staminaMax){
        	var chargeFullTime = new Date( (data.staminaMax-data.stamina)*rule.staminaRecoveryPerMS+data.recoveryStaminaBegin );
        	staminaText += " (" + (chargeFullTime.getDate()==new Date().getDate()?"今日":"明日") + chargeFullTime.getHours() + ":" + chargeFullTime.getMinutes() + " 回满)";
        }
        var staminaLabel = cc.LabelTTF.create(staminaText, 'sans-serif', 9);
        staminaLabel.setPosition( 100, size.height - 52);
        this.addChild(staminaLabel, 1);

        addMenu(this);
    }

});

function addMenu(layer){
	var size = cc.Director.getInstance().getWinSize();

	var homeLabel = cc.LabelTTF.create('家','sans-serif',20);
	var homeItem = cc.MenuItemLabel.create(homeLabel, sceneChange, layer);
	homeItem.setUserData('home');

    var mapLabel = cc.LabelTTF.create('地图','sans-serif',20);
    var mapItem = cc.MenuItemLabel.create(mapLabel, sceneChange, layer);
    mapItem.setUserData('map');

    var alchemistLabel = cc.LabelTTF.create('调合','sans-serif',20);
    var alchemistItem = cc.MenuItemLabel.create(alchemistLabel, sceneChange, layer);
    alchemistItem.setUserData('alchemist');

    var bagLabel = cc.LabelTTF.create('背包','sans-serif',20);
    var bagItem = cc.MenuItemLabel.create(bagLabel, sceneChange, layer);
    bagItem.setUserData('bag');

    var menu = cc.Menu.create();
    menu.setPosition(size.width-30, 0);
    menu.addChild(homeItem);
    homeItem.setPosition(0, size.height-20);
    menu.addChild(mapItem);
    mapItem.setPosition(0, size.height-60);
    menu.addChild(alchemistItem);
    alchemistItem.setPosition(0, size.height-100);
    menu.addChild(bagItem);
    bagItem.setPosition(0, size.height-140);

    layer.addChild(menu, 1);
    layer.setTouchEnabled(true);
}

function sceneChange(sender){
	var sceneName = sender.getUserData(),
		scene = null;
	switch(sceneName){
		case 'home':
			scene = new mainScene();
			break;
		case 'map':
			scene = new mapScene();
			break;
		case 'alchemist':
			break;
		case 'bag':
			scene = new bagScene();
			break;
	}
	if(scene){
		cc.Director.getInstance().replaceScene(scene);
	}
}

var mainScene = cc.Scene.extend({
	onEnter: function(){
        this._super();
        var layer = new homeLayer();
        layer.init();
        this.addChild(layer);
	}
});
