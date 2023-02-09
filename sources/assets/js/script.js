//ELements
const apps = document.querySelector("#br-os-apps")
var menu = document.querySelector("#os-ct-menu")
const os_window = document.querySelector(".br-os-window")
const brand_window = document.querySelector(".brand")
const app_main = document.querySelector ("#app-main")
const maximise = document.querySelector("#maximise")
const shorter = document.querySelector("#shorter")
const cross = document.querySelector("#cross")
const taskbar = document.querySelector ("#taskbar")
/* Sound effects */
const click = new Audio("assets/music/click.wav")
const con = new Audio("assets/music/alert.wav")
const okay = new Audio("assets/music/positive.wav")
const no = new Audio("assets/music/negative.wav")

//Operations
/* Reseting window */
close(os_window)
/* Creating apps */
create_app("File manager", 'assets/images/apps/file-manager.png', "file-manager", "file-manager-content")
create_app("Recycle bin", "assets/images/apps/recycle-bin.png", "recycle-bin", "recycle-bin-content")
create_app ("Settings", "assets/images/apps/settings.png", "settings", "settings-content")
create_app("System Info", "assets/images/apps/system-information.png", "system-info", "system-info-content")

//Functions

function create_app (name, image, id, id_content) {
    let app = document.createElement("div")
    app.classList.add("app")
    app.id = id
    app.setAttribute("onclick", "window_open('" + id + "', '" + id_content + "')")
    app.oncontextmenu = e => {
        click.play()
        open_menu(e, id)
    }

    let img = document.createElement("img")
    img.src = image
    img. setAttribute("alt", name)
    let p = document.createElement("p")
    p.innerText = name
    app.appendChild (img)
    app.appendChild (p)
    apps.appendChild (app)
}

function open (tag) {
    tag.style.display = "inline-block"
}

function close (tag) {
    tag.style.display = "none"
}

function window_open (id, id_content) {
    click.play()
    brand_window.innerHTML = ""
    app_main.innerHTML = document.getElementById(id_content).innerHTML
    init_window()

    let main = document.querySelector("#" + id)

    let img = document.createElement("img")
    img.src = main.childNodes[0].src
    img.setAttribute("alt", main.childNodes[0].getAttribute("alt"))

    let p = document.createElement("p")
    p.innerText = main.childNodes[1].innerText
    brand_window.appendChild(img)
    brand_window.appendChild(p)

    open(os_window)
    local_storage_values();
    callTictactoe();
}

function init_window() {
    close(shorter)
    maximise.onclick = e => {
        click.play()
        maximise_window()
    }
    shorter.onclick = e => {
        click.play()
        shorter_window()
    }
    cross.onclick = e => {
        click.play()
        close(os_window)
        os_window
    }
}

function maximise_window () {
    open(shorter)
    close(maximise)
    window.restoreX = os_window.style.left
    window.restoreY = os_window.style.top
    os_window.style.top = 0
    os_window.style.left = 0
    os_window.style.width = "100%"
    os_window.style.height = "100vh"
}

function shorter_window () {
    open(maximise)
    close(shorter)
    os_window.style.top = window.restoreY
    os_window.style.left = window.restoreX
    os_window.style.width = "60%"
    os_window.style.height = "60vh"
}

function open_menu (e, id) {
    e.preventDefault()
    menu.classList.add("active")
    menu.querySelectorAll("ul li")[0].childNodes[0].onclick = () => {
        window_open(id, id + "-content")
    }
    menu.style.top = e.pageY + 5 + "px"
    menu.style.left = e.pageX + 5 + "px"
    return false
}

//Anonimus functions in Event Listeners
window.onclick = e => {
    if (menu.classList.contains ("active")) {
        menu.classList.remove("active")
    }
}

os_window.ondragend = e => {
    let go_top = e.pageY
    let go_left = e.pageX
    if(go_top < 0) {
        go_top= e
    }
    if(go_left < 0) {
        go_left = 0
    }
    os_window.style.top = go_top + "px"
    os_window.style.left = go_left + "px"
}

/* App Settings */
// current time
function current_time () {
    var date = new Date();
    var hours = date.getHours() + ":";
    var minutes = date.getMinutes() + ":";
    var seconds = date.getSeconds();
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    setInterval(() => {
        var date = new Date();
        var hours = date.getHours() + ":";
        var minutes = date.getMinutes() + ":";
        var seconds = date.getSeconds();
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;
    }, 1000);
}
current_time()

