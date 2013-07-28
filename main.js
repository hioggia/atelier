/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org


 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
 var runeImage = {
    '11': 'res/rune/11.png',
    '12': 'res/rune/12.png',
    '13': 'res/rune/13.png',
    '14': 'res/rune/14.png',
    '15': 'res/rune/15.png',
    '16': 'res/rune/16.png',
    '17': 'res/rune/17.png',
    '18': 'res/rune/18.png',
    '19': 'res/rune/19.png',
    '21': 'res/rune/21.png',
    '22': 'res/rune/22.png',
    '23': 'res/rune/23.png',
    '24': 'res/rune/24.png',
    '25': 'res/rune/25.png',
    '26': 'res/rune/26.png',
    '27': 'res/rune/27.png',
    '28': 'res/rune/28.png',
    '29': 'res/rune/29.png',
    '31': 'res/rune/31.png',
    '32': 'res/rune/32.png',
    '33': 'res/rune/33.png',
    '34': 'res/rune/34.png',
    '35': 'res/rune/35.png',
    '36': 'res/rune/36.png',
    '37': 'res/rune/37.png',
    '38': 'res/rune/38.png',
    '39': 'res/rune/39.png',
    'down': {
        '11': 'res/rune/down/11.png',
        '12': 'res/rune/down/12.png',
        '13': 'res/rune/down/13.png',
        '14': 'res/rune/down/14.png',
        '15': 'res/rune/down/15.png',
        '16': 'res/rune/down/16.png',
        '17': 'res/rune/down/17.png',
        '18': 'res/rune/down/18.png',
        '19': 'res/rune/down/19.png',
        '21': 'res/rune/down/21.png',
        '22': 'res/rune/down/22.png',
        '23': 'res/rune/down/23.png',
        '24': 'res/rune/down/24.png',
        '25': 'res/rune/down/25.png',
        '26': 'res/rune/down/26.png',
        '27': 'res/rune/down/27.png',
        '28': 'res/rune/down/28.png',
        '29': 'res/rune/down/29.png',
        '31': 'res/rune/down/31.png',
        '32': 'res/rune/down/32.png',
        '33': 'res/rune/down/33.png',
        '34': 'res/rune/down/34.png',
        '35': 'res/rune/down/35.png',
        '36': 'res/rune/down/36.png',
        '37': 'res/rune/down/37.png',
        '38': 'res/rune/down/38.png',
        '39': 'res/rune/down/39.png'
    }
 },
 ui = {
    icon: {
        atk: {
            '1': 'res/atk/1.png',
            '2': 'res/atk/2.png',
            '3': 'res/atk/3.png'
        }
    }
 }
 var g_resources = [
    //image
    {src:ui.icon.atk[1]},
    {src:ui.icon.atk[2]},
    {src:ui.icon.atk[3]},

    {src:runeImage[11]},
    {src:runeImage[12]},
    {src:runeImage[13]},
    {src:runeImage[14]},
    {src:runeImage[15]},
    {src:runeImage[16]},
    {src:runeImage[17]},
    {src:runeImage[18]},
    {src:runeImage[19]},
    {src:runeImage[21]},
    {src:runeImage[22]},
    {src:runeImage[23]},
    {src:runeImage[24]},
    {src:runeImage[25]},
    {src:runeImage[26]},
    {src:runeImage[27]},
    {src:runeImage[28]},
    {src:runeImage[29]},
    {src:runeImage[31]},
    {src:runeImage[32]},
    {src:runeImage[33]},
    {src:runeImage[34]},
    {src:runeImage[35]},
    {src:runeImage[36]},
    {src:runeImage[37]},
    {src:runeImage[38]},
    {src:runeImage[39]},
    {src:runeImage.down[11]},
    {src:runeImage.down[12]},
    {src:runeImage.down[13]},
    {src:runeImage.down[14]},
    {src:runeImage.down[15]},
    {src:runeImage.down[16]},
    {src:runeImage.down[17]},
    {src:runeImage.down[18]},
    {src:runeImage.down[19]},
    {src:runeImage.down[21]},
    {src:runeImage.down[22]},
    {src:runeImage.down[23]},
    {src:runeImage.down[24]},
    {src:runeImage.down[25]},
    {src:runeImage.down[26]},
    {src:runeImage.down[27]},
    {src:runeImage.down[28]},
    {src:runeImage.down[29]},
    {src:runeImage.down[31]},
    {src:runeImage.down[32]},
    {src:runeImage.down[33]},
    {src:runeImage.down[34]},
    {src:runeImage.down[35]},
    {src:runeImage.down[36]},
    {src:runeImage.down[37]},
    {src:runeImage.down[38]},
    {src:runeImage.down[39]}
    //plist

    //fnt

    //tmx

    //bgm

    //effect
];

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
    }
};

var itemDefine = {

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

var cocos2dApp = cc.Application.extend({
    config:document['ccConfig'],
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.initDebugSetting();
        cc.setup(this.config['tag']);
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
    },
    applicationDidFinishLaunching:function () {
        if(cc.RenderDoesnotSupport()){
            //show Information to user
            alert("Browser doesn't support WebGL");
            return false;
        }
        // initialize director
        var director = cc.Director.getInstance();

        // enable High Resource Mode(2x, such as iphone4) and maintains low resource on other devices.
        //director.enableRetinaDisplay(true);

        // turn on display FPS
        director.setDisplayStats(this.config['showFPS']);

        // set FPS. the default value is 1.0/60 if you don't call this
        director.setAnimationInterval(1.0 / this.config['frameRate']);

        //load resources
        cc.LoaderScene.preload(g_resources, function () {
            director.replaceScene(new this.startScene());
        }, this);

        return true;
    }
});
var myApp = new cocos2dApp(mainScene);
