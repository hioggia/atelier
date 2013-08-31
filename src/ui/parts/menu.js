var menuLayer = cc.Layer.extend({

	init: function(){
		this._super();
	},
	onEnter: function(){
        this._super();

		var size = cc.Director.getInstance().getWinSize();

	    var menu = cc.Menu.create();
	    menu.setPosition(0, 0);

		var homeLabel = cc.LabelTTF.create('家','sans-serif',20);
		var homeItem = cc.MenuItemLabel.create(homeLabel, this.sceneChange, this);
		homeItem.setUserData('home');
	    menu.addChild(homeItem);
	    homeItem.setPosition(0, size.height-20);

		var equipLabel = cc.LabelTTF.create('装备','sans-serif',20);
		var equipItem = cc.MenuItemLabel.create(equipLabel, this.sceneChange, this);
		equipItem.setUserData('equip');
	    menu.addChild(equipItem);
	    equipItem.setPosition(0, size.height-60);

	    var mapLabel = cc.LabelTTF.create('地图','sans-serif',20);
	    var mapItem = cc.MenuItemLabel.create(mapLabel, this.sceneChange, this);
	    mapItem.setUserData('map');
	    menu.addChild(mapItem);
	    mapItem.setPosition(0, size.height-100);

	    var alchemistLabel = cc.LabelTTF.create('调合','sans-serif',20);
	    var alchemistItem = cc.MenuItemLabel.create(alchemistLabel, this.sceneChange, this);
	    alchemistItem.setUserData('alchemist');
	    menu.addChild(alchemistItem);
	    alchemistItem.setPosition(0, size.height-140);

	    var bagLabel = cc.LabelTTF.create('背包','sans-serif',20);
	    var bagItem = cc.MenuItemLabel.create(bagLabel, this.sceneChange, this);
	    bagItem.setUserData('bag');
	    menu.addChild(bagItem);
	    bagItem.setPosition(0, size.height-180);

	    var friendLabel = cc.LabelTTF.create('好友','sans-serif',20);
	    var friendItem = cc.MenuItemLabel.create(friendLabel, this.sceneChange, this);
	    friendItem.setUserData('friend');
	    menu.addChild(friendItem);
	    friendItem.setPosition(0, size.height-220);

	    var systemLabel = cc.LabelTTF.create('系统','sans-serif',20);
	    var systemItem = cc.MenuItemLabel.create(systemLabel, this.sceneChange, this);
	    systemItem.setUserData('system');
	    menu.addChild(systemItem);
	    systemItem.setPosition(0, size.height-260);

	    this.addChild(menu, 1);
	    this.setTouchEnabled(true);
	},
	sceneChange: function(sender){
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
				scene = new alchemistScene();
				break;
			case 'bag':
				scene = new bagScene();
				break;
			case 'equip':
				scene = new equipScene();
				break;
		}
		if(scene){
			cc.Director.getInstance().replaceScene(scene);
		}
	}

});
