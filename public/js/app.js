console.log("Client side javascript file is loading perfectly .....")

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');

//msg1.textContent = 'From javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    const url = '/weather?address=' + location;

    msg1.textContent = 'Loading...'
    msg2.textContent = '';

    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)
            msg1.textContent = data.error
        }
        else {
            // console.log(data.location)
            if(data.location != '') {
                msg1.textContent = data.location
            //console.log(data.Weather)
                msg2.textContent = data.Weather
            }
            else {
                msg1.textContent = 'Provide Some Location To Search'
            }
        }
    }) 

})

    console.log(location);
})