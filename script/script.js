function getBooks(e) {
    e.preventDefault();
    var item = $('#usersInput').val();
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
                        '<div class="card"><div class="card-header">'
                        + data[val].subject +
                        '</div><div class="card-body"><img class="img-responsive center-block" src="'
                        + data[val].cover + '">'
                        + data[val].title + '---' + data[val].levels[0].school + '</div></div>');
                }
            } else {
                resultsBox.append('<p>nie znaleziono tego hasła</p>');
            }
        },
        error: function (data) {

            console.log("error!");
            console.log(data);
        }
    });
}

$('#search').on('click', getBooks);

