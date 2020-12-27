console.log("This is index.js");
//window.localStorage.clear(); 

threshold();
let index=0;
// Constructor
function Book(id, name, author, type) {
    this.id = id;

    this.name = name;
    this.author = author;
    this.type = type;
}

// Display Constructor
function Display() {
}

// Add methods to display prototype
Display.prototype.add = function (book) {
     console.log("Adding to UI");
    //  let author_id = document.getElementById("author");
    //  let book_id = document.getElementById("bookName");
    
     notesObj = ConvertToArray();
     notesObj.push(book);
     localStorage.setItem("notes",JSON.stringify(notesObj));
     console.log(notesObj);
    //  author_id.value="";
    //  book_id.value="";
    printRow(book);
    
}

function ConvertToArray(){
    let notes = localStorage.getItem("notes");
    if(notes==null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    return notesObj;
}

function printRow(book){
    tableBody = document.getElementById('tableBody');
    let uiString = `<tr class="messg">
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                        <td><button class="btn btn-danger" onclick="deleteBook(${book.id})" data-toggle="modal" data-target="#exampleModal">Delete</button></td>
                    </tr>`;
    tableBody.innerHTML += uiString;
}
 
function threshold(){

    notesObj = ConvertToArray();
    for(let i = 0;i < notesObj.length;i++){
        printRow(notesObj[i]);
    }

}

// Implement the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

var index_id="";
// Implement to delete the book
function deleteBook(bookid){
    index_id = bookid;
    console.log("In Delete Box");
    // notesObj = ConvertToArray();
    
    // for(let i = 0;i < notesObj.length;i++){
    //     if(notesObj[i]['id'] === index){
    //         notesObj.splice(i, 1);
    //         localStorage.setItem("notes",JSON.stringify(notesObj));
    //         tableBody.innerHTML = "";
    //         threshold();
    //         return;
    //     }
    // }
    
   
}

function confirmDelete(){
    notesObj = ConvertToArray();
    console.log("In Confirmation Box");
    for(let i = 0;i < notesObj.length;i++){
        if(notesObj[i]['id'] === index_id){
            notesObj.splice(i, 1);
            localStorage.setItem("notes",JSON.stringify(notesObj));
            tableBody.innerHTML = "";
            threshold();
            return;
        }
    }
}

// Implement the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false
    }
    else {
        return true;
    }
}
Display.prototype.show = function (type, displayMessage) {
    let Type ;
    if(type=="success"){
        Type = "Success";
    }else{
        Type = "Danger";
    }
    let message = document.getElementById('message');
    message.innerHTML = `<div class="  alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>${Type}:</strong> ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
    setTimeout(function () {
        message.innerHTML = ''
    }, 5000);

}


// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
   
    console.log('YOu have submitted library form');
    let id = index++;
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(id, name, author, type);
    // console.log(book);
    e.preventDefault();
    let display = new Display();

    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added.')
    }
    else {
        // Show error to the user
        display.show('danger', 'Empty entries are not allowed.');
    }

    
}

function search(){

    let searchWord = document.getElementById('searchTxt').value;
    console.log(searchWord);
    tableBody.innerHTML = "";
    notesObj = ConvertToArray();
    //newObj = []
    for(let i = 0;i < notesObj.length;i++){
       if(notesObj[i]['type'] === searchWord){
        printRow(notesObj[i]);
       }
    }
}


//Dynamic nature of our search button
let isSeachOn = true;
function toggleButton(){
    let searchButton = document.getElementById('text');
    if(isSeachOn){
        search();
        // change css of search button to cancel
        //searchButton.style.background = 'red';
        searchButton.innerText = 'Cancel';
        searchButton.style.color = 'white';
        searchButton.classList.remove('btn-outline-success');
        searchButton.classList.add('btn-outline-danger');
    }else{
        tableBody.innerHTML = "";
        threshold();
        //change css of search button to search
        searchButton.style.background = '';
        searchButton.innerText = 'Search';
        document.getElementById('searchTxt').value = '';
        searchButton.classList.add('btn-outline-success');
        searchButton.classList.remove('btn-outline-danger');
    }
    isSeachOn = !isSeachOn;
}