const body=document.querySelector('body')
document.addEventListener("DOMContentLoaded", (event) => {
    body.classList.add('flipped')
    console.log("page is fully loaded, flipping site");
});


function flipBack(){
    body.classList.remove('flipped')
}