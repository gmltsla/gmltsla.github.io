$(document).ready(function () {
	//fixIEPlaceHolder();
	fixIE();
	setSiteMenu();
	setSiteSearch();
	setContainer();
	setFileThumb();
	getAOS();
});

// ie9 placeholder 적용
// function fixIEPlaceHolder() {
// 	$("input[placeholder]").each(function () {
// 		if($.browser.msie) {
// 			if($.browser.version < 10){
// 				var $this = $(this);
// 				if($this.val() == ""){
// 					$this.val($this.attr("placeholder")).focus(function(){
// 						if($this.val() == $this.attr("placeholder")) {
// 							$this.val("");
// 						}
// 					}).blur(function(){
// 						if($this.val() == "") {
// 							$this.val($this.attr("placeholder"));
// 						}
// 					});
// 				}
// 			}
// 		}
// 	});
// }

// ie 대응
function fixIE() {
	var $html = $("html");
	if (_isIE) {
		$html.addClass("ie");
		$(".cm, .indicator.pulse").removeClass("active").addClass("done");
		if ($.browser.version < 10) {
			$html.addClass("ie9");
		}
	}
}

// 전체메뉴
function setSiteMenu() {
	var $menu = $(".site-menu");
	$(".run-site-menu").on("click", function (e) {
		var $this = $(this);
		$("html").addClass("site-menu-on");
		$(".close-site-menu").on("click", function (e) {
			$("html").removeClass("site-menu-on");
			$this.focus();
			return false;
		});
		return false;
	});
	var $bar = $("> .section > .menu-bar", $menu);
	var $cnt = $("> .section > .content", $menu);
	$cnt.on("scroll", function () {
		$menu.toggleClass("site-menu-scrolled", ($(this).scrollTop() > 0));
	});
	var lastY = 0; // Needed in order to determine direction of scroll.
	$bar.on("touchstart", function (e) {
		e.preventDefault();
	});
	$cnt.on("touchstart", function (e) {
		lastY = e.touches[0].clientY;
	});
	$cnt.on("touchmove", function (e) {
		var top = e.touches[0].clientY;
		// Determine scroll position and direction.
		var scrollTop = $(e.currentTarget).scrollTop();
		var direction = (lastY - top) < 0 ? "up" : "down";
		// FIX IT!
		if (scrollTop <= 0 && direction == "up") {
			// Prevent scrolling up when already at top as this introduces a freeze.
			e.preventDefault();
		} else if (scrollTop >= (e.currentTarget.scrollHeight - e.currentTarget.outerHeight()) && direction == "down") {
			// Prevent scrolling down when already at bottom as this also introduces a freeze.
			e.preventDefault();
		}
		lastY = top;
	});
}

// 검색창
function setSiteSearch() {
	var $html = $("html");
	$(".run-site-search").on("click", function (e) {
		var $this = $(this);
		$html.addClass("site-search-on");
		$(".site-search .nano").nanoScroller({ tabIndex: -1 });
		$(".close-site-search").on("click", function (e) {
			$html.removeClass("site-search-on");
			$this.focus();
			return false;
		});
		return false;
	});
}

// .container
function setContainer() {
	return false;
	$(document).on("ready", function () {
		var $body = $("body");
		var $container = $(".container");
		if ($container.hasClass("ui-split")) {
			$body.addClass("bg-split");
		} else if ($container.hasClass("ui-sheet")) {
			$body.addClass("bg-sheet");
			if ($container.hasClass("has-stepper")) {
				$body.addClass("bg-stepper");
			}
		} else {
			return false;
		}
	});
}

// 파일 업로드 미리보기 썸네일 보정
function setFileThumb() {
	if (!!navigator.userAgent.match(/Trident\/7\./)) {
		$('.ui-file .thumb .fig img').each(function () {
			var img = $(this), // 이미지 태그
				src = 'url(' + img.attr('src') + ')', // 이미지 태그의 src를 가져옴.
				prt = img.parent(), // 부모 컨테이너 '.fig'
				bl = $('<div></div>'); // div를 하나 만듬.
			img.hide(); //이미지는 숨기고.
			prt.append(bl); //부모div에 생성한 div를 붙임.
			bl.css({
				'height': 96,
				'background-size': 'cover',
				'background-repeat': 'no-repeat',
				'background-position': 'center',
				'background-image': src
			});
		});
	}
}

// 스플래시: 카운터 애니메이션
$.fn.countUp = function (options) {
	var defaults = {
		duration: 1600
	};
	var settings = $.extend(true, defaults, options);
	return this.each(function () {
		var $this = $(this);
		var $value = $this.text().replace(",", "");
		$this.prop("Counter", 0).animate({
			Counter: $value
		}, {
			duration: settings.duration,
			easing: "swing",
			step: function (now) {
				now = Number(Math.ceil(now)).toLocaleString("en");
				$this.text(now);
			}
		});
	});
}

function getAOS() {
	if ($(".aos").length > 0) {
		$(".aos").each(function (idx) {
			var $aos = $(this);
			var type = "fade-down";
			var classes = $aos.attr("class").split(" ");
			for (var i = 0; i < classes.length; i++) {
				if (classes[i].match(/^aos-/)) {
					type = classes[i].replace("aos-", "");;
				}
			}
			var delay = idx * 300;
			$aos.setAOS({
				type: type,
				delay: delay
			});
		});
		AOS.init({});
	}
}

$.fn.setAOS = function (options) {
	var defaults = {
		type: "fade-down",
		duration: "800",
		delay: "0"
	};
	var settings = $.extend(true, defaults, options);
	return this.each(function () {
		$(this).attr({
			"data-aos": settings.type,
			"data-aos-duration": settings.duration,
			"data-aos-delay": settings.delay
		});
	});
}

$(function () {
	$(".field.monthly-pay").each(function () {
		var $field = $(this);
		var $radio = $(".ui-irc input[type=\"radio\"]", $field);
		var sClass = "";
		function set(o) {
			sClass = "irc-checked-";
			for (var i = 0; i < $radio.length; i++) {
				if ($radio.eq(i).is(":checked")) {
					sClass += i;
				}
			}
			$field.removeClass(function (index, className) {
				return (className.match(/(^|\s)irc-checked-\S+/g) || []).join(" ");
			});
			$field.addClass(sClass);
		}
		$radio.on("change", function () {
			set($(this));
		});
		$radio.each(function () {
			set($(this));
		});
	});
});
