//console.log('\'Allo \'Allo!');

function imagesAreLoaded() {
    $("#loader-wrapper").animate({
        //opacity: 0,
        //top: "+=50",
        top: "-" + ($(window).height() + 100)
    }, 1000, $.bez([.25, .1, .25, 1]), function() {
        $("#loader-wrapper").remove();
    });

    registerFancyboxe();
}

$(function(){
  function hugeGoAway() {
    $("#huge-wrapper").animate({
        //opacity: 0,
        //top: "+=50",
        top: "-" + ($(window).height() + 100)
    }, 1000, $.bez([.25, .1, .25, 1]), function() {
        $("body").removeClass("huge");
        $("#huge-wrapper").remove();
    });
  }

  $('#huge-wrapper').on('mousewheel', hugeGoAway);

  $("#huge-menu a").click(function(){
    hugeGoAway();
  });

  $("#huge-go").click(hugeGoAway);

  $("#huge-wrapper").swipe({swipe:hugeGoAway});
});

$(window).ready(function() {
    'use strict';
    // $('#contact').scrollTo($("#footer"));

    miscResLoaded();


    $.ajax({
        url: "/index-partial",
        dataType: "html"
    }).done(function(data) {

        miscResLoaded();

        var imagesToLoad = $("body").append(data).find(".img-responsive").slice(0, 10);

        imagesToLoad.on("load", function() {
            _IMGS++;
        });
        doTheRestOf();
    });

    //$(".ip-loader svg path.ip-loader-circle").css("stroke", "black");
});









function doTheRestOf() {

    $('.menu0 a').on('click', function(event) {
        var target = this.href.split('#');

        if (target.length > 1 && target[1] !== '') {
            //event.preventDefault();
            var scroll_speed = 2000;
            if (Math.abs($('#' + target[1]).offset().top - $("a[href='#" + target[1] +"']").offset().top) < (2*$(window).height())) {
              // sono vicino allo scroll target, vado velocee
              scroll_speed = 800;
            }

            $('html, body').animate({
                scrollTop: $('#' + target[1]).offset().top,
            },
            scroll_speed,
            // http://cubic-bezier.com/#.66,.26,.28,.69
            $.bez([.42,0,.58,1])
          );
        }
    });

    $('.typed').typed({
        strings: ['have fun!^500', 'see all my works!^500', 'have a nice day!^500', 'see you soon!^500', 'enjoy it!^500', 'contact me!^500', 'hire me!^500'],
        typeSpeed: 0,
        loop: true,
    });

    $('.typed-hobby').typed({
        strings: ['Google.^500', 'Stieg Larsson.^500', 'walking.^500', 'Wired magazine.^500', 'The Pirate Bay.^500', 'my mountain-bike.^500', 'a glass of wine!^500'],
        typeSpeed: 0,
        loop: true,
    });
    /*
	$('#footer').bind('inview',
			function (event, isInView, visiblePartX, visiblePartY) {
					var elem = $(this);

					if (isInView) {
							// element is now visible in the viewport
							if (visiblePartY === 'top') {
									// top part of element is visible
									$.scrollTo('max');
							} else if (visiblePartY === 'bottom') {
									elem.data('seenBottom', true);
							} else {
									elem.data('seenTop', true);
									elem.data('seenBottom', true);
							}

							if (elem.data('seenTop') && elem.data('seenBottom')) {
									elem.unbind('inview');
									// here we will do WHAT WHE NEED (for ex. Call Ajax stats collector)

							}
					} else {
							// element has gone out of viewport
					}
			});
*/
    $('#showsubmenu').mouseover(function() {
        $('.menu1').css('position', 'fixed').css('width', '100%').css('z-index', '98').css('background-color', 'white');
        $('#aftermenu').css('margin-top', '135px');
    });

    $(window).scroll(function() {
        $('.menu1').css('position', 'static').css('width', 'auto');
        $('#aftermenu').css('margin-top', '0px');
    });

var first_time = true;

    $('#babbocounts').bind('inview',
        function(event, isInView) {

            if (isInView && first_time) {
                first_time = false
                // element is now visible in the viewport
                $('.round .n-work').animateNumber({
                    number: 3
                });
                $('.round .n-school').animateNumber({
                    number: 6
                });
                $('.round .n-scolarship').animateNumber({
                    number: 12
                });
                $('.round .n-book').animateNumber({
                    number: 47
                });
            } else {
                // element has gone out of viewport
            }
        });

    // #work #resume #footer quando entrano attivare il corrispettivo h1 selected
    $('#work, #main_works').bind('inview',
        function(event, isInView) {
            if (isInView) {
                // element is now visible in the viewport
                $('h1.otherpage').removeClass('selected');
                $('[href="#work"] h1.otherpage').addClass('selected');
            } else {
                // element has gone out of viewport
                $('[href="#work"] h1.otherpage').removeClass('selected');
            }
        });

    $('#resume, #resume2').bind('inview',
        function(event, isInView) {
            if (isInView) {
                // element is now visible in the viewport
                $('h1.otherpage').removeClass('selected');
                $('[href="#resume"] h1.otherpage').addClass('selected');
            } else {
                // element has gone out of viewport
                $('[href="#resume"] h1.otherpage').removeClass('selected');
            }
        });

    $('#footer').bind('inview',
        function(event, isInView) {
            if (isInView) {
                // element is now visible in the viewport
                $('h1.otherpage').removeClass('selected');
                $('[href="#footer"] h1.otherpage').addClass('selected');
            } else {
                // element has gone out of viewport
                $('[href="#footer"] h1.otherpage').removeClass('selected');
            }
        });

    $('h1.otherpage').click(function() {
        $('h1.otherpage').removeClass('selected');
        $(this).addClass('selected');
    });


    $('.filterstaturation a').click(function(event) {
        //event.preventDefault();
        $('.filterstaturation a').removeClass('selected');
        $(this).addClass('selected');
        $('#main_works a').removeClass('saturation');
        var target = this.href.split('#');

        if (target.length > 1 && target[1] !== '') {
            var filter = '.' + target[1];

            $('#main_works a:not(' + filter + ')').addClass('saturation');
        }
    });
}




