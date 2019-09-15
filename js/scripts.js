
/**
 * 
 * Hide current modal to show a new one
 * 
 */
function hideModal (button) {
   
        document.querySelector('.modal-info-container').remove();
        document.querySelector('.modal-container').style.display = 'none';
        //  prevButton.disabled = false;
        //  nextButton.disabled = false;
    

}

function disableButton(button) {
    button.disabled = true;
    button.style.backgroundColor = '#0099cc';
}

function enableButton(button) {
    button.disabled = false;
    button.style.backgroundColor = '#4CAF50';
}



//send a request to API
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        const people = JSON.parse(xhr.responseText).results;
        const gallery = document.getElementById('gallery');
        const modalContainer = document.createElement('div');
        const modal = document.createElement('div');
        modalContainer.style.display = 'none';   //hide modalContainer to show it when a user card is clicked
        modal.style.display = 'none';             //hide a modal card too


                //adding buttons to toggle between users when modal window is open
                const toggleDiv = document.createElement('div');
                toggleDiv.className = "modal-btn-container";
                const prevButton = document.createElement('button');
                prevButton.setAttribute('type', "button");
                prevButton.setAttribute('id', "modal-prev");
                prevButton.className = "modal-prev btn";
                prevButton.innerHTML = 'Prev';
                const nextButton = document.createElement('button');
                nextButton.setAttribute('type', "button");
                nextButton.setAttribute('id', "modal-next");
                nextButton.className = 'modal-next btn';
                nextButton.innerHTML = 'Next';
                toggleDiv.appendChild(prevButton);
                toggleDiv.appendChild(nextButton);
                modalContainer.appendChild(toggleDiv);

        let targetDiv;
        let parent;
        let grandparent;

        for (let i = 0; i < people.length; i++) {        //loop through all the people  
            const div = document.createElement('div');
            div.className = 'card';
            gallery.appendChild(div);
            div.style.display = 'block';

            const imgContainer = document.createElement('div');
            imgContainer.className = 'card-img-container';
            div.appendChild(imgContainer);

            const img = document.createElement('img'); 
            img.className = 'card-img';
            img.setAttribute('alt', "profile picture");
            const picture = people[i].picture;
            img.setAttribute('src', picture.large);
            imgContainer.appendChild(img);

            const information = document.createElement('div');
            div.appendChild(information);

            const name = document.createElement('h3');
            name.setAttribute('id', 'name');
            const fullName = people[i].name;
            name.innerHTML = fullName.title + ' ' + fullName.first + ' ' + fullName.last;
            name.className ="card-name cap";
            information.appendChild(name);

            const email = document.createElement('p');
            email.className = "card-text";
            email.innerHTML = people[i].email;
            information.appendChild(email);

            const cityState = document.createElement('p');
            cityState.className = "card-text cap";
            const location = people[i].location;
            cityState.innerHTML = location.city + ', ' + location.state;
            information.appendChild(cityState);

            div.addEventListener ('click', (event) => {   //add event listener for every person on the page
                modalContainer.className = "modal-container";
                modal.className = "modal";

                targetDiv = event.target;
                parent = targetDiv.parentElement;  //parent of a card div that was clicked
                grandparent = parent.parentElement;

                if (parent.className === 'card-img-container') {
                        if (targetDiv.previousElementSibling === null && parent.previousElementSibling === null && grandparent.previousElementSibling === null) {
                            disableButton(prevButton);
                        }
                        else if ((targetDiv.nextElementSibling === null && grandparent.nextElementSibling === null) 
                            || (grandparent.nextElementSibling.className === 'modal-container' && targetDiv.nextElementSibling === null)) {
                            disableButton(nextButton);
                        }
                } 
                if (grandparent.className === 'card') {
                        if (grandparent.previousElementSibling === null) {
                            disableButton(prevButton);
                        }
                        else if (parent.nextElementSibling === null && grandparent.nextElementSibling === null) {
                            disableButton(nextButton);
                        }
                }
                if (parent.className === 'card') {
                    if(targetDiv.previousElementSibling === null && parent.previousElementSibling === null) {
                        disableButton(prevButton);
                    }
                    else if(parent.nextElementSibling === null) {
                        disableButton(nextButton);
                    }
                }  
                if (parent.className === 'gallery') {
                    if (targetDiv.previousElementSibling === null) {
                        disableButton(prevButton);
                    }
                    else if (targetDiv.nextElementSibling === null && grandparent.nextElementSibling === null) {
                        disableButton(nextButton);
                    }
                }

                //create modal window for a card that was clicked
                const button = document.createElement('button');
                button.setAttribute('type', 'button');
                button.setAttribute('id', 'modal-close-btn');
                button.className = "modal-close-btn";
                const strong = document.createElement('strong');
                strong.innerHTML = 'X';
                button.appendChild(strong);
                modal.appendChild(button);

                const info = document.createElement('div');
                modal.appendChild(info);
                info.className = "modal-info-container";
                const imgModal = document.createElement('img');
                //const picture = people[i].picture;
                imgModal.setAttribute('src', picture.large);
                imgModal.setAttribute('alt', "profile picture");
                info.appendChild(imgModal);
                const nameModal = document.createElement('h3');
                nameModal.setAttribute('id', 'name');
                nameModal.className = "modal-name cap";
                //const fullName = people[i].name;
                nameModal.innerHTML = fullName.title + ' ' + fullName.first + ' ' + fullName.last;
                info.appendChild(nameModal);
                const emailModal = document.createElement('p');
                
                emailModal.className = "modal-text";
                emailModal.innerHTML = people[i].email;
                info.appendChild(emailModal);
                const cityModal = document.createElement('p');
                cityModal.className = "modal-text cap";
                //const location = people[i].location;
                cityModal.innerHTML = location.city;
                info.appendChild(cityModal);
                const hr = document.createElement('hr');
                info.appendChild(hr);

                const phone = document.createElement('p');
                phone.className = "modal-text";
                phone.innerHTML  =people[i].cell;
                info.appendChild(phone);

                const address = document.createElement('p');
                address.className = "modal-text";
                const street = location.street;
                const state = location.state;
                const postcode = location.postcode;
                address.innerHTML = street + ', ' + location.city + ', ' + state + ', ' + postcode;
                info.appendChild(address);

                const birthday = document.createElement('p');
                birthday.className = "modal-text";
                const dob = people[i].dob;
                birthday.innerHTML = dob.date.slice(0, 10);
                info.appendChild(birthday);
                modalContainer.appendChild(modal);
                
                gallery.appendChild(modalContainer);
                    
                modalContainer.style.display = 'block';
                modal.style.display = 'block';

                button.onclick = function() { //event listener for 'x' button on a modal
                        $('.modal-container').fadeOut();
                        document.querySelector('.modal-info-container').remove();
                        enableButton(prevButton);
                        enableButton(nextButton);
                };
            }) 
        }

        prevButton.addEventListener('click', () => {  //event listener for prev button
            enableButton(nextButton);
            if (parent.className === 'card-img-container') {
                    hideModal(prevButton);
                    grandparent.previousElementSibling.firstElementChild.firstElementChild.click();
            } else if (grandparent.className === 'card') {
                hideModal(prevButton);
                grandparent.previousElementSibling.firstElementChild.firstElementChild.click();
           } else if (parent.className === 'card') {
                hideModal(prevButton);
                parent.previousElementSibling.firstElementChild.firstElementChild.click();
           } else if (parent.className === 'gallery') {
                hideModal(prevButton);
                targetDiv.previousElementSibling.firstElementChild.firstElementChild.click();
           }
        })
        nextButton.addEventListener('click', () => {
            if (parent.className === 'card-img-container') {  //if an image is clicked
                enableButton(prevButton);
                hideModal(nextButton);
                grandparent.nextElementSibling.firstElementChild.firstElementChild.click(); 
           } else if (grandparent.className === 'card') {   //if info is clicked
                hideModal(nextButton);
                grandparent.nextElementSibling.firstElementChild.firstElementChild.click();
           } else if (parent.className === 'card') {      //if space around the image is clicked
              hideModal(nextButton);
            parent.nextElementSibling.firstElementChild.firstElementChild.click();
           } else if (parent.className === 'gallery') {  //if empty space around is clicked
                hideModal(nextButton);
                targetDiv.nextElementSibling.firstElementChild.firstElementChild.click();
            } 
        })        
    }
};
xhr.open('GET', 'https://randomuser.me/api/?results=12&nat=gb,us');
xhr.send();

