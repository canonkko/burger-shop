$(document).ready(function() {

  $('.team__about').not(':first-of-type').hide();

  $('.team__trigger-name').click(function() {

    var findArticle = $(this).next();
    var findWrapper = $(this).closest('.team__acco');
    var duration = 500;

    if (findArticle.is(':visible')) {
      findArticle.slideUp(duration).prev().removeClass("open");
    }
    else {
      findWrapper.find('.team__about').slideUp(duration).prev().removeClass("open");
      findArticle.slideDown(duration).prev().addClass("open");
    }

  });

//   $(".team__about").hide().prev().click(function() {
// 	$(this).parents(".team__item").find("team__about").not(this).slideUp().prev().removeClass("active");
// 	$(this).next().not(":visible").slideDown().prev().addClass("active");
// });
});
