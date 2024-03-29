var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty =
	$jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
		? Object.defineProperty
		: function (a, c, b) {
				a != Array.prototype &&
					a != Object.prototype &&
					(a[c] = b.value);
		  };
$jscomp.getGlobal = function (a) {
	return "undefined" != typeof window && window === a
		? a
		: "undefined" != typeof global && null != global
		? global
		: a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (a, c, b, d) {
	if (c) {
		b = $jscomp.global;
		a = a.split(".");
		for (d = 0; d < a.length - 1; d++) {
			var e = a[d];
			e in b || (b[e] = {});
			b = b[e];
		}
		a = a[a.length - 1];
		d = b[a];
		c = c(d);
		c != d &&
			null != c &&
			$jscomp.defineProperty(b, a, {
				configurable: !0,
				writable: !0,
				value: c,
			});
	}
};
$jscomp.polyfill(
	"Array.from",
	function (a) {
		return a
			? a
			: function (a, b, d) {
					b =
						null != b
							? b
							: function (a) {
									return a;
							  };
					var e = [],
						c =
							"undefined" != typeof Symbol &&
							Symbol.iterator &&
							a[Symbol.iterator];
					if ("function" == typeof c) {
						a = c.call(a);
						for (var f = 0; !(c = a.next()).done; )
							e.push(b.call(d, c.value, f++));
					} else
						for (c = a.length, f = 0; f < c; f++)
							e.push(b.call(d, a[f], f));
					return e;
			  };
	},
	"es6",
	"es3"
);
(function () {
	function a(a) {
		"resize" === a.type &&
			(document.body.classList.remove("navbar-dropdown-open"),
			document
				.querySelector(".navbar-dropdown")
				.querySelector(".navbar-collapse")
				.classList.remove("show"),
			document
				.querySelector(".navbar-dropdown")
				.classList.remove("opened"),
			Array.from(
				document
					.querySelector(".navbar-dropdown")
					.querySelectorAll('.navbar-toggler[aria-expanded="true"]')
			).forEach(function (a) {
				var b = a.querySelector(a.getAttribute("data-target"));
				b &&
					(b.classList.remove("in"),
					b.setAttribute("aria-expanded", "false"),
					a.setAttribute("aria-expanded", "false"));
			}));
		var b = document.documentElement.scrollTop;
		Array.from(document.querySelectorAll(".navbar-dropdown")).forEach(
			function (a) {
				a.matches(".navbar-fixed-top") &&
					(a.matches(".transparent") &&
						!a.classList.contains("opened") &&
						(0 < b
							? a.classList.remove("bg-color")
							: a.classList.add("bg-color")),
					0 < b
						? a.classList.add("navbar-short")
						: a.classList.remove("navbar-short"));
			}
		);
	}
	var c;
	["scroll", "resize"].forEach(function (b) {
		document.addEventListener(b, function (b) {
			clearTimeout(c);
			c = setTimeout(function () {
				a(b);
			}, 10);
		});
	});
	["show.bs.collapse", "hide.bs.collapse"].forEach(function (a) {
		document.addEventListener(a, function () {
			var b = document.querySelector(".navbar-dropdown");
			b &&
				("show.bs.collapse" == a
					? (document.body.classList.add("navbar-dropdown-open"),
					  b.classList.add("opened"))
					: (document.body.classList.remove("navbar-dropdown-open"),
					  b.classList.remove("opened"),
					  window.dispatchEvent(
							new CustomEvent(
								"scroll.bs.navbar-dropdown.data-api"
							)
					  ),
					  b.dispatchEvent(
							new CustomEvent("collapse.bs.navbar-dropdown")
					  )));
		});
	});
	document.addEventListener("collapse.bs.nav-dropdown", function (a) {
		(a = a.relatedTarget.closest(".navbar-dropdown")) &&
			(a = a.querySelector('.navbar-toggler[aria-expanded="true"]')) &&
			a.dispatchEvent(new CustomEvent("click"));
	});
})();
