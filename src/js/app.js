$(document).ready(function () {

    // droupdown menu contacts

    var contactsDroupdown = $('.contacts'),
        dropdownClass = 'dropdown__open',
        clickClass = 'dropdown__click';

    contactsDroupdown.on('click', function () {
        contactsDroupdown.addClass(dropdownClass);
        contactsDroupdown.addClass(clickClass);
    });

    contactsDroupdown.on('mouseover', function (event) {
        if (contactsDroupdown.hasClass(clickClass)) {}
        else {
            contactsDroupdown.addClass(dropdownClass);
        }
        // console.log(event);
    });

     contactsDroupdown.on('mouseout', function (event) {
        if (contactsDroupdown.hasClass(dropdownClass) && !contactsDroupdown.hasClass(clickClass) ) {
            contactsDroupdown.removeClass(dropdownClass);
        }
        // console.log(event);
    });

    $(document).mouseup(function (event) {
        // console.log(event.target);
        if (contactsDroupdown.has(event.target).length === 0){
            contactsDroupdown.removeClass(dropdownClass);
            contactsDroupdown.removeClass(clickClass);
        }
    });



    // load items in career
     $.getJSON('ajax/career.json', function(data) {

          var template =
                     '<li class="timeline__item {{class}}">' +
                        '<a class="timeline__link" href="javascript:void(0)" data-img="{{img}}">' +
                            '<div class="work">' +
                                '<div class="work__org">{{org}}</div>' +
                                '<div class="work__position">{{position}}</div>' +
                                '<div class="work__range">{{range}}</div>' +
                                '<div class="work__year">{{year}}</div>' +
                            '</div>' +
                        '</a>' +
                    '</li>';

         $.each(data.works, function(item) {
             var rendered = Mustache.render(template, data.works[item]);
             $('.timeline__items').append(rendered);
        });

         // setup active career

         var links = $('.timeline__link'),
         items = $('.timeline__item ');

         links.mouseover(function () {
             // console.log($(this).data('img'));
             items.removeClass('active');
             document.getElementById('career_img').src = $(this).data('img');
             $($(this).closest('.timeline__item')).addClass('active');
         })

     });

});


