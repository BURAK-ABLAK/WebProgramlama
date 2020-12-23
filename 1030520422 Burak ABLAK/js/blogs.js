var isloading = false;

$(window).scroll(function(){
    if($(window).scrollTop() + $(window).height() >=  $(".blog_panel_end").offset().top && isloading == false){
        var lastId = $(".blog-image-container:last").attr('lastId');
        isloading = true;
        if(lastId == null){
            $('#blogs-frame').append('<div id="thats-all" class="img-responsive center-block" style="display: none;"><img src="images/thats_all_folks.gif" width="250"></div>');
            $('#thats-all').fadeIn(3000);
            return;
        }
        $.ajax({
            type: "POST",
            url: "blogmore.php",
            data: {"offset":lastId},
            beforeSend:function(html){
                $('#load-more').slideUp(300).fadeIn(400);
            },
            success:function(response){
                if(response == 'blogsdone'){
                    $('#load-more').hide();
                    $('#blogs-frame').append('<div id="thats-all" style="display: none;"><img class="img-responsive center-block" src="images/thats_all_folks.gif" width="250"></div>');
                    $('#thats-all').fadeIn(3000);
                }
                else{
                    $('#load-more').hide();
                    $('#all-blogs').append(response);
                    isloading = false;
                } 
            }
        });
    }
});