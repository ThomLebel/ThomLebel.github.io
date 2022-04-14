var adDiv;
var timelineCollapse = new TimelineLite();
var timelineExpand = new TimelineLite();
var once = false;


function initEB() {
    if (!EB.isInitialized()) {
        EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);
    } else {
        startAd();
    }
}

function startAd() {
    adDiv = document.getElementById("ad");

    addEventListeners();
    anim();
}


function addEventListeners() {
    adDiv.addEventListener("mouseenter", expand);
    adDiv.addEventListener("mouseleave", collapse);
    adDiv.addEventListener("click", clickthrough);
}

function expand() {
    EB.expand();
    adDiv.classList.remove("collapsed");
    adDiv.classList.add("expanded");
    if(!once){
        once = true;
        animExpand();
    }else timelineExpand.restart();
}

function collapse() {
    adDiv.classList.remove("expanded");
    adDiv.classList.add("collapsed");
    EB.collapse();
    timelineCollapse.restart();
}

function clickthrough() {
    EB.clickthrough();
}


function anim(){
    //Animation Collapse
    timelineCollapse.set(skew_right, {left:"78%"});
    timelineCollapse.set(skew_left, {left:"-90%"});

    timelineCollapse.fromTo(txt1, 0.5, {opacity:0, left:"-100%"}, {ease:Power2.easeOut, left:"0%", opacity:1});
    timelineCollapse.fromTo(txt2, 0.5, {opacity:0, left:"100%"}, {ease:Power2.easeOut, left:"0%", opacity:1}, "-=0.5");
    timelineCollapse.fromTo(txt3, 0.5, {opacity:0, left:"-100%"}, {ease:Power2.easeOut, left:"0%", opacity:1}, "-=0.5");

    timelineCollapse.fromTo(skew_right_top, 2, {  left:"100%" }, { ease: Power2.easeOut, left:"-110%" },"+=2");
    timelineCollapse.fromTo(skew_left_top, 2, {  left:"-110%" }, { ease: Power2.easeOut, left:"100%" },"-=1.9");

    timelineCollapse.to([txt1, txt2, txt3], 0.1, {opacity:0}, "-=1.6");
    timelineCollapse.to(skew_left, 0.1, {left:"100%"}, "-=1.6");
    timelineCollapse.to(skew_right, 0.1, {left:"-110%"}, "-=1.6");
    timelineCollapse.from(voitures, 0.1, {ease: Power2.easeOut, opacity:0, left:"-25px"}, "-=1.6");

    timelineCollapse.to(skew_right, 1, {ease: Power2.easeOut, left:"-90%"}, "+-0.5");
    timelineCollapse.to(skew_left, 1, {ease: Power2.easeOut, left:"78%"}, "-=1");

    timelineCollapse.from(txt4, 1, { ease: Power2.easeOut, opacity:"0" });
    timelineCollapse.from(txt5, 1, { ease: Power2.easeOut, opacity:"0" });
    // timelineCollapse.from(cta, 1, { ease: Power2.easeOut, opacity:"0" });
}

