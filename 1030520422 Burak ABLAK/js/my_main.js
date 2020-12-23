jQuery(document).ready(function() {
    if($(window).width() > 1182/*1200*/){
        jQuery(".top_logo").after('<div id="top_logo_after"></div>');
        var navOffset = jQuery("#top_logo_after").offset().top;
    }
    else if($(window).width() > 850/*867*/){
        jQuery(".top_logo_small").after('<div id="top_logo_after"></div>');
        var navOffset = jQuery("#top_logo_after").offset().top;
    }
    else{
		var navOffset = jQuery("nav").offset().top;
	}
    
    var htmlang = $('html').attr('lang');
    jQuery("#" + htmlang).remove();
    
    jQuery("iframe").wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
    jQuery("iframe").addClass('embed-responsive-item');
    
    jQuery("nav").wrap('<div class="nav-placeholder"></div>');
    
    if($(window).width() < 851/*868*/){
        jQuery(".nav-placeholder").height(51);
        jQuery("nav").addClass("navbar-fixed-top");
        jQuery("#navbar-logo").addClass("navbar-brand-ek");
    }
    else{
        jQuery(".nav-placeholder").height(jQuery("nav").outerHeight());
    }
    
    jQuery(window).scroll(function() {
        var scrollPos = jQuery(window).scrollTop();
        if($(window).width() > 850/*867*/){
            if(scrollPos >= navOffset) {
                jQuery("nav").addClass("navbar-fixed-top");
                jQuery("#navbar-logo").addClass("navbar-brand-ek");
            } else {
                jQuery("nav").removeClass("navbar-fixed-top");
                jQuery("#navbar-logo").removeClass("navbar-brand-ek");
            }
        }
        //FOOTER STYLE
        if ($(window).width() > 974/*991*/){
            if(scrollPos + $(window).height() == $(document).height()) {
                jQuery(".home").addClass("footer-dynamic");
            }
            else{
                jQuery(".home").removeClass("footer-dynamic");
            }
        }
    });
    //FOOTER STYLE
    var footerholderadded = false;
    if ($(window).width() > 974/*991*/) {
        jQuery(".home").after('<div class="nav-footerholder"></div>');
        jQuery(".nav-footerholder").height(jQuery(".home").outerHeight());
        jQuery(".home").addClass("navbar-fixed-bottom");
        footerholderadded = true;
    }
    
    //Contact Us Pop-Up
    $('.contactUsBtn').magnificPopup({
      removalDelay: 500,
      callbacks: {
        beforeOpen: function() {
           this.st.mainClass = this.st.el.attr('data-effect');
        }
      },
      midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });
    $(function(){
        var contactform = $('#ajax-contact');
        
        $(contactform).submit(function(event){
            event.preventDefault();
            
            var anyempty = false;
            if($('#cnttype').val()==""){
                $('#cnttype').attr('style','border: 1px solid red;');
                anyempty = true;
            }
            else{
                $('#cnttype').attr('style','border: 1px solid #0103fe;');
            }
            if($('#cntname').val()==""){
                $('#cntname').attr('style','border: 1px solid red;');
                anyempty = true;
            }
            else{
                $('#cntname').attr('style','border: 1px solid #0103fe;');
            }
            if($('#cntemail').val()==""){
                $('#cntemail').attr('style','border: 1px solid red;');
                anyempty = true;
            }
            else{
                $('#cntemail').attr('style','border: 1px solid #0103fe;');
            }
            if($('#cntmessage').val()==""){
                $('#cntmessage').attr('style','border: 1px solid red;');
                anyempty = true;
            }
            else{
                $('#cntmessage').attr('style','border: 1px solid #0103fe;');
            }
            if($('#captcha_code').val()==""){
                $('#captcha_code').attr('style','border: 1px solid red;');
                anyempty = true;
            }
            else{
                $('#captcha_code').attr('style','border: 1px solid #0103fe;');
            }
            if(anyempty == true){
                $('#cnt-result').html('&#9655; Please Fill All The Required İnformations');
                $('#cnt-result').attr('style','border: 1px solid red;');
                return false;
            }
            
            var formdata = $(contactform).serialize();
            $.ajax({
                type: 'POST',
                url: $(contactform).attr('action'),
                data: formdata,
                success: function(response){
                    if(response=="fillform"){
                        $('#cnt-result').html('&#9655; Please Fill All The Required İnformations');
                        $('#cnt-result').attr('style','border: 1px solid red;');
                    }
                    else if(response=="invalidtype"){
                        $('#cnt-result').html('&#9655;Please select type');
                        $('#cnt-result').attr('style','border: 1px solid red;');
                        $('#cnttype').attr('style','border: 1px solid red;');
                    }
                    else if(response=="unvalidemail"){
                        $('#cnt-result').html('&#9655;Email is not valid');
                        $('#cnt-result').attr('style','border: 1px solid red;');
                        $('#cntemail').attr('style','border: 1px solid red;');
                    }
                    else if(response=="captchawrong"){
                        $('#cnt-result').html('&#9655;Wrong Captcha');
                        $('#cnt-result').attr('style','border: 1px solid red;');
                        $('#captcha_code').attr('style','border: 1px solid red;');
                    }
                    else if(response=="mailsend"){
                        var cntrname = $('#cntname').val();
                        $('#cnt-result').attr('style','border: 1px solid limegreen; !important');
                        $('#cnt-result').attr('style','color:whitesmoke;');
                        $('#cnt-result').html('<div style="border:2px solid #0103fe; background-color:#3c763d;" ><img style="margin-top:20px;" src="images/icon-ok.png" ><h2 style="color:limegreen;">Thank you, '+cntrname+'</h2><p style="color:#0103fe; font-size:1.4em;" > &#9672; We will be contact soon &#9672;</p></div>');
                        $('#ajax-contact').html('');
                    }
                    else{
                        alert(response);
                        $('#cnt-result').html('');
                    }
                },
                error: function(e){
                    alert("Error: Posting Contact Form");
                }
            })
        });
        
        //GAMER Registration VALs
        var gamerform = $('#gamersignupform');
        
        $(gamerform).submit(function(event){
            event.preventDefault();
            
            var gamerdata = $(gamerform).serialize();
            $.ajax({
                type: 'POST',
                url: $(gamerform).attr('action'),
                data: gamerdata,
                success : function(response){
                    if(response=="fullfillemail"){
                        $('#gameremailinput').attr('style','border: 1px solid red;');
                        $('#gameremailinputresponse').html('Please Enter Your E-mail');
                    }
                    else if(response=="unvalidemail"){
                        $('#gameremailinput').attr('style','border: 1px solid red;');
                        $('#gameremailinputresponse').html('Unvalid Email');
                    }
                    else if(response=="alreadyregistered"){
                        $('#gameremailinput').attr('style','border: 1px solid red;');
                        $('#gameremailinputresponse').html('You\'ve been already registered ');
                    }
                    else if(response=="mailsend"){
                        if($('#joinedlang').val() == 'tr'){
                            $('#joiningourfamily').html('<h4 style="color:#257ab7;">Ailemize Katıldığınız için Teşekkürler</h4><div><img style="display:inline;" src="images/icon-ok.png" width="20" height="20"><p>Size bir onay maili gönderdik.Haberleri almaya başlamadan önce son bir adım olarak email adresinizi onaylamalısınız.</p></div>');
                        }
                        else if($('#joinedlang').val() == 'de'){
                            $('#joiningourfamily').html('<h4 style="color:#257ab7;">Danke für den Beitritt zu unserer Familie</h4><div><img style="display:inline;" src="images/icon-ok.png" width="20" height="20"><p>Wir schicken Ihnen einfach eine Vertretung E-Mail. Sie müssen Ihre Adresse überprüfen, bevor Sie mit dem Empfang von Nachrichten beginnen können</p></div>');
                        }
                        else if($('#joinedlang').val() == 'fr'){
                            $('#joiningourfamily').html('<h4 style="color:#257ab7;">Merci de vous joindre à notre famille</h4><div><img style="display:inline;" src="images/icon-ok.png" width="20" height="20"><p>Nous venons de vous envoyer un e-mail de vérification. Vous devez vérifier votre adresse avant de pouvoir recevoir des nouvelles</p></div>');
                        }
                        else if($('#joinedlang').val() == 'it'){
                            $('#joiningourfamily').html('<h4 style="color:#257ab7;">Grazie per far parte del nostro famiglia</h4><div><img style="display:inline;" src="images/icon-ok.png" width="20" height="20"><p>Abbiamo appena vi inviamo un vertification E-mail.You necessità di verificare il tuo indirizzo prima di poter iniziare a ricevere notizie</p></div>');
                        }
                        else if($('#joinedlang').val() == 'ja'){
                            $('#joiningourfamily').html('<h4 style="color:#257ab7;">感谢您加入我们的家庭</h4><div><img style="display:inline;" src="images/icon-ok.png" width="20" height="20"><p>我们只是向您发送了一个验证电子邮件。您需要先验证您的地址，然后才能开始接收新闻</p></div>');
                        }
                        else if($('#joinedlang').val() == 'zh'){
                            $('#joiningourfamily').html('<h4 style="color:#257ab7;">感谢您加入我们的家庭</h4><div><img style="display:inline;" src="images/icon-ok.png" width="20" height="20"><p>我们只是向您发送了一个验证电子邮件。您需要先验证您的地址，然后才能开始接收新闻</p></div>');
                        }
                        else {
                            $('#joiningourfamily').html('<h4 style="color:#257ab7;">Thank You For Joining Our Family</h4><div><img style="display:inline;" src="images/icon-ok.png" width="20" height="20"><p>We\'ve just send you a vertification E-mail.You need to verify your address before you can start receiving news</p></div>');
                        }
                        
                    }
                    else{
                        alert(response);
                    }
                },
                error: function(e){
                    alert("Error: Gamer Registration");
                }
            })
        });
    });
    $(window).resize(function() {
        navOffset = jQuery("nav").offset().top;
        jQuery(".nav-placeholder").height(jQuery("nav").outerHeight());
        jQuery(".nav-footerholder").height(jQuery(".home").outerHeight());
        
        /*NAV STYLE*/
        if($(window).width() > 850/*867*/){
            jQuery("#navbar-logo").removeClass("navbar-brand-ek");
            if($(window).width() > 1182/*1199*/){
                jQuery("#top_logo_after").remove();
                jQuery(".top_logo").after('<div id="top_logo_after"></div>');
                navOffset = jQuery("#top_logo_after").offset().top;
            }
            else{
                jQuery("#top_logo_after").remove();
                jQuery(".top_logo_small").after('<div id="top_logo_after"></div>');
                navOffset = jQuery("#top_logo_after").offset().top;
            }
            if(jQuery(window).scrollTop() <= navOffset) {
                jQuery("nav").removeClass("navbar-fixed-top");
            }
            else{
                jQuery("#navbar-logo").addClass("navbar-brand-ek");
            }
        }
        else{
            jQuery("#navbar-logo").addClass("navbar-brand-ek");
            jQuery("nav").addClass("navbar-fixed-top");
            jQuery(".nav-placeholder").height(jQuery("nav").outerHeight());
        }
        
        /*FOOTER STYLE*/
        if ($(window).width() > 974) {
            if(!footerholderadded){
                jQuery(".home").after('<div class="nav-footerholder"></div>');
                jQuery(".nav-footerholder").height(jQuery(".home").outerHeight());
                jQuery(".home").addClass("navbar-fixed-bottom");
                footerholderadded = true;
            }
        }
        else{
            jQuery(".nav-footerholder").remove();
            jQuery(".home").removeClass("navbar-fixed-bottom");
            jQuery(".home").removeClass("footer-dynamic");
            footerholderadded = false;
        }
    });
    var clicksit = false;
    $('.navbar-toggle').click(function(){
        if(clicksit){
            $(".navbar-toggle").css("background-color","black");
            clicksit = false;
        }
        else{
            $(".navbar-toggle").css("background-color","#000185");
            clicksit = true;
        }
    });
});