const form = document.createElement('form');
form.setAttribute('action', '#');
form.setAttribute('method', "get");

const search = document.createElement('input');
search.setAttribute('type','search');
search.setAttribute('id','search-input');
search.className = "search-input";
search.setAttribute('placeholder','Search...');
form.appendChild(search);

const submit = document.createElement('input');
submit.setAttribute('type','submit');
submit.setAttribute('value', "🔍");
submit.setAttribute('id','search-submit');
submit.className = "search-submit";
form.appendChild(submit);
const parent = document.querySelector('.search-container');
parent.appendChild(form);

const input = document.querySelector('#search-input');
const button = document.querySelector('#search-submit');
const empty = /^(?!\s*$).+/;

//function to show all the people cards when the input is cleared by clicking the little cross inside it
function showCardsCrossPressed () {  
    const stringNames = document.querySelectorAll('#name');
    for(let g=0; g < stringNames.length; g++) {
        stringNames[g].parentElement.parentElement.style.display = 'block';
    }
}
input.addEventListener('search', () => {
      showCardsCrossPressed();
})

input.addEventListener ('keyup', () => {
    const isInputNotEmpty = empty.test(input.value);
    const stringNames = document.querySelectorAll('#name');

 for(let g=0; g < stringNames.length; g++) {
     if(isInputNotEmpty) {
         search = input.value.replace(/^\s+/, '').replace(/\s+$/, '');
     if (!stringNames[g].innerHTML.includes(search.toLowerCase())){
         stringNames[g].parentElement.parentElement.style.display = 'none';
     } else if (stringNames[g].innerHTML.includes(search.toLowerCase())) {
        stringNames[g].parentElement.parentElement.style.display = 'block';
     }} else if(!isInputNotEmpty){
        stringNames[g].parentElement.parentElement.style.display = 'block';
        } 
    }
})
