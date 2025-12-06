$(document).ready(function() {
    // Récupérer toutes les images de plantes
    const plantImages = [];
    $('.lightbox-trigger').each(function() {
        plantImages.push({
            src: $(this).data('src'),
            name: $(this).data('plant')
        });
    });

    let currentIndex = 0;
    const lightbox = $('#lightbox');
    const lightboxImage = $('#lightbox-image');
    const lightboxPlantName = $('#lightbox-plant-name');
    const lightboxCounter = $('#lightbox-counter');

    // Ouvrir la lightbox
    $('.lightbox-trigger').on('click', function() {
        currentIndex = $(this).index('.lightbox-trigger');
        openLightbox(currentIndex);
    });

    // Fonction pour ouvrir la lightbox
    function openLightbox(index) {
        if (plantImages.length === 0) return;
        
        currentIndex = index;
        updateLightboxContent();
        lightbox.addClass('active');
        $('body').css('overflow', 'hidden'); // Empêcher le scroll de la page
    }

    // Fonction pour fermer la lightbox
    function closeLightbox() {
        lightbox.removeClass('active');
        $('body').css('overflow', 'auto'); // Réactiver le scroll
    }

    // Fonction pour mettre à jour le contenu de la lightbox
    function updateLightboxContent() {
        const currentPlant = plantImages[currentIndex];
        lightboxImage.attr('src', currentPlant.src);
        lightboxImage.attr('alt', currentPlant.name);
        lightboxPlantName.text(currentPlant.name);
        lightboxCounter.text(`${currentIndex + 1} / ${plantImages.length}`);
    }

    // Bouton fermer
    $('.lightbox-close').on('click', function() {
        closeLightbox();
    });

    // Fermer en cliquant sur le fond
    lightbox.on('click', function(e) {
        if ($(e.target).is('#lightbox')) {
            closeLightbox();
        }
    });

    // Navigation précédente
    $('.lightbox-prev').on('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + plantImages.length) % plantImages.length;
        updateLightboxContent();
    });

    // Navigation suivante
    $('.lightbox-next').on('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % plantImages.length;
        updateLightboxContent();
    });

    // Navigation au clavier
    $(document).on('keydown', function(e) {
        if (lightbox.hasClass('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + plantImages.length) % plantImages.length;
                updateLightboxContent();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % plantImages.length;
                updateLightboxContent();
            }
        }
    });

    // Empêcher la propagation du clic sur l'image
    lightboxImage.on('click', function(e) {
        e.stopPropagation();
    });

    // Empêcher la propagation du clic sur la caption
    $('.lightbox-caption').on('click', function(e) {
        e.stopPropagation();
    });
});