// current date
function current_date (id) {
    var date = new Date();
    var day = date.getDate() + "-";
    var month = (date.getMonth() + 1) + "-";
    var year = date.getFullYear();
    document.getElementById("day").innerHTML = day;
    document.getElementById("month").innerHTML = month;
    document.getElementById("year").innerHTML = year;

    setInterval(() => {
        var date = new Date();
        var day = date.getDate() + "-";
        var month = (date.getMonth() + 1) + "-";
        var year = date.getFullYear();
        document.getElementById("day").innerHTML = day;
        document.getElementById("month").innerHTML = month;
        document.getElementById("year").innerHTML = year;
    }, 1000);
}
current_date("current_date")

// battery level
function battery_level (id) {
    navigator.getBattery().then(battery => {
        let m = ""
        m = battery.level * 100 + "%"
    
        if (battery.charging) {
            m += " ⚡";
        }
        document.getElementById(id).innerHTML = m;
    })
    
    setInterval(() => {
        navigator.getBattery().then(battery => {
            let m = ""
            m = battery.level * 100 + "%"
        
            if (battery.charging) {
                m += " ⚡";
            }
            document.getElementById(id).innerHTML = m;
        })
    }, 1000);
}
battery_level("battery_level")

// Vibration
function vibrationState(id) {
    if (JSON.parse(localStorage.getItem("vibrationEnabled")) === true) {
        document.getElementById(id).innerHTML = "Activé";
    } else {
        document.getElementById(id).innerHTML = "Désactivé";   
    }
}
vibrationState("vibration")

function vibrationOn() {
    localStorage.setItem("vibrationEnabled", true);
    document.getElementById("vibration").innerHTML = "Activé";
    document.getElementById("vibrate-on").disabled = true;
    document.getElementById("vibrate-off").disabled = false;
}

function vibrationOff() {
    localStorage.setItem("vibrationEnabled", false);
    document.getElementById("vibration").innerHTML = "Désactivé";  
    document.getElementById("vibrate-on").disabled = false;
    document.getElementById("vibrate-off").disabled = true;
};

function vibrate() {
    if (JSON.parse(localStorage.getItem("vibrationEnabled")) === true) {
        window.navigator.vibrate([200, 100, 200]);
    } else {
        window.navigator.vibrate(0);
    }
}

var buttons = document.querySelectorAll("button");
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    vibrate();
  });
}

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // true for mobile device
    console.log("mobile device");
}else{
    // false for not mobile device
    console.log("not mobile device");
}
window.navigator.vibrate(200); // vibre pendant 200ms

// Latency
function latency(id) {
    if (JSON.parse(localStorage.getItem("input_refresh_latency_seconds")) === true) {
        setInterval(() => {
            let startTime = new Date();
            let url = localStorage.getItem("url_latency");

            if (url == null) {
                // changer cette url avec l'url de notre serveur
                url = 'https://example.com';
            } else {
                url = JSON.parse(url);
            }

            fetch(url, {mode: 'no-cors'})
            .then(response => response.text())
            .then(data => {
                let endTime = new Date();
                let latency = endTime - startTime;
                document.getElementById(id).innerHTML = latency + " ms";
                console.log(url);
            })
            .catch(error => console.error(error));
        }, 1000);
    } else{
        let startTime = new Date();
        let url = localStorage.getItem("url_latency");

        if (url == null) {
            // changer cette url avec l'url de notre serveur
            url = 'https://example.com';
        } else {
            url = JSON.parse(url);
        }

        fetch(url, {mode: 'no-cors'})
        .then(response => response.text())
        .then(data => {
            let endTime = new Date();
            let latency = endTime - startTime;
            document.getElementById(id).innerHTML = latency + " ms";
            console.log(url);
        })
        .catch(error => console.error(error));
    }
}
latency("latency");

function measureLatency() {
    let url = document.getElementById('url-latency').value;
    let startTime = new Date();
  
    fetch(url, {mode: 'no-cors'})
    .then(response => response.text())
    .then(data => {
        let endTime = new Date();
        let latency = endTime - startTime;
        document.getElementById('latency').innerHTML = latency + " ms";
        localStorage.setItem("url_latency", JSON.stringify(url));
    })
    .catch(error => console.error(error));
}

// show/hide div
function ShowHideDiv(id, element) {
    var dvElement = document.getElementById(id);
    dvElement.style.display = element.checked ? "none" : "inline";
}

