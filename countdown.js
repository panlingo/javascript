/**
 * 倒计时
 * @param id <String> 记时器ID
 * @param count <Float> 记时最大值
 * @param url <String> 跳转的链接地址
 */

(function(win, C, undefined) {
        
    if (win[C] ===  undefined) win[C] = {};
    C = win[C];
    
    var doc = win['document'],
        loc = location;
        
    var $ = function(id) {
        return doc.getElementById(id);
    };
    
	
    C.countDown = function(id, count, url) {     
        var interval = function() {
            if (count > 1) {
                --count;
                $(id).innerHTML = count;            
            } else {
                loc.href = url;
            }
        };
        setInterval(interval, 1000);    
    }
	
})(window, 'CPUI');

CPUI.countDown('countDown', 90, 'http://www.baidu.com');