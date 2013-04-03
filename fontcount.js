/**
 * 文本框字数统计及限制数
 * @param id <String> 文本框ID
 * @param count <Float> 字数最大值
 * @param countId <String> 字数提示ID
 */

(function(win, C, undefined) {
        
    if (win[C] ===  undefined) win[C] = {};
    C = win[C];
    
    var doc = win['document'],
        loc = location,
        SPACE = ' ';
        
    var $ = function(idStr) {
        return doc.getElementById(idStr);
    };
    
    var addClass = function(selector, classVal) {
        var thisClass = $(selector).className;
        if (thisClass.indexOf(classVal) === -1) {
            $(selector).className = thisClass + SPACE + classVal;    
        }        
    };

    var removeClass = function(selector, classVal) {
        var thisClass,
            resultClass;
        thisClass = $(selector).className;
        if (thisClass.indexOf(classVal) !== -1) {
            resultClass = thisClass.replace(classVal, SPACE);
            $(selector).className = resultClass;    
        }        
    };
    
	C.fontCount = function(textId, countId, count) {
		count = count || 100;
		var thisVal,
		    thisLeng,
		    leavLeng;
		
		var init = function() {
		    thisVal = $(textId).value;	
		    thisLeng = thisVal.length;
		    leavLeng = count - thisLeng;	    
			if (leavLeng < 10) {
				addClass(countId, 'countTipRed');
			} else {
			    removeClass(countId, 'countTipRed');    
			}    
		};
		
		init();
		
		if (thisLeng > 0 && thisLeng <= count) {
			$(countId).innerHTML = leavLeng;
		}
		
		$(textId).onkeyup = function() {
		    init();
			if (leavLeng >= 0) {
				$(countId).innerHTML = leavLeng;
			} else {
			    $(textId).value = thisVal.substr(0, count);    
			}
		}
	}
	
})(window, 'CPUI');

CPUI.fontCount('fontCount', 'fontCountTip');