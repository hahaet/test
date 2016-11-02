define(function(require, exports, module) {
	var d = require('../js/dialog');
	module.exports = {
		dialog: function(v, c) {
			d({
				content: v,
				ok: c
			}).show();
		},
		ajax: function(url, data, callBack, type) {
			$.ajax({
				type: type || 'GET',
				url: url,
				data: data,
				dataType: 'json',
				cache: false,
				success: function(res) {
					if (callBack) callBack(res);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					d({
						content: '系统出错',
					}).show();
				}
			});
		},
		loading: {
			show: function() {
				$('body').append('<div class="loading"><img src="assets/img/loading.gif" /></div>')
			},
			close: function() {
				$('.loading').remove();
			}
		},
		checkPhone: function(v) {
			var reg = /^1[3|4|5|8|7]\d{9}$/;
			if (!reg.test(v)) {
				$("#phone_error").show();
				return false;
			} else {
				$("#phone_error").hide();
			}
		},
		checkPwd: function(v) {
			if (v.length < 6) {
				$("#pwd_error").show();
				return false;
			} else {
				$("#pwd_error").hide();
			}
		},
		getQueryString: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		},
		getBeforeDate: function(n, time) {
			var n = n;
			var d = new Date();
			var year = d.getFullYear();
			var mon = d.getMonth() + 1;
			var day = d.getDate();
			var h = d.getHours();
			var min = d.getMinutes();
			var sec = d.getSeconds();
			if (day <= n) {
				if (mon > 1) {
					mon = mon - 1;
				} else {
					year = year - 1;
					mon = 12;
				}
			}
			d.setDate(d.getDate() - n);
			year = d.getFullYear();
			mon = d.getMonth() + 1;
			day = d.getDate();
			s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
			return s;
		},
		getFormQueryString: function(frmID) {
			var frmID = document.getElementById(frmID);
			var i, queryString = {};
			var item;
			var itemValue;

			for (i = 0; i < frmID.length; i++) {
				item = frmID[i];
				if (item.name != '') {
					if (item.type == 'select-one') {
						var k = item.selectedIndex < 0 ? 0 : item.selectedIndex;
						itemValue = item.options.length > 0 ? item.options[k].value : "";
					} else if (item.type == 'checkbox' || item.type == 'radio') {
						if (item.checked == false) {
							continue;
						}
						itemValue = item.value;
					} else if (item.type == 'button' || item.type == 'submit' || item.type == 'reset' || item.type == 'image') { // ignore this type
						continue;
					} else {
						itemValue = item.value;
					}
					itemValue = encodeURIComponent(itemValue);
					if (itemValue && itemValue != "-10000") {
						queryString[item.name] = decodeURIComponent(itemValue);
					}

				}
			}
			return queryString;
		},

		cookie: {
			set: function(name, value, days) {
				if (days) {
					var date = new Date();
					date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
					var expires = "; expires=" + date.toGMTString();
				} else {
					var expires = "";
				}
				document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
			},
			get: function(name) {
				var nameEQ = name + "=";
				var ca = document.cookie.split(';');
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) == ' ') {
						c = c.substring(1, c.length);
					}
					if (c.indexOf(nameEQ) == 0) {
						return decodeURIComponent(c.substring(nameEQ.length, c.length));
					}
				}
				return null;
			},
			del: function(name) {
				this.set(name, "", -1);
			}

		}


	}


});