// Save data in localstorage
function save() {
    localStorage.setItem("input_latency", document.getElementById("input_latency").checked);
    localStorage.setItem("input_current_time", document.getElementById("input_current_time").checked);
    localStorage.setItem("input_hours", document.getElementById("input_hours").checked);
    localStorage.setItem("input_minutes", document.getElementById("input_minutes").checked);
    localStorage.setItem("input_seconds", document.getElementById("input_seconds").checked);
    localStorage.setItem("input_current_date", document.getElementById("input_current_date").checked);
    localStorage.setItem("input_day", document.getElementById("input_day").checked);
    localStorage.setItem("input_month", document.getElementById("input_month").checked);
    localStorage.setItem("input_year", document.getElementById("input_year").checked);
    localStorage.setItem("input_vibration", document.getElementById("input_vibration").checked);
    localStorage.setItem("input_battery_level", document.getElementById("input_battery_level").checked);
    localStorage.setItem("input_refresh_latency_seconds", document.getElementById("input_refresh_latency_seconds").checked);
}

// Show saved data
function local_storage_values() {
    document.getElementById("input_latency").checked = JSON.parse(localStorage.getItem("input_latency"));
    document.getElementById("input_current_time").checked = JSON.parse(localStorage.getItem("input_current_time"));
    document.getElementById("input_hours").checked = JSON.parse(localStorage.getItem("input_hours"));
    document.getElementById("input_minutes").checked = JSON.parse(localStorage.getItem("input_minutes"));
    document.getElementById("input_seconds").checked = JSON.parse(localStorage.getItem("input_seconds"));
    document.getElementById("input_current_date").checked = JSON.parse(localStorage.getItem("input_current_date"));
    document.getElementById("input_day").checked = JSON.parse(localStorage.getItem("input_day"));
    document.getElementById("input_month").checked = JSON.parse(localStorage.getItem("input_month"));
    document.getElementById("input_year").checked = JSON.parse(localStorage.getItem("input_year"));
    document.getElementById("input_vibration").checked = JSON.parse(localStorage.getItem("input_vibration"));
    document.getElementById("input_battery_level").checked = JSON.parse(localStorage.getItem("input_battery_level"));
    document.getElementById("input_refresh_latency_seconds").checked = JSON.parse(localStorage.getItem("input_refresh_latency_seconds"));
    if (JSON.parse(localStorage.getItem("vibrationEnabled")) === true) {
        document.getElementById("vibrate-on").disabled = true;
        document.getElementById("vibrate-off").disabled = false;
    } else {
        document.getElementById("vibrate-on").disabled = false;
        document.getElementById("vibrate-off").disabled = true;
    }

    if (JSON.parse(localStorage.getItem("themeMode")) === true) {
        document.getElementById("light-mode").disabled = true;
        document.getElementById("dark-mode").disabled = false;
        document.querySelector(".br-os-window .app").style.background = "white";
        document.querySelector(".br-os-window .app").style.color = "black";
    } else {
        document.getElementById("light-mode").disabled = false;
        document.getElementById("dark-mode").disabled = true;
        document.querySelector(".br-os-window .app").style.background = "dimgray";
        document.querySelector(".br-os-window .app").style.color = "white";
    }

    if (JSON.parse(localStorage.getItem("url_latency")) != null) {
        document.getElementById('url-latency').value = JSON.parse(localStorage.getItem("url_latency"));
    }
}

