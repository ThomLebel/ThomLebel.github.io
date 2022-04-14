var adDiv;
var tl = new TimelineLite({repeat:2});
var randX;
var randY;

var rainMax;
var rainList;
var _rain;

var starMax;
var starList;
var _star;

var once = false;
// var randScale;



function startAd() {
    adDiv = document.getElementById("ad");
    _rain = document.getElementById("rain");
    _star = document.getElementById("star");
    rainMax = 100;
    rainList = {};
    starMax = 3;
    starList = {};
    randX = 0;
    randY = 0;

    addEventListeners();
    create_img(rainMax, _rain, rainList, "rain", 25, 80);
    create_img(starMax, _star, starList, "star", 60, 80);
    anim();
}

function addEventListeners() {
    // adDiv.addEventListener("click", clickthrough);
    adDiv.addEventListener("mouseenter", overAd);
    adDiv.addEventListener("mouseleave", outAd);
    // document.getElementById("user-action-button").addEventListener("click", userActionCounter);
}



function create_img(max, div, list, img, minRand, maxRand){
    for(var i=0; i<max; i++){
        randX = (Math.floor(Math.random()*(maxRand - minRand)) + minRand) * -1;
        randY = (Math.floor(Math.random()*(maxRand - minRand)) + minRand) *1;
        list[i] = img_create("./images/"+img+".png");
        list[i].style.position = "absolute";
        list[i].style.top = randY+"%";
        list[i].style.left = randX+"%";
        div.appendChild(list[i]);
    }
}

function img_create(src) {
    var img = document.createElement('img');
    img.src = src;
    return img;
}

function anim(){
    tl.set(banner, {opacity:1});
    tl.from([car, txt1, txt0], 1, {opacity:0});
    tl.fromTo(halo, 2, {top:"0%", opacity:0}, {ease:Power2.easeOut, top:"-50%", opacity:1}, "-=1");
    // tl.from(txt0, 1, {ease:Power2.easeOut, scale:0, opacity:0}, "-=0.5");

    tl.to([halo, txt0, car, txt1], 0.5, {opacity:0}, "+=0.5");
    tl.from([bg2, car2, txt2], 0.5, {opacity:0}, "-=0.5");

    tl.to(rainList[0], 0.1, {rotation:"90"}, "-=0.5");
    tl.to(rainList[0], 1, {ease:Power2.easeIn,  left:"100%"}, "-=0.6");
    for(var i=1; i<rainMax; i++){
        var randScale = (Math.random() * (2 - 0.5)) + 0.5;
        var randTiming = (Math.random() * (2 - 1)) + 1;
        var randDelay = (Math.random() * (2 - 1)) + 1;
        tl.to(rainList[i], 0.1, {scale:randScale, rotation:"90"}, "-=1.8");
        tl.to(rainList[i], randTiming, {ease:Power2.easeIn, left:"100%"}, "-=1.8");
    }

    tl.to([rain_container, car2, txt2], 0.5, {opacity:0}, "+=0.5");
    tl.from([bg3, txt3], 0.5, {opacity:0}, "-=0.5");
    tl.to(car, 0.5, {opacity:1}, "-=0.5");

    tl.to(starList[0], 1.5, {ease:Power2.easeIn,  left:"100%"}, "-=0.5");
    for(var i=1; i<starMax; i++){
        var randScale = (Math.random() * (1 - 0.5)) + 0.5;
        var randTiming = (Math.random() * (2 - 1)) + 1;
        var randDelay = (Math.random() * (2 - 0.5)) + 0.5;
        tl.to(starList[i], 0.1, {scale:randScale}, "-="+randDelay);
        tl.to(starList[i], randTiming, {ease:Power2.easeIn, left:"100%"}, "-="+randDelay);
    }

    tl.to([star_container, txt3, bg3], 0.5, {opacity:0}, "+=0.5");
    tl.from(logo, 0.5, {opacity:0}, "-=0.5");
    tl.to(car, 0.5, {ease:Power2.easeIn, left:"-100%"}, "-=0.5");
    tl.from([txt4, cta], 0.5, {ease:Power2.easeOut, left:"100%"}, "-=0.25");

    tl.from(bg4, 1, {opacity:0}, "+=2");

    tl.to(bg4, 0.1, {opacity:1, onComplete:function(){
        if(!once){
            once = true;
            tl.restart();
        }
    }}, "+=2");
}

function overAd(){
    TweenMax.to(cta2, 0.5, {opacity:1});
}

function outAd(){
    TweenMax.to(cta2, 0.5, {opacity:0});
}

window.onload = startAd;
