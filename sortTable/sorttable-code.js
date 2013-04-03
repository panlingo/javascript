/**
 * ������������[_timer, dean_addEvent, fixEvent, forEach, getPosition, handleEvent, onScroll, removeEvent, stIsIE]
 * ���ر�������[_timer, dean_addEvent, fixEvent, forEach, getPosition, handleEvent, onScroll, removeEvent, stIsIE]
 * ������������{}
 * ���Ǳ�������[]
 * δ֪��������[aa, bb, col, d, dt1, dt2, first, hasInputs, headrow, m, mtch, newrows, override, possdate, row_array, rows, second, sortbottomrows, sortfn, sorttable, tb, text, tfo, the, theadrow, y]
 */

var stIsIE=false;
sorttable={init:function(){
    if(arguments.callee.done){
      return ;
    }
    arguments.callee.done=true;
    if(_timer){
      clearInterval(_timer);
    }
    if(!document.createElement||!document.getElementsByTagName){
      return ;
    }
    sorttable.DATE_RE=/^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;
    sorttable.scrollRows=[];
    forEach(document.getElementsByTagName("table"),function(table){
      if(table.className.search(/\bsortable\b/)!=-1){
        sorttable.makeSortable(table);
        sorttable.changeRowCss(table);
        var autosortcol=table.getAttribute("autosortcol");
        if(autosortcol){
          var columnId=parseInt(autosortcol);
          if(isNaN(columnId)){
            return ;
          }
          var _headrow=table.tHead.rows[0].cells;
          for(var i=0;i<_headrow.length;i++){
            if(columnId==i&&!_headrow[i].className.match(/\bsorttable_nosort\b/)){
              if(stIsIE){
                _headrow[i].fireEvent("onclick");
              }else {
                var evt=document.createEvent("MouseEvents");
                evt.initEvent("click",true,true);
                _headrow[i].dispatchEvent(evt);
              }
              break ;
            }
          }
        }
      }
      if(table.className.search(/\bscrolltable\b/)!=-1){
        sorttable.makeScrolltable(table);
      }
    });
  },makeSortable:function(table){
    if(table.getElementsByTagName("thead").length==0){
      the=document.createElement("thead");
      the.appendChild(table.rows[0]);
      table.insertBefore(the,table.firstChild);
    }
    if(table.tHead==null){
      table.tHead=table.getElementsByTagName("thead")[0];
    }
    if(table.tHead.rows.length!=1){
      return ;
    }
    sortbottomrows=[];
    for(var i=0;i<table.rows.length;i++){
      if(table.rows[i].className.search(/\bsortbottom\b/)!=-1){
        sortbottomrows[sortbottomrows.length]=table.rows[i];
      }
    }
    if(sortbottomrows){
      if(table.tFoot==null){
        tfo=document.createElement("tfoot");
        table.appendChild(tfo);
      }
      for(var i=0;i<sortbottomrows.length;i++){
        tfo.appendChild(sortbottomrows[i]);
      }
      delete sortbottomrows;
    }
    headrow=table.tHead.rows[0].cells;
    for(var i=0;i<headrow.length;i++){
      if(!headrow[i].className.match(/\bsorttable_nosort\b/)){
        mtch=headrow[i].className.match(/\bsorttable_([a-z0-9]+)\b/);
        if(mtch){
          override=mtch[1];
        }
        if(mtch&&typeof sorttable["sort_"+override]=="function"){
          headrow[i].sorttable_sortfunction=sorttable["sort_"+override];
        }else {
          headrow[i].sorttable_sortfunction=sorttable.guessType(table,i);
        }
        headrow[i].sorttable_columnindex=i;
        headrow[i].sorttable_tbody=table.tBodies[0];
        dean_addEvent(headrow[i],"click",function(e){
          if(this.className.search(/\bsorttable_sorted\b/)!=-1){
            sorttable.reverse(this.sorttable_tbody);
            this.className=this.className.replace("sorttable_sorted","sorttable_sorted_reverse");
            return ;
          }
          if(this.className.search(/\bsorttable_sorted_reverse\b/)!=-1){
            sorttable.reverse(this.sorttable_tbody);
            this.className=this.className.replace("sorttable_sorted_reverse","sorttable_sorted");
            return ;
          }
          theadrow=this.parentNode;
          forEach(theadrow.childNodes,function(cell){
            if(cell.nodeType==1){
              cell.className=cell.className.replace("sorttable_sorted_reverse","");
              cell.className=cell.className.replace("sorttable_sorted","");
            }
          });
          this.className+=" sorttable_sorted_reverse";
          row_array=[];
          col=this.sorttable_columnindex;
          rows=this.sorttable_tbody.rows;
          for(var j=0;j<rows.length;j++){
            row_array[row_array.length]=[sorttable.getInnerText(rows[j].cells[col]),rows[j]];
          }
          row_array.sort(this.sorttable_sortfunction);
          tb=this.sorttable_tbody;
          for(var j=0;j<row_array.length;j++){
            tb.appendChild(row_array[j][1]);
          }
          sorttable.changeRowCss(table);
          delete row_array;
        });
      }
    }
  },changeRowCss:function(table){
    var rowclass=table.getAttribute("rowclass");
    if(rowclass){
      var arr=rowclass.split(",");
      if(arr.length>0){
        rows=table.tBodies[0].rows;
        for(var j=0;j<rows.length;j++){
          var sn=j%(arr.length);
          rows[j].className=arr[sn];
        }
      }
    }
  },initScroll:function(){
    if(!document.createElement||!document.getElementsByTagName){
      return ;
    }
    forEach(document.getElementsByTagName("table"),function(table){
      if(table.className.search(/\bscrolltable\b/)!=-1){
        sorttable.makeScrolltable(table);
      }
    });
  },makeScrolltable:function(table){
    var tablePos=getPosition(table);
    var theadPos=getPosition(table.tHead.rows[0]);
    if(theadPos.width>0&&theadPos.height>0){
      sorttable.scrollRows.push([table.tHead.rows[0],theadPos,tablePos]);
    }
  },guessType:function(table,column){
    sortfn=sorttable.sort_alpha;
    for(var i=0;i<table.tBodies[0].rows.length;i++){
      text=sorttable.getInnerText(table.tBodies[0].rows[i].cells[column]);
      if(text!=""){
        if(text.match(/^-?[$]?[\d,.]+%?$/)){
          return sorttable.sort_numeric;
        }
        possdate=text.match(sorttable.DATE_RE);
        if(possdate){
          first=parseInt(possdate[1]);
          second=parseInt(possdate[2]);
          if(first>12){
            return sorttable.sort_ddmm;
          }else {
            if(second>12){
              return sorttable.sort_mmdd;
            }else {
              sortfn=sorttable.sort_ddmm;
            }
          }
        }else {
          if(/[^\x00-\xff]/g.test(text)){
            sortfn=sorttable.sort_gb;
          }
        }
      }
    }
    return sortfn;
  },getInnerText:function(node){
    hasInputs=(typeof node.getElementsByTagName=="function")&&node.getElementsByTagName("input").length;
    if(node.getAttribute("sorttable_customkey")!=null){
      return node.getAttribute("sorttable_customkey");
    }else {
      if(typeof node.textContent!="undefined"&&!hasInputs){
        if(node.textContent=="--"){
          return "-999999";
        }
        return node.textContent.replace(/^\s+|\s+$/g,"");
      }else {
        if(typeof node.innerText!="undefined"&&!hasInputs){
          if(node.innerText=="--"){
            return "-999999";
          }
          return node.innerText.replace(/^\s+|\s+$/g,"");
        }else {
          if(typeof node.text!="undefined"&&!hasInputs){
            if(node.text=="--"){
              return "-999999";
            }
            return node.text.replace(/^\s+|\s+$/g,"");
          }else {
            switch(node.nodeType){
            case 3:
              if(node.nodeName.toLowerCase()=="input"){
                return node.value.replace(/^\s+|\s+$/g,"");
              }
            case 4:
              return node.nodeValue.replace(/^\s+|\s+$/g,"");
              break ;
            case 1:
            case 11:
              var innerText="";
              for(var i=0;i<node.childNodes.length;i++){
                innerText+=sorttable.getInnerText(node.childNodes[i]);
              }
              return innerText.replace(/^\s+|\s+$/g,"");
              break ;
            default:
              return "";
            }
          }
        }
      }
    }
  },reverse:function(tbody){
    newrows=[];
    for(var i=0;i<tbody.rows.length;i++){
      newrows[newrows.length]=tbody.rows[i];
    }
    for(var i=newrows.length-1;i>=0;i--){
      tbody.appendChild(newrows[i]);
    }
    delete newrows;
  },sort_numeric:function(a,b){
    aa=parseFloat(a[0].replace(/[^0-9.-]/g,""));
    if(isNaN(aa)){
      aa=0;
    }
    bb=parseFloat(b[0].replace(/[^0-9.-]/g,""));
    if(isNaN(bb)){
      bb=0;
    }
    return aa-bb;
  },sort_alpha:function(a,b){
    if(a[0]==b[0]){
      return 0;
    }
    if(a[0]<b[0]){
      return -1;
    }
    return 1;
  },sort_gb:function(a,b){
    return a[0].localeCompare(b[0]);
  },sort_ddmm:function(a,b){
    mtch=a[0].match(sorttable.DATE_RE);
    y=mtch[3];
    m=mtch[2];
    d=mtch[1];
    if(m.length==1){
      m="0"+m;
    }
    if(d.length==1){
      d="0"+d;
    }
    dt1=y+m+d;
    mtch=b[0].match(sorttable.DATE_RE);
    y=mtch[3];
    m=mtch[2];
    d=mtch[1];
    if(m.length==1){
      m="0"+m;
    }
    if(d.length==1){
      d="0"+d;
    }
    dt2=y+m+d;
    if(dt1==dt2){
      return 0;
    }
    if(dt1<dt2){
      return -1;
    }
    return 1;
  },sort_mmdd:function(a,b){
    mtch=a[0].match(sorttable.DATE_RE);
    y=mtch[3];
    d=mtch[2];
    m=mtch[1];
    if(m.length==1){
      m="0"+m;
    }
    if(d.length==1){
      d="0"+d;
    }
    dt1=y+m+d;
    mtch=b[0].match(sorttable.DATE_RE);
    y=mtch[3];
    d=mtch[2];
    m=mtch[1];
    if(m.length==1){
      m="0"+m;
    }
    if(d.length==1){
      d="0"+d;
    }
    dt2=y+m+d;
    if(dt1==dt2){
      return 0;
    }
    if(dt1<dt2){
      return -1;
    }
    return 1;
  },shaker_sort:function(list,comp_func){
    var b=0;
    var t=list.length-1;
    var swap=true;
    while(swap){
      swap=false;
      for(var i=b;i<t;++i){
        if(comp_func(list[i],list[i+1])>0){
          var q=list[i];
          list[i]=list[i+1];
          list[i+1]=q;
          swap=true;
        }
      }
      t--;
      if(!swap){
        break ;
      }
      for(var i=t;i>b;--i){
        if(comp_func(list[i],list[i-1])<0){
          var q=list[i];
          list[i]=list[i-1];
          list[i-1]=q;
          swap=true;
        }
      }
      b++;
    }
  }};
