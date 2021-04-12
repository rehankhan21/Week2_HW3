let colors = ["blue", "orange", "black", "grey"]
let currentColor = 0;


let changeColor = () => {

    document.getElementById("circle").style.backgroundColor = colors[currentColor];
    currentColor++;
}
