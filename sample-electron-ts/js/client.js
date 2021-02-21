const btn = document.getElementById("btn:system-info");
const div = document.getElementById("div:system-info");

const exists = (el) => {
    return typeof el != "undefined" && el != null;
};

if (!exists(window.api)) {
    throw new Error("Failed to load script... bailing!");
}

if (exists(btn)) {
    btn.addEventListener("click", () => {
        window.api.electronIpcSend("system-info");
    });
}

window.api.electronIpcOn(
    "system-info_response",
    (_sender, { systemInformation }, ..._rest) => {
        if (exists(div)) {
            div.innerHTML = systemInformation;
        }
    }
);
