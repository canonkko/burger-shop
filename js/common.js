$(document).ready(function() {

  // fullpage
  $('.maincontent').fullpage({
    verticalCentered: false,
    anchors: ['1', '2', '3', '4', '5', '6', '7', '8'],
    menu: '.fixed-menu',
    scrollingSpeed: 900
  });

  $('.nav__link, .nav__btn, .arrow-down').on('click', function(e) {
    e.preventDefault();

    var href = parseInt($(this).attr('href'));

    $.fn.fullpage.moveTo(href);
  });

  // slider
  $('.burger__slider').owlCarousel ({
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
        'width' : '0px'
      });

      content.animate({
        'width' : '540px'
      });

    } else {

      item.removeClass('active');
      content.animate({
        'width' : '0px'
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
    Popup.bPopup().close();
  });

  // callback svg
  $('img.img-svg').each(function(){
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