// Display saved data
function savedData() {
    // Latency
    if (JSON.parse(localStorage.getItem("input_latency")) === true) {
        document.getElementById("latency").style.display = "none";
        console.log("true");
    } else {
        document.getElementById("latency").style.display = "inline";
        console.log("false");
    }

    // Current time
    if (JSON.parse(localStorage.getItem("input_current_time")) === true) {
        document.getElementById("current_time").style.display = "none";
        console.log("true");
    } else {
        document.getElementById("current_time").style.display = "inline";
        console.log("false");
    }
    // Hours
    if (JSON.parse(localStorage.getItem("input_hours")) === true) {
        document.getElementById("hours").style.display = "none";
        console.log("true");
    } else {
        document.getElementById("hours").style.display = "inline";
        console.log("false");
    }
    // Minutes
    if (JSON.parse(localStorage.getItem("input_minutes")) === true) {
        document.getElementById("minutes").style.display = "none";
        console.log("true");
    } else {
        document.getElementById("minutes").style.display = "inline";
        console.log("false");
    }
    // Seconds
    if (JSON.parse(localStorage.getItem("input_seconds")) === true) {
        document.getElementById("seconds").style.display = "none";
        console.log("true");
    } else {
        document.getElementById("seconds").style.display = "inline";
        console.log("false");
    }

    // Current date
    if (JSON.parse(localStorage.getItem("input_current_date")) === true) {
        document.getElementById("current_date").style.display = "none";
        console.log("true");
    } else {
        document.getElementById("current_date").style.display = "inline";
        console.log("false");
    }

    // Day
    if (JSON.parse(localStorage.getItem("input_day")) === true) {
        document.getElementById("day").style.display = "none";
        console.log("true");
    } else {
        document.getElementById("day").style.display = "inline";
        console.log("false");
    }
    // Month
    if (JSON.parse(localStorage.getItem("input_month")) === true) {
        document.getElementById("month").style.display = "none";
        console.log("true");
    } else {
        document.getElementById("month").style.display = "inline";
        console.log("false");
    }
    // Year
    if (JSON.parse(localStorage.getItem("input_year")) === true) {
        document.getElementById("year").style.display = "none";
        console.log("true");
    } else {
        document.getElementById("year").style.display = "inline";
        console.log("false");
    }

    // Vibration
    if (JSON.parse(localStorage.getItem("input_vibration")) === true) {
        document.getElementById("vibration").style.display = "none";
        console.log("true");
    } else {
        document.getElementById("vibration").style.display = "inline";
        console.log("false");
    }

    // Battery level
    if (JSON.parse(localStorage.getItem("input_battery_level")) === true) {
        document.getElementById("battery_level").style.display = "none";
        console.log("true");
    } else {
        document.getElementById("battery_level").style.display = "inline";
        console.log("false");
    }
}
savedData();

// Verrouiller son écran et déverrouiller
let password = "secret";
let isLocked = false;

function lockScreen() {
    isLocked = true;
    document.getElementById("overlay").style.display = "flex";
};

function unlockScreen() {
    let input = document.getElementById("password-input").value;
    if (input === password) {
        isLocked = false;
        document.getElementById("overlay").style.display = "none";
    } else {
        alert("Mot de passe incorrect");
    }
};

// Mode thème light/dark pour toutes les applications
function lightMode() {
    localStorage.setItem("themeMode", true);
    document.getElementById("light-mode").disabled = true;
    document.getElementById("dark-mode").disabled = false;
    document.querySelector(".br-os-window .app").style.background = "white";
    document.querySelector(".br-os-window .app").style.color = "black";
}

function darkMode() {
    localStorage.setItem("themeMode", false);
    document.getElementById("light-mode").disabled = false;
    document.getElementById("dark-mode").disabled = true;
    document.querySelector(".br-os-window .app").style.background = "dimgray";
    document.querySelector(".br-os-window .app").style.color = "white";
};

function callTictactoe() {
    //Tic Tac Toe
    const allCells = document.querySelectorAll('[data-cell]');
    const scoreP1 = document.getElementById('scoreP1');
    const scoreP2 = document.getElementById('scoreP2');
    const scoreTie = document.getElementById('scoreTie');
    const board = document.getElementById('board')
    const restartButton = document.getElementById('restart')
    const winningCombi = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ]
    const o_class = 'o';
    const x_class = 'x';
    let o_turn;

    startGame();
    restartButton.addEventListener('click', restartGame);

    function restartGame() {
    scoreP1.innerText = 0;
    scoreP2.innerText = 0;
    scoreTie.innerText = 0;
    startGame();
    }

    function startGame() {
    o_turn = false;
    allCells.forEach(cell => {
        cell.classList.remove(o_class);
        cell.classList.remove(x_class);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass();
    }

    function handleClick(e) {
    const cell = e.target;
    const currentClass = o_turn ? o_class : x_class;
    //place mark
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        //switch turns
        swapTurns();
        //set board hover class
        setBoardHoverClass();
    }
    }

    function endGame(draw) {
    if (draw) {
        scoreTie.innerText = parseInt(scoreTie.innerText) + 1;
    } else {
        if (o_turn) {
        scoreP2.innerText = parseInt(scoreP2.innerText) + 1;
        }
        else {
        scoreP1.innerText = parseInt(scoreP1.innerText) + 1;
        }
    }
    startGame();
    }

    function isDraw() {
    return [...allCells].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(o_class)

    })
    }

    function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    }

    function swapTurns() {
    o_turn = !o_turn;
    }

    function setBoardHoverClass() {
    board.classList.remove(x_class);
    board.classList.remove(o_class);
    if (o_turn) {
        board.classList.add(o_class);
    } else {
        board.classList.add(x_class);
    }
    }

    function checkWin(currentClass) {
    return winningCombi.some(combination => {
        return combination.every(i => {
        return allCells[i].classList.contains(currentClass)
        })
    })
    }
}