/**
 * Created by julian on 16-11-15.
 */
$(document).ready(function(){

    $('.qrcode').each(function() {
        var qrcode = $(this).attr('value');
        console.log(qrcode);
        $(this).qrcode({
            "size": 95,
            "color": "#3a3",
            "text": qrcode
        });
    });

    $('#time1').datepicker({
        maxDate: new Date(), // Now can select only dates, which goes after today
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd'
    });
    $('#time2').datepicker({
        maxDate: new Date(), // Now can select only dates, which goes after today
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd'
    });

    var viewheight = $(document).height();
    var containerheight = viewheight - 141 - 150;
    $('.container.body').css({"min-height" : containerheight+"px" });

    $('.tr-group .opensaldoform, .opensaldoform.userform').on("click", function(e){
        e.preventDefault();
        $(this).parent().parent().parent().find('.user_transaction_form').slideToggle();
        console.log(this)
    })

});

function appendFrame(username, index){
    var frame = 'iframe[name=frame'+index+']';

    if($(frame).length > 0){

    }else{
        $('body').append("<iframe style=\"display: none\" src=\"/digitalartlab/web/profile/" + username + "/print\" name=\"frame" + index + "\"></iframe>");
    }

}

