/*============================================ Custom Functions  ============================================*/
;(function ($, window, document, undefined) {
	'use strict';
	var _doc = $(document),
	_win = $(window),

	Egprojets = {
		name : 'Egprojets',
		version : '1.0.0',
		documentReady:function(){
			Egprojets.adaptiveBackground(); // Adaptive Height
			Egprojets.lazyBackground(); //Lazy Background
			Egprojets.counterNumber(); //Count
			Egprojets.initSlide(); //Carousel
			if( !Egprojets.isMobile() ) Egprojets.initStickyNav(); //Sticky Menu
			Egprojets.goToTop(); //Scroll
			Egprojets.toogleMenu(); //Toogle Menu
			Egprojets.initFancy(); //Init FancyBox
			Egprojets.selectTable(); //Event Select Table
			Egprojets.controlForm(); // Control Form
			Egprojets.accessibilityKeyword(); //Helps with accessibility for keyboard only users
		},

		windowLoad: function(){
			if( $('#maps')[0] ){
				var lat = $('#gmap-lat').text();
				var longi = $('#gmap-long').text();
				Egprojets.configGmaps(lat,longi); //Configuration Gmaps (lat,long)
			}
			Egprojets.configListingMenu(); //Configuration ListingMenu
			if( !Egprojets.isMobile() ) Egprojets.configParallax(); //Parallax
			Egprojets.loaderPage(); //Call Function Remove Loader Page
			Egprojets.masonryTrigger();
		},

		toogleMenu: function(){
			$(document).on('click', '.menu-mobile', function(event) {
				$(this).toggleClass('open-menu');
				event.preventDefault();
			});
		},
		accessibilityKeyword: function(){
			var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
				is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
				is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

			if ( ( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
				window.addEventListener( 'hashchange', function() {
					var id = location.hash.substring( 1 ),
						element;

					if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
						return;
					}

					element = document.getElementById( id );

					if ( element ) {
						if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
							element.tabIndex = -1;
						}

						element.focus();
					}
				}, false );
			}
		},

		adaptiveBackgroundUpdate: function(){
			$('#main-slider,#main-slick-slider,.carousel-home,.carousel-item').height( $(window).height() );
		},

		adaptiveBackground: function(){
			var self = this;
			self.adaptiveBackgroundUpdate();
			$(window).scroll(function(event) {
				self.adaptiveBackgroundUpdate();
			});
		},

		goToTop: function(){
			$(document).on('click', '.footer-copyright a',function(event) {
				$('html,body').animate({scrollTop:0},1500,'easeInOutQuad');
				event.preventDefault();
			});
		},

		initFancy: function(){
			$('.fancybox').fancybox({
				padding: 0,
				helpers: {
					overlay: {
						locked: false
					}
				}
			});
		},

		counterNumber: function(){
			var index = 1;
			$('#vision').appear();
			$(document.body).on('appear', '#vision', function(e, $affected) {
				if( index == 1)
				{
					$('.count').each(function () {
						$(this).prop('Counter',0).animate({
							Counter: $(this).text()},{
							duration: 2000, 
							easing: 'swing',
							step: function (now) {
								$(this).text(Math.ceil(now));
							}
						});
					});
					index++;
				}
			});
		},

		initSlide: function(){

			//Init Slide Home Page
			$('.carousel-home').slick(
			{
				dots: true,
				pauseOnHover: false,
				adaptiveHeight: true,
				fade: Boolean($('#fls_slide_animation').text()),
				autoplay: Boolean($('#fls_slide_play').text()),
				autoplaySpeed: parseInt( $('#fls_slide_speed').text() ),
				//speed: 1000,
				cssEase: 'linear',
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1
			});
			$('.carousel-home').on('beforeChange', function(event, slick, currentSlide, nextSlide){
				$('.carousel-home .carousel-item').removeClass('in');
				$('.carousel-home .carousel-item').addClass('out');
			});

			$('.carousel-home').on('afterChange', function(event, slick, currentSlide, nextSlide){
				setTimeout(function(){
					$('.carousel-home .carousel-item').removeClass('out');
					$('.carousel-home .carousel-item').addClass('in');
				},200);
				
			});
			//End Slide Home 
			//Init Slide Delay
			$('.delas-carousel').slick(
			{
				dots: true,
				adaptiveHeight: true,
				speed: 500,
				cssEase: 'linear',
				autoplay: Boolean($('#deal_play').text()),
				autoplaySpeed: parseInt( $('#deal_speed').text() ),
				infinite: true,
				slidesToShow: 4,
				slidesToScroll: 1,
				responsive: [
				{
				  breakpoint: 992,
				  settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				  }
				}
			]
			});

			//Init Slide Testimonials Blocs
			$('.testimonial-list').slick(
			{
				dots: false,
				adaptiveHeight: true,
				autoplay: Boolean($('#testimonial_play').text()),
				autoplaySpeed: parseInt( $('#testimonial_speed').text() ),
				speed: 500,
				cssEase: 'linear',
				infinite: true,
				slidesToShow: 4,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						  }
					}
				]
			});

			//Init Slide Events Blocs
			$('.event-carousel').slick(
			{
				dots: true,
				adaptiveHeight: true,
				speed: 500,
				autoplay: Boolean($('#event_play').text()),
				autoplaySpeed: parseInt( $('#event_speed').text() ),
				cssEase: 'linear',
				infinite: true,
				slidesToShow: 4,
				slidesToScroll: 1,
				responsive: [
				{
					breakpoint: 992,
					settings: {
					slidesToShow: 2,
					slidesToScroll: 2
					}
				},
				{
					breakpoint: 768,
					settings: {
					slidesToShow: 1,
					slidesToScroll: 1
					}
				}
				]
			});

			//Init Slide Team Blocs
			$('.team-carousel').slick(
			{
				dots: false,
				adaptiveHeight: true,
				autoplay: Boolean($('#team_play').text()),
				autoplaySpeed: parseInt( $('#team_speed').text() ),
				speed: 500,
				cssEase: 'linear',
				infinite: true,
				slidesToShow: 4,
				slidesToScroll: 1,
				responsive:[
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
					},
					{
					breakpoint: 768,
					settings:{
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
				]
			});

			//Init Slide Team Blocs
			$('.f-menu-list').slick(
			{
				dots: true,
				adaptiveHeight: true,
				fade: true,
				autoplay: Boolean($('#information_play').text()),
				autoplaySpeed: parseInt( $('#information_speed').text() ),
				cssEase: 'linear',
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1
			});

			

			$('.vertical-carousel').each(function(index, el) {
				var $this = $(this);
				$this.slick(
				{
					dots: true,
					adaptiveHeight: true,
					infinite: true,
					autoplay: Boolean( $this.closest('section').find('.menu_play').text() ),
					autoplaySpeed: parseInt( $this.closest('section').find('.menu_speed').text() ),
					slidesToShow: 1,
					slidesToScroll: 1,
					fade : true,
					responsive: [
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								fade : false,
							}
						}
					]
				});
			});
			//Init Slide Table
			$('.carousel-table').slick(
			{
				dots: true,
				adaptiveHeight: true,
				speed: 500,
				cssEase: 'linear',
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1
			});
		},

		selectTable: function(){
			var $val = '';
			$(document).on('click', '.carousel-table .item', function(event) {
				if( $(this).hasClass('current') )
				{
					$(this).removeClass('current')
				}
				else if( !$(this).hasClass('reserved') )
				{
					$(this).addClass('current');
					$('html,body').animate({scrollTop: ( $('#reservation').offset().top - 80 ) + 'px' },1500,'easeOutQuad');
				}
				$val = '';
				$('.current').each(function(index, el) {
					$val += $(this).find('span').text() + ',';
				});
				$('.num_table').val($val);
			});
		},

		initStickyNav: function(){
			$(window).scroll(function(){
				var scrollTop = $(window).scrollTop();
				if(scrollTop >= 50){
					if( !$(".navbar").hasClass('is-sticky') )
					{
						$(".navbar").addClass("is-sticky");
						$('.nav-top').slideUp();
					}
				}else{
					$(".navbar").removeClass("is-sticky");
					$('.nav-top').slideDown(800);
				}
			});
		},

		lazyBackground: function(){
			$( '.parallax-window' ).each(function(){
				$(this).css( 'background-image', 'url('+$(this).data('background')+')' );
			});
		},

		configParallax: function(){
			$( '.parallax-window' ).each(function(){
				$( this ).parallax( $.extend( true,{
					lazyLoad: true, 
					mode: 'parallax',
					speedFactor: 0.3
				},	$( this ).data() ) );
			});
		},

		masonryGrid: function(){
			var self = $(".restaurant-list");
			self.masonry({
				columnWidth: '.grid-sizer',
				itemSelector: '.grid-item',
				percentPosition: true
			});

			$(".restaurant-filter a").on("click",function(e){
				e.preventDefault();
				var filter = $(this).attr("data-filter");
				$(".restaurant-filter a").removeClass('current');
				$(this).addClass('current');
				self.masonryFilter({
				  filter: function () {
					  if (!filter) return true;
					  return $(this).attr("data-filter") == filter;
				  }
			  });
		   });
		},

		masonryTrigger: function(){
			$(".restaurant-filter a.current").trigger('click')
		},

		configListingMenu: function(){
			var self = this;
			self.masonryGrid(); 
			_win.resize(function(){
			  self.masonryGrid();
			});
		},

		configGmaps: function(lat,longi){
			/* === Google Map Styles === */ 
			if( $('#maps')[0] )
			{
				var latlng = new google.maps.LatLng(lat,longi);
				var styles = [{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"stylers":[{"hue":"#00aaff"},{"saturation":-100},{"gamma":2.15},{"lightness":12}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"lightness":24}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":57}]}];
				var myOptions = {
					zoom: 16,
					center: latlng,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					disableDefaultUI: true,
					scrollwheel: false,
					styles: styles
				};
				var map = new google.maps.Map(document.getElementById('maps'), myOptions);
				var image = template_uri + '/assets/img/marker.png';
				var marker = new google.maps.Marker({
						position: latlng,
						map: map,
						icon: image
				});
			}
		},

		isMobile: function(a){ return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())}, 

		loaderPage: function(){
			setTimeout(function(){
				$('.site-loader').fadeOut('slow');
			},500);
		},

		controlForm: function(){
			$(document).on('submit','.form-reservation form, #newsletter form',function(){
				$('.form-reservation, #newsletter ').append('<div class="overlay-f site-loader"><div class="loading"></div></div>');
				setTimeout(function(){
					$('.overlay-f').fadeOut("slow", function() {
						$('.overlay-f').remove(); 
					});
				},2000);
				return false;   
			});
		}
	}

	/*============================================ Call Functions on Document.Ready ============================================*/
	_doc.ready(Egprojets.documentReady);
	/*============================================ Call Functions on Window.Load ============================================*/
	_win.load(Egprojets.windowLoad);
})(jQuery, window, window.document);
/*============================================ End Custom Functions  ============================================*/