function registerFancyboxe() {
    console.log("document.ready");

    $('#main_works a').on('click', function() {
        if (!$(this).hasClass("saturation")) {

            var fancyboxes = $('#main_works a:not(.saturation)');

            var thiss = this;
            var startFromThisIndex = 0;
            fancyboxes = $.map(fancyboxes, function(elementOfArray, indexInArray) {
                startFromThisIndex = ($(elementOfArray).attr("sp-href") === $(thiss).attr("sp-href")) ? indexInArray : startFromThisIndex;
                return {
                    "href": $(elementOfArray).attr("sp-href"),
                    "sp-class": $(elementOfArray).attr("sp-class")
                        // "title" : $(elementOfArray).find("div.text-image h1").html()
                };


            });
            // var startFromThisIndex = $.inArray($(this), fancyboxes);

            if (startFromThisIndex > 0) {
                var fancyboxes_sorted = [];
                fancyboxes_sorted = fancyboxes_sorted.concat(fancyboxes.slice(startFromThisIndex));
                fancyboxes_sorted = fancyboxes_sorted.concat(fancyboxes.slice(0, startFromThisIndex));
                fancyboxes = fancyboxes_sorted;
            }

            $.fancybox.open(fancyboxes, {
                type: 'ajax',
                closeBtn: false,
                scrolling: 'hide',
                padding: 0,
                margin: SP_ENQUIRE.getFancyMargin(), // TODO settare questo in base a mobile(20) con http://wicky.nillia.ms/enquire.js/
                width: SP_ENQUIRE.getFancyWidth(), // TODO settare questo in base a mobile(100%)
                height: "100%",
                autoSize: false,
                arrows: false,
                mouseWheel: false,
                beforeClose : function(){
                    $("body").css({"overflow-y":"scroll", "overflow-x":"hidden", "height": "auto"});
                },
                beforeShow : function() {
                    $("body").css("overflow", "hidden");
                    var window_height = $(window).height();
                    $("body").css("height", window_height + "px");
                },
                afterShow: function(current, previous) {
                    window.location.hash = this.href.replace("works", "work");
                    setTimeout(function() {



                        /*var fbtop = Number($(".fancybox-wrap").css("top").replace("px", ""));
                        var fbwrap = $(".fancybox-wrap").height();
                        var growH = $(window).height() - fbwrap - fbtop;

                        var newH = fbwrap + growH;
                        var newH = '' + newH + "px";

                        $(".fancybox-wrap").height(newH);
                        $(".fancybox-skin").height(newH);
                        $(".fancybox-outer").height(newH);
                        $(".fancybox-inner").height(newH);*/

                        var sticaHeight = $('.fancybox-inner').height() - $('.menulight').height();
                        //alert($('.fancybox-inner').height());
                        //$('#slimscrollthis').parent().height("" + sticaHeight + "px");
                        $('#slimscrollthis').height(sticaHeight);
                        $("#scroll-inner").height("auto");
                        $('#slimscrollthis').css("overflow-y", "scroll");
                        $('#slimscrollthis').css("-webkit-overflow-scrolling", "touch");
                        //alert('parent css: ' + $('#slimscrollthis').parent().css("height"));
                        /*$('#slimscrollthis').slimScroll({
                            height: sticaHeight + 'px',
                            touchScrollStep: 50
                        });*/
                        $('#slimscrollthis').width("100%");
                        //$("#slimscrollthis").trigger("mouseover");
                        BIND_SWIPE();
                        OTHER_SIZES();



                        if ( $(".vimeo-cover") ) {
                            var vimeoCoverHeight = $(".vimeo-cover").width() * 9 / 16;
                            $(".vimeo-cover").height(vimeoCoverHeight + "px");
                        }

                    }, 500);

                    return true;
                }
            });

        } // se sono grigetto non faccio nulla

        return false;
    });

    /**
    gestisco i permalink dall'hash sulle fancyboesx
    **/
    var hash = window.location.hash;
    var sphref = hash.substr(1).replace("work", "works");
    if ( $("a[sp-href='" + sphref + "']").length === 1) {
      $("a[sp-href='" + sphref + "']").trigger("click");
    }
}

