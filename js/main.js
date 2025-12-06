$(document).ready(function(){

    $('.fa-bars').click(function(){
        $(this).toggleClass('fa-time');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('load scroll',function(){
        $('.fa-bars').removeClass('fa-time')
        $('.navbar').removeClass('nav-toggle')
        
        // navbar move function
        if($(window).scrollTop() > 30){
            $('.header').css({'background':'#1a4d2e','box-shadow':'0 .3rem .5rem rgba(0, 0, 0, .3)'})
            // Changer le logo pour about_clair.png quand le header a un fond vert
            $('.header .logo img').attr('src', './images/about_clair.png')
        }else{
            $('.header').css({'background':'none','box-shadow':'none'})
            // Remettre le logo original quand pas de fond
            $('.header .logo img').attr('src', './images/logo.png')
        }
    })

    // Scroll smooth vers la section about
    $('.scroll-down-btn').on('click', function(e){
        e.preventDefault();
        var target = $(this).attr('href');
        if(target){
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 800, 'swing');
        }
    });

    // Formulaire de contact - ouverture mailto
    $('#contact-form').on('submit', function(e){
        e.preventDefault();
        
        var nom = $('#nom').val();
        var email = $('#email').val();
        var telephone = $('#telephone').val();
        var message = $('#message').val();
        
        // Construire le sujet et le corps du mail
        var subject = encodeURIComponent('Contact depuis le site KPB VÉGÉTAL');
        var body = encodeURIComponent(
            'Nom: ' + nom + '\n' +
            'Email: ' + email + '\n' +
            'Téléphone: ' + telephone + '\n\n' +
            'Message:\n' + message
        );
        
        // Ouvrir l'application mail
        window.location.href = 'mailto:contact@kpbvegetal.fr?subject=' + subject + '&body=' + body;
    });
});