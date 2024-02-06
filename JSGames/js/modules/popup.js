let popup = document.querySelectorAll('.popup')
let openPopupButtons = document.querySelectorAll('.open-popup')
let closePopupButton = document.querySelectorAll('.popup__body-closeButton')

openPopupButtons.forEach((button) => { 
    button.addEventListener('click', (e) => { 
        popup.forEach(elem=>{
            if(elem.getAttribute('name') === button.getAttribute('id')){
                e.preventDefault()
                elem.classList.add('activePopup')
                elem.children[0].classList.add('activePopup')
            }  
        })
    })
})

closePopupButton.forEach(btn =>{
    btn.addEventListener('click',() => { 
        popup.forEach(elem=>{
            if(elem.getAttribute('name') === btn.getAttribute('name')){
                elem.classList.remove('activePopup')
                elem.children[0].classList.remove('activePopup')
            }  
        })
    })
})

document.addEventListener('click', (e) => {
    popup.forEach(pb =>{
        if(e.target === pb) { 
            pb.classList.remove('activePopup')
            pb.children[0].classList.remove('activePopup')
        }
    })
})