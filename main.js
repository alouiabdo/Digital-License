//bars

let bars = document.querySelector(".bars");
let SN = document.querySelector(".SN");
bars.addEventListener("click",function (){
    if(SN.hasAttribute("style")){
        SN.removeAttribute("style")
    }else{
        SN.setAttribute("style","display: block;") 
    }
})

// product

let buttons = document.querySelectorAll(".bt")
console.log(buttons)

buttons.forEach(
function(e,i){
e.addEventListener("click",function(){
    console.log(e.parentElement.children[2])
})
}
)

// /////////////////////////////////////////////////////

let basket = document.querySelector(".basket");
let xmark  = document.getElementById("xmark");
xmark.addEventListener("click", function(){
    basket.setAttribute("style","display: none;")
    console.log("click")
})

let shopping = document.querySelector(".shopping")
shopping.addEventListener("click",function(){
    console.log("click")
    basket.removeAttribute("style")
})

