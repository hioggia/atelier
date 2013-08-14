var bagLayer = cc.Layer.extend({

	init: function () {
        this._super();

        getData('bag','',this.renderUI.bind(this));
        
        return true;
    },
    renderUI: function(data){
        var size = cc.Director.getInstance().getWinSize();

		var container = cc.LayerColor.create( new cc.Color4B(0,0,0,255), 420, 320 ),
        	scrollView;
        scrollView = cc.ScrollView.create( new cc.Size(420, 320), container );
        scrollView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
		this.addChild(scrollView, 1);
		for(var index=0,len=data.length;index<len;index++){
			var mapNameLabel = cc.LabelTTF.create(itemDefine[data[index]].name, 'sans-serif', 14);
			mapNameLabel.setColor( new cc.Color3B(100,100,255) );
			mapNameLabel.setPosition( index % 3 * 120 + 80, size.height - Math.floor(index/3)*30 - 25 );
			scrollView.addChild(mapNameLabel, 1);
		}

        addMenu(this);
    }
	
});

var bagScene = cc.Scene.extend({
	onEnter: function(){
        this._super();
        var layer = new bagLayer();
        layer.init();
        this.addChild(layer);
	}
});