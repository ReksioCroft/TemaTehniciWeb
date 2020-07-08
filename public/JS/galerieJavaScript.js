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

function inverseList() {

    var ul = document.getElementById("unAlMeu");
    var i = ul.childNodes.length;
    while (i--)
        ul.appendChild(ul.childNodes[i]); // append scoate elementul din ul si dupa il adauga, insa la
    // la final

};


window.onload = function () {
    cronos();
    navHighlight();
    var tec = document.getElementById("unAlMeu");
    tec.addEventListener("click", inverseList);
}