var runeMaker = function(key){
	var x, y, p;
	y = (runeDefine[key].ten -1) * 64;
	x = (runeDefine[key].one -1) * 41;
	p = cc.Sprite.create('res/rune/mahjong.png', cc.rect(x, y, 41, 64));
	//p.setScale(0.5);
	return p;
};