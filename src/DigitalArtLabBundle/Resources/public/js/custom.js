/**
 * Created by julian on 16-11-15.
 */
$(document).ready(function(){

    $('.qrcode').each(function() {
        var qrcode = $(this).val();
        console.log(qrcode)
        $(this).qrcode({
            "size": 75,
            "color": "#3a3",
            "text": qrcode
        });
    });


    var viewheight = $(document).height();
    var containerheight = viewheight - 141 - 150;
    $('.container.body').css({"min-height" : containerheight+"px" });


});
