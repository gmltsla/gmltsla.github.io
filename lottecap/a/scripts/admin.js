$(function () {
	setCommon();
	setLogin();
	setNav();
	setCheckbox();
	setAccordion();
	setPlugins();
});

$(window).on("scroll", function () {
	$(".container:not(.overlay)").toggleClass("scrolled", ($(this).scrollTop() > 0));
});

// 공통영역 AJAX 로드 (퍼블용)
function setCommon() {
	if ($.browser.msie && $.browser.version < 9) return false;
	var url = "/a/html/common/common.html";
	var selector = "";
	var identifier = ".common";
	var place = new Array(5);
	for (var i = 0; i < place.length; i++) {
		place[i] = new Array(5);
	}
	place[1][0] = ".header";
	place[2][1] = ".nav";
	place[3][0] = ".footer";
	$.ajax({
		type: "GET",
		url: url,
		dataType: "html",
		async: false,
		cache: false,
		success: function (html, textStatus) {
			for (var i = 0; i < place.length; i++) {
				for (var j = 0; j < place[i].length; j++) {
					if (place[i][j]) {
						selector = place[i][j];
						$(selector + identifier).html($(html).find(selector).html());
					}
				}
			}
		},
		error: function (xhr, textStatus, errorThrown) {
			if (window.console !== undefined) {
				console.log((errorThrown) ? errorThrown : xhr.status);
			}
			return false;
		}
	});
}

// 로그인
function setLogin() {
	$(".ui-login").each(function() {
		var $ui = $(this);
		var $sbar = $(".status-bar", $ui);
		var $date = $(".date .val", $sbar);
		var $time = $(".time .val", $sbar);
		init();
		setInterval(function () {
			clock();
		}, 1000);
		function init() {
			calendar();
			clock();
		}
		function calendar() {
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var delimiter = ".";
			month = (month < 10 ? "0" : "") + month;
			day = (day < 10 ? "0" : "") + day;
			var ymd = year + delimiter + month + delimiter + day;
			$date.html(ymd);
		}
		function clock() {
			var date = new Date();
			var hours = date.getHours();
			var minutes = date.getMinutes();
			var seconds = date.getSeconds();
			var delimiter = ":";
			hours = (hours < 10 ? "0" : "") + hours;
			minutes = (minutes < 10 ? "0" : "") + minutes;
			seconds = (seconds < 10 ? "0" : "") + seconds;
			var hms = hours + delimiter + minutes + delimiter + seconds;
			$time.html(hms);
		}
	});
}

// 내비게이션바
function setNav() {
	$(".nav").each(function() {
		var $nav = $(this);
		var $lnb = $(".lnb", $nav);
		var $container = $nav.parents(".container");
		var $pin = $(".btn-pin", $nav);
		var $menu = $(".btn-menu", $nav);
		var navPinned = "nav-pinned";
		var pinned = $.cookie(navPinned);
		function init() {
			$container.toggleClass(navPinned, (pinned == 1));
			set();
			$(".nano", $lnb).nanoScroller({
				alwaysVisible: false,
				preventPageScrolling: false
			});
		}
		function set() {
			$pin.on("click", function (e) {
				e.preventDefault();
				var val = ($container.hasClass(navPinned)) ? 0 : 1;
				$container.toggleClass(navPinned);
				$.cookie(navPinned, val, { expires: 7 });
			});
			$menu.on("click", function (e) {
				e.preventDefault();
				if ($container.hasClass(navPinned)) return false;
				$container.toggleClass("nav-on");
			});
		}
		init();
	});
}

// 커스텀 체크박스
function setCheckbox() {
	var $checkbox = $(".irc:not(\".readonly\") input[type=\"checkbox\"]");
	function init() {
		$checkbox.each(function () {
			var $this = $(this);
			$this.irc({
				checked: $this.is(":checked")
			});
		});
		if (!$checkbox.parents(".irc").hasClass("readonly")) {
			set();
		}
	}
	function set() {
		$checkbox.on("change", function () {
			run($(this));
		});
	}
	function run(o) {
		if (o.hasClass("g")) {
			runGroup(o, "g");
			if (o.hasClass("gs")) {
				runGroup(o, "gs");
			}
		} else {
			o.irc({
				checked: o.is(":checked")
			});
		}
		function runGroup(o, s) {
			var classes = o.attr("class").split(" ");;
			var name = "";
			var value = "";
			function escapeRegex(string) {
				return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
			}
			var namedash = s + "-";
			for (var i = 0; i < classes.length; i++) {
				var regexp = escapeRegex(namedash);
				if (classes[i].match(regexp)) {
					name = classes[i]
					value = classes[i].replace(namedash, "");
				}
			}
			var all = s + "a-" + value;
			var $checkboxes = [];
			$checkboxes[0] = $("input[type=\"checkbox\"]").filter("." + name);
			$checkboxes[1] = $checkboxes[0].filter("." + all);
			$checkboxes[2] = $checkboxes[0].not("." + all);
			if (o.hasClass(all)) {
				var b = o.is(":checked");
				for (var i = 0; i < $checkboxes[0].length; i++) {
					var $t = $checkboxes[0].eq(i);
					$t.prop("checked", b);
					$t.irc({
						checked: b
					});
					if ($t.hasClass("gs")) {
						runSubgroup($t);
					}
				}
			} else {
				var chkd = 0;
				var leng = $checkboxes[2].length;
				if ($checkboxes[1].length > 0) {
					for (var i = 0; i < leng; i++) {
						var $t = $checkboxes[2].eq(i);
						if ($t.is(":checked")) chkd++;
					}
					var b = (chkd == leng) ? true : false;
					$checkboxes[1].prop("checked", b);
					$checkboxes[1].irc({
						checked: b
					});
					if ($t.hasClass("gs")) {
						runSubgroup($t);
					}
				}
			}
			o.irc({
				checked: o.is(":checked")
			});
		}
		function runSubgroup(o) {
			var subclasses = o.attr("class").split(" ");;
			var supclass = "";
			var supval = "";
			for (var j = 0; j < subclasses.length; j++) {
				if (subclasses[j].match(/g-/)) {
					supclass = subclasses[j];
					supval = supclass.replace("g-", "");
				}
			}
			var supall = "ga-" + supval;
			var $supcheckboxes = [];
			$supcheckboxes[0] = $("input[type=\"checkbox\"]").filter("." + supclass);
			$supcheckboxes[1] = $supcheckboxes[0].filter("." + supall);
			$supcheckboxes[2] = $supcheckboxes[0].not("." + supall);
			var chkd = 0;
			var leng = $supcheckboxes[2].length;
			for (var j = 0; j < leng; j++) {
				var $c = $supcheckboxes[2].eq(j);
				if ($c.is(":checked")) chkd++;
			}
			var c = (chkd == leng) ? true : false;
			$supcheckboxes[1].prop("checked", c);
			$supcheckboxes[1].irc({
				checked: c
			});
		}
	}
	init();
}

