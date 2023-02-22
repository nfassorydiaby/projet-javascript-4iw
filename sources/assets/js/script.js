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
create_app("TicTacToe", "assets/images/apps/tictactoe.png", "tictactoe", "tictactoe-content")
create_app ("Settings", "assets/images/apps/settings.png", "settings", "settings-content")
create_app("Calculatrice", "assets/images/apps/calculatrice.png", "calculatrice", "calculatrice-content")
create_app("System Info", "assets/images/apps/system-information.png", "system-info", "system-info-content")
create_app("Horloge", "assets/images/apps/horloge.png", "horloge", "horloge-content")

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
    callCalculatrice();
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
    console.log("max");
}

function shorter_window () {
    open(maximise)
    close(shorter)
    os_window.style.top = window.restoreY
    os_window.style.left = window.restoreX
    os_window.style.width = "60%"
    os_window.style.height = "60vh"
    console.log("short");
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
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if( hours < 10 ){ hours = '0' + hours; }
    if( minutes < 10 ){ minutes = '0' + minutes; }
    if( seconds < 10 ){ seconds = '0' + seconds; }
    document.getElementById("hours").innerHTML = hours + ":";
    document.getElementById("minutes").innerHTML = minutes + ":";
    document.getElementById("seconds").innerHTML = seconds;

    setInterval(() => {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        if( hours < 10 ){ hours = '0' + hours; }
        if( minutes < 10 ){ minutes = '0' + minutes; }
        if( seconds < 10 ){ seconds = '0' + seconds; }
        document.getElementById("hours").innerHTML = hours + ":";
        document.getElementById("minutes").innerHTML = minutes + ":";
        document.getElementById("seconds").innerHTML = seconds;
    }, 1000);
}
current_time()
//HORLOGE
function horloge_time_refresh(){
    var t = 1000; // rafraîchissement en millisecondes
    setTimeout('horloge_time()',t)
}

function horloge_time() {
    var date = new Date()
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if( h < 10 ){ h = '0' + h; }
    if( m < 10 ){ m = '0' + m; }
    if( s < 10 ){ s = '0' + s; }
    var time = h + ':' + m + ':' + s
    document.getElementById('horloge_time').innerHTML = time;
    horloge_time_refresh();
}
horloge_time()

function start_timer() {

    var h = document.getElementById('timer-hours-input').value;
    var m = document.getElementById('timer-minutes-input').value;
    var s = document.getElementById('timer-secondes-input').value;

    var hours_timer = parseInt(h) * 60 * 60;
    var minutes_timer = parseInt(m) * 60;
    var secondes_timer = parseInt(s);
    var all_seconds = hours_timer + minutes_timer + secondes_timer;

    all_seconds = all_seconds - 1;

    // console.log(all_seconds);
    if (all_seconds>=3600)
    {
        var heure = parseInt(all_seconds/3600);
        if (heure < 10) {
            heure = "0"+heure;
        }
        var reste = all_seconds%3600;

        var minute = parseInt(reste/60);
        if (minute < 10) {
            minute = "0"+minute;
        }

        var seconde = reste%60;
        if (seconde < 10) {
            seconde = "0"+seconde;
        }
        document.getElementById('timer-hours-input').value = heure;

        document.getElementById('timer-minutes-input').value = minute;

        document.getElementById('timer-secondes-input').value = seconde;
    }
    else if (all_seconds<3600 && all_seconds>=60)
    {
        var heure = 0;
        var minute = parseInt(all_seconds/60);
        var seconde = all_seconds%60;

        if (heure < 10) {
            heure = "0"+heure;
        }

        if (minute < 10) {
            minute = "0"+minute;
        }

        if (seconde < 10) {
            seconde = "0"+seconde;
        }

        document.getElementById('timer-hours-input').value = heure;

        document.getElementById('timer-minutes-input').value = minute;

        document.getElementById('timer-secondes-input').value = seconde;

    }
    else if (all_seconds < 60 && all_seconds >= 0)
    {

        var heure = 0;
        var minute = 0;
        var seconde = all_seconds;

        if (heure < 10) {
            heure = "0"+heure;
        }

        if (minute < 10) {
            minute = "0"+minute;
        }

        if (seconde < 10) {
            seconde = "0"+seconde;
        }
        document.getElementById('timer-hours-input').value = heure;

        document.getElementById('timer-minutes-input').value = minute;

        document.getElementById('timer-secondes-input').value = seconde;
    }

    if (heure == 0 && minute == 0 && seconde == 0) {
        con.play();

        alert("test")
    }
    else {
        timeoutTimer = setTimeout(start_timer, 1000);
    }
}

