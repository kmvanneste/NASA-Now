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
        getEPICimgs(response)
    })
}

//Grabs a single image from the
//Earth Polychromatic Imaging Camera
//and appends it to the page
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

//Grabs a list of recent images from the
//Earth Polychromatic Imaging Camera
//and appends it to the page inside of a carousel
function getEPICimgs(response) {
    var epicList = [];
    // console.log(response);
    response.forEach(element => {
        let date = element.date;
        let parsedDate = date.split(" ")[0].split("-");
        let imgID = element.image;
        let [year, month, day] = parsedDate;
        let imgURL = "https://api.nasa.gov/EPIC/archive/natural/" + year + "/" + month + "/" + day + "/png/" + imgID + ".png?api_key=" + nasakey;
        // console.log(imgURL);

        epicList.push(imgURL);
    });
    createCarousel(epicList, "epic-photos");
}


/* A function to create and return a carousel element
from a provided list of links and a id name */
function createCarousel(list, divID) {


    // Creates the inner part of the carousel
    // containing the images from the list of links provided
    let carouselInner = $("#" + divID);
    list.forEach(element => {
        //makes the item div
        let carouselItem = $("<div>");
        carouselItem.addClass("carousel-item");
        //creates the image amd adds classes
        let carouselImage = $("<img>");
        carouselImage.attr("src", element)
        carouselImage.addClass("d-block carousel-image mx-auto w-100");
        //appends the created elements to the inner
        carouselImage.appendTo(carouselItem);
        carouselItem.appendTo(carouselInner);

    });

    // Activates the first element in the carousel
    carouselInner.children().first().addClass("active");
}

function getNASALinks(list) {
    let arr = [];
    list.forEach(element => {
        arr.push(element.links[0].href);
    });
    return arr
}

function getCMEfromDONKI() {
    let queryURL = "https://api.nasa.gov/DONKI/CME?api_key=" + nasakey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        $("#cme-date").text(response[response.length - 1].startTime);
    })
}

function getFLRfromDONKI() {
    let queryURL = "https://api.nasa.gov/DONKI/FLR?startDate=2020-01-01&api_key=" + nasakey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        console.log(response)
        $("#flr-date").text(response[response.length - 1].beginTime);
    })
}


function getDONKI() {
    let queryURL = "https://api.nasa.gov/DONKI/notifications?&type=all&api_key=" + nasakey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        pushDONKI(response);
    })
}

function pushDONKI(response) {
    response.forEach(element => {
        let donkiHeader = $("<h6>").text(element.messageType + ": " + response.messageIssueTime);
        let donkiMessage = $("<p>").html(element.messageBody);
        console.log(element.messageBody);
        $("#donki-dump").append(donkiHeader, donkiMessage);
    })
}

$(document).ready(x => {
    getAPOD();
    getEPIC();
    getMars();
    getCMEfromDONKI();
    getFLRfromDONKI();
});