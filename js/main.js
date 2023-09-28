const milestonesData = JSON.parse(data).data;

//load course milestones

function loadMilestones() {
  const milestones = document.querySelector(".milestones");

  milestones.innerHTML = `${milestonesData
    .map(function (milestone) {
      return `<div class="milestone border-b"  id ="${milestone._id}">
    <div class="flex">
      <div class="checkbox"><input type="checkbox"  onclick = "markMilestone(this, ${
        milestone._id
      } )" /></div>
      <div onclick = "showPanel(this, ${milestone._id})"> 
        <p>
          ${milestone.name}
          <span><i class="fas fa-chevron-down"></i></span>
        </p>
      </div>
    </div>
    <div class="hidden_panel">
      ${milestone.modules
        .map(function (module) {
          return `<div class="module border-b">
        <p>${module.name}</p>
      </div>`;
        })
        .join("")}
    </div>
  </div>`;
    })
    .join("")}`;
}
function showPanel(clickedElement, id) {
  const needToShow = clickedElement.parentNode.nextElementSibling;

  //remove boldness of previous milesotne title
  const activeElement = document.querySelector(".active");
  if (!clickedElement.classList.contains("active") && activeElement) {
    activeElement.classList.remove("active");
  }
  //bold the clicked milestone title
  clickedElement.classList.toggle("active");

  //close the previous milestone
  const alreadyShowed = document.querySelector(".show");
  if (!needToShow.classList.contains("show") && alreadyShowed) {
    alreadyShowed.classList.remove("show");
  }
  //show the clicked milesotne
  needToShow.classList.toggle("show");
  showMilestone(id); // here id is qual to the array number where _id = 0 for array 0 number index
}

function showMilestone(id) {
  const milestoneImage = document.querySelector(".milestoneImage");
  milestoneImage.style.opacity = "0"; //making the image invisible for making a beautiful trnsiction
  milestoneImage.src = milestonesData[id].image; // changing the image
  const name = document.querySelector(".title");
  name.innerText = milestonesData[id].name; // changing the title bottom image
  const details = document.querySelector(".details");
  details.innerText = milestonesData[id].description; //changing the description bottom main title
}
//listen for hero image load for making a beautiful trnsiction
const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function () {
  this.style.opacity = "1";
};
function markMilestone(checkbox, id) {
  const doneList = document.querySelector(".doneList");
  const milestonesList = document.querySelector(".milestones");
  const item = document.getElementById(id);

  if (checkbox.checked) {
    milestonesList.removeChild(item); //remove the item from milestone
    doneList.appendChild(item); // add to doneList
  } else {
    doneList.removeChild(item);
    milestonesList.appendChild(item);
    
  }
}
loadMilestones();
