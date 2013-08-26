var Gauge = cc.Layer.extend({

	bar: null,
	gauge: null,
	label: null,

	_maxValue: 0,
	_nowValue: 0,
	_prefixText: '',
	_fontSize: 10,

	init: function(width, height, colorBack, colorFore, defaultValue, maxValue, prefixText, fontSize){
		this._super();

		this._maxValue = maxValue;
		this._nowValue = defaultValue;
		this._prefixText = prefixText;
		this._fontSize = fontSize;

		this.bar = cc.LayerColor.create( colorBack, width, height );
		this.bar.setPosition(0, 0);
		this.addChild(this.bar, 1);

		this.gauge = cc.LayerColor.create( colorFore, Math.max(1,width*(this._nowValue/this._maxValue)), height );
		this.gauge.setPosition(0,0);
		this.addChild(this.gauge, 1);

		this.label = cc.LabelTTF.create( this._prefixText + this._nowValue + '/' + this._maxValue, 'Vernada', this._fontSize, cc.size(width, height) );
		this.label.setPosition(width/2, height/2);
		this.addChild(this.label, 1);

		return true;
	},
	changeValue: function(newValue){
		var act = cc.ProgressFromTo.create(1, this._nowValue/this._maxValue, newValue/this._maxValue);
		this._nowValue = newValue;
		this.gauge.runAction(act);

		this.label.setString( this._prefixText + this._nowValue + '/' + this._maxValue );
	}

});

Gauge.create = function(width, height, colorBack, colorFore, defaultValue, maxValue, prefixText, fontSize){
	var gauge = new Gauge();
	gauge.init(width, height, colorBack, colorFore, defaultValue, maxValue, prefixText, fontSize);

	return gauge;
}