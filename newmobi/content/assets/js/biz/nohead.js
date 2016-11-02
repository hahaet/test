var reg = new RegExp("(^|&)nohead=([^&]*)(&|$)");
var r = window.location.search.substr(1).match(reg);
if(r&&unescape(r[2])==1) document.getElementById('head').remove();