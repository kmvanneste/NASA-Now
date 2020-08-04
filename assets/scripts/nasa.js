var nasakey = "fdlQhb62Szn7dtpYyag7qcPGVprhsOxQDYoXgeQ9"

function nasaCall(searchTerm) {
    let queryURL = "https://images-api.nasa.gov/search?q=" + searchTerm + "&media_type=image"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // $("#nasa-dump").text(JSON.stringify(response));
        console.log(response);
        createCarousel(getNASALinks(response.collection.items.slice(0, 10)))
        // $(".carousel-image").each(function (index) {
        //     imgLink = response.collection.items[index]
        //     $(this).attr("src", response.collection.items[index].links[0].href);
        // })
    })
}

$(document).ready(x => {
    getAPOD();
    getEPIC();
    getMars();
});