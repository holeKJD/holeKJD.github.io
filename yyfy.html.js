// JavaScript Document
//搜索控制
var Search={
	open:function(){
		var o=$(".search_container");
		h=47;
		$(o).css('display','block');
		$(o).css('height',h);
		$(o).css('top',0);
		$("#keyword").focus();
	},
	close:function(){
		var o=$(".search_container");
		$(o).css('display','none');
	}
}
//右侧导航
var barRight={
	get:function(){
		if($('#bar_right').html().length>10)
		{
			this.show();
			return;
		}
		var url='/data/index.php?s=810&temp=menu&code=utf8';
		$.get(url,function(data,status){
			if(status=='success')
			{
				$('#bar_right').html(data);
				barRight.show();
			}
		});
	},
	show:function(){
		Bg.show('barRight.hide()');
		$("#bar_right_click").attr('onclick','barRight.hide()');
		$("#bar_right").animate({height:'280px'});
	},
	hide:function(){
		Bg.hide();
		$("#bar_right_click").attr('onclick','barRight.show()');
		$("#bar_right").animate({height:'0px'});
	}
}
var Bg={
	show:function(func){
		var str='<div onclick="'+func+'" style="position:absolute;top:0px;left:0px;width:100%;z-index:9;opacity:0.3;background:#000;" id="bg_bg"></div>';
		$("body").append(str);
		var h=$(document).height();
		$('#bg_bg').css('height',h);
	},
	hide:function(){
		$('#bg_bg').remove();
	}
}
/*鼠标上移变换*/
function navChange(pre){
	this.pre=pre;
	this.init=function(){
		var pre=this.pre;
		$('#'+pre+' li').click(function(){
			var oli=$('#'+pre+' .hover');
			var id=$(oli).attr('data');
			if(!$(this).attr('data')) return;
			if(id==$(this).attr('data')) return;
			$(oli).removeClass('hover');
			$('#'+pre+'_son_'+id).removeClass('hover');
			$(this).addClass('hover');
			id=$(this).attr('data');
			$('#'+pre+'_son_'+id).addClass('hover');
		})
	}
}

//分享
var share={
	send:function(type){
		var url=document.location.href;
		var title=document.getElementsByTagName('title')[0].innerHTML;
		var desc=this.desc();
		var imgUrl='';
		switch (type)
		{
			case "sina":
				url = "http://service.weibo.com/share/share.php?title=" + encodeURIComponent(desc + '「' + title + '」' + ' 点这里' + url) + '&pic=' + imgUrl;
				window.open(url);
			break;
			case "qq":
				url = "http://share.v.t.qq.com/index.php?c=share&a=index&url=" + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + '&pic=' + imgUrl;
				window.open(url);
			break;
			case "qzone":
				url = 'http://qzs.qzone.qq.com/open/connect/widget/mobile/qzshare/index.html?referer='+ encodeURIComponent(url) +'&url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + '&logintype=qzone&imageUrl=' + encodeURIComponent(imgUrl) + '&summary=' + encodeURIComponent(desc);
				window.open(url);
			break;
			case "ren":
				url = 'http://widget.renren.com/dialog/share?resourceUrl=' + encodeURIComponent(url) + '&srcUrl=' + imgUrl + '&title=' + encodeURIComponent(title);
				+'&description=' + desc;
				window.open(url);
				break;
			default:
			break;
		}
	},
	show:function(){
		if($("#share-box").length<1)
		{
			var url='/data/index.php?s=810&temp=share&code=utf8';
			$.get(url,function(data,status){
				if(status=='success')
				{
					$('body').append(data);
					Bg.show('share.hide()');
					$("#share-box").show();
				}
			});
			return;			
		}
		Bg.show('share.hide()');
		$("#share-box").show();
	},
	hide:function(){
		$("#share-box").hide();
		Bg.hide();
	},
	desc:function(){
		var meta = document.getElementsByTagName('meta');
		var share_desc = '';
		for(i in meta)
		{
			if(typeof meta[i].name!="undefined" && meta[i].name.toLowerCase()=="description")
			{
				share_desc = meta[i].content;
				break;
			}
		}
		return share_desc;
	}
}

//根据高度载入图片
function imageceche(id,h){
	this.id=id;
	this.h=h;
	this.init=function(){
		this.load();
		var obj=this;
		$(window).scroll(function(){
			obj.load();
		});
	}
	this.load=function(){
		var h=this.h || 100;
		var $wd = $(window);
		var $img = $('#'+this.id+" [imgdata]");
		if($img.length>0)
		{
			$img.each(function(){
				if($(this).offset().top - $wd.height() < $wd.scrollTop()+h)
				{
					var url=$(this).attr('imgdata');
					$(this).removeAttr("imgdata");
					$(this).html('<img src="'+url+'">');
				}
			});
		}
	}
	this.init();
}