function animExpand(){
    timelineExpand.set([bg, cadre_expand], {css:{width:"66.5%"}});
    timelineExpand.set(mask_expand, {css:{width:"calc(66.5% - 10px)"}});
    timelineExpand.set(cta_expand, {left:"51%"});
    timelineExpand.set(skew_right_expand, {left:"-59%"});
    timelineExpand.set(skew_left_expand, {left:"78%"});
    timelineExpand.set(sol1, {right:"-5px"});

    timelineExpand.from(car1, 1, {ease:Power2.easeOut, opacity:0});
    timelineExpand.from(props1_1, 1, {ease:Power2.easeOut, right:"100%"}, "-=0.8");
    timelineExpand.from(props1_2, 1, {ease:Power2.easeOut, right:"-100%"}, "-=1");
    timelineExpand.from(txt_1, 1, {ease:Power2.easeOut, opacity:0}, "-=0.5");

    timelineExpand.to([props1_1, props1_2, txt_1, car1, sol1], 0.5, {opacity:0}, "+=1.5");
    timelineExpand.from(sol2, 1, {ease:Power2.easeOut, opacity:0});
    timelineExpand.to([bg, cadre_expand], 1, {ease:Power2.easeOut, css:{width:"72%"}}, "-=1");
    timelineExpand.to(mask_expand, 1, {ease:Power2.easeOut, css:{width:"calc(72% - 10px)"}}, "-=1");
    timelineExpand.to(cta_expand, 1, {ease:Power2.easeOut, left:"48%"}, "-=1");
    timelineExpand.to(skew_right_expand, 1, {ease:Power2.easeOut, left:"-51%"}, "-=1");
    timelineExpand.to(skew_left_expand, 1, {ease:Power2.easeOut, left:"76%"}, "-=1");
    timelineExpand.from(car2, 1, {ease:Power2.easeOut, opacity:0}, "-=1");
    timelineExpand.from(props2_1, 1, {ease:Power2.easeOut, right:"100%"}, "-=0.8");
    timelineExpand.from(props2_2, 1, {ease:Power2.easeOut, right:"-100%"}, "-=1");
    timelineExpand.from(txt_2, 1, {ease:Power2.easeOut, opacity:0}, "-=0.5");

    timelineExpand.to([props2_1, props2_2, txt_2, car2, sol2], 0.5, {opacity:0}, "+=1.5");
    timelineExpand.from(sol3, 1, {ease:Power2.easeOut, opacity:0});
    timelineExpand.to([bg, cadre_expand], 1, {ease:Power2.easeOut, css:{width:"85%"}}, "-=1");
    timelineExpand.to(mask_expand, 1, {ease:Power2.easeOut, css:{width:"calc(85% - 10px)"}}, "-=1");
    timelineExpand.to(cta_expand, 1, {ease:Power2.easeOut, left:"42%"}, "-=1");
    timelineExpand.to(skew_right_expand, 1, {ease:Power2.easeOut, left:"-45%"}, "-=1");
    timelineExpand.to(skew_left_expand, 1, {ease:Power2.easeOut, left:"80%"}, "-=1");
    timelineExpand.from(car3, 1, {ease:Power2.easeOut, opacity:0}, "-=1");
    timelineExpand.from(props3_1, 1, {ease:Power2.easeOut, right:"100%"}, "-=0.8");
    timelineExpand.from(props3_2, 1, {ease:Power2.easeOut, right:"-100%"}, "-=1");
    timelineExpand.from(txt_3, 1, {ease:Power2.easeOut, opacity:0}, "-=0.5");

    timelineExpand.to([props3_1, props3_2, txt_3, car3, sol3], 0.5, {opacity:0}, "+=1.5");
    timelineExpand.from(sol4, 1, {ease:Power2.easeOut, opacity:0});
    timelineExpand.to([bg, cadre_expand], 1, {ease:Power2.easeOut, css:{width:"90%"}}, "-=1");
    timelineExpand.to(mask_expand, 1, {ease:Power2.easeOut, css:{width:"calc(90% - 10px)"}}, "-=1");
    timelineExpand.to(cta_expand, 1, {ease:Power2.easeOut, left:"39.5%"}, "-=1");
    timelineExpand.to(skew_right_expand, 1, {ease:Power2.easeOut, left:"-39%"}, "-=1");
    timelineExpand.to(skew_left_expand, 1, {ease:Power2.easeOut, left:"79%"}, "-=1");
    timelineExpand.from(car4, 1, {ease:Power2.easeOut, opacity:0}, "-=1");
    timelineExpand.from(props4_1, 1, {ease:Power2.easeOut, right:"100%"}, "-=0.8");
    timelineExpand.from(props4_2, 1, {ease:Power2.easeOut, right:"-100%"}, "-=1");
    timelineExpand.from(txt_4, 1, {ease:Power2.easeOut, opacity:0}, "-=0.5");

    timelineExpand.to([props4_1, props4_2, txt_4, car4, sol4], 0.5, {opacity:0}, "+=1.5");
    timelineExpand.from(sol5, 1, {ease:Power2.easeOut, opacity:0});
    timelineExpand.to([bg, cadre_expand], 1, {ease:Power2.easeOut, css:{width:"97%"}}, "-=1");
    timelineExpand.to(mask_expand, 1, {ease:Power2.easeOut, css:{width:"calc(97% - 10px)"}}, "-=1");
    timelineExpand.to(cta_expand, 1, {ease:Power2.easeOut, left:"36%"}, "-=1");
    timelineExpand.to(skew_right_expand, 1, {ease:Power2.easeOut, left:"-29%"}, "-=1");
    timelineExpand.to(skew_left_expand, 1, {ease:Power2.easeOut, left:"81%"}, "-=1");
    timelineExpand.from(car5, 1, {ease:Power2.easeOut, opacity:0}, "-=1");
    timelineExpand.from(props5_1, 1, {ease:Power2.easeOut, right:"100%"}, "-=0.8");
    timelineExpand.from(props5_2, 1, {ease:Power2.easeOut, right:"-100%"}, "-=1");
    timelineExpand.from(txt_5, 1, {ease:Power2.easeOut, opacity:0}, "-=0.5");

    timelineExpand.to([props5_1, props5_2, txt_5, car5, sol5], 0.5, {opacity:0}, "+=1.5");
    timelineExpand.from(sol6, 1, {ease:Power2.easeOut, opacity:0});
    timelineExpand.to([bg, cadre_expand], 1, {ease:Power2.easeOut, css:{width:"100%"}}, "-=1");
    timelineExpand.to(mask_expand, 1, {ease:Power2.easeOut, css:{width:"calc(100% - 10px)"}}, "-=1");
    timelineExpand.to(cta_expand, 1, {ease:Power2.easeOut, left:"34.5%"}, "-=1");
    timelineExpand.to(skew_right_expand, 1, {ease:Power2.easeOut, left:"-33%"}, "-=1");
    timelineExpand.to(skew_left_expand, 1, {ease:Power2.easeOut, left:"76%"}, "-=1");
    timelineExpand.from(car6, 1, {ease:Power2.easeOut, opacity:0}, "-=1");
    timelineExpand.from(props6_1, 1, {ease:Power2.easeOut, right:"100%"}, "-=0.8");
    timelineExpand.from(props6_2, 1, {ease:Power2.easeOut, right:"-100%"}, "-=1");
    timelineExpand.from(txt_6, 1, {ease:Power2.easeOut, opacity:0}, "-=0.5");
}




window.addEventListener("load", initEB);
