$(document).ready(function () {
	setSiteMenu();
	setSplash();
	setTabCarousel();
	getAOS();
	setBlog();
	setFileThumb();
});

function setSplash() {
	$(".ui-splash").each(function () {
		var $ui = $(this);
		var $sp = $(".splash", $ui);
		var $cm = [];
		$cm[1] = $(".cm-sp1", $sp);
		$cm[2] = $(".cm-sp2", $sp);
		var $seq = [];
		$seq[1] = $(".seq1", $ui);
		$seq[2] = $(".seq2", $ui);
		$seq[3] = $(".seq3", $ui);
		var $title = $(".main > .section > .content > .title-bar > ul > li", $ui);
		var stage = 1;
		function init() {
			run(stage);

			setTimeout(function () {
				run(2);
			}, 4000);
			setTimeout(function () {
				if ($ui.hasClass("demo")) {
					$ui.fadeOut(400, function() {
						location.href = "/m/demo/member/login_01.html";
					});
				} else {
					run(3);
				}
			}, 8000);

			/**
			 * 스테이지 인디케이터 (테스트용)
			 *
			var html = [], h = -1;
			html[++h] = "<div class=\"stage-lst\">";
			html[++h] = "<a href=\"#\" class=\"stage q1\">1</a>";
			html[++h] = "<a href=\"#\" class=\"stage q2\">2</a>";
			html[++h] = "<a href=\"#\" class=\"stage q3\">3</a>";
			html[++h] = "</div>";
			$(html.join("")).prependTo(".main > .section > .content");
			$(".stage", $ui).on("click", function() {
				run($(this).index() + 1);
			});
			 *
			 */

		}
		function run(i) {
			var className = "stage-" + i;
			$ui.removeClass(function (index, className) {
				return (className.match(/(^|\s)stage-\S+/g) || []).join(" ");
			}).addClass(className);
			switch (i) {
				case 2:
					var d = 400;
					$(".stg2-fo", $ui).fadeOut(d);
					$sp.fadeOut(d, function () {
						$(this).addClass("staged");
					}).delay(d * 3).fadeIn(d * 2);
					$seq[2].addClass("play");
					$(".counter").countUp();
					break;
				case 3:
					var d = 400;
					$(".stg3-fo", $ui).fadeOut(d);
					$seq[3].addClass("play");
					break;
				default:
					$seq[1].addClass("play");
					break;
			}
		}
		init();
	});
}

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
		var $irc = $(".ui-irc", $field);
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




function setTabCarousel() {
	$(".ui-tab-carousel").each(function () {
		var $ui = $(this);
		var $btn = $(".tab-btn", $ui);
		var $cnt = $(".tab-cnt", $ui);
		var $swiper = []
		function init() {
			$swiper[0] = new Swiper(".tab-btn-carousel", {
				slidesPerView: "auto",
				preventClicks: true,
				preventClicksPropagation: false,
				observer: true,
				observeParents: true
			});
			$swiper[1] = new Swiper(".tab-cnt-carousel", {
				slidesPerView: "1",
				normalizeSlideIndex: true
			});
			var $on = $(".tab-btn.on");
			var idx = ($on.length > 0) ? $on[0].index() : 0;
			set();
			run(idx);
		}
		function set() {
			$swiper[1].on("slideChange", function () {
				var ridx = $swiper[1].realIndex;
				run(ridx);
			});
			$btn.on("click", function (e) {
				e.preventDefault();
				run($(this).index());
			})
		}
		function run(idx) {
			$btn.removeClass("on");
			$btn.eq(idx).addClass("on");
			adj(idx);
		}
		function adj(idx) {
			var $target = $btn.eq(idx);
			var uiW = $ui.width();
			var uiHW = uiW / 2;
			var tW = $target.outerWidth();
			var btnW = 0;
			for (var i = 0; i < $btn.length; i++) {
				btnW += $btn.eq(i).width();
			}
			if (btnW > uiW) {
				var tPos = $target.position();
				var pos;
				if ((tPos.left + tW / 2) <= uiHW) {
					pos = 0;
				} else if ((btnW - tPos.left - tW / 2) <= uiHW) {
					pos = btnW - uiW;
				} else {
					pos = tPos.left - uiHW + (tW / 2);
				}
				//setTimeout(function(){
				$(".tab-btns", $ui).css({
					"transform": "translate3d(" + (pos * -1) + "px, 0, 0)",
					"transition-duration": "500ms"
				})
				// }, 200);
			} else {
			}
			$swiper[1].slideTo(idx, 300, true);
		}
		init();
	});
}

function setBlog() {
	$(".container.cblog").each(function() {
		var $container = $(this);
		var $window = $(window);
		var $header = $(".header", $container);
		var $qnb = $(".qnb", $container);
		var qnbH = $qnb.height();
		var $card = $(".card.counselor", $container);
		var cardT = ($card.length > 0) ? $card.offset().top : $header.height();
		$window.on("scroll", function() {
			$container.toggleClass("qnb-on", ($window.scrollTop() > cardT));
		});
	});
}

// 파일 업로드 미리보기 썸네일 보정
function setFileThumb() {
	if (_isIE) {
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

// 전체메뉴
function setSiteMenu() {
	$(".run-site-menu").on("click", function (e) {
		var $this = $(this);
		$("html").addClass("site-menu-on");
		// 전체메뉴 레이어의 첫번째<a> 포커스
		$(".close-site-menu").on("click", function (e) {
			$("html").removeClass("site-menu-on");
			// 닫기버튼의 포커스가 전체메뉴를 호출했던 버튼으로 포커스 이동  
			$this.focus();
			return false;
		});
		return false;
	});
	var $menu = $(".site-menu");
	var $bar = $("> .section > .menu-bar", $menu);
	var $cnt = $("> .section > .content", $menu);
	$cnt.on("scroll", function () {
		$menu.toggleClass("site-menu-scrolled", ($(this).scrollTop() > 0));
	});
	var lastY = 0; // Needed in order to determine direction of scroll.
	$bar.on("touchstart", function (e) {
		var $target = $(e.target);
		if ($target.hasClass("btn") || $target.parent().hasClass("btn")) {
			// do nothing
		} else {
			e.preventDefault();
		}
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
		} else if (scrollTop >= (e.currentTarget.scrollHeight - event.currentTarget.outerHeight()) && direction == "down") {
			// Prevent scrolling down when already at bottom as this also introduces a freeze.
			event.preventDefault();
		}
		lastY = top;
	});
}
