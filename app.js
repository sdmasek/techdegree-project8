let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const modal = document.querySelector(".modal");
const employeeSearch = document.querySelector("#search-employees");
const modalArrowLeft = document.querySelector(".change-modal-left");
const modalArrowRight = document.querySelector(".change-modal-right");
const textContainer = modal.querySelector(".text-container");

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));

function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = "";


    employees.forEach((employee, index) => {

        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;



        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}"/>
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        `;
    });

    gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];




    let date = new Date(dob.date);

    const modalHTML = `
        <img class="avatar" src="${picture.large}"/>
        <div class="text-container">
            <div class="change-modal-container">
            <h2 class="name">${name.first} ${name.last}</h2>
           
            </div>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p class="phone">${phone}</p>
            <p class="address">${street.name}, ${state} ${postcode}</p>
            <p class="birthday">${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;

}

gridContainer.addEventListener('click', e => {

    if (e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        console.log("card was clicked");
        displayModal(Number(index));
    }

});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});

//create a function that goes to the next employee when an 
//arrow is clicked
//Get the currently instantiated employees


modal.addEventListener('click', e => {
    //get the element that holds the current email displayed on modal
    let getCurrentModalEmail = document.getElementsByClassName('text-container')
    [12].getElementsByClassName('email')[0].innerHTML;
    //create an empty index that the new modal will fill
    let targetIndex = null;

    if (e.target === modalArrowLeft) {

        for (let i = 0; i < 11; i++) {
            if (getCurrentModalEmail === employees[i].email && i !== 0) {
                targetIndex = i - 1;
                console.log(targetIndex);
                displayModal(targetIndex);
            }
        }
    }

    if (e.target === modalArrowRight) {
        for (let i = 0; i < 11; i++) {
            if (getCurrentModalEmail === employees[i].email && i !== 11) {
                targetIndex = i + 1;
                console.log(targetIndex);
                displayModal(targetIndex);
            }
        }
    }

});

//Search the employee directory by requesting a random user nationality that returns
//only data in the english alphabet (So a regex [A-Za-z])

//the search should take place in the grid container
//a keyup eventlistner should be added to the search element

employeeSearch.addEventListener('keyup', (e) => {
    //get the name that's stored in each card's text container
    let search = e.target.value.toLowerCase();
    let card = document.querySelector(".card");
    let employeeCards = document.getElementsByClassName("card");

    for (let i = 0; i < employeeCards.length; i++) {
        //get the employee's first and last name to be displayed
        let employeeName = employeeCards[i].querySelector(".name");
        employeeName = employeeName.textContent;
        employeeName = employeeName.toString().toLowerCase();
        if (employeeName.includes(search)) {
            //either display the employee card or just list their name?
            employeeCards[i].style.display = "block";

        } else {
            employeeCards[i].style.display = "none";
        }
    }

});










