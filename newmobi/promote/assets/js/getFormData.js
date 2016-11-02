define(function (require, exports, module) {
	var tool=require('../js/tool');
	var temp=require('../js/template');
	var _url;
	var _data;
	var _total;
	var _day;

	var defaults={
		page:0,
		pageSize:20,
		
	}
	
	var noData='<div class="notdata" ><p>还没有任何数据，赶紧进入<a href="../mine/extension.html">推广途径</a>推广吧！</p></div> ';
	var setData={
		next:function(){
			if(_total-1==defaults.page){
				return false;
			}
			defaults.page++;
			var o=tool.getFormQueryString('myform');
			
			_data=$.extend(true, {}, defaults, o);
			setData.aysc();
		},
		prev:function(){
			if(defaults.page==0){
				return false;
			}
			defaults.page--;
			var o=tool.getFormQueryString('myform');
			
			_data=$.extend(true, {}, defaults, o);
			setData.aysc();
		},
		aysc:function(){
			tool.loading.show();
			tool.ajax(_url,_data,function(d){
				tool.loading.close();
				if(d.code!=200){
					tool.dialog(d.msg,function(){
						if(d.code==503)window.location.href='/user/login.html?f=/promote/users.html';
					});
					return false;
				}
				if(!d.data || d.data.data.length<1){
					$("#noData").html(noData).show();
					$("#hasData").hide();
					
					return false;
				}
				var ls=d.data.data;
				var trs;
				$("#noData").hide();
				$("#hasData").show();
				var ods={'-1':'失败',0:'待支付',1:'已支付，待持仓', 2:'持仓中',3:'平仓处理中',4:'结算完成'}
				for(var i=0;i<ls.length;i++){
					ls[i].num=i+1;
					if(ls[i].orderStatus)ls[i].orderStatus=ods[ls[i].orderStatus];
					trs+=temp('trs',{list:ls[i]});
				}
				$("#tab_contet").html(trs);
				 _total=d.data.total;
				$("#page_cur").html((defaults.page+1)+"/"+d.data.total);
			})
		},
		render:function(u,l){
			_url=u;
			$("#search_btn").on('click',function(){
				var d=tool.getFormQueryString('myform');
				_data=$.extend(true, {}, defaults, d);
				setData.aysc();
			});
			
			$("#page_ok").on('click',function(){
				var o;
				var p=$('#page_to').val();
				if(p=="" || p<1){
					return false;
				}
				defaults.page = p-1;
				var o=tool.getFormQueryString('myform');
				_data=$.extend(true, {}, defaults, o);
				setData.aysc();
			});
			
			$(".page-up").on('click',function(){
				setData.prev();
			});
			$(".page-down").on('click',function(){
				setData.next();
			})
			$("#search_btn").trigger('click');
		}
	}
	module.exports=setData;
});