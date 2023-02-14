const month = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = month[today.getMonth()];
var yyyy = today.getFullYear();
let dateValue = `${dd} ${mm} ${yyyy}`;

let addBtn = document.getElementById("add_note");
let title = document.getElementById("title");
let description = document.getElementById("description");

addBtn.addEventListener("click", (e) => {
  if (title.value == "") {
    return alert("Please add title");
  }
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: title.value,
    description: description.value,
  };
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  //now we want the form to empty after we save in localstorage
  title.value = "";
  description.value = "";
  // as we have enter in localstorage, now its time to show the notes..right
  showNotes();
});

//fucntion showNotes()

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach((element, index) => {
    html += `
    <div class="card">
        <h3 class="note-title">${element.title}</h3>
        <p class="para-description">${element.description}</p>
        <div class="modify-buttons">
        <button id="${index}" class="del" onclick="deleteNote(this.id)" >Delete</button>
        <button id="${index}" class="edit" onclick="editNote(${index})" >Edit</button>
        </div>
        <p>${dateValue}</p>
      </div>
    `;
  });
  let notesElem = document.querySelector(".notes");
  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `<h3>No notes are tehre add please</h3>`;
  }
}
//function to delete note
function deleteNote(index) {
  let confirmDel = confirm("Are you want to delete this note?");
  let notes = localStorage.getItem("notes");
  if (confirmDel == true) {
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  }
}

//function to edit note
function editNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  title.value = notesObj[index].title;
  description.value = notesObj[index].description;
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}
showNotes();
