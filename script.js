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

function getNASALinks(list) {
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

function getAPOD() {
    var queryURL = "https://api.nasa.gov/planetary/apod?api_key=" + nasakey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        pushAPOD(response);
    });
}

function pushAPOD(response) {
    // console.log(response);
    backgroundURL = response.hdurl;
    let apodImg = $("<img>").attr("src", backgroundURL);
    apodImg.css("max-width", "100%")
    let textp = $("<p>").text(response.explanation)
    // textp.css("background-color", )
    $("#apod").append(apodImg, textp);
    // $("body").css("background-image", "url(" + backgroundURL + ")");
}

function getMars() {
    let queryURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity//latest_photos?api_key=" + nasakey
    // + +"&api_key=" + nasakey
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        console.log(response);
        // postMars(response);
    })
}

function getEPIC() {
    let queryURL = "https://api.nasa.gov/EPIC/api/enhanced/images?api_key=" + nasakey
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        // console.log(response);
        // postEPIC(response);
    })
}

$(document).ready(x => {
    getAPOD();
    getEPIC();
    getMars();
});

// nasaCall("Apollo 11");