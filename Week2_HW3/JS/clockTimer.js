// when the document is loaded, trigger the "documentLoaded" function
window.addEventListener('DOMContentLoaded', documentLoaded, false);

var startTime;
let limit;
let limitmin;
let limitsec;
let temp;

function documentLoaded() {
    "use strict";

    // listen for mouse clicks on the button

    document.getElementById("btnStart").addEventListener("click", buttonClicked, false);
    document.getElementsByClassName("editable-in-place")[0].addEventListener("click", clicked);
    //let test = document.getElementsByClassName("editable-in-place")[4].addEventListener("click", clicked);

    console.log("Document Change");
    //console.log(test);

}

/* when we click on the button, we save the current time, and the time limit. We then 
    create a timer to execute the "updateTime" function once a second.

*/
function buttonClicked() {
    "use strict";

    startTime = new Date();

    limit = parseInt(document.getElementById("txtTempo").value);

    clearInterval(temp);
    temp = setInterval(updateTime, 1000);
}

function updateTime() {
    "use strict";

    //read the current time
    var currentTime = new Date();

    // calculate how many seconds passed since the start of the timer
    var elasped = (currentTime.getTime() - startTime.getTime()) / 1000;

    // convert seconds to minutes and seconds (below 60)
    var minutes = Math.floor(elasped / 60);
    var seconds = Math.floor(elasped % 60);

    // pad with zeroes on the left to look better
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    //show the elapsed time
    document.getElementById("clock").innerHTML = minutes + ":" + seconds;
    var red = document.getElementById("changeColor").classList.contains("red");

    // check if we are above the time limit and set the color of the timer accordingly
    // if changed to color red, then remain red
    if (minutes >= limitmin && seconds >= limitsec) {

        document.getElementById("mins").style.backgroundColor = "red";
        document.getElementById("secs").style.backgroundColor = "red";
        document.getElementById("clock").className = "red";
        document.getElementById("changeColor").classList.remove("blue");
        document.getElementById("changeColor").classList.add("red");
    }
    else if (red == true) {

        document.getElementById("clock").className = "red";
        document.getElementById("changeColor").classList.remove("blue");
        document.getElementById("changeColor").classList.add("red");
    }
    else if (Number.isNaN(limitmin) && seconds >= limitsec) {

        document.getElementById("mins").style.backgroundColor = "red";
        document.getElementById("secs").style.backgroundColor = "red";
        document.getElementById("clock").className = "red";
        document.getElementById("changeColor").classList.remove("blue");
        document.getElementById("changeColor").classList.add("red");
    }
    else {

        document.getElementById("clock").className = "blue";
        document.getElementById("changeColor").classList.remove("red");
        document.getElementById("changeColor").classList.add("blue");
    }

}

function clicked(evt) {

    /* get the children of editable class and make an array of its children elements
        for all input tags and div tags, then take the first span tag and put it in a variable.
    */
    var input = this.querySelectorAll("input");
    var label = this.querySelectorAll("div");
    var span = this.querySelector("span");

    // Clears the ongoing timer if there is one.
    clearInterval(temp);

    if (evt.target === input[0] || evt.target === input[1]) {
        // if user clicked on <input> do nothing, he is editing

    } else if (evt.target === label[0] || evt.target === label[1]) {

        //Removes the hide class for all inputs and adds the hide class to all divs
        for (let i = 0; i < input.length; i++) {
            var test = input[i];
            test.classList.remove("hide");
        }

        //Removes the hide class from span
        span.classList.remove("hide")

        for (let i = 0; i < label.length; i++) {
            var testL = label[i];
            testL.classList.add("hide");
        }

        //input.classList.remove("hide");

        //  and hide the label
        //label.classList.add("hide");

        // fill the <input> with the text from the label
        //input.value = label.innerHTML;

        // listens for the "ENTER" to be pressed
        input[0].addEventListener("keydown", function keydown(evt) {

            // 13 is the code for ENTER
            if (evt.keyCode === 13) {
                //label.innerHTML = input.value;

                //Sets the new values for the update function 
                startTime = new Date();
                var min = parseInt(input[0].value);
                limitmin = min;


                // its important to remove the keydown listener, otherwise in a subsequent edit
                // we will end up with several keydown listeners running
                input[0].removeEventListener("keydown", keydown);

                // Shifts the focus on enter click from the first input too the second
                if(typeof(limitmin) == "number" )
                input[1].focus();
            }

        });


        // A second event listener for the second input field
        input[1].addEventListener("keydown", function keydown(evt) {

            // 13 is the code for ENTER
            if (evt.keyCode === 13) {

                startTime = new Date();
                var sec = parseInt(input[1].value);
                limitsec = sec;
                clearInterval(temp);
                temp = setInterval(updateTime, 1000);

                //label.classList.remove("hide");

                // After seting the new values from both inputs we then hide the input fields
                for (let i = 0; i < label.length; i++) {
                    label[i].classList.remove("hide");
                }

                for (let i = 0; i < input.length; i++) {
                    input[i].classList.add("hide");
                }

                span.classList.add("hide");


                // its important to remove the keydown listener, otherwise in a subsequent edit
                // we will end up with several keydown listeners running
                input[1].removeEventListener("keydown", keydown);
            }

        });

        // This else is for when they click off input field without editing anything
    } else {
        // <input> was visible, hide it without modifying the value
        //input.classList.add("hide");

        for (let i = 0; i < input.length; i++) {
            var test = input[i];
            test.classList.add("hide");
        }

        span.classList.add("hide");


        // show the label
        //label.classList.remove("hide");

        for (let i = 0; i < label.length; i++) {
            var testL = label[i];
            testL.classList.remove("hide");
        }
    }

}

