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
    local_storage_values();
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
}
current_time()

// current date
function current_date (id) {
    var date = new Date();
    var current_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    document.getElementById(id).innerHTML = current_date;
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
}
battery_level("battery_level")

// vibration
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  console.log("mobile device");
}else{
  // false for not mobile device
  console.log("not mobile device");
}
window.navigator.vibrate(200); // vibre pendant 200ms

// latency
function latency (id) {
    document.getElementById(id).innerHTML = window.performance.now().toFixed(2) + " ms";
}
latency("latency")

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
    localStorage.setItem("input_vibration", document.getElementById("input_vibration").checked);
    localStorage.setItem("input_battery_level", document.getElementById("input_battery_level").checked);
}

// To set check or uncheck checkboxes
function local_storage_values() {
    document.getElementById("input_latency").checked = JSON.parse(localStorage.getItem("input_latency"));
    document.getElementById("input_current_time").checked = JSON.parse(localStorage.getItem("input_current_time"));
    document.getElementById("input_hours").checked = JSON.parse(localStorage.getItem("input_hours"));
    document.getElementById("input_minutes").checked = JSON.parse(localStorage.getItem("input_minutes"));
    document.getElementById("input_seconds").checked = JSON.parse(localStorage.getItem("input_seconds"));
    document.getElementById("input_current_date").checked = JSON.parse(localStorage.getItem("input_current_date"));
    document.getElementById("input_vibration").checked = JSON.parse(localStorage.getItem("input_vibration"));
    document.getElementById("input_battery_level").checked = JSON.parse(localStorage.getItem("input_battery_level"));
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

//localStorage.removeItem('input_latency');
//console.log(JSON.parse(localStorage.getItem("input_latency")));
