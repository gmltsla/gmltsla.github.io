var _isMobile = false,
	_isAndroid = false,
	_isiOS = false,
	_isChrome = false,
	_isEdge = false,
	_isEdgeChromium = false,
	_isFirefox = false,
	_isIE = false,
	_isOpera = false,
	_isSafari = false,
	_winW = 0,
	_winH = 0;


// 즉시실행 IIFE
(function ($) {
	// platform & browser detection
	var ua = navigator.userAgent.toLowerCase();
	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua)
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4))) {
		_isMobile = true;
		_isAndroid = ua.indexOf("android") > -1;
	} else {
		_isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
		_isEdge = !_isIE && !!window.StyleMedia;
		_isEdgeChromium = _isChrome && (navigator.userAgent.indexOf("Edg") != -1);
		_isFirefox = typeof InstallTrigger !== "undefined";
		_isIE = /*@cc_on!@*/false || !!document.documentMode;
		_isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0;
		_isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window["safari"] || (typeof safari !== "undefined" && safari.pushNotification));
	}
	// custom event triggering
	$(document).on("keypress", function (e) {
		if (e.which == 13) $(e.target).trigger("enter");
	});
})(jQuery);


$(document).on("ready", function () {
	setDevice();
	setMeta();
	setContent();
	setInputClear();
	setFieldSearch();
	setRadio();
	setCheckbox();
	setCheckboxGroup();
	setExclusiveGroup();
	setSelect();
	setChoiceChips();
	setUIChoiceChips();
	setFocusHint();
	setBbn();

	setCarousel();
	setDialog();
	setOverlay();
	setTab();
	setAccordion();

	setTemp();

	$(".cm:not(.done)").addClass("active");

	setUISheet();
	setDropdown();
	setHomecard();

	setAccessibility(); // 접근성 관련

	fixAndroid(); // 안드로이드 대응
});

$(window).on("load", function () {
	/* height 계산 등 웹폰트 로딩 시차로 인한 오차가 수반되는 함수는 윈도우.로드 이벤트에 배치 */
	setIntro();
});

$(window).on("scroll", function () {
	$(".container:not(.overlay)").toggleClass("scrolled", ($(this).scrollTop() > 0));
});

// 기기별 설정
function setDevice() {
	var $window = $(window);
	_winW = $window.width(),
	_winH = $window.height();
}

// <meta> 설정
function setMeta() {
	var meta = document.createElement("meta"),
		name = "format-detection",
		content = "telephone=no";
	meta.name = name;
	meta.content = content;
	$("head").append(meta);
}

// .main > .section > .content 영역 패딩 설정
function setContent() {
	$(".container:not(.ui-intro) .main > .section > .content").each(function () {
		var $cnt = $(this),
			$container = $cnt.parents(".container"),
			$btnBar = $("> .btn-bar.botm-fix", $cnt),
			adjH = 0,
			barH = 0;
		if ($btnBar.length > 0) {
			barH = $btnBar.outerHeight();
			if ($container.hasClass("term")) {
				adjH = barH + 64;
			} else {
				adjH = barH + 32;
			}
			$cnt.css({
				"padding-bottom": adjH
			});
		}
	});
}

// 인풋 클리어
function setInputClear() {
	$(".btn-input-clear").each(function () {
		var $clear = $(this),
			$field = $clear.parents(".field"),
			$text = $(".input input[type=\"text\"]", $field);
		$clear.attr({ "role": "button", "tabindex": 0 });
		$clear.on("click", function (e) {
			e.preventDefault;
			$text.val("");
		});
		$text.addClass("has-clear-btn").on("focusin keyup", function () {
			$field.toggleClass("clearable", ($text.val().length > 0));
		});
	});
}

// 검색필드: 추천검색어
function setFieldSearch() {
	return false;
	$(".field.search").each(function () {
		var $field = $(this);
		var $text = $(".input input[type=\"text\"]", $field);
		var $suggest = $(".suggest", $field);

		// 추천검색어(예제) 활성화: 개발 커스터마이징 필요
		$text.on("keyup", function (e) {
			var $input = $(this);
			var $f = $input.parents(".field.search");
			var $lst = $(".suggest-list", $f);
			var valLen = 0;
			valLen += $input.val().length;
			if (valLen > 1) {
				$f.addClass("suggest-on");
			} else {
				$f.removeClass("suggest-on");
			}
		});
		// 추천검색어(예제) 동작, 비활성화: 개발 커스터마이징 필요
		$suggest.on("click", function (e) {
			var val = $(".lbl", $suggest).html();
			val = val.replace(/<.*?>/g, "");
			$text.val(val);
			$field.removeClass("suggest-on");
		});
	});
}

// 커스텀 스타일 라디오버튼
function setRadio() {
	var $radio = $(".ui-irc:not(.readonly) input[type=\"radio\"]");
	function init() {
		$radio.each(function () {
			var $this = $(this);
			$this.uiIRC({
				checked: $this.is(":checked") 
			});
		});
		set();
	}
	function run(o) {
		var name = o.attr("name"),
			$group = $("input[type=\"radio\"][name=\"" + name + "\"]");
		for (var i = 0; i < $group.length; i++) {
			var $this = $group.eq(i);
			$this.uiIRC({
				checked: $this.is(":checked")
			});
		}
	}
	function set() {
		$radio.on("change", function () {
			run($(this));
		});
	}
	init();
}

// 개발 요청으로 추가
function afterCheck() {
	return false;
}

