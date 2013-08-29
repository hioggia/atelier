var battleLogic = function(){
	this.turn = 0;
	this.turnRunes = [];
	this.partRunes = {};
	this.partRunesLength = 0;

	this.turnRunes[this.turn] = [];
}

battleLogic.prototype = {
	newTurn: function(){
		this.turn++;
		this.turnRunes[this.turn] = [];
	},
	newPart: function(){
		this.partRunes = {};
		this.partRunesLength = 0;
	},
	checkCanPlayable: function(leastRunes){
		if(this.turnRunes[this.turn].length==12){
			return leastRunes>=2;
		}else{
			return leastRunes>=3;
		}
	},
	getTurnSelect: function(){
		return this.turnRunes[this.turn];
	},
	getTurnResult: function(){

		var result = {
			combo: [0,0,0,0],
			multi: [0.8,1,1.4,2],
			prefect: false
		}, runes = this.turnRunes[this.turn];

		if(runes.length == 0){
			return result;
		}

		//普通胡牌
		for(var i=0,len=runes.length;i<len;i+=3){
			if(i==12){
				//最后的对子
				if(runes[i] == runes[i+1]){
					result.prefect = true;
				}
			}else{
				var arr = [ runes[i], runes[i+1], runes[i+2] ],
					index = Math.floor(i/3);
				arr.sort();

				result.combo[index] += 3;

				if(runeDefine[arr[0]].ten == runeDefine[arr[1]].ten && runeDefine[arr[0]].ten == runeDefine[arr[2]].ten){
					if(arr[0] == arr[1] && arr[0] == arr[2]){
						result.multi[index] *= 2;
					}else if(runeDefine[arr[0]].ten < 4 && arr[0]+1 == arr[1] && arr[0]+2 == arr[2]){
						result.multi[index] *= 1.5;
					}
				}
			}
		}

		//特殊胡牌
		runes.sort();
		//七对子
		if(runes[0] == runes[1] && runes[2] == runes[3] && runes[4] == runes[5] && runes[6] == runes[7] && runes[8] == runes[9] && runes[10] == runes[11] && runes[12] == runes[13]){
			result.prefect = true;
			result.combo[0] += 4, result.combo[1] += 4, result.combo[2] += 4, result.combo[3] += 4;
			result.multi[0] *= 2, result.multi[1] *= 2, result.multi[2] *= 2, result.multi[3] *= 2;
		}

		return result;

	},
	getPartSelectIndex: function(){
		var arr = [];
		for(var key in this.partRunes){
			for(var i=0;i<arr.length;i++){
				if(arr[i]<~~key){
					var temp = ~~key;
					key = arr[i];
					arr[i] = temp;
				}
			}
			arr.push(~~key);
		}
		return arr;
	},
	isInSelect: function(index){
		return (index in this.partRunes);
	},
	select: function(index, value){
    	if(index in this.partRunes){
    		delete this.partRunes[index];
    		this.partRunesLength--;
    	}else{
			this.partRunes[index] = value;
			this.partRunesLength++;
		}

		/*
			如果选中的符文达到三枚，那么开始判定是否连击
			仅当同一花色的符文并且三枚连续或相同时才可以连击
			返回值0: 继续选牌
			     1： 连击，新一轮的Part
			     2： 结束这次的Turn
		*/
		if(this.partRunesLength == 3){
			var arr = [];
			for(var key in this.partRunes){
				arr.push(this.partRunes[key]);
			}
			arr.sort();
			if(runeDefine[arr[0]].ten == runeDefine[arr[1]].ten && runeDefine[arr[0]].ten == runeDefine[arr[2]].ten){
				if(arr[0] == arr[1] && arr[0] == arr[2]){
					return 1;
				}else if(runeDefine[arr[0]].ten < 4 && arr[0]+1 == arr[1] && arr[0]+2 == arr[2]){
					return 1;
				}
			}
			return 2;
		}else if(this.turnRunes[this.turn].length == 12 && this.partRunesLength == 2){
			return 2;
		}
		return 0;
	},
	runeConfirmed: function(){
		for(var key in this.partRunes){
			this.turnRunes[this.turn].push( this.partRunes[key] );
		}
	}
}