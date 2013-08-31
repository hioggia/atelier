var equipSelectLayer = BaseUILayer.extend({

    pos: 0,

	init: function (pos, items) {
        var size = cc.Director.getInstance().getWinSize();

        this.pos = pos;

        var list = new MenuList();
        list.init(420, 320, 50);
        
        list.setPosition(0, 0);

        for(var i=0,len=items.length;i<len;i++){
            var panel = cc.MenuItemSprite.create( cc.Sprite.create('res/rune/list_item.png', cc.rect(0,0,400,50)), null, null, this.equipNewItem, this );
            panel.setUserData(items[i]);

            var targetNameLabel = cc.LabelTTF.create(itemDefine[items[i]].name, 'Verdana', 14, cc.size(400, 16), cc.TEXT_ALIGNMENT_LEFT);
            targetNameLabel.setColor( cc.c3b(255,0,0) );
            targetNameLabel.setPosition(205, 40);
            panel.addChild(targetNameLabel, 1);

            list.addItem(panel);
        }
        this.addChild(list, 1);

        var menu = cc.Menu.create();
        menu.setPosition(size.width - 30, 20);

        var returnLabel = cc.LabelTTF.create('返回','sans-serif',20);
        var returnItem = cc.MenuItemLabel.create(returnLabel, this.finish, this);
        menu.addChild(returnItem);
        returnItem.setPosition(0, 0);

        this.addChild(menu);

        this._super();        
        return true;
    },
    equipNewItem: function(sender){
        var newItem = sender.getUserData();
        setData('equip_new_item',this.pos,newItem,this.finish,this);
    },
    finish: function(){        
        var scene = new equipScene();
        cc.Director.getInstance().replaceScene(scene);
    }	
});