console.log('app loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageSecond = document.querySelector('#message-2')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    // evitar recarga de la pagina
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageSecond.textContent = ''
    const uri = '/weather?address=' + location
    fetch(uri).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageSecond.textContent = data.forecast
            }
        })
    })
})