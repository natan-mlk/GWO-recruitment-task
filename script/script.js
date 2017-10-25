$(window).on('scroll', function () {

    var headerHeight = $('.header').outerHeight();
    var scrollTop = $(window).scrollTop();
    if (scrollTop > (headerHeight)) {
        $('.search-block--parag').hide('fast', 'swing')
    }
    if (scrollTop < (headerHeight)) {
        $('.search-block--parag').show('fast', 'swing')
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
        $('.decoration-block').toggleClass('decoration-block__bg');
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
                            '<div class="card book"><div class="card-header book--subject">'
                            + data[val].subject +
                            '</div><div class="card-body">' +
                            '<div class="book--cover"><img class=" center-block book--cover--image" src="'
                            + data[val].cover + '"></div><div class="book--title"><h5 class="card-title book--title">'
                            + data[val].title + '</h5></div><div class="book--info">'
                            + data[val].type + '</div><div class="book--author"><h6 class="card-title">'
                            + data[val].author + '</h6></div><div class="book--level">'
                            + data[val].levels[0].school+ ', ' + data[val].levels[0].class +  '</div><div class="book--numbers">nr MEN: '
                            + data[val].men + ', isbn:' + data[val].isbn + '</div></div>' +
                            '<div class="card-footer book__footer"><a target="_blank" href="'
                            + data[val].url + ' " class="btn btn-primary book--link">Do księgarni ' +
                            '<img class="book--link--img" src="assets/book.svg" alt="shop online"></a></div></div>');
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
