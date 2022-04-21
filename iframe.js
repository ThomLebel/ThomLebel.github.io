function createIframe(){
    currentIframe = document.createElement("iframe");
    currentIframe.onload = iframeLoaded();
    currentIframe.src = "crea/"+ads[adId].name+"/index.html";
    currentIframe.classList.add("centered-element");

    iframeContainer.appendChild(currentIframe);
    iframeContainer.style.display = "block";
}

function iframeLoaded(){
    iframeContainer.appendChild(currentIframe);
    iframeContainer.style.display = "block";

    resizeInterval = setInterval(resizeIframe, 100);
}

function resizeIframe(){
    let target = currentIframe.contentWindow.document.body.children[0];

    if(currentIframe.clientWidth == target.clientWidth &&
        currentIframe.clientHeight == target.clientHeight){
        clearInterval(resizeInterval);
        return;
    }

    var x= target.clientWidth;
    var y= target.clientHeight;
    currentIframe.style.width = x+"px";
    currentIframe.style.height = y+"px";
}

function closeIframe(){
    if(iframeContainer.style.display != "block") return;
    
    if(resizeInterval != null) clearInterval(resizeInterval);
    iframeContainer.removeChild(currentIframe);
    currentIframe = null;
    iframeContainer.style.display = "none";
}