define('Mdialog',function(){
	function Mdialog(cfg){
		if(cfg){
			var self = this,
				closeTag = cfg.closeTag,
				msg = cfg.msg,
				callbcak=cfg.callback,
				btnNum = cfg.btnNum,
				btnCon = cfg.btnCon,
				btnClass = cfg.btnClass,
				isChange = cfg.isChange;

			self.closeTag = closeTag?closeTag:'';
			self.msg = msg?msg:'';
			self.callbcak = callbcak?callbcak:null;
			self.btnNum = btnNum?btnNum:1;
			self.btnCon = btnCon?btnCon:'确定';
			self.btnClass = btnClass?btnClass:'';
			self.isChange = isChange?isChange:false;

			self._init();
			self._bind();
		}
	};
	// 出现蒙层
	Mdialog.prototype._init = function(){
		var self = this,
			$dlg = $('.zp-dialog');
		if($dlg.length>=0){
			self._changeCon();
			self._changeBtn();
			$dlg.show();
		}
		self._anim();
	};
	// 动画展现弹窗
	Mdialog.prototype._anim = function(){
		var self = this;
		$('.zp-dialog-inner').addClass('zp-dialog-anim');
	};
	// 修改弹窗内容
	Mdialog.prototype._changeCon = function(){
		// 修改弹窗内容
		var self = this,
			$eleP = $('.zp-dialog-inner p');
		if($eleP.length>0){
			$eleP.remove();
		}
		var tan = self.msg.indexOf('！'),
			wen = self.msg.indexOf('？'),
			boundary = (tan || wen)+1,
			len = self.msg.length;
		if(len!=0){
			var firstcon = self.msg.slice(0,boundary),
				secondcon = self.msg.slice(boundary,len),
				$firstline = firstcon?$('<p>'+firstcon+'</p>'):'',
				$secondline = secondcon?$('<p>'+secondcon+'</p>'):'';
			if($firstline){
				$('.zp-content').append($firstline);
			}
			if($secondline){
				$('.zp-content').append($secondline);
			}
		}
	};
	// 修改btn内容
	Mdialog.prototype._changeBtn = function(){
		var self = this;
		if(self.isChange){
			var $surebtn = $('.sure-btn'),
				btnlen = $surebtn.length,
				firstbtn = self.btnCon[0],
				secbtn = self.btnCon[1],
				firstJump = self.btnClass[0],
				secJump = self.btnClass[1],
				$firstbtn = $($surebtn[0]),
				$secbtn = $($surebtn[1]);

			if(self.btnNum!=1 && btnlen==1){
				// 需要多个btn 页面只有一个
				$surebtn.text(firstbtn).addClass(firstJump);
				var $jumpbtn = $('<a class="sure-btn" href="javascript:;">'+secbtn+'</a>');
				$jumpbtn.addClass(secJump);
				$('.btn-container').append($jumpbtn).addClass('multiBtnBg');
				$('.zp-content').addClass('multiContent');
				$('.zp-dialog-inner').addClass('multiinner');
			}else if(self.btnNum!=1 && btnlen!=1){ 
				// 需要多个btn 页面已有多个 则改变btn内容
				$firstbtn.text(firstbtn);
				$secbtn.text(secbtn);
				$secbtn.removeClass().addClass('sure-btn').addClass(secJump);
			}else if(self.btnNum==1 && btnlen!=1){
				$secbtn.remove();
				$firstbtn.text(firstbtn);
				$('.btn-container').removeClass('multiBtnBg');
				$('.zp-content').removeClass('multiContent');
				$('.zp-dialog-inner').removeClass('multiinner');
			}else{
				$surebtn.text(firstbtn);
			}	
		}
	};
	// 隐藏蒙层
	Mdialog.prototype._close = function(){
		$('.zp-dialog').hide();
	};
	// 事件监听
	Mdialog.prototype._bind = function(){
		var self = this;
		$(self.closeTag).bind('click',function(e){
			if(self.callbcak){
				self.callbcak();
			}
			self._close();
			self._unbind();
		});
	};
	// 事件解除
	Mdialog.prototype._unbind = function(){
		var self = this;
		$(self.closeTag).unbind('click');
	};

	return{
		init:function(cfg){
			new Mdialog(cfg);
		}
	};
});