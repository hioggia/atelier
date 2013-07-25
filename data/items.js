(function(){
	var items = {

		"1": {
			name: "普通石头",
			type: "material",
			price: 100,
			rare: 1
		},

		"1001": {
			name: "石头剑",
			type: "weapon",
			price: 1000,
			rare: 1,
			weapon: {
				atk: 100
			}
		},

		"2001": {
			name: "石头衣服",
			type: "equipment",
			price: 1000,
			rare: 1,
			equipment: {
				hp: 10000,
				skill: []
			}
		}

	};

	window.gameData.items = items;
})();