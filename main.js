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
    <div class="card-body" style="background-color:${item.house.color};">
      <h5 class="card-title">${item.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${item.house.houseName}</h6>
      <p class="card-text">${item.house.values}</p>
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
  //const houses = ["Slytherin", "Griffindor", "Hufflepuff", "Ravenclaw"];
  
  const houses = [
    {
      houseName: 'Gryffindor',
      color: '#9E0501',
      values: 'Bravery, daring, nerve, chivalry',
    },
    {
      houseName: 'Hufflepuff',
      color: '#F3CF00',
      values: 'Hard work, dedication, patience, loyalty and fair play'
    }, 
    {
      houseName: 'Ravenclaw',
      color: '#4480FF',
      values: 'Intelligence, knowledge, curiosity, creativity and wit'
    }, 
    {
      houseName: 'Slytherin',
      color: '#4A9D54',
      values: 'Ambition, leadership, self-preservation, cunning and resourcefulness'
    },
  ]
  const randomHouse = houses[Math.floor(Math.random() * houses.length)];

  const name = document.querySelector("#studentName").value;
  const house = randomHouse;

  //This creates an array for the student Ids + sorts them from lowest to highest
  const studentIds = students.map(student => student.id).sort((a, b) => a - b);

  //This creates an id that is the last item of array + 1, but if array is empty, the id will be 1. 
  const id = studentIds.length ? studentIds[(studentIds.length - 1)] + 1 : 1;

  const newStudent = {
    name,
    house,
    id,       
  };

  students.push(newStudent);
  createStudentCards(students);

  document.querySelector("form").reset();
};


expStudentCards = (arr) => {   
  let domString = '';

  for (let item of arr) {
    let i = arr.indexOf(item);
    domString += `<div class="card" style="width: 18rem;" id=${i}>
    <div class="card-body">
      <h5 class="card-title">${item.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${item.house}</h6>
      <h6 class="card-subtitle mb-2 text-muted">${item.id}</h6>
      <p>Expelled</p>
    </div>
  </div>`;
  }
  printToDom('#exp-students', domString);
  console.log(expStudents);
}

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



const buttonEvents = () => {
  document.querySelector("#start-sorting").addEventListener("click", createForm);
  document.querySelector("#students").addEventListener("click", expelStudent);
};

const init = () => {
  buttonEvents();
  createStudentCards(students);
  
};

init();
