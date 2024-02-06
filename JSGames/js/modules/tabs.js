export function tabsWork(tabContainerName = 'tab-container'){
    const massBlock = document.querySelectorAll('.'+tabContainerName+'__content-tabcontent')
    massBlock.forEach(t => t.style.display = 'none')
    massBlock[0].style.display = 'block'
    document.querySelectorAll('.'+tabContainerName+'__items-tablinks').forEach(tab =>{
        tab.addEventListener('click', ()=>{
            massBlock.forEach(t => { 
                t.style.display = 'none'
                t.classList.remove('activeTab')
            })
            document.getElementById(tab.getAttribute('name')).style.display = 'block'
            document.getElementById(tab.getAttribute('name')).classList.add('activeTab')
        })
    })
}


