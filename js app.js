console.log('Welcome To Notes Making App This is app.js')
showNotes();
//if user add a note, add it to the localStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    //console.log(notesObj);
    showNotes();
})
//Function to show local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div  class="notecard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">Note ${index + 1} </h5>
            <P class="card-title"> ${element }</p> 
            <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div> 
        `;

    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to Show! use "Add A Note" section to add notes.  `;

    }
}

// function to Delete note
function deleteNote(index) {
    //console.log(`I Am Deleting`, index);
    //to read localStorage
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    //To update the localStorage
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//Now, function to search a note 
let searchT = document.getElementById('searchT ');
searchT.addEventListener("input", function(){

    let inputVal=searchT.value.toLowerCase();
    //console.log('Input Event Fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt= element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
        //console.log(cardTxt) 
    })

})