var SP_ENQUIRE = {
    margin: [20, 0, 0, 0],
    width: "70%"
};
SP_ENQUIRE.getFancyMargin = function() {
    return SP_ENQUIRE.margin;
};
SP_ENQUIRE.getFancyWidth = function() {
    return SP_ENQUIRE.width;
};


$(function() {
    enquire.register("screen and (max-width:768px)", {

        // OPTIONAL
        // If supplied, triggered when a media query matches.
        match: function() {
            SP_ENQUIRE.margin = 20;
            SP_ENQUIRE.width = "100%";
        },

        // OPTIONAL
        // If supplied, triggered when the media query transitions
        // *from a matched state to an unmatched state*.
        unmatch: function() {},

        // OPTIONAL
        // If supplied, triggered once, when the handler is registered.
        setup: function() {},

        // OPTIONAL, defaults to false
        // If set to true, defers execution of the setup function
        // until the first time the media query is matched
        deferSetup: true,

        // OPTIONAL
        // If supplied, triggered when handler is unregistered.
        // Place cleanup code here
        destroy: function() {}

    });
});

var UNBIND_SWIPE = null;
function BIND_SWIPE() {
    if ( UNBIND_SWIPE ) {
        UNBIND_SWIPE.off();
    }
    UNBIND_SWIPE = $(".fancybox-inner").swipe({
        //Generic swipe handler for all directions
        allowPageScroll : "auto",
        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
            switch (direction) {
                case "right":
                    $.fancybox.prev();
                    break;
                case "left":
                    $.fancybox.next();
                    break;
            }

            return true;
        }
    });
}

function OTHER_SIZES() {
  $("#slimscrollthis").find("img").each(function(){
    var srcattr = $(this).attr('src');
    var gs = srcattr.replace(/(works\/[a-z0-9-]*\/)small_/, "$1" + IMGPATH + "_");
    //gs = gs.substring(1, gs.length);

    $(this).attr('src', gs);
  });
}
