var adDiv;
var closeMention;
var mentionDiv;

//Var slider
var sliderContainer;
var slider;
var output;
var prix;
var knob;
var mouseDown;
var min, max;
var minX, maxX;
var leftLimit;



function startAd() {
    adDiv = document.getElementById("ad");
    sliderContainer = document.getElementById("slider");
    slider = document.getElementById("myRange");
    output = document.getElementById("montant");
    prix = document.getElementById("prix");
    closeMention = document.getElementById("closeMention");
    mentionDiv = document.getElementById("mentionDiv");
    knob = document.getElementById("knob1");

    mouseDown = false;
    min = 1500;
    max = 75000;
    leftLimit = sliderContainer.offsetLeft + knob.offsetWidth/2;

    addEventListeners();
    anime();

    
}

function addEventListeners() {
    mentionDiv.addEventListener("mouseover", function(){
        timeline.pause();
        TweenMax.set(condition, {display:'block'});
        TweenMax.to(condition, 0.5, {opacity:1});
    });
    closeMention.addEventListener("click", function(e){
        e.stopPropagation();
        timeline.play();
        TweenMax.to(condition, 0.5, {opacity:0});
        TweenMax.set(condition, {display:'none'});
    });

    document.getElementById('knob1').addEventListener("click", function(e){e.stopPropagation();});
}

window.onload = startAd;

var timeline = new TimelineMax();
var tlReflet = new TimelineMax();
// var timeline = new TimelineMax({repeat:1, repeatDelay:3});
function anime() {
    updatePrice();

    timeline.to(ad, 0, {autoAlpha: 1});
    
    timeline.from(img1, 1, {opacity:0});

    timeline.to(txt1, 1, {opacity:0}, "+=1.5");
    // timeline.to(layer,2, { ease: Power3.easeInOut, scale:2, lazy:true, force3D:true}, "-=1");
    timeline.from(txt2, 1, {opacity:0}, "-=0.5");

    // timeline.to([txt2,layer,img1], 1, {opacity:0}, "+=1.5");
    // timeline.to(layer,2, { ease: Power3.easeInOut, scale:2, lazy:true, force3D:true}, "-=1");
    timeline.from([txt3,black,footer], 1, {opacity:0}, "+=1.5");
    timeline.from(mention, 1, {opacity:0});
    timeline.set(mentionDiv, {display:'block'});

    // timeline.from(mention2, 1, {opacity:0}, "+=2");
    // timeline.to(mentionDiv, 0, {top:"170px"});
    timeline.to([txt3, mention], 1, {opacity:0}, "+=2");
    timeline.from(mention2, 1, {opacity:0}, "-=0");
    timeline.to(mentionDiv, 0, {display:'block', top:"380px"});

    timeline.to(mention2, 1, {opacity:0}, "+=2");
    timeline.set(mentionDiv, {display:'none'});
    timeline.from([myRange, prix, cta], 1, {opacity:0, onComplete:animReflet});
    timeline.to(knob1, 2, {ease:Power2.easeInOut, left:"360px", onUpdate:updatePrice}, "-=1");
    timeline.to(knob1, 2, {ease:Power2.easeInOut, left:"0px", onUpdate:updatePrice, onComplete:activateManualControl});

    // GSDevTools.create();
}

function animReflet(){
    tlReflet.to(reflet, 1, { ease:Power3.easeINOut, left:"0%" });
    tlReflet.to(reflet, 0, { left:"-600%" });
    tlReflet.to(reflet, 1, { ease:Power3.easeINOut, left:"0%" }, "+=2");
    tlReflet.to(reflet, 0, { left:"-600%" });
    tlReflet.to(reflet, 1, { ease:Power3.easeINOut, left:"0%" }, "+=2");
    tlReflet.to(reflet, 0, { left:"-600%" });
}

function activeMouseMove(){
    mouseDown = true;
}

function inactiveMouseMove(){
    mouseDown = false;
}

function moveKnob(e){
    e.preventDefault();
    if(mouseDown){
        if(e.clientX < leftLimit || knob.offsetLeft < 0){
            knob.style.left = "0px";
        }
        else if(e.clientX > ((sliderContainer.offsetWidth - knob.offsetWidth/2) + sliderContainer.offsetLeft) || knob.offsetLeft > sliderContainer.offsetWidth){
            knob.style.left = (sliderContainer.offsetWidth - knob.offsetWidth)+"px";
        }
        else{
            knob.style.left = (e.clientX - (sliderContainer.offsetLeft + knob.offsetWidth/2))+"px"; 
        }
        updatePrice();
    }
}

function updatePrice(){
    prix.style.left = ((knob.offsetLeft + knob.offsetWidth/2) - prix.offsetWidth/2) +"px";
    var value = parseInt((knob.offsetLeft * ((max - min)/(sliderContainer.offsetWidth - knob.offsetWidth)) + min));
    var result = value.toLocaleString();

    output.innerHTML = result;
}

function activateManualControl(){
    document.getElementById('knob1').addEventListener("mousedown", activeMouseMove);
    adDiv.addEventListener("mouseup", inactiveMouseMove);

    adDiv.addEventListener("mousemove", moveKnob);
}