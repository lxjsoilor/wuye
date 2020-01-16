$(document).ready(function(){
//	banner轮播
	
	var lunbo;
	var winW =  $(window).width();
	var index = 0;
	var bool = true;
	var LiLen = $("#content #content .banner .bd li").length;
	$("#content .banner .bd ul").css({"width":winW*LiLen+"px"});
	$("#content .banner .bd li").width(winW);
	
	$("#content .banner .hd li").click(function(){
		index = $(this).index();
		if (bool) {
			bool = false;
			$("#content .banner .bd ul").animate({marginLeft:-winW*index+"px"},300,function(){bool = true});
			$("#content .banner .hd li").eq(index).addClass("on").siblings().removeClass('on');
		}
	})
	
	$("#content .banner .next").click(function(){
			
		index = $("#content .banner .hd li.on").index();
		if(bool){
			bool = false;
			index+=1;
			if(index > LiLen-1){
				index=0;
			}
			$("#content .banner .bd ul").animate({marginLeft:-winW*index+"px"},300,function(){bool = true;});
			$("#content .banner .hd li").eq(index).addClass("on").siblings().removeClass('on');
		}

	})
	
	$("#content .banner .prev").click(function(){
			index = $("#content .banner .hd li.on").index();
			if(bool){
				bool = false;
				index-=1;
				if(index < 0){
					index=LiLen-1;
				}
				$("#content .banner .bd ul").animate({marginLeft:-winW*index+"px"},300,function(){bool = true;});
				$("#content .banner .hd li").eq(index).addClass("on").siblings().removeClass('on');
			}

		})
		
	$("#content .banner").mouseover(function(){
		clearInterval(lunbo);
	})
	$("#content .banner").mouseout(function(){
		show();
	})
	function show(){
		lunbo = setInterval(function(){
			index+=1;
			if(index > LiLen-1){
				index = 0;
			}
			$("#content .banner .bd ul").animate({marginLeft:-winW*index+"px"});
			$("#content .banner .hd li").eq(index).addClass("on").siblings().removeClass("on")
		},3000)
	}
	show();
	
//	banner轮播 end


//产品轮播
	var prolunbo;
	var proListWidth;
	var odlistlen;
	var proindex = 0;
	proListWidth = $(".flash_sale_show .pd").width();
	odlistlen = $(".flash_sale_show .od ol li").length;
	$(".flash_sale_show .pd ul").css("width",odlistlen*proListWidth+"px");
	
	
//	点击圆点切换图片
	$(".flash_sale_show .od ol li").click(function(){
		proindex = $(this).index();
		if (bool) {
			bool = false;
			$(".flash_sale_show .pd ul").animate({marginLeft:-proListWidth*proindex+"px"},700,
				function(){bool = true;});
			$(".flash_sale_show .od ol li").eq(proindex).addClass("on").siblings().removeClass("on");
		}
	})
//	鼠标移动上去,清除轮播
	$(".flash_sale_show .pd").mouseover(function(){
		clearInterval(prolunbo);
	})
	
//	鼠标移开,继续轮播
	$(".flash_sale_show .pd").mouseout(function(){
		proshow();
	})
	$(".flash_sale_show .od").mouseover(function(){
		clearInterval(prolunbo);
	})
	
//	鼠标移开,继续轮播
	$("flash_sale_show .od").mouseout(function(){
		proshow();
	})
//	定义轮播
	function proshow(){
		prolunbo = setInterval(function(){
			proindex+=1;
			if(proindex > odlistlen-1){
				proindex = 0;
			}
			$(".flash_sale_show .pd ul").animate({marginLeft:-proListWidth*proindex+"px"},700);
			$(".flash_sale_show .od ol li").eq(proindex).addClass("on").siblings().removeClass("on")
		},3000)
	}
	proshow();
//产品轮播 end

////	定义rem
	var winW = $(window).width();
	var constant = winW/7.5;
	if(winW<=750){
			$('body,html').css({"font-size":constant});
		}else{
			$('body,html').css({"font-size":""});
			
		}
	$(window).resize(function(){
		var winW = $(window).width();
		var constant = winW/7.5;	
		if(winW<=750){
			$('body,html').css({"font-size":constant});
			
		}else{
			$('body,html').css({"font-size":""});
			
		}
		
	});
	
//	导航栏下拉
		var bool=true;
		
		$(".nav_btn").click(function(){
			console.log(123)
			if(bool){
				$(".nav_list").slideDown(500,function () {
					bool=false;
				});
				
			}else{
				$(".nav_list").slideUp(500,function(){
						bool=true;
				});
			
				}
		})
		
//	弹出搜索页
$("#seainput").focus(function(){
		window.location = "search.html";
	})
$(".search img").click(function(){
		window.location = "search.html";
	})
//	弹出搜索页 end

//返回上一页

$("a.prev").click(function(){
	window.history.go(-1); 
	
})
//返回上一页 end
})