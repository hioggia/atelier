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

        var currentExpBar = Gauge.create( 2, data.exp, data.upgradeExp, '经验值： ' );
        currentExpBar.setPosition(10, size.height - 43);
        this.addChild(currentExpBar, 1);

    	var currentStaminaBar = Gauge.create( 1, data.stamina, data.staminaMax, '耐力： ' );
    	currentStaminaBar.setPosition(10, size.height - 60);
    	this.addChild(currentStaminaBar, 1);

        var staminaText = '';
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
