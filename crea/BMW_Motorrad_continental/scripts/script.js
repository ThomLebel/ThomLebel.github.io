var adDiv;
var tl = new TimelineLite();
var tlCloud = new TimelineLite();

var cloudMax;
var cloudList;
var _cloud;

var once = false;


function startAd() {
    adDiv = document.getElementById("ad");
    _cloud = document.getElementById("cloud_container");
    cloudMax = 10;
    cloudList = {};

    addEventListeners();
    create_img(cloudMax, _cloud, cloudList, "cloud", 0, 60);
    anim();
}

function addEventListeners() {
    // adDiv.addEventListener("click", clickthrough);
    // adDiv.addEventListener("mouseenter", overAd);
    // adDiv.addEventListener("mouseleave", outAd);
}

function create_img(max, div, list, img, minRand, maxRand){
    for(var i=0; i<max; i++){
        randX = (Math.floor(Math.random()*(maxRand - minRand)) + minRand) * -1;
        randY = (Math.floor(Math.random()*(maxRand - minRand)) + minRand) *1;
        list[i] = img_create("./images/"+img+".png");
        list[i].style.position = "absolute";
        list[i].style.top = randY+"%";
        list[i].style.left = "-40%";
        div.appendChild(list[i]);
    }
}

function img_create(src) {
    var img = document.createElement('img');
    img.src = src;
    return img;
}

function anim(){
    tl.set(path, {opacity:0});
    tl.to(banner, 0.2, {opacity:1});

    tlCloud.to(cloudy, 5, {ease:Power2.easeOut,  left:"100%"});
    // tlCloud.to(cloudList[0], 10, {ease:Power2.easeIn,  left:"100%"}, "-=0.5");
    for(var i=0; i<cloudMax; i++){
        var randScale = (Math.random() * (1 - 0.5)) + 0.5;
        var randTiming = (Math.random() * (10 - 6)) + 6;
        var randDelay = (Math.random() * (10 - 0)) + 0;
        tlCloud.to(cloudList[i], 0.1, {scale:randScale}, "-="+randDelay);
        tlCloud.to(cloudList[i], randTiming, {ease:Power2.easeIn, left:"100%"}, "-="+randDelay);
    }
    setTimeout(function(){
        console.log("pause");
        tlCloud.pause();
    }, 30000);
    
    tl.fromTo(moto_container, 2, {left:"-140%"}, {ease:Power2.easeOut, left:"-310%"});
    tl.to(path, 0.1, {opacity:1});
    tl.from(txt1, 1, {ease:Power2.easeOut, left:"-100%"});
    tl.from(txt2, 1, {ease:Power2.easeOut, left:"-100%"}, "-=0.7");

    tl.to(moto_container, 3, {ease:Power2.easeInOut, left:"-273%"}, "+=1");
    tl.to(txt1, 1, {ease:Power2.easeIn, left:"100%"}, "-=2.5");
    tl.to(txt2, 1, {ease:Power2.easeIn, left:"100%"}, "-=2.3");
    tl.from(mention, 0.5, {opacity:0}, "-=1");
    tl.from(txt3, 1, {ease:Power2.easeOut, left:"-100%"}, "-=1");
    tl.from(txt4, 1, {opacity:0}, "-=0.5");
    tl.from(txt5, 1, {ease:Power2.easeOut, left:"-5%", opacity:0}, "-=1");

    tl.to(moto_container, 3, {ease:Power2.easeInOut, left:"-180%"}, "+=1");
    tl.to(txt5, 1, {ease:Power2.easeIn, left:"10%", opacity:0}, "-=3");
    tl.from(txt6, 1, {ease:Power2.easeOut, left:"-5%", opacity:0}, "-=1");

    tl.to(moto_container, 3, {ease:Power2.easeInOut, left:"-83%"}, "+=1");
    tl.to(txt6, 1, {ease:Power2.easeIn, left:"10%", opacity:0}, "-=3");
    tl.from(txt7, 1, {ease:Power2.easeOut, left:"-5%", opacity:0}, "-=1");

    tl.to(moto_container, 3, {ease:Power2.easeInOut, left:"47%"}, "+=1");
    tl.to(txt7, 1, {ease:Power2.easeIn, left:"10%", opacity:0}, "-=3");
    // tl.to(txt4, 1, {opacity:0}, "-=3");
    tl.to([txt3, txt4], 1, {ease:Power2.easeIn, left:"100%"}, "-=1");
    tl.from(txt8, 1, {ease:Power2.easeOut, left:"-100%"}, "-=0.7");
    tl.from(cta, 1, {ease:Power2.easeOut, left:"-100%"}, "-=0.9");
    tl.to(path, 0.1, {opacity:0}, "-=1");
    tl.to(moto_container, 3, {ease:Power2.easeInOut, left:"-290%"});
}

window.onload = startAd;
