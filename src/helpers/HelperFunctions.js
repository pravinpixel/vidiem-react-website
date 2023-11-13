// Session Storage
const setSessionStorage = (key, varToSet) => {
    sessionStorage.setItem(key, window.btoa(varToSet))
}
const getSessionStorage = (key) => {
    if (typeof window !== 'undefined') {
        const getStorage = sessionStorage.getItem(key)
        try {
            return getStorage ? window.atob(getStorage) : false
        } catch (e) {
            return false
        }
    }
}
const removeSessionStorage = (key) => {
    sessionStorage.removeItem(key)
}
const unsetSessionStorage = () => {
    sessionStorage.clear()
}

// Local Storage
const setLocalStorage = (key, varToSet) => {
    localStorage.setItem(key, window.btoa(varToSet))
}
const getLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        const getStorage = localStorage.getItem(key)
        try {
            return getStorage ? window.atob(getStorage) : false
        } catch (e) {
            return false
        }
    }
}
const removeLocalStorage = (key) => {
    localStorage.removeItem(key)
}
const unsetLocalStorage = () => {
    localStorage.clear()
}

// Make QueryString
function makeQueryString(q) {
    let params = new URLSearchParams(q);
    let keysForDel = [];
    params.forEach((value, key) => {
        if (value === "") {
            keysForDel.push(key);
        } else if (value === null) {
            keysForDel.push(key);
        } else if (typeof value === "undefined") {
            keysForDel.push(key);
        } else if (typeof value === undefined) {
            keysForDel.push(key);
        }
    });

    keysForDel.forEach((key) => {
        params.delete(key);
    });

    return params.toString();
}

// Make ActiveTab

function makeActiveTab(active) {
    if (active === "select-product" || active === "color-and-motor") {
        return {
            tabOne: "current",
            tabTwo: "none",
            tabThree: "none",
        }
    }
    else if (active === "jar-styles") {
        return {
            tabOne: "done",
            tabTwo: "current",
            tabThree: "none",
        }
    }
    else if (active === "personalize-message") {
        return {
            tabOne: "done",
            tabTwo: "done",
            tabThree: "current",
        }
    }
}

function makeActiveTabAlt(active) {
    if (active === "shipping-and-billing") {
        return {
            tabOne: "current",
            tabTwo: "none",
            tabThree: "none",
        }
    }
    else if (active === "payment") {
        return {
            tabOne: "done",
            tabTwo: "current",
            tabThree: "none",
        }
    }
    else if (active === "order-confirmation") {
        return {
            tabOne: "done",
            tabTwo: "done",
            tabThree: "current",
        }
    }
}

export {
    setSessionStorage,
    getSessionStorage,
    removeSessionStorage,
    unsetSessionStorage,
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    unsetLocalStorage,
    makeQueryString,
    makeActiveTab,
    makeActiveTabAlt
}
