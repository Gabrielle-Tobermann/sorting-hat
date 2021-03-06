import VoldemortWon from './Modules/VoldermortWon.js';
console.log("CONNECTED");

const students = [];

const expStudents = [];

const printToDom = (divId, textToPrint) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = textToPrint;
};


const createStudentCards = (arr) => {
  let domString = "";
  for (let item of arr) {
    const i = arr.indexOf(item);
    domString += `<div class="card" style="width: 18rem;" id=${i}>
    <div class="card-body" id="student-card" style="background-color:${item.house.color};>
      <h5 class="card-title">${item.name}</h5>
      <h6 class="card-subtitle mb-2 text-white">${item.house.houseName}</h6>
      <p class="card-text">${item.house.values}</p>
      <button type="button" class="btn btn-dark" id="expelButton">Expel</button>
    </div>
  </div>`;
  }
  printToDom("#students", domString);
};

const createForm = () => {

  let formString = `<form>
    <div class="form-group">
      <label for="studentName">Student name:</label>
      <input type="text" class="form-control" id="studentName" aria-describedby="name" placeholder="Enter your name" required>
    </div>
    <div class="invalid-feedback">
      You must enter your name. 
    </div>
    <button type="submit" class="btn btn-outline-dark">Sort</button>
  </form>`;

  printToDom("#createForm", formString);
  document.querySelector("form").addEventListener("submit", getFormInfo);
};


const getFormInfo = (e) => {
  e.preventDefault();
  
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

  const newStudent = {
    name,
    house,     
  };

  students.push(newStudent);
  createStudentCards(students);

  document.querySelector("form").reset();
};


const expStudentCards = (arr) => {   
  let domString = '';

  for (let item of arr) {
    let i = arr.indexOf(item);
    domString += `<div class="card" style="width: 18rem;" id=${i}>
    <div class="card-body" id="exp-card">
      <h5 class="card-title">${item.name} has joined Voldemort</h5>
      <img src="https://static3.srcdn.com/wordpress/wp-content/uploads/2019/09/voldemort-3.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5">
    </div>
  </div>`;
  }
  printToDom('#exp-students', domString);
};


const expelStudent = (e) => {
  const targetId = e.target.id;
  const targetType = e.target.type;
  if (targetType === "button") {
    let exp = students.splice(targetId, 1);
    expStudents.push(...exp);
  }

  if (students.length === 0) {
    let stringToPrint = `<div id="v-msg">Voldemort's Army has taken over Hogwarts</div>`;
    printToDom('#Voldemort-army', stringToPrint);
    VoldemortWon();
    }

  createStudentCards(students); 
  expStudentCards(expStudents); 
  
};

const clickEvents = () => {
  document.querySelector("#start-sorting").addEventListener("click", createForm);
  document.querySelector("#students").addEventListener("click", expelStudent);
};

const init = () => {
  clickEvents();
  createStudentCards(students);
};

init();
