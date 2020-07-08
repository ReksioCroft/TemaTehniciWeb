function puneInformatia() {
    setInterval(function fctAct() {
        function functieActuala() {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var erou = document.getElementById("trueHero");
                    var tempo = new Date;
                    var sc = tempo.getSeconds();
                    var hr = tempo.getHours();
                    var information = JSON.parse(xmlhttp.responseText);
                    if (sc % 2 == 0) {
                        erou.innerHTML = information[0].Information;
                    } else {
                        erou.innerHTML = information[1].InformationTwo;
                    }
                    ;
                    if (hr == 12) {
                        erou.innerHTML += "+ 1 The Movie Matrix if you call today";
                    }
                    ;

                }
                ;
            };
            xmlhttp.open("GET", "informationJSON.json", true);
            xmlhttp.send();
        };
        functieActuala();
    }, 3000);
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
    path = window.location.pathname.substring(1);//  htpp .... /contact.html
    return path;
}

function navHighlight() {
    var Menu = document.getElementById("AllMenu");
    var toChange = getPath();
    alert(toChange);
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

function promt() {
    var person = prompt("Please enter your name", "Scrie aici numele");
    if (person != null) {
        var retine = document.getElementById("tabTitle").innerHTML;
        document.getElementById("tabTitle").innerHTML = "Salut, " + person;
        setTimeout(function () {
            document.getElementById("tabTitle").innerHTML = "La revedere, " + person;
        }, 2000);
    }
    ;
};


function rotate() {
    var center_ox = 670
    var center_oy = 350
    var lng = 20

    var unghi = 0; // unghiul cercului
    setInterval(function () {
        unghi = (unghi + Math.PI / 360) % (Math.PI * 2);
        rotate(unghi);
    }, 5);

    function rotate(unghi) {
        var px = center_ox + lng * Math.cos(unghi);
        var py = center_oy + lng * Math.sin(unghi);
        document.getElementById("Morph").style.left = px + "px";
        document.getElementById("Morph").style.top = py + "px";
    }
}


window.onload = function () {
    cronos();
    puneInformatia();
    navHighlight();
    promt();
    rotate();
};