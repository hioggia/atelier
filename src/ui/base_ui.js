var BaseUILayer = cc.Layer.extend({
	showMessage: function(msg){
		alert(msg);
	},
	showConfirm: function(msg, ok, cancel){
		if(confirm(msg)){
			ok && ok();
		}else{
			cancel && cancel();
		}
	}
});