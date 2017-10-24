function getBooks(e) {
    e.preventDefault();
    var alert = $('#alert');
    var item = $('#usersInput').val();
    alert.empty();

    if (item === '') {
        alert.append('Będzie łatwiej znaleźć, kiedy coś tu wpiszesz :)').show('fast', 'swing');
    } else {
        alert.hide('fast', 'swing');
        $.ajax({
            url: 'https://gwo.pl/booksApi/v1/search?query=' + item,
            dataType: 'json',
            type: 'GET',
            data: {},
            success: function (data) {
                console.log(data);
                var resultsBox = $('#results');
                resultsBox.empty();
                if (data.length > 0) {
                    for (val in data) {
                        resultsBox.append(
                            '<div class="card book"><div class="card-header book--subject">'
                            + data[val].subject +
                            '</div><div class="card-body"><img class="img-responsive center-block" src="'
                            + data[val].cover + '"><div class="book--info">' +
                            '<div class="book--info__title"><h3 class="card-title">'
                            + data[val].title + '</h3><h4 class="card-title book--info__author">'
                            + data[val].author + '</h4><div class="book--info__levels">'
                            + data[val].levels[0].school + '</div></div></div>');
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