// 커스텀 스타일 체크박스
function setCheckbox() {
	var $checkbox = $(".ui-irc:not(.readonly) input[type=\"checkbox\"]");
	function init() {
		$checkbox.each(function () {
			var $this = $(this);
			$this.uiIRC({
				checked: $this.is(":checked")
			});
		});
		if (!$checkbox.parents(".ui-irc").hasClass("readonly")) {
			set();
		}
	}
	function set() {
		$checkbox.on("change", function () {
			run($(this));
			afterCheck();
		});
	}
	function run(o) {
		if (o.hasClass("g")) {
			runGroup(o, "g");
			if (o.hasClass("gs")) {
				runGroup(o, "gs");
			}
		} else if (o.hasClass("atl")) {
			runLeast(o);
		} else {
			o.uiIRC({
				checked: o.is(":checked")
			});
		}
		function runLeast(o) {
			var classes = o.attr("class").split(" ");;
			var name = "";
			var value = "";
			for (var i = 0; i < classes.length; i++) {
				var thisClass = classes[i];
				if (thisClass.match(/atl-/)) {
					name = thisClass;
					value = thisClass.replace("atl-", "");
				}
			}
			var all = "atla-" + value;
			var $checkboxes = [];
			$checkboxes[0] = $("input[type=\"checkbox\"]").filter("." + name);
			$checkboxes[1] = $checkboxes[0].filter("." + all);
			$checkboxes[2] = $checkboxes[0].not("." + all);
			if (o.hasClass(all)) {
				var b = o.is(":checked");
				for (var i = 0; i < $checkboxes[0].length; i++) {
					var $t = $checkboxes[0].eq(i);
					$t.prop("checked", b);
					$t.uiIRC({
						checked: b
					});
				}
			} else {
				var chkd = 0;
				var leng = $checkboxes[2].length;
				if ($checkboxes[1].length > 0) {
					for (var i = 0; i < leng; i++) {
						var $t = $checkboxes[2].eq(i);
						if ($t.is(":checked")) chkd++;
					}
					var b = (chkd > 0) ? true : false;
					$checkboxes[1].prop("checked", b);
					$checkboxes[1].uiIRC({
						checked: b
					});
				}
			}
			o.uiIRC({
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
					$t.uiIRC({
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
					$checkboxes[1].uiIRC({
						checked: b
					});
					if ($t.hasClass("gs")) {
						runSubgroup($t);
					}
				}
			}
			o.uiIRC({
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
			$supcheckboxes[1].uiIRC({
				checked: c
			});
		}
	}
	init();
}

// 체크박스그룹 개선 스크립트: (신용대출 > 선택약관)
function setCheckboxGroup() {
	var keyword = ["checkbox-group", "-apex"];
	function init() {
		set();
	}
	function escapeRegex(string) {
		return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
	}
	function isApex(o) {
		var classes = o.prop("class").split(" "),
			b = false;
		for (var i = 0; i < classes.length; i++) {
			if (classes[i].match(escapeRegex(keyword[1]))) b = true;
		}
		return b;
	}
	function isPack(o) {
		var classes = o.prop("class").split(" "),
			b = false;
		for (var i = 0; i < classes.length; i++) {
			if (!classes[i].match(escapeRegex(keyword[1])) && classes[i].match(escapeRegex(keyword[0]))) b = true;
		}
		return b;
	}
	function getApex(o) {
		var classes = o.prop("class").split(" "),
			name = "";
		for (var i = 0; i < classes.length; i++) {
			if (!classes[i].match(escapeRegex(keyword[1])) && classes[i].match(escapeRegex(keyword[0]))) name = classes[i];
		}
		var $apex = $("input:checkbox." + name + keyword[1]);
		return $apex;
	}
	function getPack(o) {
		var classes = o.prop("class").split(" "),
			name = "";
		for (var i = 0; i < classes.length; i++) {
			if (classes[i].match(escapeRegex(keyword[1]))) name = classes[i].replace(keyword[1], "");
		}
		var $pack = $("input:checkbox." + name);
		return $pack;
	}
	function runApex(o) {
		var b = o.is(":checked"),
			$pack = getPack(o);
		for (var i = 0; i < $pack.length; i++) {
			var $this = $pack.eq(i);
			$this.prop("checked", b).uiIRC({ checked: b });
			if (isApex($this)) runApex($this);
		}
		return false;
	}
	function runPack(o) {
		var $apex = getApex(o),
			$pack = getPack($apex),
			least = $apex.hasClass("at-least"),
			chkd = 0,
			leng = $pack.length,
			b = false;
		for (var i = 0; i < leng; i++) {
			if ($pack.eq(i).is(":checked")) chkd++;
		}
		if (least) b = (chkd > 0);
		else b = (chkd == leng);
		$apex.prop("checked", b).uiIRC({ checked: b });
		if (isPack($apex)) runPack($apex);
		return false;
	}
	function set() {
		$("input:checkbox").on("change", function (e) {
			var $this = $(this);
			if (isApex($this)) runApex($this);
			if (isPack($this)) runPack($this);
		});
	}
	init();
}

// 체크박스그룹: 독점 설정
function setExclusiveGroup() {
	function init() {
		set();
	}
	function runExclusive(o) {
		if (o.is(":checked")) {
			var classes = o.prop("class").split(" ");
			var name = "";
			for (var i = 0; i < classes.length; i++) {
				if (classes[i].match(/exclusive-group/)) name = classes[i];
			}
			if (name != "") {
				var $group = $("input:checkbox." + name);
				var idx = $group.index(o);
				for (var j = 0; j < $group.length; j++) {
					if (j != idx) $group.eq(j).prop("checked", false).uiIRC({ checked: false });
				}
			} else {
				return false;
			}
		}
	}
	function set() {
		$("input:checkbox").on("change", function (e) {
			var $this = $(this);
			runExclusive($this);
		});
	}
	init();
}

// 커스텀 스타일 셀렉트
function setSelect() {
	$(".field.select:not(\".readonly\")").each(function () {
		var $field = $(this),
			$option = $(".option", $field);
		setOption();
		$option.on("click", function (e) {
			e.preventDefault();
			var $this = $(this);
			setOption($this);
		});
		function setOption(o) {
			if (o) { }
			else o = $option.filter(".selected");
			$option.removeClass("selected").removeAttr("title");
			o.addClass("selected").attr({ "title": "선택됨" });
		}
	});
}

// 슬라이드 UI
function setCarousel() {
	$(".ui-carousel:not(.ui-tab-carousel)").each(function (idx, obj) {
		var $ui = $(this);
		if ($ui.parents(".container").hasClass("overlay") && !$("body").hasClass("overlay-on")) return false;
		var $container = $(".swiper-container", $ui),
			col = 1,
			effect = "slide",
			freemode = false,
			loop = false,
			speed = 0,
			classes = $container.attr("class").split(" "),
			spg = 1,
			sb = 0,
			swiper;
		if ($ui.hasClass("service-list")) {
			spg = 3;
			sb = 20;
		}
		for (var i = 0; i < classes.length; i++) {
			if (classes[i].match(/^col-/)) {
				value = classes[i].replace("col-", "");
				value = value.replace("-", ".");
				col = value;
			}
			if (classes[i].match(/^speed-/)) {
				value = classes[i].replace("speed-", "");
				value = value.replace("-", ".");
				speed = parseInt(value);
			}
			if ((classes[i].match(/^fade/))) {
				effect = "fade"
			}
			freemode = (classes[i].match(/^freemode/));
			loop = (classes[i].match(/^loop/));
		}
		var $navigation = $(".swiper-navigation", $ui),
			$prev = $("<a href=\"#\" class=\"swiper-button prev\"><span class=\"icn\"></span><span class=\"lbl\">이전</span></a>").appendTo($navigation),
			$next = $("<a href=\"#\" class=\"swiper-button next\"><span class=\"icn\"></span><span class=\"lbl\">다음</span></a>").appendTo($navigation),
			$pagination = $(".swiper-pagination", $ui);
		$container.toggleClass("has-pagination", ($pagination.length));
		if ($ui.hasClass("viewer-carousel")) { // 서류제출 미리보기
			return false;
		} else if ($ui.hasClass("card-carousel")) { // 홈카드
			var len = $(".swiper-slide", $container).length,
				b = (len > 1),
				loop = (b) ? true : false,
				el = (b) ? $pagination : null,
				type = (len > 5) ? "fraction" : "bullets";
			swiper = new Swiper($container, {
				slidesPerView: "auto",
				spaceBetween: 16,
				centeredSlides: true,
				loop: loop,
				autoHeight: false,
				autoplay: false,
				pagination: {
					el: el,
					type: type,
					clickable: true
				},
				on: {
					init: onInit,
					slideChange: onSlideChange
				}
			});
		} else {
			swiper = new Swiper($container, {
				slidesPerView: col,
				slidesPerGroup: spg,
				spaceBetween: sb,
				effect: effect,
				speed: speed,
				navigation: {
					prevEl: $prev,
					nextEl: $next
				},
				pagination: {
					el: $pagination,
					type: "bullets",
					clickable: true
				},
				preventClicks: false,
				preventClicksPropagation: false,
				freeMode: freemode,
				loop: loop,
				on: {
					init: onInit,
					slideChange: onSlideChange
				}
			});
		}
		function onInit() {
			$(".swiper-slide", $ui).attr("aria-hidden", true);
			$(".swiper-slide a", $ui).attr("tabindex", -1);
			$(".swiper-slide-visible", $ui).attr("aria-hidden", false);
			$(".swiper-slide-visible a", $ui).attr("tabindex", 0);
			$(".swiper-pagination .swiper-pagination-bullet", $ui).attr({ "aria-selected": false, "title": "" });
			$(".swiper-pagination .swiper-pagination-bullet-active", $ui).attr({ "aria-selected": true, "title": "선택됨" });
		}
		function onSlideChange() {
			$(".swiper-slide", $ui).attr("aria-hidden", true);
			$(".swiper-slide a", $ui).attr("tabindex", -1);
			$(".swiper-slide-visible", $ui).attr("aria-hidden", false);
			$(".swiper-slide-visible a", $ui).attr("tabindex", 0);
			$(".swiper-pagination .swiper-pagination-bullet", $ui).attr({ "aria-selected": false, "title": "" });
			$(".swiper-pagination .swiper-pagination-bullet-active", $ui).attr({ "aria-selected": true, "title": "선택됨" });
		}
	});
}

function setDialog() {
	$(".run-dialog").on("click", function (e) {
		e.preventDefault();
		var $a = $(this);
		$a.runDialog({
			dialogClass: "modal",
			modal: true
		});
	})
}

function setOverlay() {
	var $caller;
	function overlayOn(o) {
		$("body").addClass("overlay-on");
		o.fadeIn(400, function() {
			if (o.hasClass("ui-viewer")) {
				var $container = $(".ui-carousel.viewer-carousel > .swiper-container"),
					$pagination = $(".swiper-pagination", o);
				var swiper = new Swiper($container, {
					slidesPerView: 1,
					spaceBetween: 0,
					centeredSlides: true,
					loop: true,
					autoHeight: true,
					pagination: {
						el: $pagination,
						type: "bullets"
					}
				});
			}	
		});
		// setCarousel();
	}
	function overlayOff(o) {
		$("body").removeClass("overlay-on");
		o.fadeOut();
	}
	$(".run-open-overlay").each(function() {
		var $this = $(this);
		if ($this.is("input[type=\"radio\"]")) {
			$this.on("change", function() {
				if ($this.is(":checked")) {
					var $target = ($($this.attr("href")).length) ? $($this.attr("href")) : $(".overlay");
					overlayOn($target);
					$target.attr("tabindex", -1).focus();
					$caller = $this;
				}
			});
		} else if ($this.is("input[type=\"text\"]")) {
			$this.on("focusin", function () {
				var data = $this.attr("data-json");
				var href= "";
				if (data) {
					data = JSON.parse(data);
					if (data.href) href = data.href;
				}
				var $target = (href != "") ? $(href) : $(".overlay");
				overlayOn($target);
				$target.attr("tabindex", -1).focus();
				$caller = $this;
			});
		} else {
			$this.on("click touchstart", function (e) {
				var $target = ($($this.attr("href")).length) ? $($this.attr("href")) : $(".overlay");
				overlayOn($target);
				setTimeout(function() {
					$(".run-close-overlay", $target).focus();
				}, 500);
				$caller = $this;
			});
		}
	});
	$(".run-close-overlay").on("click", function (e) {
		e.preventDefault();
		var $this = $(this),
			$target = ($($this.attr("href")).length) ? $($this.attr("href")) : $this.parents(".overlay");
		overlayOff($target);
		$caller.focus();
	});
}

function setDropdown() {
	$(".ui-dropdown:not(\".readonly\")").each(function (e) {
		var $ui = $(this),
			$input = $(".input", $ui),
			$option = $(".option", $input);
		for (var i = 0; i < $option.length; i++) {
			var $o = $option.eq(i);
			$o.attr({ "tabindex": 0 });
			if ($o.hasClass("selected")) {
				$o.attr({ "aria-label": "선택됨" });
			} else {
				$o.removeAttr("aria-label");
			}
		}
	});
	$(".ui-dropdown:not(\".readonly\")").off("click enter", "output").on("click enter", ".output", function (e) {
		e.preventDefault();
		var $output = $(this),
			$ui = $output.parents(".ui-dropdown"),
			$container = $ui.parents(".container"),
			$input = $(".input", $ui),
			title = $ui.attr("title"),
			$html = $("html"),
			duration = 300,
			$outpost, from, to;
		init();
		var $dialog = $outpost.dialog({
			dialogClass: "ui-dialog-dropdown",
			modal: true,
			width: "100%",
			height: "auto",
			position: {
				my: "left bottom",
				at: "left bottom",
				of: window
			},
			open: function (e, ui) {
				if (/Android/i.test(navigator.userAgent)) {
				} else {
					$html.addClass("static").addClass("has-dropdown");
				}
				$container.addClass("has-dialog");
				var $dialog = $outpost.parents(".ui-dialog");
				from = _winH;
				to = from - $dialog.outerHeight();
				$dialog.css({ "top": from });
				$dialog.animate({
					"top": to
				}, duration, function() {
					$ui.addClass("expanded");
					$(".dropdown .option:first-child", $outpost).addClass("tested");
				});
				$(".close-dialog", $dialog).on("click", function (e) {
					e.preventDefault();
					closeDialog();
				});
				$(".ui-widget-overlay").on("click", function () {
					closeDialog();
				});
				function closeDialog() {
					$dialog.animate({
						"top": from
					}, duration, function () {
						$outpost.dialog("close");
					});
				}
				$(".option", $outpost).off("click").on("click", function(e) {
					e.preventDefault();
					var $this = $(this);
					run($this.index());
				});
				function run(idx) {
					var option = [],
						val = "";
					option[0] = $(".option", $input);
					option[1] = $(".dropdown .option", $outpost);
					for (var i = 0; i < option.length; i++) {
						for (var j = 0; j < option[i].length; j++) {
							var $o = option[i].eq(j);
							if (j == idx) {
								$o.addClass("selected").attr({ "aria-label": "선택됨" });
								val = $(".val", $o).html();
								$(".val", $output).html(val);
							} else {
								$o.removeClass("selected").removeAttr("aria-label");
							}
						}
					}
					closeDialog();
				}
			},
			close: function (e, ui) {
				$outpost.remove();
				$ui.removeClass("expanded");
				$container.removeClass("has-dialog");
				$html.removeClass("static").removeClass("has-dropdown");
			}
		});
		function init() {
			put();
		}
		function put() {
			var html = [], h = -1;
			html[++h] = "<div class=\"dialog dropdown-dialog\">";
			html[++h] = "<div class=\"title-bar\">";
			html[++h] = "<h3>" + title + "</h3>";
			html[++h] = "</div>";
			html[++h] = "<div class=\"content\">";
			html[++h] = "<div class=\"dropdown\">";
			html[++h] = "<div class=\"input\">";
			html[++h] = $input.html();
			html[++h] = "</div>";
			html[++h] = "</div>";
			html[++h] = "</div>";
			html[++h] = "</div>";
			$outpost = $(html.join("")).appendTo($ui);
		}
	});
}



/* 플러그인: 대화창 */
$.fn.runDialog = function (options) {
	var outputs = {
		autoOpen: true,
		dialogClass: "modal",
		modal: true,
		draggable: false,
		width: "100%",
		height: "auto",
		resizable: false,
		position: {
			my: "left bottom",
			at: "left bottom",
			of: window
		}
	};
	var settings = $.extend(true, outputs, options);
	return this.each(function () {
		var $this = $(this),
			$html = $("html"),
			$container = $(".container", $html);
		if ($container.hasClass("has-dialog")) return false;
		var $target;
		if ($this.hasClass("dialog")) {
			$target = $this;
		} else if ($this.hasClass("dropdown-dialog")) {
			$target = $this;
		} else if ($this.hasClass("dev-custom")) {
			$target = $this;
		} else {
			$target = $($this.attr("href"));
		}
		var from, to,
			duration = 300,
			chainable = false;
		var $dialog = $target.dialog({
			autoOpen: settings.autoOpen,
			dialogClass: settings.dialogClass,
			modal: settings.modal,
			draggable: settings.draggable,
			width: settings.width,
			height: settings.height,
			resizable: settings.resizable,
			position: settings.position,
			open: function (e, ui) {
				if (/Android/i.test(navigator.userAgent)) {
				} else {
					$html.addClass("static");
				}
				$container.addClass("has-dialog");
				var $ui = $target.parents(".ui-dialog");
				from = _winH;
				to = from - $ui.outerHeight();
				$ui.css({ "top": from });
				$ui.animate({
					"top": to
				}, duration);
				$(".close-dialog", $dialog).on("click", function (e) {
					e.preventDefault();
					chainable = true;
					closeDialog();
				});
				$(".ui-widget-overlay", $dialog).on("click", function () {
					chainable = false;
					closeDialog();
				});
				function closeDialog() {
					$ui.animate({
						"top": from
					}, duration, function () {
						$target.dialog("close");
					});
					if ($target.hasClass("dropdown-dialog")) {
						$(".ui-dropdown").removeClass("expanded");
					}
				}
			},
			close: function (e, ui) {
				$container.removeClass("has-dialog");
				$html.removeClass("static");
				if ($dialog.hasClass("has-chained") && chainable) {
					setTimeout(function () {
						runChain();
					}, 400);
				}
			}
		});
		function runChain() {
			$(".dialog-chained").runDialog({
				dialogClass: "modal",
				modal: true
			});
		}
	});
}

/* 커스텀 Alert */
function runAlert(b, s) {
	var $html = $("html"),
		$container = $(".container", $html),
		from, to,
		duration = 300;
	var html = [], h = -1;
	html[++h] = "<div class=\"dialog alert\" title=\"Alert\">";
	if (b) {
		html[++h] = "<div class=\"title-bar\">";
		html[++h] = "<h3> 알림</h3>";
		html[++h] = "</div>";
	}
	html[++h] = "<div class=\"content\">";
	html[++h] = "<div class=\"msg\">";
	html[++h] = "<p>" + s + "</p>";
	html[++h] = "</div>";
	html[++h] = "<div class=\"btn-bar\">";
	html[++h] = "<a href =\"#\" class=\"btn btn-contained close-dialog\"><span class=\"icn\"></span><span class=\"lbl\">확인</span></a>";
	html[++h] = "</div>";
	html[++h] = "</div>";
	html[++h] = "</div>";
	var $target = $(html.join(""));
	var $dialog = $target.dialog({
		autoOpen: true,
		dialogClass: "alert",
		modal: true,
		draggable: false,
		width: "100%",
		height: "auto",
		resizable: false,
		position: {
			my: "left bottom",
			at: "left bottom",
			of: window
		},
		open: function (e, ui) {
			if (/Android/i.test(navigator.userAgent)) {
			} else {
				$html.addClass("static");
			}
			$container.addClass("has-dialog");
			var $ui = $target.parents(".ui-dialog");
			from = $(window).height();
			to = from - $ui.outerHeight();
			$ui.css({ "top": from });
			$ui.animate({
				"top": to
			}, duration);
			$(".close-dialog", $dialog).on("click", function (e) {
				e.preventDefault();
				closeDialog();
			});
			$(".ui-widget-overlay", $dialog).on("click", function () {
				closeDialog();
			});
			function closeDialog() {
				$ui.animate({
					"top": from
				}, duration, function () {
					$target.dialog("close", function() {
						$(".ui-dialog.alert").remove();
					});
				});
				if ($target.hasClass("dropdown-dialog")) {
					$(".ui-dropdown").removeClass("expanded");
				}
			}
		},
		close: function (e, ui) {
			$(".ui-dialog.alert").remove();
			$container.removeClass("has-dialog");
			$html.removeClass("static");
		}
	});
}

function setTab() {
	if (_isMobile) {
		$(".ui-tab").each(function () {
			var $ui = $(this),
				$grp = $(".tab-grp", $ui),
				$tabs = $(".tabs", $grp),
				$tab = $(".tab", $tabs),
				$btns = $(".tab-btns", $ui),
				$btn = $(".tab-btn", $tabs);
				$cnts = $(".tab-cnts", $ui),
				$cnt = $(".tab-cnt", $cnts);
				if (($ui.hasClass("login-tab")) || ($ui.hasClass("find-tab"))) {
				$grp.eq(0).remove();
				$("> .tabs > .tab", $grp.eq(1)).eq(1).remove();
			} else {
				var $swiper = [];
				function init() {
					$grp.addClass("swiper-container");
					$tabs.addClass("swiper-wrapper");
					$tab.addClass("swiper-slide");
					$swiper[0] = new Swiper($grp[0], {
						slidesPerView: "auto",
						preventClicks: true,
						preventClicksPropagation: false,
						observer: true,
						observeParents: true,
						on: {
							init: onTabNavInit($grp[0])
						}
					});
					if ($grp.length > 1) {
						$swiper[1] = new Swiper($grp[1], {
							slidesPerView: "1",
							normalizeSlideIndex: true,
							autoHeight: true,
							on: {
								init: onInit,
								slideChange: function () {
									setTimeout(function () {
										onSlideChange();
									}, 100)
								}
							}							
						});
					}
					var $on = $tab.filter(".current");
					var idx = ($on.length > 0) ? $on.eq(0).index() : 0;
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
					$btn.removeClass("current");
					$btn.eq(idx).addClass("current");
					adj(idx);
				}
				function adj(idx) {
					var $target = $btn.eq(idx),
						uiW = $ui.width(),
						uiHW = uiW / 2,
						tW = $target.outerWidth(),
						btnW = 0;
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
							//	uiHW - 32;
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
				function onTabNavInit(o) {
					var $o = $(o);
					var $slide = $(".swiper-slide", o);
					for (var i = 0; i < $slide.length; i++) {
						var $this = $slide.eq(i);
						$this.attr({
							"role": "button",
							"tabindex": 0
						});
					}
				}
				init();
			}
			function onInit() {
				onSlideChange();
			}
			function onSlideChange() {
				$(".swiper-slide", $cnts).attr("aria-hidden", true);
				$(".swiper-slide a", $cnts).attr("tabindex", -1);
				$(".swiper-slide-active", $cnts).attr("aria-hidden", false);
				$(".swiper-slide-active a", $cnts).attr("tabindex", 0);
				$(".swiper-pagination .swiper-pagination-bullet", $cnts).attr({ "aria-selected": false, "title": "" });
				$(".swiper-pagination .swiper-pagination-bullet-active", $cnts).attr({ "aria-selected": true, "title": "선택됨" });
				if (_isMobile) {
					// $(".service-tab").find($(".swiper-slide", $ui)).each(function() {
					// 	if (!$(this).hasClass("tab-btn")) $(this).attr('aria-hidden', true);
					// });
					$(".service-tab").find($(".swiper-slide a", $ui)).attr("tabindex", -1);
					var $slides = $(".swiper-slide", $cnts);
					var slideLen = $slides.length;
					for (var i = 0; i < slideLen; i++) {
						var $thisSlide = $slides.eq(i);
						if ($thisSlide.hasClass("swiper-slide-active")) {
							$thisSlide.attr("aria-hidden", false).find("a").attr("tabindex", 0);
							var html = $(".cat", $thisSlide).html();
						} else {
							$thisSlide.attr("aria-hidden", true).find("a").attr("tabindex", -1);
						}
					}
				}
			}
		});
	} else {
		$(".ui-tab").each(function () {
			var $ui = $(this),
				$grp = $(".tab-grp", $ui),
				$tabs = $(".tabs", $grp[0]),
				$tab = $(".tab", $tabs),
				$btn = $(".tab-btn", $tabs),
				idx = get();
			function init() {
				run();
			}
			function get() {
				var $current = $tab.filter(".current");
				if ($current.length > 0) return $tab.index($current);
				else return 0;
			}
			function run() {
				for (var i = 0; i < $grp.length; i++) {
					$(".tab", $grp.eq(i)).removeClass("current");
					$(".tab", $grp.eq(i)).eq(idx).addClass("current");
				}
			}
			function set() {
				$btn.on("click focusin", function (e) {
					e.preventDefault();
					idx = $tab.index($(this));
					if (get() != idx) run();
				});
			}
			init();
			set();
		});
	}
}

// 아코디언
function setAccordion() {
	$(".ui-accordion:not(\".accordion-initiated\")").each(function () {
		var $ui = $(this),
			$get = $(".get-accordion", $ui),
			$set = $(".set-accordion", $ui),
			lbl, status, txt;
		function init() {
			if ($ui.hasClass("css-mode")) {
				// css mode
			} else {
				$get.attr({ "role": "button" });
				if ($get.is(":radio") || $get.is(":checkbox")) {
					var b = $get.is(":checked");
					lbl = $get.parents("label").find(".lbl").text();
					setAttr($get, b, lbl);
					if (b) {
						$set.show();
					}
				} else {
					if ($get.parents(".ui-term").length > 0) {
						lbl = $get.parents(".ui-irc").find(".lbl").text();
						setAttr($get, $ui.hasClass("accordion-expanded"), lbl);
					} else {
						lbl = $get.find(".lbl").text();
						setAttr($get, $ui.hasClass("accordion-expanded"), lbl);
					}
					if ($ui.hasClass("accordion-expanded")) {
						$set.show();
					} else {
						$set.hide();
					}
				}
			}
			set();
			$ui.addClass("accordion-initiated");
		}
		function set() {
			if ($get.is(":radio")) {
				var name = $get.attr("name");
				var $group = $("input[type=\"radio\"][name=\"" + name + "\"]");
				$group.on("change", function () {
					var b = getChecked($get);
					$ui.toggleClass("accordion-expanded", b);
					setAttr($get, b, lbl);
					run(!b);
				});
			} else if ($get.is(":checkbox")) {
				$get.on("change", function () {
					var b = getChecked($get)
					$ui.toggleClass("accordion-expanded", b);
					setAttr($get, b, lbl);
					run(!b);
				});
			} else {
				$get.on("click", function () {
					var b = $ui.hasClass("accordion-expanded");
					setAttr($get, !b, lbl);
					run(b);
					$ui.toggleClass("accordion-expanded", !b);
				});
			}
		}
		function run(b) {
			if ($ui.hasClass("css-mode")) {
				// css mode
			} else {
				if (b) {
					$set.slideUp();
				} else {
					$set.slideDown();
				}
			}
		}
		function getChecked(o) {
			if (o.is(":radio")) {
				var name = o.attr("name");
				var $group = $("input[type=\"radio\"][name=\"" + name + "\"]");
				var idx = $group.index(o);
				var b = false;
				return $group.eq(idx).is(":checked");
			} else {
				return o.is(":checked");
			}
		}
		function setAttr(o, b, s) {
			var status = (b) ? "접기" : "펼치기";
			var txt = s + " " + status;
			o.attr({ "aria-label": txt });
			return false;
		}
		init();
	});
}

function setTemp() {
	// 로컬호스트 구분 (퍼블 확인용)
	$("html").toggleClass("localhost", (location.hostname === "localhost" || location.hostname === "127.0.0.1"));
	
	// 애니메이션 확인용
	var $cm = $(".cm");
	var $menu = $(".header .menu-bar");
	var $evt = $(".container.evt");
	var $btnBar = $(".btn-bar",$evt);
	var $btnGift = $(".btn-gift");
	
	$(".btn-back", $menu).on("click", function (e) {
		e.preventDefault();
		$cm.removeClass("done").addClass("active");
	});
	$(".btn-send", $menu).on("click", function (e) {
		e.preventDefault();
		$cm.removeClass("active").addClass("done");
	});
	$btnGift.on("click", function (e) {
		e.preventDefault();
		$evt.addClass("open");
		$btnBar.addClass('open-btn');
	});
}

function setIntro() {
	$(".ui-intro").each(function () {
		var $ui = $(this),
			$main = $(".main", $ui),
			$cnt = $("> .section > .content", $main),
			$titleBar = $("> .title-bar", $cnt),
			$btnBar = $("> .btn-bar", $cnt),
			$intro = $("> .intro", $cnt);
		if ($intro.length > 0) {
			var h = $cnt.height() - $titleBar.outerHeight() - $btnBar.outerHeight();
			$intro.css({
				"height": h
			})
		}
	});
}

// 초이스칩스: 기본 동작
function setChoiceChips() {
	$(".choice-chips:not(.readonly)").each(function () {
		var $ui = $(this),
			$option = $(".option", $ui);
		setOption();
		$option.on("click enter", function (e) {
			e.preventDefault();
			var $this = $(this);
			setOption($this);
		});
		function setOption(o) {
			if (o) {}
			else o = $option.filter(".selected");
			// $option.removeClass("selected").attr({ "role": "button", "tabindex": 0 }).removeAttr("aria-label");
			// o.addClass("selected").attr({ "aria-label": "선택됨" });
			$option.removeClass("selected").attr({ "role": "button", "tabindex": 0 }).removeAttr("title");
			o.addClass("selected").attr({ "title": "선택됨" });
		}
	});
}

// 초이스칩스: 기능(expanded), 상태(disabled)
function setUIChoiceChips() {
	$(".ui-choice-chips:not(.readonly)").each(function () {
		var $ui = $(this),
			$pnd = $ui.parents(".pnd"),
			$output = $(".output", $ui),
			$option = $(".option", $ui);
		$output.attr({ "title": "펼치기" });
		setOption();
		$output.off("click").on("click enter", function (e) {
			e.preventDefault();
			if ($ui.hasClass("expanded")) collapse();
			else expand();
		});
		$option.not(".disabled").on("click enter", function (e) {
			e.preventDefault();
			var $this = $(this);
			setOption($this);
			var val = $(".val", $this).text();
			$output.html(val);
			collapse();
		});
		function collapse() {
			$ui.removeClass("expanded");
			$output.attr({ "title": "펼치기" });
			adjust();
		}
		function expand() {
			$ui.addClass("expanded");
			$output.attr({ "title": "접기" });
			adjust();
		}
		function adjust() {
			if ($pnd.length > 0) {
				var height = [];
				height[0] = $(".t", $pnd).height();
				height[1] = $(".ui-choice-chips .options", $pnd).outerHeight() + 16;
				if ($ui.hasClass("expanded")) {
					$pnd.css({
						height: height[0] + height[1]
					});
				} else {
					$pnd.css({
						height: height[0]
					});
				}
			}
		}
		function setOption(o) {
			if (o) { }
			else o = $option.filter(".selected");
			$option.removeClass("selected").attr({ "role": "button", "tabindex": 0 }).removeAttr("title");
			o.addClass("selected").attr({ "title": "선택됨" });
		}
	});
}

function setFocusHint() {
	$(".on-focus-hint").each(function () {
		var $field = $(this);
		var d = 300;
		$("input", $field).on("focusin", function () {
			$(".hint", $field).slideDown(d);
		}).on("focusout", function () {
			$(".hint", $field).slideUp(d);
		});
	});
}

(function ($) {

	/**
	 * 플러그인: uiIRC (input radio checkbox)
	 */
	$.fn.uiIRC = function (options) {
		var defaults = {
			checked: true
		};
		var settings = $.extend(true, defaults, options);
		return this.each(function () {
			var $ui = $(this).parents(".ui-irc");
			$ui.toggleClass("checked", settings.checked);
		});
	}

	/**
	 * 플러그인: initScroll (.sheet .scroll)
	 */
	$.fn.initScroll = function(h) {
		return this.each(function () {
			var $scroll = $(this),
				$cnt = $scroll.parent(".content"),
				$sheet = $cnt.parent(".sheet"),
				scrollH = $scroll.outerHeight(),
				btnBarH = $scroll.next(".btn-bar").outerHeight() + 32,
				_scrollTop = 0;
			$scroll.off("scroll").on("scroll", function () {
				clearTimeout($.data(this, "scrollTimer"));
				$.data(this, "scrollTimer", setTimeout(function () {
					run();
				}, 250));
			});
			function run() {
				if ($scroll.is(":animated")) return false;
				var scrollT = $scroll.scrollTop();
				var height = 0;
				if (scrollT > _scrollTop) {
					height = scrollH - btnBarH;
				} else {
					height = scrollH;
				}
				if (!$sheet.hasClass("has-less-cnt")) {
					$scroll.css({
						"height": height
					});
				}
				_scrollTop = scrollT;
			}
		});
	}

})(jQuery);

// 바텀시트 UI
function setUISheet(d) {
	$(".ui-sheet").each(function () {
		var $ui = $(this),
			$window = $(window),
			$container = $(".container"),
			$main = $(".main", $ui),
			$sheet = $(".sheet", $ui),
			$cnt = $("> .content", $sheet),
			$btnBar = $("> .btn-bar", $cnt),
			btnBarH = $btnBar.height() + 32,
			$scroll = $("> .scroll", $cnt),
			$btnClose = $(".header .menu-bar .btn-close-sheet", $ui),
			sheetH = [], stepperH = [], scrollH = [],
			duration = (d != "undefined") ? d : 300,
			cntP = 0;
		scrollH[0] = $scroll.outerHeight();
		function init() {
			sheetH[0] = $(window).height() - $main.height();
			cntP = parseInt($cnt.css("padding-top"));
			set();
		}
		function get() {
			if ($container.hasClass("stepper-on")) {
				scrollH[1] = sheetH[1];
			} else {
				scrollH[1] = sheetH[0] - cntP;
			}
		}
		function set() {
			get();
			run(sheetH[0], scrollH[1], 0);
		}
		function run(h1, h2, delay) {
			if (duration == 0) {
				$sheet.css("height", h1);
			} else {
				$sheet.animate({
					height: h1
				}, {
					duration: duration,
					queue: false,
					specialEasing: {
						height: "easeInOutCirc"
					}
				});
			}
			if (h2 > scrollH[0]) {
				$scroll.css("height", h2 - btnBarH);
			} else {
				$scroll.css("height", h2);
				setTimeout(function () {
					$scroll.initScroll(h1);
				}, delay);
			}
		}
		init();
		if ($ui.hasClass("has-stepper")) {
			var $uiStepper = $(".ui-stepper", $ui),
				$handle = [];
			$handle[0] = $(".handle.stepper-over", $ui);
			$handle[1] = $(".handle.sheet-over", $ui);
			setHandle();
			$handle[0].on("click", function (e) {
				e.preventDefault();
				setStepperOn();
			});
			var $clone = $uiStepper.clone().addClass("clone").attr({ "aria-hidden": true }).appendTo($(".main > .section > .content"));
			stepperH[0] = $uiStepper.height();
			stepperH[1] = $clone.outerHeight() + 15;
			if ($handle[1].length > 0) {
				var hammer = new Hammer($handle[1][0]);
				hammer.get("swipe").set({
					direction: Hammer.DIRECTION_ALL
				});
				hammer.on("swipedown", function () {
					setStepperOn();
				}).on("swipeup", function () {
					setStepperOff();
				});
			}
			$btnClose.on("click", function (e) {
				e.preventDefault();
				setStepperOff();
			});
			function setStepperOn() {
				if (!$ui.hasClass("stepper-on")) {
					$ui.addClass("stepper-on");
					sheetH[1] = sheetH[0] - stepperH[1];
					run(sheetH[1], sheetH[1] - cntP, 400);
				}
				setHandle();
			}
			function setStepperOff() {
				if ($ui.hasClass("stepper-on")) {
					$ui.removeClass("stepper-on");
					run(sheetH[0], sheetH[0] - cntP, 400);
				}
				setHandle();
			}
			function setHandle() {
				var txt = ($ui.hasClass("stepper-on")) ? "프로세스 접기" : "프로세스 펼치기";
				for (var i = 0; i < $handle.length; i++) {
					$handle[i].attr({
						"role": "button",
						"aria-label": txt
					})
				}
			}
			$uiStepper.each(function () {
				var $li = $("> ol > li", $uiStepper),
					$current = $li.filter(".current"),
					idx = $li.index($current);
				if ($current.length > 0) {
					for (var i = 0; i < $li.length; i++) {
						var $thisLi = $li.eq(i);
						$thisLi.toggleClass("done", (i < idx));
					}
				}
			});
		}
	});
}

function setHomecard() {
	$(".ui-track").each(function() {
		var $ui = $(this);
		var $gauge = $(".max-gauge", $ui);
		if ($gauge.length > 0) {
			var $meta = $(".plot.end .meta", $gauge),
				uiW = $ui.width(),
				gaugeW = $gauge.width(),
				diff = uiW - gaugeW,
				threshold = 40,
				adj = 0,
				$bubble = $(".bubble", $ui);
			if (gaugeW < threshold) {
				adj = threshold - gaugeW;
				$bubble.css({
					"margin-left": adj
				});
			}
			if (diff < threshold) {
				adj = diff - threshold;
				$bubble.css({
					"margin-left": adj
				});
			}
			$meta.delay(1600).fadeIn(400);
		}
	});
}

// 웹접근성
function setAccessibility() {
	// > 처리
	$(".icn.rang").attr("aria-hidden", true);
	// 커스텀 라디오/체크박스
	$(".ui-irc").each(function () {
		var $ui = $(this),
			$input = $("input[type=\"radio\"], input[type=\"checkbox\"]", $ui),
			$lbl = $(".lbl, .name", $ui),
			$btn = $(".btn-into", $ui),
			txt = "";
		// label to title
		txt = $lbl.html().replace(/(<([^>]+)>)/ig, "").trim();
		$input.attr("title", txt);
		$btn.attr("title", txt);
	});
	// 커스텀 인풋파일
	$(".ui-file").each(function () {
		var $ui = $(this),
			$label = $("label", $ui),
			$lbl = $(".align .lbl", $ui),
			$input = $("label input[type='file']", $ui);
		$lbl.attr("tabindex", 0);
		$lbl.on("enter", function () {
			$label.trigger("click");
		});
		$input.attr("tabindex", -1);
	});
	// 검색창 검색버튼
	$(".btn-search-submit").each(function () {
		var $btn = $(this);
		$btn.attr("tabindex", 0);
	});
	// 검색창 클리어버튼 초점 개선
	$(".btn-input-clear").each(function () {
		var $btn = $(this);
		$btn.attr("role", "button");
	});
	// 첨부파일 다운로드 버튼
	$(".atch-bar").each(function () {
		var $bar = $(this),
		$downloadTit = $(".file-name", $bar).text(),
		$btnDownload = $(".btn-download", $bar).attr("title", $downloadTit);
	});
}




/**
 * 플러그인: uiForm
 */
(function ($) {
	$.fn.uiForm = function (options) {
		var outputs = {
			ui: "",
			$ui: "",
			$scope: "",
			scopeLen: 0
		};
		var settings = $.extend(true, outputs, options);
		/**
		 * init(): 플러스인 초기화
		 * - .field 수집
		 * - .output 추가
		 * - .current 없는 경우 설정
		 */
		this.init = function () {
			ui = this;
			$ui = $(this);
			$field = $("> .field", $ui);
			$scope = $field.not(".ignore");
			scopeLen = $scope.length;
			$ui.addClass("standby");
			// 각 .field에 .output (입력값 표시용) 추가
			for (var i = 0; i < scopeLen; i++) {
				var $f = $scope.eq(i),
					$i = $("> .input", $f),
					$a = $("input, a", $f);
				if ($("> .output", $f).length > 0) {
					// 특정 output 초기화가 필요한 경우 작성
				} else {
					var $o = ($f.hasClass("bank") || $f.hasClass("card"))
						? $("<div class=\"output\" role=\"button\" aria-label=\"입력폼으로 이동\"><span class=\"value\"><span class=\"pic\"><img></span><span class=\"lbl\"></span></span></div>")
						: $("<div class=\"output\" role=\"button\" aria-label=\"입력폼으로 이동\"><span class=\"value\"></span></div>");
					$o.insertBefore($i);
				}
				$a.attr("tabindex", -1);
			}
			var $current = $(".field.current", $ui);
			// 기본 설정된 .current 필드가 없는 경우
			if (!$current.length > 0) {
				$current = $scope.eq(0);
				$current.addClass("current");
				if ($current.hasClass("search")) {
					$ui.addClass("search-on");
				}
			}
			$("input, a", $current).attr("tabindex", 0);
			this.set();
		}
		/**
		 * set(): 이벤트바인딩
		 */
		this.set = function () {
			// .output (.done 필드)
			$scope.on("click", "> .output", function (e) {
				e.preventDefault();
				var $pf = $(this).parents(".field"),
					idx = $scope.index($pf);
				if ($pf.hasClass("junction")) {
					for (var i = 0; i < $field.length; i++) {
						if (i > idx) $field.eq(i).removeClass("ignore");
					}
				}
				if ($pf.hasClass("done") && !$pf.hasClass("current") && !$pf.hasClass("readonly")) {
					ui.run($scope.index($pf));
				}
				$ui.toggleClass("done", ((idx) == scopeLen));
			});
			// .option (셀렉트 항목)
			$(".option", $scope).on("click", function (e) {
				e.preventDefault();
				var $pf = $(this).parents(".field");
				$("> .output .value", $pf).html($(".val", $(this)).text());
			});
			// 바텀시트에 포함된 input[tel], input[text]에 대한 키패드 이슈 개선
			if (_isAndroid) {
				$scope.on("focusin focusout", ".input input[type=\"tel\"], .input input[type=\"text\"]", function (e) {
					var $pf = $(this).parents(".field"),
						$form = $pf.parents(".form"),
						idx = $scope.index($pf);
					if (e.type == "focusin") {
						var $sheet = $pf.parents(".sheet");
						if ($sheet.length > 0) {
							$form.addClass("focusin");
							// $(".scroll", $sheet).animate({
							// 	scrollTop: 0
							// });

							// setTimeout(function() {
							// 	$(".scroll", $sheet).scrollTop(0);
							// }, 500)
						}
					} else {
						$form.removeClass("focusin");
					}
				});
			}
			// .run-prev (.btn-prev에 설정)
			$(".run-prev").on("click", function (e) {
				e.preventDefault();
				var $pf = $(this).parents(".field");
				ui.prev();
			});
			// .run-next (.btn-next, .option 등에 설정)
			$(".run-next", $scope).on("click", function (e) {
				e.preventDefault();
				var $pf = $(this).parents(".field");
				if ($pf.hasClass("search")) {
					$ui.removeClass("search-on");
					$pf.removeClass("suggest-on");
				}
				ui.next($(this));
			});
		}
		/**
		 * get(): .input 값을 .output에 표시
		 */
		this.get = function (o) {
			var $f = o,
				$i = $("> .input", $f),
				$l = $("> label.lbl", $f),
				$v = $("> .output .value", $f),
				val = "";
			if (($f.hasClass("bank")) || ($f.hasClass("card"))) {
				var $r = $("input[type=\"radio\"]:checked", $i),
					$irc = $r.parents(".ui-irc"),
					src = $(".pic img", $irc).attr("src"),
					lbl = $(".lbl", $irc).text();
				$(".pic img", $v).prop("src", src);
				$(".lbl", $v).html(lbl);
			} else if ($f.hasClass("radio")) {
				var $r = $("input[type=\"radio\"]:checked", $i);
				var lbl = "";
				for (var j = 0; j < $r.length; j++) {
					$irc = $r.eq(j).parents(".ui-irc");
					if ($irc.hasClass("has-textbox")) {
						lbl += $(".input-text input", $irc).val() + " ";
					} else {
						lbl += $(".lbl", $irc).text() + " ";
					}
				}
				$v.html(lbl);
			} else if ($f.hasClass("checkbox")) {
				var $c = $("input[type=\"checkbox\"]:checked", $i),
					$irc,
					lbl = "";
				for (var j = 0; j < $c.length; j++) {
					$irc = $c.eq(j).parents(".ui-irc");
					lbl += $(".lbl", $irc).text() + "<br>";
				}
				$v.html(lbl);
			} else if ($f.hasClass("select")) {
				// (.selected 클래스 부여가 선행되어야 하므로 .set 에서 처리)
				// var $option = $(".input .option.selected", $f);
				// $v.html($(".val", $option).text());
			} else if ($f.hasClass("term")) {
				var $c = $("> .ui-term > .ui-irc > .t > .c > label > input[type=\"checkbox\"]:checked", $i),
					$irc,
					lbl = "";
				for (var j = 0; j < $c.length; j++) {
					$irc = $c.eq(j).parents(".ui-irc");
					lbl += $(".lbl", $irc).text() + "<br>";
				}
				$v.html(lbl);
			} else {
				var $val = $("input, .prefix, .suffix", $i),
					txt = "";
				for (var j = 0; j < $val.length; j++) {
					var $tval = $val.eq(j);
					if ($tval.parents().hasClass("transkey_label")) {
						// do nothing
					} else {
						txt = ($tval.hasClass("prefix") || $tval.hasClass("suffix")) ? $tval.text() : $tval.val();
						val += txt + " ";
					}
				}
				$v.text(val);
			}
		}
		/**
		 * run(): .done, .current 처리
		 */
		this.run = function (idx) {
			for (var i = 0; i < scopeLen; i++) {
				var $f = $scope.eq(i),
					$a = $("input, a, .btn", $f),
					$o = $(".output", $f);
				if (i < idx) { // done
					this.get($f);
					$f.removeClass("current").addClass("done");
					$a.attr("tabindex", -1);
					$o.attr("tabindex", 0);
					$ui.toggleClass("done", ((idx) == scopeLen))
					$ui.toggleClass("standby", ((idx) == 0))
				} else if (i == idx) { // current
					$f.removeClass("done").addClass("current");
					$a.attr("tabindex", 0);
					$o.attr("tabindex", -1);
					// 검색 필드
					$ui.toggleClass("search-on", $f.hasClass("search"));
					// 선행 입력값을 숨기는 경우
					$ui.toggleClass("solo", ($f.hasClass("bnc") || $f.hasClass("search") || $f.hasClass("is-solo")));
					var $cnt = $(".main > .section > .content"),
						$btnBar = $("> .btn-bar.botm-fix", $f),
						h = 0;
					if ($btnBar.length > 0) {
						h = $btnBar.outerHeight() + 32;
					}
					$cnt.css({
						"padding-bottom": h
					});
				} else { // not yet
					$f.removeClass("done").removeClass("current").removeClass("ignore");
					$a.attr("tabindex", -1);
					$o.attr("tabindex", -1);
				}
			}
		}
		/**
		 * prev(): 파라미터 idx-1로 run() 실행
		 */
		this.prev = function () {
			var $cf = $scope.filter(".current"),
				idx = $scope.index($cf);
			if (idx < 1) {
				try {
					callBackPrevBuildUp();
				} catch (e) {
					console.log(e.toString());
				}
			} else {
				this.run(idx - 1);
			}
		}
		/**
		 * next(): 파라미터 idx+1로 run() 실행
		 */
		this.next = function (o) {
			var $pf = o.parents(".field");
			idx = $scope.index($pf);
			this.run(idx + 1);
		}
		return this.each(function () {
		});
	}
})(jQuery);

/**
 * 플러그인: searchDrop
 */
(function ($) {
	$.fn.searchDrop = function (option) {
		return this.each(function () {
			var $field = $(this),
				$input = $(".input", $field),
				inputW = $input.width(),
				$outpost = $(".suggest-lst", $field),
				duration = 100;
			if (option == "on") {
				searchDropOn();
			} else {
				searchDropOff();
			}
			if ($outpost.length > 0) {
			} else {
				return false;
			}
			function searchDropOn() {
				$outpost.slideDown(duration, function () {
					$field.addClass("suggest-on");
				});
			}
			function searchDropOff() {
				$outpost.slideUp(duration, function () {
					$field.removeClass("suggest-on");
				});
			}
		});
	}
})(jQuery);

// 로딩 오버레이 (open/close)
function runLoading(opt) {
	var $body = $("body"),
		$loading,
		duration = 400;
	if (opt == "open") {
		put();
		$loading.fadeIn(duration);
		$body.addClass("loading-overlay-on");
	} else if (opt == "close") {
		del();
	} else {
		return false;
	}
	function put() {
		var html = [], h = -1;
		html[++h] = "<div class=\"container overlay loading\">";
		html[++h] = "<div class=\"bg\"></div>";
		html[++h] = "<div class=\"title-bar\"></div>";
		html[++h] = "<div class=\"content\">";
		html[++h] = "<div class=\"t\">";
		html[++h] = "<div class=\"r\">";
		html[++h] = "<div class=\"c\">";
		html[++h] = "<div class=\"spinner\">";
		html[++h] = "</div>";
		html[++h] = "</div>";
		html[++h] = "</div>";
		html[++h] = "</div>";
		html[++h] = "</div>";
		html[++h] = "</div>";
		$loading = $(html.join("")).appendTo("body");
	}
	function del() {
		$loading = $(".container.overlay.loading")
		$loading.fadeOut((duration / 2), function() {
			$(this).remove();
			$body.removeClass("loading-overlay-on");
		});
	}
}

// 바텀 배너
function setBbn() {
	$(".ui-bbn").each(function () {
		var $ui = $(this);
		var $bbn = $(".bbn", $ui);
		var $btn = $(".btn-bbn", $ui);
		$bbn.attr({
			"role": "button",
			"tabindex": 0,
			"aria-expanded": false
		});
		$bbn.on("click", function (e) {
			e.preventDefault();
			$ui.toggleClass("bbn-expanded", function() {
				$bbn.attr({ "aria-expanded": ($ui.hasClass("bbn-expanded")) });
			});
		})
	});
}




function fixAndroid() {
	var $window = $(window),
		$html = $("html"),
		height = [];
	height[0] = $window.height();
	if (_isAndroid) {
		$window.off("resize").on("resize", function () {
			run();
		});
	}
	function run() {
		height[1] = $window.height();
		var b = height[0] - height[1] > 100;
		$html.toggleClass("keypad-on", b);
		if ($(".sheet").length > 0) {
			if ($(".ui-form").length > 0) {
				resetUISheet(0);
			} else {
				$(".sheet .scroll").scrollTop(0);
			}
		}
	}
}

function resetUISheet(d) {
	$(".ui-sheet").each(function () {
		var $ui = $(this),
			$window = $(window),
			$container = $(".container"),
			$main = $(".main", $ui),
			$sheet = $(".sheet", $ui),
			$cnt = $("> .content", $sheet),
			$btnBar = $("> .btn-bar", $cnt),
			btnBarH = $btnBar.height() + 32,
			$scroll = $("> .scroll", $cnt),
			$btnClose = $(".header .menu-bar .btn-close-sheet", $ui),
			sheetH = [], stepperH = [], scrollH = [],
			duration = (d != "undefined") ? d : 300,
			cntP = 0;
		scrollH[0] = $scroll.outerHeight();
		function init() {
			sheetH[0] = $(window).height() - $main.height();
			cntP = parseInt($cnt.css("padding-top"));
			set();
		}
		function get() {
			if ($container.hasClass("stepper-on")) {
				scrollH[1] = sheetH[1];
			} else {
				scrollH[1] = sheetH[0] - cntP;
			}
		}
		function set() {
			get();
			run(sheetH[0], scrollH[1], 0);
		}
		function run(h1, h2, delay) {
			if (duration == 0) {
				$sheet.css("height", h1);
			} else {
				$sheet.animate({
					height: h1
				}, {
					duration: duration,
					queue: false,
					specialEasing: {
						height: "easeInOutCirc"
					}
				});
			}
			if (h2 > scrollH[0]) {
				$scroll.css("height", h2 - btnBarH);
			} else {
				$scroll.css("height", h2);
				setTimeout(function () {
					$scroll.initScroll(h1);
				}, delay);
			}
		}
		init();
	});
}