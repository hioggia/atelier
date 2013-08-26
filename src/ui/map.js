var mapLayer = BaseUILayer.extend({

    init: function () {
        this._super();

        getData('map_list','',this.renderUI.bind(this));
        
        return true;
    },
    renderUI: function(data){
        var size = cc.Director.getInstance().getWinSize();

        var index = -1,
    		container = cc.LayerColor.create( new cc.Color4B(0,0,0,255), 420, 320 ),
        	menu = cc.Menu.create(),
        	scrollView;
        scrollView = cc.ScrollView.create( new cc.Size(420, 320), container );
        scrollView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
		this.addChild(scrollView, 1);
        scrollView.addChild(menu, 1);
        menu.setPosition(0, 0);
		for(var key in data){
			index++;
			var mapNameLabel = cc.LabelTTF.create(data[key].name, 'sans-serif', 14);
			mapNameLabel.setColor( new cc.Color3B(100,100,255) );
			var mapNameItem = cc.MenuItemLabel.create(mapNameLabel, this.jumpAreaScene, this);
			mapNameItem.setUserData(key);
			menu.addChild(mapNameItem);
			mapNameItem.setPosition( index % 3 * 120 + 80, size.height - Math.floor(index/3)*60 - 25 );

			var mapStaminaLabel = cc.LabelTTF.create('耐力：'+ data[key].stamina, 'sans-serif', 10);
			mapStaminaLabel.setPosition( index % 3 * 120 + 80, size.height - Math.floor(index/3)*60 - 45);
			scrollView.addChild(mapStaminaLabel, 1);
		}

        var mMenu = new menuLayer();
        mMenu.setPosition(size.width-30, 0);
        this.addChild(mMenu);
    },
    jumpAreaScene: function(sender){
    	var key = sender.getUserData();
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
});

var mapScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layer = new mapLayer();
        layer.init();
        this.addChild(layer);
    }
});