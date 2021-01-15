$(function () {

	// Start Navbar

	let clicked = false,
		navBtn = $(".nav-btn"),
		navList = $(".nav-list"),
		navItems = $(".list-item");

	navBtn.on("click", function () {
		if (!clicked) {
			clicked = true;

			$(this).toggleClass("show");

			navList.toggleClass("show");

			navItems.each(function () {
				$(this).toggleClass("show");
			});

			setTimeout(() => {
				clicked = false;
			}, 900);
		}
	});

	$(window).on("resize", function () {
		if (navItems.hasClass("show")) {
			navBtn.removeClass("show");

			navList.removeClass("show");

			navItems.each(function () {
				$(this).removeClass("show");
			});
		}
	});

	// Navbar Scroll
	let navbar = $(".navbar");

	if ($("html, body").scrollTop() >= 100) {
		navbar.addClass("scroll");
	} else {
		navbar.removeClass("scroll");
	}

	$(window).on("scroll", function () {
		if ($("html, body").scrollTop() >= 100) {
			navbar.addClass("scroll");
		} else {
			navbar.removeClass("scroll");
		}
	});

	// Close Navbar When Click Anywhere Out Of The Nav List
	$(".nav-list, .nav-btn").on("click", function (e) {
		e.stopPropagation();
	});

	$(document).on("click", function (e) {
		if (navItems.hasClass("show")) {
			if (e.target !== $(".nav-list") && e.target !== navBtn) {
				navBtn.removeClass("show");

				navList.removeClass("show");

				navItems.each(function () {
					$(this).removeClass("show");
				});
			}
		}
	});

	// End Navbar
	// Start Slider

	function slider(sliderClass, itemsToShow, resActiveMd, resActiiveSm) {
		let // Select Elements
			$sliderContainer = $(sliderClass),
			$slider = $sliderContainer.find(".slider"),
			$sliderBanner = $slider.find(".slider-banner"),
			$sliderItems = $sliderBanner.find(".slider-item"),
			$nextBtn = $sliderContainer.find(".next"),
			$prevBtn = $sliderContainer.find(".prev"),

			// Needs
			itemsLength = $sliderItems.length,

			sliderClicked = false,
			defaultActiveSlides = itemsToShow,
			activeSlides = defaultActiveSlides,
			itemMove = 0,

			itemMargin = parseInt($sliderItems.css("marginLeft")) * 2,
			itemWidth,
			slideWidth;

		function handleLeft() {
			return -(slideWidth * itemMove);
		}

		function responsiveSlide() {
			activeSlides -= defaultActiveSlides;

			if ($(window).width() >= 768 && $(window).width() <= 991) {
				defaultActiveSlides = resActiveMd;

				if (itemMove > itemsLength - resActiveMd) {
					itemMove--;
					activeSlides--;
				}	
			} else if ($(window).width() <= 767) {
				defaultActiveSlides = resActiiveSm;
			} else {
				defaultActiveSlides = itemsToShow

				if (itemMove > itemsLength - itemsToShow) {
					itemMove--;
					activeSlides--;
				}
			}

			activeSlides += defaultActiveSlides;

			itemWidth = ($slider.outerWidth() - (itemMargin * defaultActiveSlides)) / defaultActiveSlides;

			$sliderItems.outerWidth(itemWidth);

			slideWidth = itemWidth + itemMargin;

			$sliderBanner.css("left", handleLeft());

			let totalItemsWidth = itemWidth * itemsLength,
				totalItemsMargin = itemMargin * itemsLength,
				sliderBannerWidth = totalItemsWidth + totalItemsMargin;

			$sliderBanner.width(sliderBannerWidth);
		}

		responsiveSlide();

		$(window).on("resize", function () {
			responsiveSlide();
			checkStatus();
		});

		function checkStatus() {
			if (activeSlides >= itemsLength) {
				$nextBtn.addClass("disabled");
			} else {
				if ($nextBtn.hasClass("disabled")) {
					$nextBtn.removeClass("disabled");
				}
			}

			if (activeSlides == defaultActiveSlides) {
				$prevBtn.addClass("disabled");
			} else {
				if ($prevBtn.hasClass("disabled")) {
					$prevBtn.removeClass("disabled");
				}
			}
		}

		checkStatus();

		$nextBtn.on("click", function nextItem() {
			if (!sliderClicked) {
				if (activeSlides < itemsLength) {
					sliderClicked = true;

					itemMove++;
					activeSlides++;

					$sliderBanner.animate({
						left: handleLeft()
					}, 400);

					setTimeout(() => {
						sliderClicked = false;
					}, 400);

					checkStatus();
				}
			}
		});

		$prevBtn.on("click", function prevItem() {
			if (!sliderClicked) {
				if (activeSlides > defaultActiveSlides) {
					sliderClicked = true;

					itemMove--;
					activeSlides--;

					$sliderBanner.animate({
						left: handleLeft()
					}, 400);

					setTimeout(() => {
						sliderClicked = false;
					}, 400);

					checkStatus();
				}
			}
		});
	};

	slider(".menu-slider", 3, 2, 1);
	slider(".chief-slider", 1, 1, 1);

	// End Slider
});