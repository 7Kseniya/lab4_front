export function clearSVG() {
    const svg = document.querySelector("svg");
    const circles = svg.querySelectorAll("circle");
    circles.forEach((circle) => {
        svg.removeChild(circle);
    });
}

export const setRound = (cx, cy, flag) => {
    const svg = document.querySelector("svg");
    const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
    );
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", "5");
    if (flag) {
        circle.setAttribute("fill", "beige");
    } else {
        circle.setAttribute("fill", "black");
    }
    svg.appendChild(circle);
};

export const changeR = (r) => {
    const elements = {
        Ry: r,
        "R/2y": r / 2,
        "-R/2y": -r / 2,
        "-Ry": -r,
        Rx: -r,
        "R/2x": -r / 2,
        "-R/2x": r / 2,
        "-Rx": r,
    };
    for (const id in elements) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = elements[id] ? elements[id].toString() : "";
        }
    }
}
