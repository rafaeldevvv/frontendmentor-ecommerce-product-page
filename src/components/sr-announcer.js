const host = document.createElement("sr-announcer");
const shadow = host.attachShadow({ mode: "open" });

const srStyles = {
   clip: "rect(1px, 1px, 1px, 1px)",
   clipPath: "inset(50%)",
   height: "1px",
   width: "1px",
   margin: -"1px",
   overflow: "hidden",
   padding: "0",
   position: "absolute",
};

const politeAnnouncer = document.createElement("div");
politeAnnouncer.ariaLive = "polite";
Object.assign(politeAnnouncer.style, srStyles);

const assertiveAnnouncer = document.createElement("div");
assertiveAnnouncer.ariaLive = "assertive";
Object.assign(assertiveAnnouncer.style, srStyles);

shadow.appendChild(politeAnnouncer);
shadow.appendChild(assertiveAnnouncer);
document.body.appendChild(host);

export function announcePolitely(msg) {
   politeAnnouncer.textContent = msg;
}

export function announceAssertively(msg) {
   assertiveAnnouncer.textContent = msg;
}

export function placeAnnouncerTemporarily(parent) {
   parent.appendChild(host);
}

export function placeAnnouncerBack() {
   document.body.appendChild(host);
}