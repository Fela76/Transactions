const h1 = document.querySelector("h1");
h1.addEventListener("mouseover", () => {
    h1.style.color = "red";
    h1.style.fontSize = "2rem";
});
h1.addEventListener("mouseout", () => {
    h1.style.color = "";
    h1.style.fontSize = "";
});