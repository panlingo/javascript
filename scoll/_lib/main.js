// JavaScript Document
$(function(){
	$("#roll0").jCarouselLite({ 
	  btnNext:"#gor0", //上一个按钮的class或ID, 比如  btnPrev: ".next"
	  btnPrev:"#gol0",  //下一个按钮的class或ID, 比如  btnPrev: ".prev"
	  scroll : 2, //每次滚动的li的个数  
	  visible: 5, //可见数量,可以为小数，如2.5为2.5个li
	  auto:1000, // 指定多少秒内容定期自动滚动。默认为空(null),是不滚动,如果设定的,单位为毫秒,如1秒为1000
	  speed:1500, //滑动的速度,可以尝试800 1000 1500,设置成0将删除效果 
	  start:1      //开始滚动的地方,默认是0
	 }); 	   
		   
	 $("#roll1").jCarouselLite({ 
	  btnNext: "#gor1", 
	  btnPrev:"#gol1",  
	  scroll : 2,  
	  visible: 5,
	  speed:800
	 }); 
	 $("#roll2").jCarouselLite({ 
	  btnNext:"#gor2",
	  btnPrev:"#gol2",  
	  scroll : 2, 
	  visible: 5,
	  auto:1000, 
	  speed:1000, 
	  vertical:true //是否垂直滚动,可选：false,true,默认false
	 }); 
})

// 以上是常见使用参数，下面附上不是很常见的参数。仅供参考

/* btnGo       array  自定义滚动位置,类似幻灯片效果置,有选项卡,按照数组顺序,依次为按钮1按钮2按钮N,如以下,class名为1的按钮是第一个按钮：[".1", ".2"]

* mouseWheel   bool   鼠标滑是否可以轮控制上下滚动,可选：false,true,默认false

* easing       string 缓冲效果名称,如：easing: "bounceout",需要jquery中的easing pluin（缓冲插件实现）,只适用于jq1.2

* circular     bool   是否循环滚动,默认为true,如果为false,滚动到最后一个将停止滚动

* beforeStart  func   滚动开始时回调的函数,可以传入对象参数 beforeStart: function(a) { alert("开始的对象是:" + a)}

* afterEnd     func   滚动结束时回调的函数,使用方法同上*/

