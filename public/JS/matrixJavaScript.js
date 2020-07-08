function functieDeIdle() {

    var timp = 2000;

    //var tw = 0;

    function toggleLaClasa() {
        document.getElementById("OverLay").classList.toggle("overlay");
        document.getElementById("OverWord").classList.toggle("overlayOnText");
    };
    var timeout = -1;
    cronometru(); // cronometru

    function cronometru() {
        document.addEventListener("mousemove", stareActiva); // on activity reseteaza time-out-ul
        document.addEventListener("keypress", stareActiva);
        document.addEventListener("scroll", stareActiva)
        timeout = setTimeout(stareInactiva, timp); // daca timpul expira
    }

    function stareActiva() {
        document.removeEventListener("mousemove", stareActiva);
        document.removeEventListener("keypress", stareActiva);
        document.removeEventListener("scroll", stareActiva);
        //scoatem evenimentele, altfel am face recursie infinita
        // pe functie onActivity si scoate din performanta ( putem vedea pe consola)
        if (timeout == -1) toggleLaClasa(); //, aici intra daca functia a pus deja overlay-ul si il scoate
        else clearTimeout(timeout); //, daca nu s-a pus overlay doar reseteaza timpul, ca se poata
        // puna overlay daca in viitor nu se fac miscari. Daca nu ar fi else-ul, o sa intre chiar daca
        // nu e inactivitate;
        cronometru();
    }

    function stareInactiva() {
        toggleLaClasa();
        timeout = -1;
        //tw = tw + timp;
        //var stri = "You are innactive. Stop wasting my time."
    }

};


function cronos() {
    if (localStorage.min == null) {
        localStorage.min = "0";
        localStorage.sec = "0";
    }
    setInterval(function () {
        if (localStorage.sec == "59") {
            localStorage.min = parseInt(localStorage.min) + 1;
            localStorage.sec = "0";
        }
        localStorage.sec = parseInt(localStorage.sec) + 1;
        document.getElementById("timeSpent").innerHTML = localStorage.min + " minutes " + localStorage.sec + " seconds ";
    }, 1000);

};


function getPath() {
    path = window.location.pathname.substring(1);
    return path;
}

function navHighlight() {
    var Menu = document.getElementById("AllMenu");
    var toChange = getPath();
    var i = 0;
    var elementOfList = Menu.getElementsByTagName('li');
    var lenghtOfList = elementOfList.length;
    while (i < lenghtOfList) {
        var link = elementOfList[i].getElementsByTagName("a")[0]; // getElements intoarce o lista
        var currentText = link.getAttribute("href");
        if (toChange == currentText) {
            link.classList.add("changeColor");
            ;
        }
        i += 1;
    }

};


window.onload = function () {
    cronos();
    functieDeIdle();
    navHighlight();
}