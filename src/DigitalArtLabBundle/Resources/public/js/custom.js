/**
 * Created by julian on 16-11-15.
 */
$(document).ready(function(){

    $('.qrcode').each(function() {
        var qrcode = $(this).val();
        console.log(qrcode)
        $(this).qrcode({
            "size": 100,
            "color": "#3a3",
            "text": qrcode
        });
    });





});
