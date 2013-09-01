var Gauge = cc.Layer.extend({

	bar: null,
	gauge: null,
	label: null,

	_maxValue: 0,
	_nowValue: 0,
	_prefixText: '',
	_extendText: '',
	_fontSize: 10,

	init: function(colorFore, defaultValue, maxValue, prefixText, extendText){
		this._super();

		this._maxValue = maxValue;
		this._nowValue = defaultValue;
		this._prefixText = prefixText || '';
		this._extendText = extendText || '';

		this.bar = cc.LayerColor.create( cc.c4b(40,40,40,255), 200, 5 );
		this.bar.setPosition(0, 0);
		this.addChild(this.bar, 1);

		var sprite = cc.Sprite.create( 'res/rune/gauge.png', cc.rect(0, colorFore*5, 200, 5) );
		this.gauge = new cc.ProgressTimer();
		this.gauge.initWithSprite(sprite);
		this.gauge.setType(cc.PROGRESS_TIMER_TYPE_BAR);
		this.gauge.setMidpoint(cc.p(0,0));
		this.gauge.setBarChangeRate(cc.p(1,0));
		this.gauge.setPercentage(this._nowValue/this._maxValue*100);
		this.gauge.setPosition(100,2.5);
		this.addChild(this.gauge, 1);

		this.label = cc.LabelTTF.create( this._prefixText + this._nowValue + '/' + this._maxValue + this._extendText, 'Vernada', this._fontSize, cc.size(200, 5) );
		this.label.setPosition(100, 8);
		this.addChild(this.label, 1);

		return true;
	},
	changeValue: function(newValue){
		var act = cc.ProgressFromTo.create(1, this._nowValue/this._maxValue*100, newValue/this._maxValue*100);
		this._nowValue = newValue;
		this.gauge.runAction(act);

		this.label.setString( this._prefixText + this._nowValue + '/' + this._maxValue + this._extendText );
	},
	addValue: function(addtionalValue){
		this.changeValue( this._nowValue + addtionalValue );
	},
	resetValue: function(defaultValue, maxValue, prefixText, extendText){
		this._maxValue = maxValue;
		this._nowValue = defaultValue;
		this._prefixText = prefixText || '';
		this._extendText = extendText || '';
		
		this.gauge.setPercentage(this._nowValue/this._maxValue*100);
		this.label.setString( this._prefixText + this._nowValue + '/' + this._maxValue + this._extendText );
	}

});

Gauge.create = function(colorFore, defaultValue, maxValue, prefixText, extendText){
	var gauge = new Gauge();
	gauge.init(colorFore, defaultValue, maxValue, prefixText, extendText);

	return gauge;
}