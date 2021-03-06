let container, adBlock, currentNav, previousNav, iframeContainer, currentIframe, adId, contentRatio, resizeInterval;
let contents = [];
let nav = [];
let ads = [
    {name:"AirFrance_Classique", img:"thumb/thumb_AirFrance.jpg", client:"Air France", campagne:"Classique", agence:"BETC"},
    {name:"AirFrance_Ancillaries_Generique", img:"thumb/thumb_AF_Ancillaries.jpg", client:"Air France", campagne:"Ancillaries Générique", agence:"BETC"},
    {name:"AirFrance_Ancillaries_Sieges", img:"thumb/thumb_AF_Ancillaries_Sieges.jpg", client:"Air France", campagne:"Ancillaries Sièges", agence:"BETC"},
    {name:"AirFrance_Kids", img:"thumb/thumb_AirFrance_Kids.jpg", client:"Air France", campagne:"Kids", agence:"BETC"},
    {name:"BanqueFrancaiseMutualiste", img:"thumb/thumb_BFM_Pret.jpg", client:"BFM", campagne:"Prêt", agence:"JWT"},
    {name:"BMW_Motorrad_continental", img:"thumb/thumb_bmw.jpg", client:"BMW", campagne:"Motorrad continental", agence:"XPRIME"},
    {name:"Cafeyn", img:"thumb/thumb_Cafeyn_Caracteres.jpg", client:"Cafeyn", campagne:"Caractères", agence:"SIDLEE"},
    {name:"Dolby_ZeeAgency", img:"thumb/thumb_ZeeAgency_Dolby.jpg", client:"Dolby", campagne:"Atmos", agence:"ZEEAGENCY"},
    {name:"Ekwateur", img:"thumb/thumb_Ekwateur.jpg", client:"Ekwateur", campagne:"Ekwateur", agence:"EKWATEUR"},
    {name:"Joon", img:"thumb/thumb_Joon_Lancement.jpg", client:"Joon", campagne:"Lancement", agence:"BETC"},
    {name:"LaPoste_StarWars_Colissimo", img:"thumb/thumb_LaPoste_StarWars_Colissimo.jpg", client:"La Poste", campagne:"Star Wars Colissimo", agence:"BETC"},
    {name:"LaPoste_StarWars_MTEL", img:"thumb/thumb_LaPoste_StarWars_MTEL.jpg", client:"La Poste", campagne:"Star Wars MTEL", agence:"BETC"},
    {name:"LesNouveauxCavistes", img:"thumb/thumb_nouveaux_cavistes.jpg", client:"Les Nouveaux Cavistes", campagne:"JRE", agence:"PROXIMITY BBDO"},
    {name:"Mazda", img:"thumb/thumb_mazda.jpg", client:"Mazda", campagne:"MXRF", agence:"XPRIME"},
    {name:"Nissan_LEAF", img:"thumb/thumb_Nissan_LEAF.jpg", client:"Nissan", campagne:"LEAF", agence:"Digitas"},
    {name:"Peugeot_4JPP_Expand", img:"thumb/thumb_PGT_4JPP.jpg", client:"Peugeot", campagne:"4JPP", agence:"BETC"},
    {name:"Sosh_Appel_Offre", img:"thumb/thumb_Sosh_AppelOffre.jpg", client:"Sosh", campagne:"Wiko", agence:"ORANGE"},
];
let attribute = ["client", "campagne", "agence"];

function init(){
    container = document.getElementById("container");
    iframeContainer = document.getElementById("iframe_container");
    contentRatio = 300/250;
    contents = document.getElementsByClassName("content");
    nav = document.getElementsByClassName("icon-fill");
    currentNav = document.getElementById("home");

    listeners();

    emailjs.init("UtcxWp7-E1QbaYBZE");

    window.onresize = onResizeHandler;
    onResizeHandler();
}

function listeners(){
    iframeContainer.addEventListener("click", closeIframe);
    document.getElementById("close_btn").addEventListener("click", closeIframe);
    document.getElementById("cta_cv").onclick = function(){
        window.open('doc/CV_ThomasLebel.pdf', '_blank');
    };
    document.getElementById("intro").onclick = function(){
        document.getElementById("whiteScreen").style.display = "none";
        let navHome = document.getElementById("home");
        let navCrea = document.getElementById("crea");
        switchNav(navHome, navCrea);
        closeIntro();
    };

    ads.forEach((item, index) => {
        createAdBlock(index);
    });

    for(var i=0; i<contents.length; i++){
        contents[i].addEventListener("mouseenter", onEnter);
        contents[i].addEventListener("mouseleave", onLeave);
        contents[i].addEventListener("click", onClick);
    }

    for(var j=0; j<nav.length; j++){
        nav[j].addEventListener("mouseenter", onEnterNav);
        nav[j].addEventListener("mouseleave", onLeaveNav);
        nav[j].addEventListener("click", onClickNav);
    };
}

function onEnter(){
    adBlock = this;
    adBlock.querySelector("#background").classList.add("animatebkg");
    adBlock.querySelector("#info_container").classList.add("animate");
}
function onLeave(){
    adBlock = this;
    adBlock.querySelector("#background").classList.remove("animatebkg");
    adBlock.querySelector("#info_container").classList.remove("animate");
}
function onClick(){
    for(var i=0; i<contents.length; i++){
        if(this == contents[i]){
            adId = i;
        }
    }
    createIframe();
}

function createAdBlock(id){
    let li = document.createElement("li");
    li.setAttribute("id", ads[id].name);
    li.classList.add("content");

    let image = new Image();
    image.src = ads[id].img;
    image.classList.add("thumb");
    li.appendChild(image);

    let background = document.createElement("div");
    background.id = "background";
    background.classList.add("bkg_container");
    li.appendChild(background);

    let info = document.createElement("div");
    info.id = "info_container";
    info.classList.add("info_container");
    info.classList.add("noselect");
    attribute.forEach(element => {
        info.appendChild(createTextDescription(id, element));
    });
    let cta = document.createElement("div");
    cta.classList.add("cta");
    cta.innerHTML = "VOIR LE FORMAT";
    info.appendChild(cta);
    li.appendChild(info);

    container.appendChild(li);
}

function createTextDescription(id, name){
    let textInfo = document.createElement("div");
    textInfo.classList.add(name);
    textInfo.innerText = ads[id][name];
    return textInfo;
}

function onResizeHandler(){
    let newRatio = contents[0].clientWidth / contentRatio;
    for(let c=0; c<contents.length;c++){
        contents[c].style.height = newRatio+"px";
    }
}

window.onload = init;