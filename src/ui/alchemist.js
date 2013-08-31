var alchemistLayer = BaseUILayer.extend({

    myItems: {},

	init: function () {
        this._super();

        getData('bag','',this.renderUI.bind(this));
        
        return true;
    },
    renderUI: function(data){
        this.setMyItems(data);
        var size = cc.Director.getInstance().getWinSize();

        var list = new MenuList();
        list.init(420, 320, 50);
        
        list.setPosition(0, 0);
        var index = 0;
        
		for(var key in alchemistDefine){
            index++;
            var isCanBuild, materialStrings = [];
            isCanBuild = this.checkCanBuild(key, function(k, s){
                materialStrings.push( itemDefine[k].name +' x'+ s );
            });

            var panel = cc.MenuItemSprite.create( cc.Sprite.create('res/rune/list_item.png', cc.rect(0,0,400,50)), null, null, this.alchemistBuild, this );
            panel.setUserData(key);

			var targetNameLabel = cc.LabelTTF.create(itemDefine[key].name, 'Verdana', 14, cc.size(400, 16), cc.TEXT_ALIGNMENT_LEFT);
            if(isCanBuild){
			    targetNameLabel.setColor( cc.c3b(255,255,255) );
            }else{
                targetNameLabel.setColor( cc.c3b(255,0,0) );
            }
            targetNameLabel.setPosition(205, 40);
            panel.addChild(targetNameLabel, 1);

            var materialLabel = cc.LabelTTF.create(materialStrings.join(', '), 'Vernada', 12, cc.size(400,14), cc.TEXT_ALIGNMENT_LEFT);
            materialLabel.setColor( cc.c3b(200,200,200) );
            materialLabel.setPosition(205, 15);
            panel.addChild(materialLabel, 1);

            list.addItem(panel);

		}

        this.addChild(list, 1);

        var mMenu = new menuLayer();
        mMenu.setPosition(size.width-30, 0);
        this.addChild(mMenu);

    },
    setMyItems: function(array){
        for(var i=0,len=array.length;i<len;i++){
            if(array[i] in this.myItems){
                this.myItems[array[i]]++;
            }else{
                this.myItems[array[i]] = 1;
            }
        }
    },
    checkCanBuild: function(key, materialLoop){
        var materialCount = {}, result = true;
        for(var i=0,len=alchemistDefine[key].length;i<len;i++){
            var curr = alchemistDefine[key][i];
            if(curr in materialCount){
                materialCount[curr]++;
            }else{
                materialCount[curr] = 1;
            }
        }
        for(var k in materialCount){
            materialLoop && materialLoop(k, materialCount[k]);
            if(k in this.myItems){
                if(materialCount[k]>this.myItems[k]){
                    result = false;
                }
            }else{
                result = false;
            }
        }
        return result;
    },
    alchemistBuild: function(sender){
        var key = sender.getUserData(),
            _self = this;
        if(this.checkCanBuild(key)){
            this.showConfirm('是否要调合？',function(){
                setData('alchemist_build',null,key,function(data){
                    if('error' in data){
                        _self.showMessage(data.error.msg);
                    }else{
                        _self.setMyItems(data);
                        _self.showMessage('调合成功');
                    }
                });
            });
        }
    }
	
});

var alchemistScene = cc.Scene.extend({
	onEnter: function(){
        this._super();
        var layer = new alchemistLayer();
        layer.init();
        this.addChild(layer);
	}
});