if(document.addEventListener){
  document.addEventListener("DOMContentLoaded",sorttable.init,false);
}
if(/WebKit/i.test(navigator.userAgent)){
  var _timer=setInterval(function(){
    if(/loaded|complete/.test(document.readyState)){
      sorttable.init();
    }
  },10);
}
window.onload=sorttable.init;
function dean_addEvent(element,type,handler){
  if(element.addEventListener){
    element.addEventListener(type,handler,false);
  }else {
    if(!handler.$$guid){
      handler.$$guid=dean_addEvent.guid++;
    }
    if(!element.events){
      element.events={};
    }
    var handlers=element.events[type];
    if(!handlers){
      handlers=element.events[type]={};
      if(element["on"+type]){
        handlers[0]=element["on"+type];
      }
    }
    handlers[handler.$$guid]=handler;
    element["on"+type]=handleEvent;
  }
}
dean_addEvent.guid=1;
function removeEvent(element,type,handler){
  if(element.removeEventListener){
    element.removeEventListener(type,handler,false);
  }else {
    if(element.events&&element.events[type]){
      delete element.events[type][handler.$$guid];
    }
  }
}
function handleEvent(event){
  var returnValue=true;
  event=event||fixEvent(((this.ownerDocument||this.document||this).parentWindow||window).event);
  var handlers=this.events[event.type];
  for(var i in handlers){
    this.$$handleEvent=handlers[i];
    if(this.$$handleEvent(event)===false){
      returnValue=false;
    }
  }
  return returnValue;
}
function fixEvent(event){
  event.preventDefault=fixEvent.preventDefault;
  event.stopPropagation=fixEvent.stopPropagation;
  return event;
}
fixEvent.preventDefault=function(){
  this.returnValue=false;
};
fixEvent.stopPropagation=function(){
  this.cancelBubble=true;
};
if(!Array.forEach){
  Array.forEach=function(array,block,context){
    for(var i=0;i<array.length;i++){
      block.call(context,array[i],i,array);
    }
  };
}
Function.prototype.forEach=function(object,block,context){
  for(var key in object){
    if(typeof this.prototype[key]=="undefined"){
      block.call(context,object[key],key,object);
    }
  }
};
String.forEach=function(string,block,context){
  Array.forEach(string.split(""),function(chr,index){
    block.call(context,chr,index,string);
  });
};
var forEach=function(object,block,context){
  if(object){
    var resolve=Object;
    if(object instanceof Function){
      resolve=Function;
    }else {
      if(object.forEach instanceof Function){
        object.forEach(block,context);
        return ;
      }else {
        if(typeof object=="string"){
          resolve=String;
        }else {
          if(typeof object.length=="number"){
            resolve=Array;
          }
        }
      }
    }
    resolve.forEach(object,block,context);
  }
};
function getPosition(obj){
  var top=0;
  var left=0;
  var width=obj.offsetWidth;
  var height=obj.offsetHeight;
  while(obj.offsetParent){
    top+=obj.offsetTop;
    left+=obj.offsetLeft;
    obj=obj.offsetParent;
  }
  return {"top":top,"left":left,"width":width,"height":height};
}
function onScroll(){
  var scrollRows=sorttable.scrollRows;
  if(scrollRows.length>0){
    for(var i=0;i<scrollRows.length;i++){
      var arr=scrollRows[i];
      var pos=arr[1];
      if(pos.width>0&&pos.height>0){
        var top=(document.documentElement&&document.documentElement.scrollTop)?document.documentElement.scrollTop:document.body.scrollTop;
        var maxBottom=arr[1].top+arr[2].height-2*arr[1].height;
        if(top<arr[1].top){
          arr[0].style.position="relative";
          arr[0].style.top="0px";
        }else {
          if(top>arr[1].top&&top<maxBottom){
            arr[0].style.position="absolute";
            arr[0].style.top=top+"px";
          }
        }
      }
    }
  }
}
window.onscroll=onScroll;