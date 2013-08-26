var homeLayer = BaseUILayer.extend({

    init:function () {
        this._super();

        getData('home','',this.renderUI.bind(this));
        
        return true;
    },
    renderUI: function(data){
        var size = cc.Director.getInstance().getWinSize();

        var nameLabel = cc.LabelTTF.create(data.name, 'sans-serif', 14, cc.size(140,14), cc.TEXT_ALIGNMENT_LEFT);
        nameLabel.setPosition(10 + 70, size.height - 15);
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

        var mMenu = new menuLayer();
        mMenu.setPosition(size.width-30, 0);
        this.addChild(mMenu);
    }

});

var mainScene = cc.Scene.extend({
	onEnter: function(){
        this._super();
        var layer = new homeLayer();
        layer.init();
        this.addChild(layer);
	}
});