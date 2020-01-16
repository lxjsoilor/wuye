$(function(){
//	当浏览器窗口宽度发生变化的时候,刷新页面
    const url = "https://cy.gzziyu.com/mobile/"; 
	var winW = $(window).width();
      $(winW).resize(function(){
        location.reload();
      })


	var winW = $(window).width();
	
	
  var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // 如果需要滚动条
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  }) 
  
  
  var mySwiper = new Swiper ('.swiper-container1', {
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项

    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  }) 

  // 轮播列表
  $.ajax({
    url:url+"pcindex.php?Action=touch_ad",
    async:false,
    type:"post",
    success:function(res){
        var data = JSON.parse(res);
        var html = "";

        for(var i=0;i<data.length;i++){
            html += '<div class="swiper-slide"><img src="'+data[i].ad_code+'"/></div>';
        } 
         console.log(html)
        $('#lunbo').html(html)
    }
  }) 
  // 分类列表
   $.ajax({
    url:url+"ny_flow.php?action=get_category",
    async:false,
    type:"post",
    // jsonp:'callback',
    success:function(res){
       var data = JSON.parse(res);
       console.log(data)
       var html = "";
        for(var i=0;i<data.length;i++){
            html += '<li><a href="javascript:void(0);" class="'+data[i].cat_id+'">'+data[i].cat_name+'</a></li>';
        } 
        $('#search_item').html(html)

    }
  }) 

   // 导航
   $.ajax({
    url:url+"pcindex.php?Action=ctype",
    async:false,
    type:"post",
    success:function(res){
        var data = JSON.parse(res);
       console.log(data)

    }
  }) 
  // 搜索关键字列表
  $.ajax({
    url:url+"pcindex.php?Action=searchkeywords",
    async:false,
    type:"post",
    success:function(res){
        var data = JSON.parse(res);
       console.log(data)
    }
  }) 
  $('.left').click(function(){
    $(this).find('.search_item').slideToggle()
  })


})
