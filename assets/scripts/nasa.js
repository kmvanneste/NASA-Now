// NASA API KEY
var nasakey = "fdlQhb62Szn7dtpYyag7qcPGVprhsOxQDYoXgeQ9"

/* Old function to grab from NASA's
video and image database based upon
given search term */
//NO LONGER IN USE
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

/* Function to call the nasa APOD api
   (and grab most recent) */
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

/* Function to call the nasa APOD api 
   for a given date */
function getAPODbyDate(date) {
    var queryURL = "https://api.nasa.gov/planetary/apod?date=" + date + "&api_key=" + nasakey;
    // Grab today's date and turn it to an int
    let today = parseInt(moment().format("YYYYMMDD"));
    // turn the input date into a int for comparison
    let inputDate = parseInt(date.split("-").reduce((a, b) => a+b))
    // ONLY PERFORM THE AJAX CALL if 
    // the given date is between today's date and June 20, 1995
    if (inputDate <= today && inputDate >= 19950620){
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(response => {
            pushAPOD(response);
        });
    }
}


/* Function to push the relevant parts of the APOD
   into the page elements */
function pushAPOD(response) {
    // Save the url and the destination div
    let apodURL = response.hdurl;
    let apodDiv = $("#apod");
    // Empty destination
    apodDiv.empty();
    // Add media Title 
    apodHeader = $("<h5>").text(response.title);
    apodDiv.append(apodHeader);
    //CHECK IF THE MEDIA IS A VIDEO OR AN IMAGE
    if (response.media_type === "video") {
        //Make an iframe if video
        let videoDiv = $("<div>").addClass("embed-responsive embed-responsive-16by9");
        let apodVideo = $("<iframe>");
        apodVideo.attr("src", response.url);
        apodVideo.addClass("embed-responsive-item");
        videoDiv.append(apodVideo);
        apodDiv.append(videoDiv);
    } else if (response.media_type === "image") {
        //make an img if image
        let apodImg = $("<img>").attr("src", apodURL);
        apodImg.addClass("w-100");
        apodDiv.append(apodImg);
    }
    // Add the description for the APOD
    let textp = $("<p>").text(response.explanation);
    apodDiv.append($("<br>"), textp);
}

//Function to preform the ajax call for the Mars Rover API
function getMars() {
    let queryURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity//latest_photos?api_key=" + nasakey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        pushMars(response);
    });
}
//Function to preform the ajax call for the Mars Rover API
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
    carouselContainer.children().first().addClass("active");
}

// Function to grab most recent images from
// the Earth Polychromatic Imaging Camera
function getEPIC() {
    let queryURL = "https://api.nasa.gov/EPIC/api/natural/images?api_key=" + nasakey
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => { 
        getEPICimgs(response)
    })
}

/* Grabs a single image from the
   Earth Polychromatic Imaging Camera
   and appends it to the page */
function getEPICimg(response) {
    // Grabs the most recent (last) element from the array returned
    let maxIndex = response.length - 1;
    // Turns the given date from the element into something useable
    let date = response[maxIndex].date;
    let parsedDate = date.split(" ")[0].split("-")
    let [year, month, day] = parsedDate;
    // Grabs the image id from the element
    let imgID = response[maxIndex].image;
    // Create the new image url from the given data
    imgURL = "https://api.nasa.gov/EPIC/archive/natural/" + year + "/" + month + "/" + day + "/png/" + imgID + ".png?api_key=" + nasakey;
    //Adds the image to the page
    let epicImg = $("<img>").attr("src", imgURL);
    epicImg.addClass("d-block mx-auto w-100")
    $("#epic").append(epicImg);
}

/* Grabs a list of recent images from the
   Earth Polychromatic Imaging Camera
   and appends it to the page inside of a carousel */
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

// Function to get links from a NASA api search response
// NO LONGER USED
function getNASALinks(list) {
    let arr = [];
    list.forEach(element => {
        arr.push(element.links[0].href);
    });
    return arr
}


/* Function to grab time of last known
   Coronal Mass Ejection from DONKI */
function getCMEfromDONKI() {
    let queryURL = "https://api.nasa.gov/DONKI/CME?api_key=" + nasakey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        $("#cme-date").text(response[response.length - 1].startTime);
    })
}

/* Function to grab time of last known
   Solar Flare from DONKI */
function getFLRfromDONKI() {
    let queryURL = "https://api.nasa.gov/DONKI/FLR?startDate=2020-01-01&api_key=" + nasakey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        // console.log(response)
        $("#flr-date").text(response[response.length - 1].beginTime);
    })
}


// Function to get DONKI notifcations from the last 30 days
// NO LONGER USED
function getDONKI() {
    let queryURL = "https://api.nasa.gov/DONKI/notifications?&type=all&api_key=" + nasakey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        pushDONKI(response);
    })
}

// Function to push DONKI notifications to the page
// NO LONGER USED
function pushDONKI(response) {
    response.forEach(element => {
        let donkiHeader = $("<h6>").text(element.messageType + ": " + response.messageIssueTime);
        let donkiMessage = $("<p>").html(element.messageBody);
        console.log(element.messageBody);
        $("#donki-dump").append(donkiHeader, donkiMessage);
    })
}

function getNASAsearch(searchTerm){
    if(searchTerm != null){
        let queryURL = "https://images-api.nasa.gov/search?media_type=image&q=" + searchTerm;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(response => {
            console.log(response);
            pushNASAsearch(response);
        });

    }
}



// On document load, grab the content from the APIs
$(document).ready(x => {
    let todayStr = moment().format("YYYY-MM-DD");
    // getAPOD();
    getAPODbyDate(todayStr);
    getEPIC();
    getMars();
    getCMEfromDONKI();
    getFLRfromDONKI();
});

$("#apod-btn").on("click", function(){
    getAPODbyDate($("#apod-date").val());
});

$("#search-button").on("click", function(){
    getNASAsearch($("#search-input").val().trim());
})