let setData =  document.querySelector(".get-Data")
let formContent = document.querySelector(".formContent")
let form = document.createElement("form")
let paragraph = document.createElement("h4")
let button = document.createElement("button")
let catigory = document.querySelector(".CATIGORY")
let groups = document.querySelector(".groups")
let PRODUCT = document.querySelector(".PRODUCT")
let SALES = document.querySelector(".SALES")
let keys = document.querySelector(".keys")
let tb = document.querySelector(".tb")
let n = 0
let inbt = ""


catigory.addEventListener("click",function(){
    inbt = "catigory"
    paragraph.innerHTML = "New Catigory"
    formContent.appendChild(paragraph)
    formContent.appendChild(form)
    form.innerHTML = `<label for="lb" class="lb">New Catigory:</label>
            <input type="text"name="new">`
            // <label for="lb" class="lb">select category:</label>
            // <select name="select" id=""></select>
    form.appendChild(button)
    button.innerHTML="Add"
    data = fetch("category.php")
        .then(response => response.json())
        .then(response => {console.log(response)
        let text = `<table>
             <tr>
             <th> ID OF CATEGORY </th>
             <th> NAME OF CATEGORY </th>
             <th> Modifie </th>
             <th> Delete</th>
             </tr>`
            for(x of response){
            text += `<tr>
            <td class='id'>${x.ID_CATEGORY}</td>
            <td class='name'>${x.NAE_CATIGORY}</td>
            <td class='name'>${x.IMG_CATEGORY}</td>
            <td><i class='fa-solid fa-pen 'id='modifie' alt=${x.ID_CATEGORY}></i></td>
            <td><i class= 'fa-solid fa-trash delete' id='delete' alt=${x.ID_CATEGORY}></i></td>
            </tr>`
            }
            text += `</table>`;
            tb.innerHTML = text
            deletf()
            modefie()
        })
    .catch(error => console.log("error"));
    button.setAttribute("alt","addcategory")
})


groups.addEventListener("click",function(){
    inbt = "group"
    paragraph.innerHTML="New Group"
    formContent.appendChild(paragraph)
    formContent.appendChild(form)
    form.innerHTML = `<label for="lb" class="lb">New group:</label>
            <input type="text"name="new">
            <label for="lb" class="sel">select category:</label>
            <select name="select" id=""></select>`
    form.appendChild(button)
    button.innerHTML="Add"
    datacat = fetch("category.php")
        .then(responseone => responseone.json())
        .then(responseone => {console.log(responseone)
        for(x of responseone){
            form.elements.select.innerHTML += `<option value="${x.ID_CATEGORY}">${x.NAE_CATIGORY}</option>`
        }
    })
        
    data = fetch("group.php")
        .then(response => response.json())
        .then(response => {console.log(response)
        let text = `<table>
             <tr>
             <th> ID OF GROUP </th>
             <th> NAME OF GROUP </th>
             <th> NAME OF CATEGORY </th>
             <th> Modifie </th>
             <th> Delete</th>
             </tr>`
            for(x of response){
            text += `<tr>
            <td class='id'>${x.ID_GRP}</td>
            <td class='name'>${x.NAME_GROUP}</td>
            <td>${x.NAE_CATIGORY}</td>
            <td><i class='fa-solid fa-pen 'id='modifie' alt=${x.ID_GRP}></i></td>
            <td><i class= 'fa-solid fa-trash delete' id='delete' alt=${x.ID_GRP}></i></td>
            </tr>`
            }
            text += `</table>`;
            tb.innerHTML = text
            deletf()
            modefie()
        })
    .catch(error => console.log("error"));
    button.setAttribute("alt","addgroup")
})

form.addEventListener("input",function(e){
    e.preventDefault()
})

function modefie(){
    let modifi = document.querySelectorAll("#modifie");
    let delet = document.querySelectorAll("#delete");
    let name = document.querySelectorAll(".name")
    let input = form.elements.new

    modifi.forEach(function(e,i){
        let label = document.querySelector(".lb")
        e.addEventListener("click",function(){
            button.setAttribute("alt","category")
            button.innerHTML = "modifie"
            paragraph.innerHTML="modifie"
            label.innerHTML=" modifie:"
            let statu = "id_modifie"
            input.value = name[i].innerHTML
            let ido = e.getAttribute("alt")
            let req = new XMLHttpRequest();
            req.open("POST", "modifie.php");
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            req.send("ido=" + ido+ "&statu=" + statu);
            req.onload = () => {
                console.log(req.responseText);
                n = req.responseText 
            };
        })
    }) 
}

function deletf(){
    let delet = document.querySelectorAll("#delete");
   delet.forEach(function(e,i) {
    let statu = "id_delete"
        e.addEventListener("click",function(){
            let ido = e.getAttribute("alt")
            let req = new XMLHttpRequest();
            req.open("POST", "modifie.php");
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            req.send("ido=" + ido+ "&statu=" + statu+ "&inbt=" + inbt);
            req.onload = () => {
                console.log(req.responseText);
                n = req.responseText 
            };
            // document.location.reload()
        })
   })
}

button.addEventListener("click",function(){
    let statu = "";
    let input = form.elements.new
if(inbt == "category"){
    if (input.value !=="") {
        statu = "category"
        let req = new XMLHttpRequest();
        req.open("POST", "modifie.php");
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.send("statu=" + statu+ "&ido="+ n+ "&content="+ input.value);
        req.onload = () => {
            console.log(req.responseText);
        };
        // document.location.reload()
        // document.location.reload()
    }else{
        form.elements.new.style.borderColor ="red"
    }
}else if (button.getAttribute("alt")=="addcategory") {
    if (input.value !=="") {
        statu = "addcategory"
        let req = new XMLHttpRequest();
        req.open("POST", "modifie.php");
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.send("statu=" + statu+ "&content="+ input.value);
        req.onload = () => {
            console.log(req.responseText);
        };
        // document.location.reload()
        // document.location.reload()
    }else{
        form.elements.new.style.borderColor ="red"
    }
}else if(inbt == "group" ){
    if (input.value !=="") {
        statu = "groupM"
        let req = new XMLHttpRequest();
        req.open("POST", "modifie.php");
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.send("statu=" + statu+ "&ido="+ n+ "&content="+ input.value);
        req.onload = () => {
            console.log(req.responseText);
        };
        // document.location.reload()
        // document.location.reload()
    }else{
        form.elements.new.style.borderColor ="red"
    }
}else if (button.getAttribute("alt") == "addgroup") {
    if (input.value !== "") {
        let sel = form.elements.select.value
        statu = "addgroup"
        console.log("Content:", input.value);
        console.log("Selected category:", sel);
        let req = new XMLHttpRequest();
        req.open("POST", "modifie.php");
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.send("statu=" + statu + "&content=" + input.value + "&sel=" + sel);
        req.onload = () => {
            console.log("Response:", req.responseText);
        };
    } else {
        form.elements.new.style.borderColor = "red"
    }
}
})