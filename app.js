let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const modal = document.querySelector(".modal");
const employeeSearch = document.querySelector("#search-employees");
// const modalChange = document.querySelector(".change-modal");
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



    // if (e.target === modalArrowLeft || modalArrowRight) {
    for (let i = 0; i < employees.length; i++) {
        if (getCurrentModalEmail === employees[i].email) {
            //console.log(employees[i].email);
            // if (modalArrowRight) {

            //     console.log(employees[i + 1].email);
            // }
            if (e.target === modalArrowLeft) {
                console.log(employees[i - 1].email);
            }
            if (e.target === modalArrowRight) {
                console.log(employees[i + 1].email);
            }

        }
        // }


    }



});





