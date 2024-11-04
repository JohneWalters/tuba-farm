/*    JavaScript 7th Edition
      Chapter 4
      Chapter case

      Tuba Farm Equipment
      Variables and functions
      Author: Johne Walters
      Date: 11/4/24 

      Filename: script.js
 */
"use strict"; // Added to enforce strict mode for better error checking

/* global variables tracking status of each form section */
let acresComplete = true; // Added 'let' keyword
let cropsComplete = true;
let monthsComplete = true;
let fuelComplete = true;

/* global variables referencing sidebar h2 and p elements */
let messageHeadElement = document.getElementById("messageHead");
let messageElement = document.getElementById("message");

/* global variables referencing fieldset elements */
let acresFieldset = document.getElementsByTagName("fieldset")[0];
let cropsFieldset = document.getElementsByTagName("fieldset")[1];
let monthsFieldset = document.getElementsByTagName("fieldset")[2]; // Added '='
let fuelFieldset = document.getElementsByTagName("fieldset")[3]; // Added closing double quote

/* global variables referencing text input elements */
let monthsBox = document.forms[0].months;
let acresBox = document.forms[0].acres;

/* Tractor Model Descriptions */
let E3250Desc = "A workhorse for a small farm or a big backyard. A medium- to heavy-duty tractor that can haul whatever you throw at it year-round.";
let E2600Desc = "Perfect for a small farm, or just a big backyard. A light- to medium-duty tractor that can make short work of most any chore.";
let W1205Desc = "Can't be beat for the general tasks of a large farm. Medium- to heavy-duty muscle that's there then you need it.";
let W2500Desc = "Our heavy-duty tractor designed especially for the needs of wheat, corn, and soy farmers. A reliable piece of equipment that you can turn to all year long.";
let W2550Desc = "Our heavy-duty tractor for general use. A reliable piece of equipment that you can turn to all year long.";

/* create event listeners when page finishes loading */
window.addEventListener("load", createEventListeners);

/* create event listeners for all input elements */
function createEventListeners() {   
   acresBox.value = ""; // clear acres text box on page load
   monthsBox.value = ""; // clear months text box on page load

   acresBox.addEventListener("input", verifyAcres); 
   
   let cropsBox;
   for (let i = 0; i < 7; i++) {
      cropsBox = cropsFieldset.getElementsByTagName("input")[i];
      cropsBox.checked = false;      
      cropsBox.addEventListener("click", verifyCrops); 
   }
   
   monthsBox.addEventListener("input", verifyMonths); 

   let fuelBox;
   for (let i = 0; i < 3; i++) {
      fuelBox = fuelFieldset.getElementsByTagName("input")[i];     
      fuelBox.addEventListener("click", verifyFuel); 
   }
}



/* verify acres text box entry is a positive number */
function verifyAcres() {
   try {
      if (!(acresBox.value > 0)) throw "Enter a positive acreage"; // Added error handling for positive number
      testFormCompleteness();
   } catch(error) {
      messageElement.innerHTML = error; // Display error message
      messageHeadElement.innerHTML = ""; // Clear message head
   }
}

/* verify at least one crops checkbox is checked */
function verifyCrops() {
   testFormCompleteness();
}

/* verify months text box entry is between 1 and 12 */
function verifyMonths() {
   try {
      if (!(monthsBox.value >= 1 && monthsBox.value <= 12)) 
         throw "Enter months between 1 and 12"; // Added error handling for valid month range
      testFormCompleteness();
   } catch(error) {
      messageElement.innerHTML = error; // Display error message
      messageHeadElement.innerHTML = ""; // Clear message head
   }
}

/* verify that a fuel option button is selected */
function verifyFuel() {
   testFormCompleteness();
}

/* check if all four form sections are completed */
function testFormCompleteness() {
   if (acresComplete && cropsComplete && monthsComplete && fuelComplete) {
      createRecommendation();
   }
}

/* generate tractor recommendation based on user selections */
function createRecommendation() {
   if (acresBox.value <= 5000) { // Changed logic to '5000 acres or less'
      if (monthsBox.value >= 10) { // Changed logic to '10+ months of farming per year'
         messageHeadElement.innerHTML = "E3250";
         messageElement.innerHTML = E3250Desc;        
      } else { // 9 or fewer months per year
         messageHeadElement.innerHTML = "E2600";
         messageElement.innerHTML = E2600Desc;           
      }
   } else { // more than 5000 acres
      if (monthsBox.value <= 9) { // 9 or fewer months per year, no crop test needed
         messageHeadElement.innerHTML = "W1205";
         messageElement.innerHTML = W1205Desc;
      } else { // 10+ months of farming per year
         if (document.getElementById("wheat").checked || document.getElementById("corn").checked || document.getElementById("soy").checked) {
            messageHeadElement.innerHTML = "W2500";
            messageElement.innerHTML = W2500Desc;
         } else {
            messageHeadElement.innerHTML = "W2550";
            messageElement.innerHTML = W2550Desc;
         }
      }
   }
   
   if (document.getElementById("E85").checked) { // add suffix to model name based on fuel choice
      messageHeadElement.innerHTML += "E";
   } else if (document.getElementById("biodiesel").checked) {
      messageHeadElement.innerHTML += "B"; // Corrected to concatenate "B"
   } else {
      messageHeadElement.innerHTML += "D";  
   }
}