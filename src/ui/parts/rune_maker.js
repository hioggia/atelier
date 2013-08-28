var runeMaker = function(key){
	var x, y, p;
	y = (runeDefine[key].ten -1) * 50;
	x = (runeDefine[key].one -1) * 32;
	p = cc.Sprite.create('res/rune/mahjong.png', cc.rect(x, y, 32, 50));
	return p;
};