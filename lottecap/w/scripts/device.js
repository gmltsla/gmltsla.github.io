$(document).ready(function () {
	setCommon();
	setScrolling()
	setGnb();
	setShorcut();
	setMedia();
	setParallax();
	setFamily();
});

$(window).load(function () {
	setIndexBg();
	setSubVis();
});

// 공통요소 AJAX 로드 (퍼블용)
function setCommon() {
	if ($.browser.msie && $.browser.version < 9) return false;
	var url = "../../../w/html/common/common.html";
	var selector = "";
	var identifier = ".common";
	var place = new Array(5);
	for (var i = 0; i < place.length; i++) {
		place[i] = new Array(5);
	}
	place[1][0] = ".header";
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
			setSiteMenu();
			setSiteSearch();
		},
		error: function (xhr, textStatus, errorThrown) {
			if (window.console !== undefined) {
				console.log((errorThrown) ? errorThrown : xhr.status);
			}
			return false;
		}
	});
}

// 스크롤시 메뉴바 적용
function setScrolling(){
	var $window = $(window);
	var $container = $(".container");
	$window.on("scroll", function () {
		$container.toggleClass("scrolled", ($window.scrollTop() > 0));
	});
}


// gnb
function setGnb(){
    var $gnb = $(".menu-bar");
	var $depth1 = $(".menu-bar .gnb > ul > .depth1");
    $depth1.on("mouseenter focusin", function(){
		var bgHeight = $(this).find("> .depth2").outerHeight();
		$depth1.find("> .depth2").hide();
		$(this).find("> .depth2").stop().fadeIn(300);
		$(".header > .section").css({
			"background": "#fff"
		});
        $(".header .gnb-bg").css({
            "height" : bgHeight,
            "opacity" : 1
        });
    }).on("mouseleave focusout", function(){
		$depth1.find("> .depth2").stop().fadeOut(100);
		$(".header .section").css({
			"background": "transparent"
		});
        $(".header .gnb-bg").css({
            "height": 0,
            "opacity": 0
        });
    });
}

// 모바일 화면시 shortcut-bar 요소 접근 제어
function setShorcut(){
	var $shorcut = $('.shortcut-bar');
	var $portal =$(".btn.portal", $shorcut);
	var $customer =$(".btn.customer", $shorcut);
	var $auth =$(".btn.btn-auth", $shorcut);
	var $login =$(".btn.btn-login", $shorcut);
	if (_isMobile) {
		$portal.attr("tabindex", -1).attr("aria-hidden", true);
		$customer.attr("tabindex", -1).attr("aria-hidden", true);
		$auth.attr("tabindex", -1).attr("aria-hidden", true);
		$login.attr("tabindex", -1).attr("aria-hidden", true);
	}
}

// 메인화면 Background
function setIndexBg() {
	var $container = $(".container");
	var h = $("> .header", $container).height() + $("> .main > .section.q1 > .content", $container).height();
	var $bg = $("> .index-bg", $container);
	$bg.height(h);
}

// 스플릿UI 서브영역 .visual: 브라우저 높이에 따른 투명도 설정
function setSubVis() {
	return false;
	var $subt = $(".main .sub-tit");
	var $inner = $(".inner", $subt);
	var $title = $(".title-bar .title", $inner);
	var $vis = $(".visual", $subt);
	var h = [];
	var alpha = 100;
	$(window).resize(function () {
		h[0] = $inner.height();
		h[1] = $title.height();
		h[2] = $vis.height();
		alpha = 100 + (h[0] - h[1] - h[2]);
		$vis.css({
			"opacity": (alpha / 100)
		});
	});

}

// 푸터 > 패밀리사이트
function setFamily(){
	var $family = $(".family-site");
	var $tit = $(".drop-tit", $family);
	var $nano = $(".nano", $family);
	$nano.nanoScroller();
	$tit.on("click", function() {
		$family.toggleClass("family-site-expanded");
		setTimeout(function() {
			$nano.nanoScroller({
				alwaysVisible: true,
				preventPageScrolling: true
			});
		}, 500);
	});
}


// 회사소개 > contribute_01_1, pr_01_1, video....
function setMedia() {
	$(".ui-media").each(function () {
		var $ui = $(this);
		var $nano = $(".nano", $ui);
		var $container = $(".swiper-container", $ui);
		$nano.nanoScroller({
			alwaysVisible: true
		});
		// = "swiper-container slides-per-view-3"
		// parameter 설정
		var slidesPerView = 1;
		var classes = $container.attr("class").split(" "); /* array */
		if (!_isMobile) {
			for (var i = 0; i < classes.length; i++) { // loop 2
				if (classes[i].match(/^slides-per-view-/)) {
					value = classes[i].replace("slides-per-view-", "");
					slidesPerView = value;
				}
			}
		}
		// 구성요소 설정
		var $navigation = $(".swiper-navigation", $ui);
		var $prev = $("<a href=\"#\" class=\"swiper-button prev\"><span class=\"icn\"></span><span class=\"lbl\">이전</span></a>").appendTo($navigation);
		var $next = $("<a href=\"#\" class=\"swiper-button next\"><span class=\"icn\"></span><span class=\"lbl\">다음</span></a>").appendTo($navigation);
		var $pagination = $(".swiper-pagination", $ui);
		var swiper = new Swiper($container, {
			slidesPerView: slidesPerView,
			spaceBetween: 16,
			navigation: {
				prevEl: $prev,
				nextEl: $next
			},
			pagination: {
				el: $pagination,
				type: "bullets",
				clickable:"true"
			}
		});
	})
}

// 회사소개 > 기업정보
function setParallax() {
	$(".parallax").each(function () {
		var $prlx = $(this);
		var $img = $("img", $prlx);
		var $html = $("html");
		var y = 0;
		$html.addClass("has-parallax");
		if (_isMobile) {
			// do nothing
		} else {
			$(window).on("scroll", function () {
				y = $(this).scrollTop() * .4;
				$img.css("margin-top", y);
			});
		}
	});
}



