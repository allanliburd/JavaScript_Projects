var addButton = document.getElementById("add-button");
var clearButton = document.getElementById("clear-completed-button");
var emptyButton = document.getElementById("empty-button");
var saveButton = document.getElementById("save-button");
var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");
var toDoArray = []
loadList();

addButton.addEventListener("click", addToDoItem);
function addToDoItem() {
  var itemText = toDoEntryBox.value;
  newToDoItem(itemText, false);
  saveList();
}

// Add a new item to the list
function newToDoItem(itemText, completed) {
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if (completed) {
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
    saveList();
}

// "this" elements classList appends/removes Completed
function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
    saveList();
}

clearButton.addEventListener("click", clearCompletedToDoItems);

function clearCompletedToDoItems() {
  // select all the completed items of toDoList,and remove 1 by 1
  var completedItems = toDoList.getElementsByClassName("completed");
  while (completedItems.length > 0) {
    completedItems.item(0).remove();
  }
  saveLiest();
}

emptyButton.addEventListener("click", emptyList);

function emptyList() {
  // select all the children of toDoList,and remove 1 by 1
  var toDoItems = toDoList.children;
  while (toDoItems.length > 0) {
    toDoItems.item(0).remove();
  }
  saveList();
}

saveButton.addEventListener("click", saveList);

// Save a list using Array
function saveList() {
    var toDos = [];

    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);

    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
        
        if (toDos.length == 0) {
          newToDoItem("Toilet paper", false);
          newToDoItem("Paper towel", false);
          newToDoItem("Water bottles", false);
          newToDoItem("Peppers", false);    
        }
    } else {
        newToDoItem("Toilet paper", false);
        newToDoItem("Paper towel", false);
        newToDoItem("Water bottles", false);
        newToDoItem("Peppers", false);
    }
}

