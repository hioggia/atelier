var ScrollListMenu = cc.Menu.extend({
    ctor : function () {
        this._super();
        cc.associateWithNative(this, cc.Layer);
        if ('touches' in sys.capabilities || sys.platform == "browser")
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities)
            this.setMouseEnabled(true);
    },
    registerWithTouchDispatcher : function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, cc.MENU_HANDLER_PRIORITY +1000, true);
    },
    onTouchBegan : function (touch, e) {
        this.touchPY1 = touch.getLocation().y;
        if (this._state != cc.MENU_STATE_WAITING || !this._visible || !this._enabled) {
            return false;
        }
        for (var c = this._parent; c != null; c = c.getParent()) {
            if (!c.isVisible()) {
                return false;
            }
        }
        this._selectedItem = this._itemForTouch(touch);
        if (this._selectedItem) {
            this._state = cc.MENU_STATE_TRACKING_TOUCH;
            this._selectedItem.selected();
            return true;
        }
    },
    onTouchMoved : function (touch, e) {
        this.touchPY2 = touch.getLocation().y;
        if (Math.abs(this.touchPY1 - this.touchPY2) > 0 && this._selectedItem) {
            this._selectedItem.unselected();
            this._selectedItem = null;
        }
    },
    onTouchEnded : function (touch, e) {
        if (this._selectedItem) {
            this._selectedItem.unselected();
            this._selectedItem.activate();
            //cc.AudioEngine.getInstance().playEffect(Res.Sounds.Main.click);
        }
        this._state = cc.MENU_STATE_WAITING;
    }
});

ScrollListMenu.create = function () {
    var ret = new ScrollListMenu();

    if (arguments.length == 0) {
        ret.initWithItems(null, null);
    } else if (arguments.length == 1) {
        if (arguments[0]instanceof Array) {
            ret.initWithArray(arguments[0]);
            return ret;
        }
    }
    ret.initWithItems(arguments);
    return ret;
};

var MenuList = cc.Layer.extend({

	scroller: null,
	container: null,
	menu: null,

	height: 0,
	itemHeight: 0,
	length: 0,
	separator: 10,

	init: function(width, height, itemHeight, separator){
		this.container = cc.LayerColor.create( cc.c4b(0,0,0,255), width, 0 ),
		this.menu = ScrollListMenu.create(),
        this.scrollView = cc.ScrollView.create( cc.size(width, height), this.container );
        this.scrollView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
		this.addChild(this.scrollView, 1);
        this.scrollView.addChild(this.menu, 1);

        this.height = height;
        this.itemHeight = itemHeight;
        this.separator = separator || 10;
        
        this.menu.setPosition(0, 0);
	},

	addItem: function(menuItem, tag){
		this.menu.addChild(menuItem, 1, tag);
		menuItem.setAnchorPoint(0, 0);
		menuItem.setPosition(this.separator, (this.itemHeight+this.separator)*this.length+this.separator);
		this.length++;
		var contentHeight = (this.itemHeight+this.separator)*this.length+this.separator;
		this.container.changeHeight( contentHeight );
		this.scrollView.setContentOffset( cc.p(0, this.height-contentHeight) );
	}
});