function setAccordion() {
	$(".ui-accordion").each(function () {
		var $ui = $(this);
		var $get = $(".get-accordion", $ui);
		var $set = $(".set-accordion", $ui);
		function init() {
			if ($get.is(":checkbox")) {
				if ($get.is(":checked")) {
					$set.show();
				}
			} else {
				if ($ui.hasClass("accordion-expanded")) {
					$set.show();
				} else {
					$set.hide();
				}
			}
			set();
		}
		function set() {
			if ($get.is(":checkbox")) {
				$get.on("change", function () {
					var $this = $(this);
					var b = $this.is(":checked");
					$ui.toggleClass("accordion-expanded", b);
					run(!b);
				})
			} else {
				$get.on("click", function () {
					var b = $ui.hasClass("accordion-expanded");
					run(b);
					$ui.toggleClass("accordion-expanded", !b);
				});
			}
		}
		function run(b) {
			if (b) {
				$set.slideUp();
			} else {
				$set.slideDown();
			}
		}
		init();
	});
}










function setPlugins() {
	if (typeof $.ui != "undefined") {
		setDatepicker();
		setSpinner();
		// setDialog();
	}
};

// 플러그인 설정: jQueryUI.Datepicker
function setDatepicker() {
	var custom_goToToday = $.datepicker._gotoToday;
	$.datepicker._gotoToday = function (id) {
		custom_goToToday.call(this, id);
		this._selectDate(id);
	}
	$.datepicker.regional["ko"] = {
		closeText: "닫기",
		prevText: "이전달",
		nextText: "다음달",
		currentText: "오늘",
		monthNames: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
		monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		dayNames: ["일", "월", "화", "수", "목", "금", "토"],
		dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
		dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
		weekHeader: "Wk",
		dateFormat: "yy-mm-dd",
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: ""
	};
	$.datepicker.setDefaults($.datepicker.regional["ko"]);
	$(".datepicker").each(function () {
		var $this = $(this);
		$this.prop("readonly", true);
		var delimiter = ($this.hasClass("dash")) ? "-" : ".";
		var from = "1900";
		var to = "+5";
		var data = $this.attr("data-json");
		if (data) {
			data = JSON.parse(data);
			if (data.from) from = data.from;
			if (data.to) to = data.to;
		}
		$this.datepicker({
			buttonText: "",
			changeYear: true,
			changeMonth: true,
			dateFormat: "yy" + delimiter + "mm" + delimiter + "dd",
			showButtonPanel: true,
			showMonthAfterYear: true,
			showOn: "both",
			showOtherMonths: true,
			yearRange: from + ":" + to,
			beforeShow: function (input, datepicker) {
				setBtnClear(input);
			},
			onChangeMonthYear: function (year, month, instance) {
				setBtnClear(instance.input);
			}
		});
		function setBtnClear(input) {
			setTimeout(function () {
				var $btnPane = $(input)
					.datepicker("widget")
					.find(".ui-datepicker-buttonpane");
				$("<button>", {
					text: "초기화",
					click: function () {
						$.datepicker._clearDate(input);
					}
				}).appendTo($btnPane).addClass("ui-datepicker-clear ui-state-default ui-priority-primary ui-corner-all");
			}, 1);
		}
	});
};

// 플러그인 설정: jQueryUI.Spinner
function setSpinner() {
	$(".spinner").each(function () {
		var $o = $(this);
		var $input = $("input:text", $o);
		$input.spinner({
			min: 0,
			step: 1,
			start: 1
		});
	});
};


/* IIFE */
(function ($) {


})(jQuery);








(function ($) {

	/**
	 * 플러그인: irc (input radio checkbox)
	 */
	$.fn.irc = function (options) {
		var defaults = {
			checked: true
		};
		var settings = $.extend(true, defaults, options);
		return this.each(function () {
			var $irc = $(this).parents(".irc");
			$irc.toggleClass("checked", settings.checked);
		});

	}

})(jQuery);
