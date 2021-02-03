console.log("CONNECTED");

const students = [];

const expStudents = [];

const printToDom = (divId, textToPrint) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = textToPrint;
};

// Function creates and prints student cards to DOM
const createStudentCards = (arr) => {
  let domString = "";
  for (let item of arr) {
    const i = arr.indexOf(item);
    domString += `<div class="card" style="width: 18rem;" id=${i}>
    <div class="card-body">
      <h5 class="card-title">${item.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${item.house}</h6>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <button type="button" class="btn btn-primary" id="expelButton">Expel</button>
    </div>
  </div>`;
  }
  printToDom("#students", domString);
};

//Function adds form to the DOM when button is clicked
const createForm = () => {

  let formString = `<form>
    <div class="form-group">
      <label for="studentName">Student name:</label>
      <input type="text" class="form-control" id="studentName" aria-describedby="name" placeholder="Enter your name" required>
    </div>
    <div class="invalid-feedback">
      You must enter your name. 
    </div>
    <button type="submit" class="btn btn-primary">Sort</button>
  </form>`;

  printToDom("#createForm", formString);
  document.querySelector("form").addEventListener("submit", getFormInfo);
};

//Function to grab info from the form
const getFormInfo = (e) => {
  e.preventDefault();
  const houses = ["Slytherin", "Griffindor", "Hufflepuff", "Ravenclaw"];
  const randomHouse = houses[Math.floor(Math.random() * houses.length)];

  const name = document.querySelector("#studentName").value;
  const house = randomHouse;

  const newStudent = {
    name,
    house,
  };

  students.push(newStudent);
  createStudentCards(students);

  document.querySelector("form").reset();
};

const expelStudent = (e) => {
  const targetId = e.target.id;
  const targetType = e.target.type;
  if (targetType === "button") {
    let exp = students.splice(targetId, 1);
    expStudents.push(...exp);
  }
  createStudentCards(students); //Rebuilding student cards w/o expelled students
  expStudentCards(expStudents);   //Building expelled student cards
 
};
//Building cards for expelled students
expStudentCards = (arr) => {   
  let domString = '';

  for (let item of arr) {
    let i = arr.indexOf(item);
    domString += `<div class="card" style="width: 18rem;" id=${i}>
    <div class="card-body">
      <h5 class="card-title">${item.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${item.house}</h6>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <button type="button" class="btn btn-primary" id="expelButton">Expel</button>
    </div>
  </div>`;
  }
  printToDom('#exp-Students', domString);
}


const buttonEvents = () => {
  document.querySelector("#start-sorting").addEventListener("click", createForm);
  document.querySelector("#students").addEventListener("click", expelStudent);
};

const init = () => {
  buttonEvents();
  createStudentCards(students);
};

init();
