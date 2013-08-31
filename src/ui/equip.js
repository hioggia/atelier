var equipLayer = BaseUILayer.extend({

    bagEquip: null,

	init: function () {
        this._super();

        getData('equip','',this.renderUI,this);
        
        return true;
    },
    renderUI: function(data){
        var size = cc.Director.getInstance().getWinSize();

        this.bagEquip = data.b;

        var menu = cc.Menu.create();

        var w1Label = cc.LabelTTF.create( itemDefine[data.e.weapon['1']].name + ' [伤害+' + itemDefine[data.e.weapon['1']].weapon.atk +']', 'Verdana', 12 );
        var w1 = cc.MenuItemLabel.create(w1Label, this.showW, this);
        w1.setUserData(1);
        w1.setAnchorPoint(0, 0);
        w1.setPosition(0, 120);
        menu.addChild(w1, 1);

        var w2Label = cc.LabelTTF.create( itemDefine[data.e.weapon['2']].name + ' [伤害+' + itemDefine[data.e.weapon['2']].weapon.atk +']', 'Verdana', 12 );
        var w2 = cc.MenuItemLabel.create(w2Label, this.showW, this);
        w2.setUserData(2);
        w2.setAnchorPoint(0, 0);
        w2.setPosition(0, 90);
        menu.addChild(w2, 1);

        var w3Label = cc.LabelTTF.create( itemDefine[data.e.weapon['3']].name + ' [伤害+' + itemDefine[data.e.weapon['3']].weapon.atk +']', 'Verdana', 12 );
        var w3 = cc.MenuItemLabel.create(w3Label, this.showW, this);
        w3.setUserData(3);
        w3.setAnchorPoint(0, 0);
        w3.setPosition(0, 60);
        menu.addChild(w3, 1);

        var w4Label = cc.LabelTTF.create( itemDefine[data.e.weapon['4']].name + ' [伤害+' + itemDefine[data.e.weapon['4']].weapon.atk +']', 'Verdana', 12 );
        var w4 = cc.MenuItemLabel.create(w4Label, this.showW, this);
        w4.setUserData(4);
        w4.setAnchorPoint(0, 0);
        w4.setPosition(0, 30);
        menu.addChild(w4, 1);

        var cLabel = cc.LabelTTF.create( itemDefine[data.e.equipment].name + ' [护甲+' + itemDefine[data.e.equipment].equipment.hp +']', 'Verdana', 12 );
        var c = cc.MenuItemLabel.create(cLabel, this.showC, this);
        c.setAnchorPoint(0, 0);
        c.setPosition(0, 0);
        menu.addChild(c, 1);

        this.addChild(menu, 1);
        menu.setPosition(10, 160);

        var mMenu = new menuLayer();
        mMenu.setPosition(size.width-30, 0);
        this.addChild(mMenu);
    },
    showW: function(sender){
        var pos = sender.getUserData();
        var scene = cc.Scene.create(),
            layer = new equipSelectLayer();
        scene.addChild(layer);
        cc.Director.getInstance().replaceScene(scene);
        layer.init(pos, this.bagEquip.weapon);
    },
    showC: function(sender){
        var pos = 0;
        var scene = cc.Scene.create(),
            layer = new equipSelectLayer();
        scene.addChild(layer);
        cc.Director.getInstance().replaceScene(scene);
        layer.init(pos, this.bagEquip.equipment);
    }
	
});

var equipScene = cc.Scene.extend({
	onEnter: function(){
        this._super();
        var layer = new equipLayer();
        layer.init();
        this.addChild(layer);
	}
});