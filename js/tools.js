$(document).ready(function() {

    $('.main-gallery-item a').fancybox({
        buttons : [
            'download',
            'close'
        ],
        lang : 'ru',
        i18n : {
            'ru' : {
                DOWNLOAD    : 'Скачать',
                CLOSE       : 'Закрыть',
                NEXT        : 'Вперед',
                PREV        : 'Назад'
            }
        },
        baseTpl:
            '<div class="fancybox-container" role="dialog" tabindex="-1">' +
                '<div class="fancybox-bg"></div>' +
                '<div class="fancybox-toolbar">{{buttons}}</div>' +
                '<div class="fancybox-navigation">{{arrows}}</div>' +
                '<div class="fancybox-inner">' +
                    '<div class="fancybox-caption"></div>' +
                    '<div class="fancybox-stage"></div>' +
                "</div>" +
            "</div>",
        btnTpl: {
            download:
                '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"></a>',
            close:
                '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"></button>',
            arrowLeft:
                '<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}" href="javascript:;"></a>',
            arrowRight:
                '<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}" href="javascript:;"></a>'
        },
        thumbs: {
            autoStart: true,
            hideOnClose: true,
            axis: 'x'
        }
    });

    $.validator.addMethod('maskPhone',
        function(value, element) {
            return /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/.test(value);
        },
        'Не соответствует формату'
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('.why-menu a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.why-menu li').index(curLi);
            $('.why-menu li.active').removeClass('active');
            curLi.addClass('active');

            $('.why-tab.active').removeClass('active');
            $('.why-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.geography-menu li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.geography-menu li').index(curLi);
            $('.geography-menu li.active').removeClass('active');
            curLi.addClass('active');

            $('.geography-list.active').removeClass('active');
            $('.geography-list').eq(curIndex).addClass('active');
            $('.geography-menu-value').html($(this).html());
            $('.geography-menu-wrap').removeClass('open');
        }
        e.preventDefault();
    });

    $('.geography-menu-value').click(function(e) {
        $(this).parent().toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parent().filter('.geography-menu-wrap').length == 0) {
            $('.geography-menu-wrap').removeClass('open');
        }
    });

    $('.geography-item-feedback-link').click(function(e) {
        var curBlock = $(this).parent();
        if (curBlock.hasClass('open')) {
            curBlock.removeClass('open');
        } else {
            $('.geography-item-feedback.open').removeClass('open');
            curBlock.addClass('open');
        }
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.geography-item-feedback').length == 0) {
            $('.geography-item-feedback.open').removeClass('open');
        }
    });

    $('.footer-feedback-link').click(function(e) {
        var curBlock = $(this).parent();
        curBlock.toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.footer-feedback').length == 0) {
            $('.footer-feedback.open').removeClass('open');
        }
    });

    updateTimer();

    $('.order-link').click(function(e) {
        $.scrollTo($('#order'), 500);
        e.preventDefault();
    });

    $('.services-menu-mobile').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,
        dots: true
    });

    $('.header-phone-window-link').click(function(e) {
        $(this).parent().toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-phone').length == 0) {
            $('.header-phone').removeClass('open');
        }
    });

    $('.top-mobile-callback-link').click(function(e) {
        $(this).parent().toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.top-mobile-callback').length == 0) {
            $('.top-mobile-callback').removeClass('open');
        }
    });

    $('body').on('click', '.why-tab-more-link', function(e) {
        $(this).parents().filter('.why-tab-text').toggleClass('open');
        e.preventDefault();
    });

    $(window).on('load resize', function() {
        $('.why-tab-text').each(function() {
            var curBlock = $(this);
            curBlock.removeClass('open');
            if (curBlock.find('.why-tab-text-wrap').outerHeight() < curBlock.find('.why-tab-text-inner').outerHeight()) {
                curBlock.addClass('why-tab-text-with-link');
            } else {
                curBlock.removeClass('why-tab-text-with-link');
            }
        });
    });

    $('.plan').each(function() {
        var planWidthSrc    = Number($('.plan-scheme').attr('width'));
        var planHeightSrc   = Number($('.plan-scheme').attr('height'));

        $(window).on('load resize', function() {
            resizePlan();
        });

        resizePlan();

        function resizePlan() {
            var curWidth = $('.plan').width();
            curHeight = curWidth * planHeightSrc / planWidthSrc;
            $('.plan').css({'height': curHeight});
            $('.plan-bg').css({'left': 0, 'width': curWidth, 'height': curHeight});
            $('.plan-scheme').css({'width': curWidth, 'height': curHeight});

            $('.main-scheme-point').each(function() {
                var curWindow = $(this);
                curWindow.css({'display': 'none', 'left': Number(curWindow.data('left')) * curWidth / planWidthSrc, 'top': Number(curWindow.data('top')) * curWidth / planWidthSrc});
            });
        }

        var planTimer = null;

        $('body').on('mouseover', '.plan-scheme path.object', function(e) {
            if ($('.plan').width() > 1199) {
                window.clearTimeout(planTimer);
                planTimer = null;
                var curArea = $(this);
                var curIndex = $('.plan-scheme path.object').index(curArea);

                $('.main-scheme-point').css({'display': 'none'});
                var curWindow = $('.main-scheme-point').eq(curIndex);
                if (curWindow.length > 0) {
                    curWindow.css({'display': 'block'});
                    var curPlan = $('.plan');
                    if (curWindow.offset().left + curWindow.find('.main-scheme-point-content').outerWidth() > curPlan.offset().left + curPlan.width()) {
                        curWindow.addClass('right');
                    }
                }

                $('.plan-scheme path.object').removeClass('hover');
                $('.plan-scheme path.object').eq(curIndex).addClass('hover');
            }
        });

        $('body').on('mouseout', '.plan-scheme path.object', function(e) {
            if ($('.plan').width() > 1199) {
                window.clearTimeout(planTimer);
                planTimer = null;
                planTimer = window.setTimeout(function() {
                    $('.plan-scheme path.object').removeClass('hover');
                    $('.main-scheme-point').css({'display': 'none'});
                }, 200);
            }
        });

        $('body').on('mouseover', '.main-scheme-point', function(e) {
            if ($('.plan').width() > 1199) {
                window.clearTimeout(planTimer);
                planTimer = null;
            }
        });

        $('body').on('mouseout', '.main-scheme-point', function(e) {
            if ($('.plan').width() > 1199) {
                window.clearTimeout(planTimer);
                planTimer = null;
                planTimer = window.setTimeout(function() {
                    $('.plan-scheme path.object').removeClass('hover');
                    $('.main-scheme-point').css({'display': 'none'});
                }, 200);
            }
        });

        $('.plan-scheme path.object').click(function(e) {
            if ($('.plan').width() < 1200) {
                var curArea = $(this);
                var curIndex = $('.plan-scheme path.object').index(curArea);

                $('.main-scheme-point').css({'display': 'none'});
                var curWindow = $('.main-scheme-point').eq(curIndex);
                if (curWindow.length > 0) {
                    curWindow.css({'display': 'block'});
                }

                $('.plan-scheme path.object').removeClass('hover');
                $('.plan-scheme path.object').eq(curIndex).addClass('hover');
            }
        });

        $('body').on('click', '.main-scheme-point-close', function(e) {
            $('.plan-scheme path.object').removeClass('hover');
            $('.main-scheme-point').css({'display': 'none'});
            e.preventDefault();
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.plan').length == 0) {
                $('.plan-scheme path.object').removeClass('hover');
                $('.main-scheme-point').css({'display': 'none'});
            }
        });

    });

});

