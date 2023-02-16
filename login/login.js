const backend_host = 'https://h2992036.stratoserver.net'

function getCookie(cookieName) {//ignores attributes from cookies, returns only the values
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

function bodyload() {
    addLoginEnter();
}

function enterLogin (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        document.getElementById("login").click();

    };
}

function addLoginEnter(){
    document.body.addEventListener("keypress", enterLogin)
}

function removeLoginEnter(){
    document.body.removeEventListener("keypress", enterLogin)
}

async function login(username, password) {
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{"username":"' + username + '","password":"' + password + '"}'
        };
        let response = await fetch(`${backend_host}/api/login`, options);
        response = await response.json();
        if (response.err) {
            throw new Error(response.err);
        } else {
            setSessionid(response.sessionid);
            window.open('/overview/overview.html', '_self');
        }
    } catch (err) {
        removeLoginEnter();
        createModal('err', err.message, ()=>{
            addLoginEnter();
        });
    }
}

async function register(username, password) {
    

    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{"username":"' + username + '","password":"' + password + '"}'
        };
        let response = awafetch(`${backend_host}/api/register`, options)
        response = await response.json();
        if (response.err) {
            throw new Error(response.err);
        } else {
            setSessionid(response.sessionid);
            window.open('/overview/overview.html', '_self');
        }
    } catch (e) {
        removeLoginEnter();
        createModal('err', e.message, ()=>{
            addLoginEnter();
        });
    }
}

