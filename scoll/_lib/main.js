// JavaScript Document
$(function(){
	$("#roll0").jCarouselLite({ 
	  btnNext:"#gor0", //��һ����ť��class��ID, ����  btnPrev: ".next"
	  btnPrev:"#gol0",  //��һ����ť��class��ID, ����  btnPrev: ".prev"
	  scroll : 2, //ÿ�ι�����li�ĸ���  
	  visible: 5, //�ɼ�����,����ΪС������2.5Ϊ2.5��li
	  auto:1000, // ָ�����������ݶ����Զ�������Ĭ��Ϊ��(null),�ǲ�����,����趨��,��λΪ����,��1��Ϊ1000
	  speed:1500, //�������ٶ�,���Գ���800 1000 1500,���ó�0��ɾ��Ч�� 
	  start:1      //��ʼ�����ĵط�,Ĭ����0
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
	  vertical:true //�Ƿ�ֱ����,��ѡ��false,true,Ĭ��false
	 }); 
})

// �����ǳ���ʹ�ò��������渽�ϲ��Ǻܳ����Ĳ����������ο�

/* btnGo       array  �Զ������λ��,���ƻõ�ƬЧ����,��ѡ�,��������˳��,����Ϊ��ť1��ť2��ťN,������,class��Ϊ1�İ�ť�ǵ�һ����ť��[".1", ".2"]

* mouseWheel   bool   ��껬�Ƿ�����ֿ������¹���,��ѡ��false,true,Ĭ��false

* easing       string ����Ч������,�磺easing: "bounceout",��Ҫjquery�е�easing pluin��������ʵ�֣�,ֻ������jq1.2

* circular     bool   �Ƿ�ѭ������,Ĭ��Ϊtrue,���Ϊfalse,���������һ����ֹͣ����

* beforeStart  func   ������ʼʱ�ص��ĺ���,���Դ��������� beforeStart: function(a) { alert("��ʼ�Ķ�����:" + a)}

* afterEnd     func   ��������ʱ�ص��ĺ���,ʹ�÷���ͬ��*/

