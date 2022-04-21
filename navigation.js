function openIntro(){
    document.getElementById("intro").classList.remove("animeIntro");
}
function closeIntro(){
    document.getElementById("intro").classList.add("animeIntro");
}
function openContact(){
    document.getElementById("contact").classList.remove("animeContact");
}
function closeContact(){
    document.getElementById("contact").classList.add("animeContact");
}

function onEnterNav(){
    let nav = this;
    nav.classList.add("animate");
}
function onLeaveNav(){
    let nav = this;
    nav.classList.remove("animate");
}
function onClickNav(){
    if(this == currentNav) return;

    previousNav = currentNav;

    if(previousNav != null){
        if(previousNav.id == "home") closeIntro();
        else if(previousNav.id == "mail") closeContact();
        else if(previousNav.id == "crea") closeIframe();
    }
    
    switchNav(previousNav, this);

    let navID = currentNav.id;
    
    switch(navID){
        case "home":
            if(previousNav.id == "mail") document.getElementById("whiteScreen").style.display = "block";
            openIntro();
        break;
        case "crea":
            document.getElementById("whiteScreen").style.display = "none";
        break;
        case "mail":
            if(previousNav.id == "home") document.getElementById("whiteScreen").style.display = "block";
            openContact();
        break;
    }
}

function switchNav(prev, next){
    if(prev != null) prev.classList.remove("active");
    if(next != null) next.classList.add("active");
    currentNav = next;
}