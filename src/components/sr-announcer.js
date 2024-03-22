const host = document.createElement("sr-announcer");
const shadow = host.attachShadow({ mode: "open" });

const politeAnnouncer = document.createElement("div");
politeAnnouncer.ariaLive = "polite";
politeAnnouncer.className = "sr-only";

const assertiveAnnouncer = document.createElement("div");
assertiveAnnouncer.ariaLive = "assertive";
assertiveAnnouncer.className = "sr-only";

shadow.appendChild(politeAnnouncer);
shadow.appendChild(assertiveAnnouncer);
document.body.appendChild(host);

export function announcePolitely(msg) {
   politeAnnouncer.textContent = msg;
}

export function announceAssertively(msg) {
   assertiveAnnouncer.textContent = msg;
}