function updateTimer() {
    var minutes = 60;
    var hours   = minutes * 60;
    var days    = hours * 24;

    var curTimer = $('.timer');
    var timerLeft = Math.floor((new Date(curTimer.data('timestamp')) - (new Date())) / 1000);

    var timerDays = Math.floor(timerLeft / days);
    if (timerDays < 0) {
        timerDays = 0;
    }
    curTimer.find('.timer-item').eq(0).find('.timer-item-value').html(timerDays);

    timerLeft -= timerDays * days;

    var timerHours = Math.floor(timerLeft / hours);
    if (timerHours < 0) {
        timerHours = 0;
    }
    curTimer.find('.timer-item').eq(1).find('.timer-item-value').html(timerHours);

    timerLeft -= timerHours * hours;

    var timerMinutes = Math.floor(timerLeft / minutes);
    if (timerMinutes < 0) {
        timerMinutes = 0;
    }
    curTimer.find('.timer-item').eq(2).find('.timer-item-value').html(timerMinutes);

    timerLeft -= timerMinutes * minutes;

    if (timerLeft < 0) {
        timerLeft = 0;
    }

    curTimer.find('.timer-item').eq(3).find('.timer-item-value').html(timerLeft);

    setTimeout(updateTimer, 1000);
}

$(window).on('load resize', function() {
    if ($(window).width() < 1200) {
        if (!$('.main-gallery-list').hasClass('slick-slider')) {
            $('.main-gallery-list').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: true,
                arrows: false,
                dots: true
            });
        }
    } else {
        if ($('.main-gallery-list').hasClass('slick-slider')) {
            $('.main-gallery-list').slick('unslick');
        }
    }
});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

    curForm.find('.form-file input').change(function() {
        var curInput = $(this);
        var curField = curInput.parent().parent();
        curField.find('.form-file-name').html(curInput.val().replace(/.*(\/|\\)/, ''));
        curField.find('label.error').remove();
        curField.removeClass('error');
    });

    curForm.validate({
        ignore: '',
        invalidHandler: function(form, validatorcalc) {
            validatorcalc.showErrors();
            checkErrors();
        }
    });
}

function checkErrors() {
    $('.form-file').each(function() {
        var curField = $(this);
        if (curField.find('input.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
    });
}

var captchaKey = '6Ldk5DMUAAAAALWRTOM96EQI_0OApr59RQHoMirA';

var onloadCallback = function() {
    grecaptcha.render('g-recaptcha-1', {
        'sitekey' : captchaKey,
        'callback' : verifyCallback1,
    });
    grecaptcha.render('g-recaptcha-2', {
        'sitekey' : captchaKey,
        'callback' : verifyCallback2,
    });
    grecaptcha.render('g-recaptcha-3', {
        'sitekey' : captchaKey,
        'callback' : verifyCallback3,
    });
    grecaptcha.render('g-recaptcha-4', {
        'sitekey' : captchaKey,
        'callback' : verifyCallback4,
    });
};

var verifyCallback1 = function(response) {
    var curInput = $('#g-recaptcha-1').next();
    curInput.val(response);
    curInput.removeClass('error');
    curInput.parent().find('label.error').remove();
};

var verifyCallback2 = function(response) {
    var curInput = $('#g-recaptcha-2').next();
    curInput.val(response);
    curInput.removeClass('error');
    curInput.parent().find('label.error').remove();
};

var verifyCallback3 = function(response) {
    var curInput = $('#g-recaptcha-3').next();
    curInput.val(response);
    curInput.removeClass('error');
    curInput.parent().find('label.error').remove();
};

var verifyCallback4 = function(response) {
    var curInput = $('#g-recaptcha-4').next();
    curInput.val(response);
    curInput.removeClass('error');
    curInput.parent().find('label.error').remove();
};