
let boards = {};
let currentBoardId = '';
let currentBoardIdNo = '';
let currentCardId = '';

function getTaskId() {
    let tasks = boards[currentBoardIdNo].tasks;
    let taskList = Object.keys(tasks);
     if(taskList.length === 0)
        return 1;
     else{   
        let id = taskList[taskList.length-1];
        return parseInt(id)+1;
     }
}

function getBoardId() {
    let boardsIds = Object.keys(boards);
    if(boardsIds.length === 0)
    return 1;
    else{   
    let id = boardsIds[boardsIds.length-1];
    return parseInt(id)+1;
    }
}

function addTask(){ 
    console.log(currentBoardIdNo)
    let obj = {};
    let id = getTaskId();
    let title = document.getElementById('title').value;
    let state = document.getElementById('state').value;
    let date = document.getElementById('date').value;
    boards[currentBoardIdNo]['tasks'][id] = obj;
    obj['title'] = title;
    obj['state'] = state;
    obj['date'] = date;
    id = `Task-${currentBoardIdNo}-${id}`;  
    var task = document.getElementById(currentBoardId);
    const text = `
    <div class="list-item" id=${id}  draggable="true">
    <div class="addRowEnd">
    <i class="fa fa-pencil" aria-hidden="true" style="margin-right:8px;cursor: pointer" data-toggle="modal" data-target="#editTask" onclick="setCurrentCardId(this)"></i>
    <i class="fa fa-trash" aria-hidden="true" style="cursor: pointer" onclick="deleteCard(this)"></i>
    </div>
    <hr>
    <div class="addRowCenter">
    <h5>${title}</h5>
    </div>
    <hr>
    <div class="addRowSpace">
    <h6 class="state">${state}</h6>
    <h6>${date}</h6>
    </div>
    </div>`
    task.insertAdjacentHTML("beforeend",text );
    console.log(boards);
    // let localBoard = localStorage.getItem('boards');
    // if(localBoard){

    // }
    localStorage.setItem('boards',JSON.stringify(boards));
}

function addBoard() {
    let obj = {}
    let id = getBoardId();
    let title = document.getElementById('boardtitle').value;
    obj['title'] = title;
    obj['tasks'] = {};
    boards[id] = obj;
    id = `Board-${id}`;  
    var task = document.getElementById('Todo');
    const text = `<div class="list" id=${id}>
    <div class="addListHeader">
    <h3>${title}</h3>             
    <i class="fa fa-plus fa-2x ico" aria-hidden="true" data-toggle="modal" data-target="#addTask" onclick="setCurrentBoardId(this)"></i>
    </div>
</div>`
    task.insertAdjacentHTML("beforeend",text );
    console.log(boards);   
    localStorage.setItem('boards',JSON.stringify(boards));
}

function setCurrentBoardId(e){
    currentBoardId = e.parentNode.parentNode.id
    let arr = currentBoardId.split('-');
    currentBoardIdNo = arr[1];
}

function setCurrentCardId(e) {
    currentCardId = e.parentNode.parentNode.id;
    let arr = currentCardId.split('-');
    let obj = boards[arr[1]]['tasks'][arr[2]];
    document.getElementById('title1').value = obj['title'];
    document.getElementById('state1').value = obj['state'];
    document.getElementById('date1').value = obj['date'];
}

function deleteCard(e){
    console.log(boards);
    currentCardId = e.parentNode.parentNode.id;
    let arr = currentCardId.split('-');
    delete boards[arr[1]]['tasks'][arr[2]];
    let currentNode = document.getElementById(currentCardId);
    currentNode.parentNode.removeChild(currentNode);
    console.log(boards)
    localStorage.setItem('boards',JSON.stringify(boards));
}

function editCard(){
    let arr = currentCardId.split('-');
    let obj = {};
    let title = document.getElementById('title1').value;
    let state = document.getElementById('state1').value;
    let date = document.getElementById('date1').value;
    obj['title'] = title;
    obj['state'] = state;
    obj['date'] = date;
    boards[arr[1]]['tasks'][arr[2]] = obj;
    const text = `<div class="addRowEnd">
    <i class="fa fa-pencil" aria-hidden="true" style="margin-right:8px;cursor: pointer" data-toggle="modal" data-target="#addTask" onclick="setCurrentCardId(this)"></i>
    <i class="fa fa-trash" aria-hidden="true" style="cursor: pointer" onclick="deleteCard(this)"></i>
    </div>
    <hr>
    <div class="addRowCenter">
    <h5>${title}</h5>
    </div>
    <hr>
    <div class="addRowSpace">
    <div class="state">
    <h6 >${state}</h6>
    </div>
    <h6>${date}</h6>
    </div>`
    let currentNode = document.getElementById(currentCardId);
    currentNode.innerHTML = text;
    console.log(boards)
    localStorage.setItem('boards',JSON.stringify(boards));
}


function retainBoard(){
    if(localStorage.getItem('boards')){
       boards = JSON.parse(localStorage.getItem('boards')); 
    }
    Object.keys(boards).forEach((key) => {
        let id = `Board-${key}`;  
        var task = document.getElementById('Todo');
        const text = `<div class="list" id=${id}>
        <div class="addListHeader">
        <h3>${boards[key]['title']}</h3>             
        <i class="fa fa-plus fa-2x ico" aria-hidden="true" data-toggle="modal" data-target="#addTask" onclick="setCurrentBoardId(this)"></i>
        </div>
    </div>`
    task.insertAdjacentHTML("beforeend",text );
    let tasks = boards[key]['tasks']
    Object.keys(tasks).forEach((taskkey) => {
        var task = document.getElementById(id);
        let taskid = `Task-${key}-${taskkey}`; 
        const text = `<div class="list-item" id=${taskid}  draggable="true">
        <div class="addRowEnd">
        <i class="fa fa-pencil" aria-hidden="true" style="margin-right:8px;cursor: pointer" data-toggle="modal" data-target="#editTask" onclick="setCurrentCardId(this)"></i>
        <i class="fa fa-trash" aria-hidden="true" style="cursor: pointer" onclick="deleteCard(this)"></i>
        </div>
        <hr>
        <div class="addRowCenter">
        <h5>${tasks[taskkey]['title']}</h5>
        </div>
        <hr>
        <div class="addRowSpace">
        <h6 class="state">${tasks[taskkey]['state']}</h6>
        <h6>${tasks[taskkey]['date']}</h6>
        </div>
        </div>`
        task.insertAdjacentHTML("beforeend",text );
    })

    })
}

retainBoard();