function nasaCall(searchTerm) {

    let key = "fdlQhb62Szn7dtpYyag7qcPGVprhsOxQDYoXgeQ9"

    let queryURL = "https://images-api.nasa.gov/search?q=" + searchTerm + "&media_type=image"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // $("#nasa-dump").text(JSON.stringify(response));
        console.log(response);
        createCarousel(getNASALinks(response.collection.items.slice(0,10)))
        // $(".carousel-image").each(function (index) {
        //     imgLink = response.collection.items[index]
        //     $(this).attr("src", response.collection.items[index].links[0].href);
        // })
    })
}

$("#search-button").on("click", function (event) {
    event.preventDefault();
    search = $("#search-input").val()
    nasaCall(search);
})

function getNASALinks(list){
    let arr = [];
    list.forEach(element => {
        arr.push(element.links[0].href);
    });
    return arr
}



function createCarousel(list) {
    let carouselContainer = $("#carousel-content");
    carouselContainer.empty();
    list.forEach(element => {
        console.log(element)
        let carouselItem = $("<div>");
        carouselItem.addClass("carousel-item");
        let carouselImage = $("<img>");
        carouselImage.attr("src", element)
        carouselImage.addClass("d-block carousel-image mx-auto");
        carouselImage.appendTo(carouselItem);
        carouselItem.appendTo(carouselContainer);
        
    });
    $("#carousel-content div:first").addClass("active");
}

$(document).ready(x => {

function getAPOD(){
    var key = "fdlQhb62Szn7dtpYyag7qcPGVprhsOxQDYoXgeQ9";
    var queryURL = "https://api.nasa.gov/planetary/apod?api_key=" + key;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        pushAPOD(response);
    });
}

        console.log(response);
        backgroundURL = response.hdurl;
        textp = $("<p>").text(response.explanation)
        textp.css("background-color", )
        $("main").append(textp)
        // let img = $("<img>");
        // img.attr("src", backgroundURL);
        // img.appendTo($("main"));
        $("body").css("background-image", "url(" + backgroundURL + ")");
    });
    
});


// nasaCall("Apollo 11");