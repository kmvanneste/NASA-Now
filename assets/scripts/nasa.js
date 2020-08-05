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
    apodURL = response.hdurl;
    apodDiv = $("#apod");
    apodHeader = $("<h5>").text(response.title);
    apodDiv.append(apodHeader);
    if (response.media_type === "video") {
        let videoDiv = $("<div>").addClass("embed-responsive embed-responsive-16by9");
        let apodVideo = $("<iframe>");
        apodVideo.attr("src", response.url);
        apodVideo.addClass("embed-responsive-item");
        videoDiv.append(apodVideo);
        apodDiv.append(videoDiv);
    } else if (response.media_type === "image") {
        let apodImg = $("<img>").attr("src", apodURL);
        apodImg.addClass("w-100");
        apodDiv.append(apodImg);
        // apodImg.css("max-width", "100%")
    }
    let textp = $("<p>").text(response.explanation);
    apodDiv.append($("<br>"), textp);
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
    response.latest_photos.forEach(item => {
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
    let queryURL = "https://api.nasa.gov/EPIC/api/natural/images?api_key=" + nasakey
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        // console.log(response);
        // pushEPIC(response);
        getEPICimg(response)
    })
}


function getEPICimg(response) {
    let maxIndex = response.length - 1;
    // console.log(response.length);
    let date = response[maxIndex].date;
    let parsedDate = date.split(" ")[0].split("-")
    let imgID = response[maxIndex].image;
    // console.log(parsedDate, imgID);

    let [year, month, day] = parsedDate;

    // console.log(year + "\n+++\n" + month + "\n+++\n" + day);

    imgURL = "https://api.nasa.gov/EPIC/archive/natural/" + year + "/" + month + "/" + day + "/png/" + imgID + ".png?api_key=" + nasakey;

    let epicImg = $("<img>").attr("src", imgURL);
    epicImg.addClass("d-block mx-auto w-100")

    $("#epic").append(epicImg);
}

/* A function to create and return a carousel element
from a provided list of links and a id name */
function createCarousel(list, divID) {

    // Create the containing carousel div and add classes and attrs
    let carouselContainer = $("<div>");
    carouselContainer.addClass("carousel slide");
    carouselContainer.attr({
        id: divID,
        "data-ride": "carousel"
    });

    // Creates the inner part of the carousel
    // containing the images from the list of links provided
    let carouselInner = $("<div>").addClass("carousel-inner");
    list.forEach(element => {
        //makes the item div
        let carouselItem = $("<div>");
        carouselItem.addClass("carousel-item");
        //creates the image amd adds classes
        let carouselImage = $("<img>");
        carouselImage.attr("src", element)
        carouselImage.addClass("d-block carousel-image mx-auto");
        //appends the created elements to the inner
        carouselImage.appendTo(carouselItem);
        carouselItem.appendTo(carouselInner);

    });

    // Activates the first element in the carousel
    carouselInner.children().first().addClass("active");
    // Append the carousel interior to the containing div
    createCarousel.append(carouselInner);

    // Create the left controls for the carousel
    let leftA = $("<a>");
    leftA.addClass("carousel-control-prev")
    leftA.attr({
        href:"#mars-carousel",
        role:"button"
    }).attr("data-slide", "prev");

    // Create and append the symbol and text for the left controls
    let leftAsymbol = $("<span>").addClass("carousel-control-prev-icon");
    leftAsymbol.attr("aria-hidden", "true");
    let leftAtext = $("<span>").text("Prev").addClass("sr-only");
    leftA.append(leftAsymbol,leftAtext);

    // Create the right controls for the carousel
    let rightA = $("<a>");
    rightA.addClass("carousel-control-next")
    rightA.attr({
        href:"#mars-carousel",
        role:"button"
    }).attr("data-slide", "next");

    // Create and append the symbol and text for the right controls
    let rightAsymbol = $("<span>").addClass("carousel-control-next-icon");
    rightAsymbol.attr("aria-hidden", "true");
    let rightAtext = $("<span>").text("Next").addClass("sr-only");
    rightA.append(rightAsymbol,rightAtext);

    // Append the controls to the carousel
    createCarousel.append(leftA,rightA);

    // Return the created carousel to be used
    return createCarousel;
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