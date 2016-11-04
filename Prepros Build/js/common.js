$(document).ready(function() {

  // fullpage
  $('.maincontent').fullpage ({
    verticalCentered: false,
    anchors: ['1', '2', '3', '4', '5', '6', '7', '8'],
    menu: '.fixed-menu',
    scrollingSpeed: 900
  });

  $('.nav__link, .nav__btn, .arrow-down, .burgers__btn').on('click', function(e) {
    e.preventDefault();

    var href = parseInt($(this).attr('href'));

    $.fn.fullpage.moveTo(href);
  });

  // slider
  $('.burger-slider').owlCarousel ({
    items: 1,
    nav: true,
		loop: true,
    navText: ["<img src='img/icons/arrow-scroll.svg'>","<img src='img/icons/arrow-scroll.svg'>"],
    smartSpeed: 900
	});

  // team accordeon
  $(".team__about").hide().prev().click(function() {
    $(this).parents(".team__acco").find(".team__about").slideUp().prev().removeClass("active");
    $(this).next(":hidden").slideDown().prev().addClass("active");
  });

  // menu accordeon
  $(".menu__trigger").click(function() {
    var $this = $(this),
        container = $this.closest('.menu-acco'),
        item = $this.closest('.menu-acco__item'),
        items = container.find('.menu-acco__item'),
        activeItem = items.filter('.active'),
        content = item.find('.menu-acco__content'),
        activeContent = activeItem.find('.menu-acco__content');

    if (!item.hasClass('active')) {

      items.removeClass('active');
      item.addClass('active');

      activeContent.animate({
        'width' : '0px',
        'opacity' : '0'
      });

      content.animate({
        'width' : '540px',
        'opacity' : '1'

      });

    } else {

      item.removeClass('active');
      content.animate({
        'width' : '0px',
        'opacity' : '0'
      });
    }

  });

  $(document).on('click', function (e) {
    var $this = $(e.target);

    if (!$this.closest('.menu-acco').length) {
      $('.menu-acco__content').animate({
        'width' : '0px'
      });

      $('.menu-acco__item').removeClass('active');
    }
  });

  // inputmask
  $(".form__input-phone").inputmask("+7(999)999-99-99");

  // popup comments
  var Popup = $('.popup-comments')

  $('.comments__btn').on('click', function(e) {
    e.preventDefault();
    Popup.bPopup ({
      modalColor: "#2f3234",
      opacity: 0.93,
      speed: 500,
      transition: "slideIn",
      transitionClose: "slideBack"
    });
  });

  $('.popup-comments__btn-close').on('click', function(e) {
    e.preventDefault();
    Popup.bPopup({
      speed: 500,
      transitionClose: "slideBack"
    }).close();
  });

  //E-mail Ajax Send
  var PopupForm = $('.popup-form')

	$(".form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
      PopupForm.bPopup();
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

  $('.popup-form__btn-close').on('click', function(e) {
    e.preventDefault();
    PopupForm.bPopup().close();
  });

  // yandex-map
  ymaps.ready(init);
    var myMap;

    function init() {     
      myMap = new ymaps.Map("map", {
          center: [59.91815363876071,30.30557799999997],
          zoom: 12,
          controls: []
      });

      var coords = [
          [59.97395675327443,30.309697873046836],
          [59.951233527713256,30.385915524414028],
          [59.912981915266066,30.49303222363278],
          [59.892286934675184,30.28703857128901]
      ],
          myCollection = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/icons/map-marker.svg',
            iconImageSize: [46, 57],
            iconImageOffset: [-23, -52]
          });

      for (var i = 0; i < coords.length; i++) {
          myCollection.add(new ymaps.Placemark(coords[i]));
      }

      myMap.geoObjects.add(myCollection);

      myMap.behaviors.disable(['scrollZoom']);
    }

  // callback svg
  $('img.img-svg').each(function() {
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        // Replace image with new SVG
        $img.replaceWith($svg);

      }, 'xml');

  });

});
