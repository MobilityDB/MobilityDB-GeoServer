
var timerStart = Date.now();
var timerStop;
var timerDelta;
var coords;
var newCoords;
var geoJsonData;
var myMovingMarker;
var line;
var markerList = [];
var maxInstant = 0;
var max = 0;
var iter = 0;
var fpsMean = 0;


var map = L.map("map").setView([50.82,4.36],13);



var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    maxZoom: 19,
    attribution :
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

osm.addTo(map);

var geoJsonURL = "http://localhost:8080/geoserver/EU/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=EU%3Abenchmark&maxFeatures=500&outputFormat=application%2Fjson"

function loadGeoJson(data) {
    geoJsonData = data;
};

$.ajax({
    url: geoJsonURL,
    dataType : 'json',
    async: false,
    success: loadGeoJson
});

var myicon = L.icon({
    iconUrl: '../img/reddot-small.svg.png',
    iconSize: [150, 150]
});

geoJsonData.features.forEach((feature) => {
    if(max < feature.geometry.coordinates[0].length) {
        max = feature.geometry.coordinates[0].length;
    }
})

geoJsonData.features.forEach((feature) => {
    coords = feature.geometry.coordinates[0];

    newCoords = [];
    coords.forEach((coord) => {
        newCoords.push([coord[1],coord[0]])
    })
    line = L.polyline(newCoords).addTo(map);
    myMovingMarker = L.Marker.movingMarker(line.getLatLngs(),20000,{icon : myicon}).addTo(map);
    markerList.push(myMovingMarker)
})





timerStop = Date.now();
timerDelta = timerStop - timerStart;

console.info("Start at " + timerStart);
console.info("Stopped at " + timerStop);
console.info("Loading time = " + timerDelta);



map.on('click' , function () {

    //UNCOMMENT THIS BLOCK  TO  ENABLE THE FPS COUNTER

    /*
    fpsMean = 0;
    iter = 0;
    var rAF = function () {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 144);
            }
        );
    }();

    var frame = 0;
    var allFrameCount = 0;
    var lastTime = Date.now();
    var lastFameTime = Date.now();

    var loop = function () {
        var now = Date.now();
        var fs = (now - lastFameTime);
        var fps = Math.round(1000 / fs);

        lastFameTime = now;
        //Do not set to 0, record the difference of this value at the beginning and end of the animation to calculate FPS
        allFrameCount++;
        frame++;
        var instants = 0;
        if(frame%50 === 0) {
            markerList.forEach((mark) => {
                if (!mark.isEnded()) {
                    instants++;
                }
            })
        }

        if (now > 1000 + lastTime) {
            var fps = Math.round((frame * 1000) / (now - lastTime));
            fpsMean = fpsMean + fps;
            iter++;
            frame = 0;
            lastTime = now;
        };

        var isEnded = true;
        markerList.forEach((mark) => {
            if(mark.isRunning()) {
                isEnded = false
            }
        })
        if(!isEnded){

            console.log('${new date()} 1s, FPS:', fps);
            console.log('FPS means : ', fpsMean/iter);

        }



        rAF(loop);


    }

    loop();

     */

    markerList.forEach((mark) => {
        mark.start()
    })
})