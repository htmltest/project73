$(document).ready(function() {

    $('.main-gallery-item a').fancybox({
        tpl : {
            closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
            next     : '<a title="Следующая" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
            prev     : '<a title="Предыдущая" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
        },
        helpers: {
            overlay : {
                locked : false
            }
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
        }
        e.preventDefault();
    });

    updateTimer();

    $('.order-link').click(function(e) {
        $.scrollTo($('#order'), 500);
        e.preventDefault();
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

    curTimer.find('.timer-item').eq(3).find('.timer-item-value').html(timerLeft);

    setTimeout(updateTimer, 1000);
}

$(window).on('load resize', function() {
    $('.main-scheme').each(function() {
        var curScheme = $(this);
        var curWidth = curScheme.width();
        var originalWidth = curScheme.find('.main-scheme-img').data('width');
        var curScale = curWidth / originalWidth;
        curScheme.find('.main-scheme-point').each(function() {
            var curPoint = $(this);
            var curLeft = Number(curPoint.css('left').replace('px', ''));
            var curTop = Number(curPoint.css('top').replace('px', ''));
            curPoint.css({'margin-left': curLeft * curScale - curLeft, 'margin-top': curTop * curScale - curTop});
            if (curWidth - (curLeft * curScale) < 585) {
                curPoint.addClass('right');
            } else {
                curPoint.removeClass('right');
            }
        });
    });
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