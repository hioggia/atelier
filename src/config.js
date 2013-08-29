var rule = {
    staminaRecoveryPerMS: 10*60*1000,
    turnBreakTimes: 3
};

var runeDefine = {
    "11": {
        name: "一条",
        ten: 1,
        one: 1
    },
    "12": {
        name: "二条",
        ten: 1,
        one: 2
    },
    "13": {
        name: "三条",
        ten: 1,
        one: 3
    },
    "14": {
        name: "四条",
        ten: 1,
        one: 4
    },
    "15": {
        name: "五条",
        ten: 1,
        one: 5
    },
    "16": {
        name: "六条",
        ten: 1,
        one: 6
    },
    "17": {
        name: "七条",
        ten: 1,
        one: 7
    },
    "18": {
        name: "八条",
        ten: 1,
        one: 8
    },
    "19": {
        name: "九条",
        ten: 1,
        one: 9
    },
    "21": {
        name: "一筒",
        ten: 2,
        one: 1
    },
    "22": {
        name: "二筒",
        ten: 2,
        one: 2
    },
    "23": {
        name: "三筒",
        ten: 2,
        one: 3
    },
    "24": {
        name: "四筒",
        ten: 2,
        one: 4
    },
    "25": {
        name: "五筒",
        ten: 2,
        one: 5
    },
    "26": {
        name: "六筒",
        ten: 2,
        one: 6
    },
    "27": {
        name: "七筒",
        ten: 2,
        one: 7
    },
    "28": {
        name: "八筒",
        ten: 2,
        one: 8
    },
    "29": {
        name: "九筒",
        ten: 2,
        one: 9
    },
    "31": {
        name: "一万",
        ten: 3,
        one: 1
    },
    "32": {
        name: "二万",
        ten: 3,
        one: 2
    },
    "33": {
        name: "三万",
        ten: 3,
        one: 3
    },
    "34": {
        name: "四万",
        ten: 3,
        one: 4
    },
    "35": {
        name: "五万",
        ten: 3,
        one: 5
    },
    "36": {
        name: "六万",
        ten: 3,
        one: 6
    },
    "37": {
        name: "七万",
        ten: 3,
        one: 7
    },
    "38": {
        name: "八万",
        ten: 3,
        one: 8
    },
    "39": {
        name: "九万",
        ten: 3,
        one: 9
    },
    "41": {
        name: "东",
        ten: 4,
        one: 1
    },
    "42": {
        name: "南",
        ten: 4,
        one: 2
    },
    "43": {
        name: "西",
        ten: 4,
        one: 3
    },
    "44": {
        name: "北",
        ten: 4,
        one: 4
    },
    "45": {
        name: "白",
        ten: 4,
        one: 5
    },
    "46": {
        name: "发",
        ten: 4,
        one: 6
    },
    "47": {
        name: "中",
        ten: 4,
        one: 7
    }
};

var itemDefine = {

    "1": {
        name: "普通石头",
        type: "material",
        price: 100,
        rare: 1
    },

    "2": {
        name: "坚固的石头",
        type: "material",
        price: 150,
        rare: 2
    },

    "3": {
        name: "普通木头",
        type: "material",
        price: 100,
        rare: 1
    },

    "4": {
        name: "坚硬的木头",
        type: "material",
        price: 150,
        rare: 2
    },

    "5": {
        name: "树叶",
        type: "material",
        price: 50,
        rare: 1
    },

    "6": {
        name: "盛夏的果实",
        type: "material",
        price: 1000,
        rare: 3
    },

    "7": {
        name: "黄金矿石",
        type: "material",
        price: 100000,
        rare: 3
    },

    "8": {
        name: "钠铁矿石",
        type: "material",
        price: 1000,
        rare: 4
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

    "1002": {
        name: "木柄石剑",
        type: "weapon",
        price: 1200,
        rare: 1,
        weapon: {
            atk: 120
        }
    },

    "1003": {
        name: "坚固的石头剑",
        type: "weapon",
        price: 2000,
        rare: 2,
        weapon: {
            atk: 200
        }
    },

    "1004": {
        name: "坚固的木柄石剑",
        type: "weapon",
        price: 2400,
        rare: 2,
        weapon: {
            atk: 240
        }
    },

    "1005": {
        name: "登龙剑",
        type: "weapon",
        price: 3200,
        rare: 3,
        weapon: {
            atk: 400
        }
    },

    "1006": {
        name: "誓约胜利之剑",
        type: "weapon",
        price: 12000,
        rare: 3,
        weapon: {
            atk: 450
        }
    },

    "1007": {
        name: "天之尾羽张",
        type: "weapon",
        price: 4200,
        rare: 4,
        weapon: {
            atk: 600
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

var alchemistDefine = {
    '1001': [1,1,1],
    '1002': [1001,1,3],
    '1003': [2,2,2],
    '1004': [1003,2,4],
    '1005': [1002,3,4,6],
    '1006': [1004,5,6,7],
    '1007': [1006,1006,8]
};