function stop_timer() {
    clearTimeout(timeoutTimer);
}

function reset_timer() {
    document.getElementById('timer-hours-input').value = '00';

    document.getElementById('timer-minutes-input').value = '00';

    document.getElementById('timer-secondes-input').value = '00';
    clearTimeout(timeoutTimer);

}

function zero_on_input(name_class){
    var inputVal = document.getElementById(name_class).value;
    if(inputVal < 10) {
        document.getElementById(name_class).value = "0"+inputVal;
    }
}

//CHRONO

var hoursChrono = 0;
var minutesChrono = 0;
var secondsChrono = 0;
var stepChrono = [];
var timeoutChrono;
var timeoutTimer;

var isStoppedChrono = true;

function start_chrono() {

    if (isStoppedChrono) {
        isStoppedChrono = false;
        defilerTemps();
    }
}

function step_chrono() {

    if (!isStoppedChrono) {
        document.getElementById('chrono-step-list').innerHTML = "";
        stepChrono.push(`${hoursChrono}:${minutesChrono}:${secondsChrono}<br>`);
        stepChrono.reverse();
        let listStepChrono = "";
        stepChrono.forEach(element => document.getElementById('chrono-step-list').innerHTML += element);
        document.getElementById('chrono-step-list').innerHTML += element
    }
}

function stop_chrono() {
    if (!isStoppedChrono) {
        isStoppedChrono = true;
        clearTimeout(timeoutChrono);
    }
}

function defilerTemps() {
    if (isStoppedChrono) return;

    secondsChrono = parseInt(secondsChrono);
    minutesChrono = parseInt(minutesChrono);
    hoursChrono = parseInt(hoursChrono);

    secondsChrono++;

    if (secondsChrono == 60) {
        minutesChrono++;
        secondsChrono = 0;
    }

    if (minutesChrono == 60) {
        hoursChrono++;
        minutesChrono = 0;
    }

    //   affichage
    if (secondsChrono < 10) {
        secondsChrono = "0" + secondsChrono;
    }

    if (minutesChrono < 10) {
        minutesChrono = "0" + minutesChrono;
    }

    if (hoursChrono < 10) {
        hoursChrono = "0" + hoursChrono;
    }
    document.getElementById('chronometre').innerHTML = `${hoursChrono}:${minutesChrono}:${secondsChrono}`;


    timeoutChrono = setTimeout(defilerTemps, 1000);
}

