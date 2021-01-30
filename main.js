console.log('CONNECTED');

const students = [
  {
    name: 'Gabby', 
    house: 'Slytherin',

  }
];

const printToDom = (divId, textToPrint) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = textToPrint;
}


const createStudentCards = (arr) => {
  let domString = '';
  for (let item of arr) {
    const i = arr.indexOf(item);
    domString += `<div class="card" style="width: 18rem;" id=${i}>
    <div class="card-body">
      <h5 class="card-title">${item.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${item.house}</h6>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <button type="button" class="btn btn-primary">Expel</button>
    </div>
  </div>`
  }
  printToDom('#students', domString);
}

const init = () => {
  createStudentCards(students);
}

init();
