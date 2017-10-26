$(window).on('scroll', function () {

    var headerHeight = $('.header').outerHeight();
    var scrollTop = $(window).scrollTop();

    if (scrollTop > (headerHeight + 30)) {
        $('.search-block__parag').hide('fast', 'swing')
    }
    if (scrollTop <= (headerHeight + 30)) {
        $('.search-block__parag').show('fast', 'swing')
    }
});

$(window).on('scroll', function () {

    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    console.log("scrollTOP: " + scrollTop);
    console.log("window height: " + (windowHeight / 4));
    if (scrollTop > (windowHeight / 4 )) {
        $('#goTop').show('fast', 'swing')
    }
    if (scrollTop <= (windowHeight / 4 )) {
        $('#goTop').hide('fast', 'swing')
    }
});

function getBooks(e) {
    e.preventDefault();
    var alert = $('#alert');
    var item = $('#usersInput').val();
    var resultsBox = $('#results');
    alert.empty();
    resultsBox.empty();

    if (item === '') {
        alert.append('Będzie łatwiej znaleźć, jeśli coś tu wpiszesz <img src="assets/pencil.svg"> :)').show('fast', 'swing');
    } else {
        $('.decoration-block').toggleClass('decoration-block--bg');
        alert.hide('fast', 'swing');

        $.ajax({
            url: 'https://gwo.pl/booksApi/v1/search?query=' + item,
            dataType: 'json',
            type: 'GET',
            data: {},
            success: function (data) {
                console.log(data);
                if (data.length > 0) {
                    for (val in data) {
                        resultsBox.append(
                            '<div class="card book"><div class="card-header book__subject">'
                            + data[val].subject + '</div><div class="card-body">' +
                            '<div class="book__cover"><img class="center-block book__cover__image" src="'
                            + data[val].cover + '"></div><div class="book__title"><h5 class="card-title book--title">'
                            + data[val].title + '</h5></div><div class="book__info">'
                            + data[val].type + '</div><div class="book__author"><h6 class="card-title">'
                            + data[val].author + '</h6></div><div class="book__level">'
                            + data[val].levels[0].school+ ', ' + data[val].levels[0].class +  '</div><div' +
                            ' class="book__numbers">nr MEN: '
                            + data[val].men + ', isbn:' + data[val].isbn + '</div></div>' +
                            '<div class="card-footer book__footer"><a target="_blank" href="'
                            + data[val].url + ' " class="btn btn-primary book__footer__link">Do księgarni ' +
                            '<img class="book__footer__link__img" src="assets/book.svg" alt="shop online"></a></div></div>');
                    }
                } else {
                    alert.append('Nie mamy tego w naszej bazie. Spróbuj inne hasło').show('fast', 'swing');
                }
            },
            error: function (data) {
                console.log("error!" + data);
            }
        })
    }
}

$('#search').on('click', getBooks);