function reset_chrono() {
    document.getElementById('chronometre').innerHTML = "00:00:00";
    stepChrono = [];
    document.getElementById('chrono-step-list').innerHTML = "";
    isStoppedChrono = true;
    hoursChrono = 0;
    minutesChrono = 0;
    secondsChrono = 0;
    clearTimeout(timeoutChrono);
}

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

    alert('Mise à jour')
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

    if (JSON.parse(localStorage.getItem("draw_score")) != null) {
        document.getElementById('draw-score').innerHTML = JSON.parse(localStorage.getItem("draw_score"));
    }

    if (JSON.parse(localStorage.getItem("player_two_score")) != null) {
        document.getElementById('player-two-score').innerHTML = JSON.parse(localStorage.getItem("player_two_score"));
    }

    if (JSON.parse(localStorage.getItem("player_one_score")) != null) {
        document.getElementById('player-one-score').innerHTML = JSON.parse(localStorage.getItem("player_one_score"));
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


// TicTacToe
function callTictactoe() {
    //Tic Tac Toe
    const allCells = document.querySelectorAll('[data-cell]');
    const playerOneScrore = document.getElementById('player-one-score');
    const playerTwoScrore = document.getElementById('player-two-score');
    const drawScore = document.getElementById('draw-score');
    const board = document.getElementById('board')
    const restartButton = document.getElementById('restart')
    const resetButton = document.getElementById('reset-score')
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
    resetButton.addEventListener('click', resetScrore);

    function restartGame() {
        startGame();
    }

    function resetScrore() {
        playerOneScrore.innerText = 0;
        playerTwoScrore.innerText = 0;
        drawScore.innerText = 0;
        localStorage.setItem("draw_score", 0);
        localStorage.setItem("player_two_score", 0);
        localStorage.setItem("player_one_score", 0);
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
            drawScore.innerText = parseInt(drawScore.innerText) + 1;
            localStorage.setItem("draw_score", drawScore.innerText);
        } else {
            if (o_turn) {
                playerTwoScrore.innerText = parseInt(playerTwoScrore.innerText) + 1;
                localStorage.setItem("player_two_score", playerTwoScrore.innerText);
            }
            else {
                playerOneScrore.innerText = parseInt(playerOneScrore.innerText) + 1;
                localStorage.setItem("player_one_score", playerOneScrore.innerText);
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

// Calculatrice
function callCalculatrice() {
    // DOM
    const touches = [...document.querySelectorAll('.button')];
    const listKeycode = touches.map(touch => touch.dataset.key);
    const ecran = document.querySelector('.ecran');

    document.addEventListener('keydown', (e) => {
        const value = e.key.toString();
    });

    document.addEventListener('click', (e) => {
        const value = e.target.dataset.key;
        calculer(value);
    });

    let total = 0;
    let result = 0;
    let previousResults = [];

    const calculer = (value) => {
        if (listKeycode.includes(value)) {
            switch(value) {
                case '8':
                    ecran.textContent = "";
                    result = 0;
                    break;
                case '13':
                    total += result;
                    const calcul = eval(ecran.textContent);
                    ecran.textContent = calcul;
                    break;
                default:
                    const indexKeycode = listKeycode.indexOf(value);
                    const touche = touches[indexKeycode];
                    ecran.textContent += touche.innerHTML;
            }
        }
    }
}

// Horloge
function horloge_time_refresh(){
    var t = 1000; // rafraîchissement en millisecondes
    setTimeout('horloge_time()',t)
}

function horloge_time() {
    setInterval(() => {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        if( hours < 10 ){ hours = '0' + hours; }
        if( minutes < 10 ){ minutes = '0' + minutes; }
        if( seconds < 10 ){ seconds = '0' + seconds; }
        var time = hours + ':' + minutes + ':' + seconds;
        document.getElementById('horloge_time').innerHTML = time;
    }, 1000);
}
horloge_time()

function timer_refresh(){
    var t = 1000; // rafraîchissement en millisecondes
    setTimeout('timer()',t)
}

function timer() {

    var h = document.getElementById('timer-hours-input').value;
    var m = document.getElementById('timer-minutes-input').value;
    var s = document.getElementById('timer-secondes-input').value;

    var hours_timer = parseInt(h) * 60 * 60;
    var minutes_timer = parseInt(m) * 60;
    var secondes_timer = parseInt(s);
    var all_seconds = hours_timer + minutes_timer + secondes_timer;

    all_seconds = all_seconds - 1;

    // console.log(all_seconds);
    if (all_seconds>=3600)
    {
        var heure = parseInt(all_seconds/3600);
        if (heure < 10) {
            heure = "0"+heure;
        }
        var reste = all_seconds%3600;

        var minute = parseInt(reste/60);
        if (minute < 10) {
            minute = "0"+minute;
        }

        var seconde = reste%60;
        if (seconde < 10) {
            seconde = "0"+seconde;
        }
        // alert("ibjnklm")
        // var result = heure+':'+minute+':'+seconde;
        // alert(document.getElementById('timer-hours-input').value);
        document.getElementById('timer-hours-input').value = heure;
        // alert(document.getElementById('timer-hours-input').value);

        document.getElementById('timer-minutes-input').value = minute;

        document.getElementById('timer-secondes-input').value = seconde;
        // alert(result);
    }
    else if (all_seconds<3600 && all_seconds>=60)
    {
        var heure = 0;
        var minute = parseInt(all_seconds/60);
        var seconde = all_seconds%60;
        // var result = '00:'+minute+':'+seconde;

        document.getElementById('timer-hours-input').value = heure;

        document.getElementById('timer-minutes-input').value = minute;

        document.getElementById('timer-secondes-input').value = seconde;

    }
    else if (all_seconds < 60 && all_seconds >= 0)
    {

        var heure = 0;
        var minute = 0;
        var seconde = all_seconds;
        // var result = '00:'+minute+':'+seconde;

        document.getElementById('timer-hours-input').value = heure;

        document.getElementById('timer-minutes-input').value = minute;

        document.getElementById('timer-secondes-input').value = seconde;
    }

    if (heure == 0 && minute == 0 && seconde == 0) {
        click.play()
    }
    else {
        timer_refresh();
    }

    // return result;


    // var new_timer = all_seconds - 60;
    // console.log(new_timer);
    // hours_timer = parseInt(new_timer / 3600);
    // console.log(hours_timer);
    //
    // all_seconds = all_seconds - (new_timer / 3600 * hours_timer);
    // console.log(all_seconds);
    //
    //
    // minutes_timer = parseInt(all_seconds / 60);
    // all_seconds = all_seconds - (all_seconds / 60);
    // alert(minutes_timer);

    // if( h < 10 ){ h = '0' + h; }
    // if( m < 10 ){ m = '0' + m; }
    // if( s < 10 ){ s = '0' + s; }
    // var time = h + ':' + m + ':' + s
    // document.getElementById('horloge_time').innerHTML = time;
    // horloge_time_refresh();
}

function zero_on_input(name_class){
    var inputVal = document.getElementById(name_class).value;
    if(inputVal < 10) {
        document.getElementById(name_class).value = "0"+inputVal;
    }
}

//CHRONO

var hoursChrono = 0;
var minutesChrono = 0;
var secondsChrono = 0;
var stepChrono = [];
var timeoutChrono;

var isStoppedChrono = true;

function start_chrono() {

    if (isStoppedChrono) {
        isStoppedChrono = false;
        defilerTemps();
    }
}

function step_chrono() {

    if (!isStoppedChrono) {
        document.getElementById('chrono-step-list').innerHTML = "";
        stepChrono.push(`${hoursChrono}:${minutesChrono}:${secondsChrono}<br>`);
        stepChrono.reverse();
        let listStepChrono = "";
        stepChrono.forEach(element => document.getElementById('chrono-step-list').innerHTML += element);
        document.getElementById('chrono-step-list').innerHTML += element
    }
}

function stop_chrono() {
    if (!isStoppedChrono) {
        isStoppedChrono = true;
        clearTimeout(timeoutChrono);
    }
}

function defilerTemps() {
    if (isStoppedChrono) return;

    secondsChrono = parseInt(secondsChrono);
    minutesChrono = parseInt(minutesChrono);
    hoursChrono = parseInt(hoursChrono);

    secondsChrono++;

    if (secondsChrono == 60) {
        minutesChrono++;
        secondsChrono = 0;
    }

    if (minutesChrono == 60) {
        hoursChrono++;
        minutesChrono = 0;
    }

    //   affichage
    if (secondsChrono < 10) {
        secondsChrono = "0" + secondsChrono;
    }

    if (minutesChrono < 10) {
        minutesChrono = "0" + minutesChrono;
    }

    if (hoursChrono < 10) {
        hoursChrono = "0" + hoursChrono;
    }
    document.getElementById('chronometre').innerHTML = `${hoursChrono}:${minutesChrono}:${secondsChrono}`;


    timeoutChrono = setTimeout(defilerTemps, 1000);
}

function reset_chrono() {
    document.getElementById('chronometre').innerHTML = "00:00:00";
    stepChrono = [];
    document.getElementById('chrono-step-list').innerHTML = "";
    isStoppedChrono = true;
    hoursChrono = 0;
    minutesChrono = 0;
    secondsChrono = 0;
    clearTimeout(timeoutChrono);
}