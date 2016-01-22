(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) {
                return;
            }
            var minSize = 12;
            var maxSize = 16;
            var minWidth = 320;
            var maxWidth = 768;
            var scale = (clientWidth - minWidth) / (maxWidth - minWidth);
            var fontSize = scale * (maxSize - minSize) + minSize;

            if (fontSize > maxSize){
                fontSize = maxSize;
            }else if (fontSize < minSize){
                fontSize = minSize;
            }
            docEl.style.fontSize = fontSize + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

$(function() {
    FastClick.attach(document.body);
});
