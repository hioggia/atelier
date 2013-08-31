var BasePopLayer = cc.LayerColor.extend({
	container: null,
	init: function(width, height){

        var size = cc.Director.getInstance().getWinSize();
		this.container = cc.LayerColor.create( cc.c4b(255,255,255,255), width, height );
		this.container.setPosition(size.width/2 - width/2, size.height/2 - height/2);
		
		this._addChild(this.container, 1);

		this._super(cc.c4b(0,0,0,127), size.width, size.height);
		return true;
	},
	_addChild: function(child, zOrder, tag){
		if (child === this) {
             console.warn('cc.Node.addChild: An Node can\'t be added as a child of itself.');
             return;
         }
 
         cc.Assert(child != null, "Argument must be non-nil");
         if (child._parent !== null) {
             cc.Assert(child._parent === null, "child already added. It can't be added again");
             return;
         }
         var tempzOrder = (zOrder != null) ? zOrder : child.getZOrder();
         var tmptag = (tag != null) ? tag : child.getTag();
         child.setTag(tmptag);
 
         if (!this._children)
             this._childrenAlloc();
 
         this._insertChild(child, tempzOrder);
 
         child.setParent(this);
         if (this._running) {
             child.onEnter();
             child.onEnterTransitionDidFinish();
         }
	},
	addChild: function(child, zOrder, tag){
		return this.container.addChild(child, zOrder, tag);
	}
});