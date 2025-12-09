$(document).ready(function(){

    $('.fa-bars').click(function(e){
        e.stopPropagation();
        $(this).toggleClass('fa-time');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Fermer le menu quand on clique sur un lien
    $('.navbar a').on('click', function(){
        $('.fa-bars').removeClass('fa-time');
        $('.navbar').removeClass('nav-toggle');
    });

    // Fermer le menu quand on clique en dehors
    $(document).on('click', function(e){
        if (!$(e.target).closest('.header').length) {
            $('.fa-bars').removeClass('fa-time');
            $('.navbar').removeClass('nav-toggle');
        }
    });

    $(window).on('load scroll',function(){
        // navbar move function
        if($(window).scrollTop() > 30){
            $('.header').css({'background':'#1a4d2e','box-shadow':'0 .3rem .5rem rgba(0, 0, 0, .3)'})
            // Changer le logo pour about_clair.png quand le header a un fond vert
            $('.header .logo img').attr('src', './images/about_clair.png')
        }else{
            $('.header').css({'background':'rgba(0, 0, 0, 0.2)','box-shadow':'none'})
            // Remettre le logo original quand pas de fond
            $('.header .logo img').attr('src', './images/logo.png')
        }
    })

    // Scroll smooth vers la section about
    $('.scroll-down-btn').on('click', function(e){
        e.preventDefault();
        var target = $(this).attr('href');
        if(target){
            var $targetSection = $(target);
            if($targetSection.length){
                // Calculer la position en tenant compte du header fixe
                var headerHeight = $('.header').outerHeight() || 80; // Hauteur du header ou valeur par défaut
                var targetPosition = $targetSection.offset().top - headerHeight - 20; // 20px d'espace supplémentaire
                
                $('html, body').animate({
                    scrollTop: targetPosition
                }, 800, 'swing');
            }
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

    // Carrousel des réalisations
    var currentIndex = 0;
    var $track = $('#realisationsTrack');
    var $cards = $track.find('.card');
    var totalCards = $cards.length;
    var cardsPerView = $(window).width() < 768 ? 1 : 2;

    function updateCarousel() {
        var $carousel = $('.realisations-carousel');
        var $firstCard = $cards.eq(0);
        
        if ($firstCard.length && $carousel.length) {
            // Attendre le prochain frame pour que les dimensions soient calculées
            requestAnimationFrame(function() {
                var carouselWidth = $carousel.width();
                var cardWidth = $firstCard.outerWidth(false);
                var remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize);
                var gapPixels = 4 * remInPixels; // Gap de 4rem en pixels
                
                // Calculer le décalage : largeur d'une carte + gap
                var cardWithGap = cardWidth + gapPixels;
                var translateX = -(currentIndex * cardWithGap);
                
                $track.css('transform', 'translateX(' + translateX + 'px)');
            });
        } else {
            // Fallback en pourcentage
            var cardWidthPercent = 100 / cardsPerView;
            var gapPercent = (4 / cardsPerView) * 2;
            var translateX = -(currentIndex * (cardWidthPercent + gapPercent));
            $track.css('transform', 'translateX(' + translateX + '%)');
        }
        
        // Désactiver les boutons aux extrémités
        $('#prevBtn').prop('disabled', currentIndex === 0);
        $('#nextBtn').prop('disabled', currentIndex >= totalCards - cardsPerView);
    }

    $('#prevBtn').on('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    $('#nextBtn').on('click', function() {
        if (currentIndex < totalCards - cardsPerView) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Initialiser le carrousel
    updateCarousel();

    // Ajuster le nombre de cartes visibles selon la taille de l'écran
    $(window).on('resize', function() {
        var newCardsPerView = $(window).width() < 768 ? 1 : 2;
        if (newCardsPerView !== cardsPerView) {
            cardsPerView = newCardsPerView;
            // Réinitialiser l'index si nécessaire
            if (currentIndex > totalCards - cardsPerView) {
                currentIndex = Math.max(0, totalCards - cardsPerView);
            }
            updateCarousel();
        }
    });
});
