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

	    var mapLabel = cc.LabelTTF.create('地图','sans-serif',20);
	    var mapItem = cc.MenuItemLabel.create(mapLabel, this.sceneChange, this);
	    mapItem.setUserData('map');
	    menu.addChild(mapItem);
	    mapItem.setPosition(0, size.height-60);

	    var alchemistLabel = cc.LabelTTF.create('调合','sans-serif',20);
	    var alchemistItem = cc.MenuItemLabel.create(alchemistLabel, this.sceneChange, this);
	    alchemistItem.setUserData('alchemist');
	    menu.addChild(alchemistItem);
	    alchemistItem.setPosition(0, size.height-100);

	    var bagLabel = cc.LabelTTF.create('背包','sans-serif',20);
	    var bagItem = cc.MenuItemLabel.create(bagLabel, this.sceneChange, this);
	    bagItem.setUserData('bag');
	    menu.addChild(bagItem);
	    bagItem.setPosition(0, size.height-140);

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
		}
		if(scene){
			cc.Director.getInstance().replaceScene(scene);
		}
	}

});
