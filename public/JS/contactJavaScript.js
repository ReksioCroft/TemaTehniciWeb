function changeColorForText() {
    let thisArticle = document.getElementById("Contact_Information");
    thisArticle.children[0].style.color = "yellow";

    //- modificare dinamica a stilului unui element (ex: culoare, dimeniuni, pozitie, font)
    //- selectare dupa id, tag, clasa, selectorCSS
    //- navigare in arbore (children, parentElement, ..)
};

function changeAddress() {

    var anchor = document.getElementById("facultyAddress");
    if (typeof changeAddress.clickNumber == 'undefined') {
        changeAddress.clickNumber = 1;
    } else {
        anchor.href = "https://unibuc.ro/studii/facultati/facultatea-de-matematica-si-informatica/?lang=en";

        changeAddress.clickNumber = changeAddress.clickNumber + 1;

    }

    // - modificare dinamica de proprietati (ex: sursa unei imagini, url-ul unei ancore)
    // - modificare dinamica de eveniment (ex: el.onclick, window.onkeypress, el.onmouseover )
    // - obiectul event -proprietati (target, key, pageX/clientX)
    // - proprietate noua adaugata unui obiect (ex: numarul de click-uri care s-au dat pe un element)

}


function chekerYes() {
    document.querySelector("#checkYes").addEventListener("click", function (event) {
        this.checked = true;
        document.getElementById('pForText').innerHTML = "Thank you!";
        document.getElementById("checkYesVeryMuch").addEventListener("click", function (event) {
            event.preventDefault();
        });
    }, true);

// - inputuri functionale (buton,text,radio,checkbox)
// - innerHTML, localStorage
// - addEventListener cu param3 = true
}

function rockON() {

    var win = window.open("", "Hello World ", "width=300, height=300");
    win.document.write("<div> Thank you VERY MUCH! Donate if you would like to add more content</div>");
    setTimeout(function () {
        win.close()
    }, 4500);
    document.getElementById("checkYes").addEventListener("click", function (event) {
        event.preventDefault()
    });

//- window: open, close
//- setTimeout, setInterval(cu 3 parametrii) , clearInterval
// - metode (stopPropagation, preventDefault) 
}


function showDate(event) {
    if (typeof showDate.counter == 'undefined') {
        var element = document.querySelector("#dateClick");
        element.innerHTML = "Click again to delete de date";
        let date = document.createElement('p');
        let actualDate = new Date();
        date.innerHTML = actualDate;
        element.appendChild(date);
        showDate.counter = 1;
    } else if (showDate.counter == 1) {
        document.getElementById('dateClick').removeChild(document.getElementById('dateClick').getElementsByTagName('p')[0]);
        showDate.counter = 2;
    }


//- o metoda din clasele predefinite: Math, Array, String, Date
// - creare si stergere element (createElement si removeChild)

}

function welcomeToTheExit() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("insertText").innerHTML =
                this.responseText;
        }
    };
    request.open("GET", "text.txt", true);
    request.send();

//- folosirea ajax.
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
};

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
        }
        i += 1;
    }

};


window.onload = function () {
    navHighlight();
    cronos();
    changeColorForText();
    chekerYes();
};

