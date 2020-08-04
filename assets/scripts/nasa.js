var nasakey = "fdlQhb62Szn7dtpYyag7qcPGVprhsOxQDYoXgeQ9"

function nasaCall(searchTerm) {
    let queryURL = "https://images-api.nasa.gov/search?q=" + searchTerm + "&media_type=image"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        createCarousel(getNASALinks(response.collection.items.slice(0, 10)))

    })
}

function getAPOD() {
    var queryURL = "https://api.nasa.gov/planetary/apod?api_key=" + nasakey;
   
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        pushAPOD(response);
        // console.log(response);
    });
}

function pushAPOD(response) {
    backgroundURL = response.hdurl;
    let apodImg = $("<img>").attr("src", backgroundURL);
    apodImg.css("max-width", "100%")
    let textp = $("<p>").text(response.explanation)
    $("#apod").append(apodImg, textp);
}

function getMars() {
    let queryURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity//latest_photos?api_key=" + nasakey
    // + +"&api_key=" + nasakey
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        // console.log(response);
        pushMars(response);
    })
}

function pushMars(response) {
    // let marsDiv = $("#mars-rover")
    let carouselContainer = $("#mars-photos");
    response.latest_photos.forEach(item=>{
        let currentImgSrc = item.img_src;
        let carouselImg = $("<img>").attr("src", currentImgSrc).addClass("d-block w-100");
        let carouselItem = $("<div>");
        carouselItem.addClass("carousel-item")
        carouselItem.appendTo(carouselContainer);
        carouselImg.appendTo(carouselItem);
    });
    // marsDiv.append(carouselContainer);
    carouselContainer.children().first().addClass("active");
}

function getEPIC() {
    let queryURL = "https://api.nasa.gov/EPIC/api/enhanced/images?api_key=" + nasakey
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        // console.log(response);
        // pushEPIC(response);
    })
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

function getNASALinks(list) {
    let arr = [];
    list.forEach(element => {
        arr.push(element.links[0].href);
    });
    return arr
}

$(document).ready(x => {
    getAPOD();
    getEPIC();
    getMars();
});