function formReset() {
  $('#form-delete').remove()
}

$(document).ready(function() {

  $('.modal').modal();

  $.ajax({
    url  : "http://localhost:3000/todo",
    method : "GET",
    success: function(data) {
      var arrTemp = ""
      for (var i = 0; i < data.length; i++) {
        if (data[i].status == true) {
          arrTemp += `
            <tr id="task-${i}" class="done">
                <td>${data[i].task}</td>
                <td>
                  <i class="material-icons">done</i>
                </td>
                <td>
                  <a id="done-task-${data[i]._id}" onclick="updateStatusToUndone('${data[i]._id}')" href="" class="waves-effect green btn modal-trigger">DONE</a>
                </td>
                <td>
                  <a id="update-task-${i}" onclick="" href="" class="waves-effect blue btn modal-trigger">UPDATE</a>
                  <a id="delete-task-${i}" onclick="" href="" class="waves-effect red btn modal-trigger">DELETE</a>
                </td>
            </tr>
          `
        }
        else {
          arrTemp += `
          <tr id="task-${i}" class="undone">
              <td>${data[i].task}</td>
              <td>
                <i class="material-icons">remove</i>
              </td>
              <td>
                <a id="undone-task-${data[i]._id}" onclick="updateStatusToDone('${data[i]._id}')" href="" class="waves-effect red btn modal-trigger">UNDONE</a>
              </td>
              <td>
                <a id="update-task-${i}" onclick="preUpdate('task-${i}', '${data[i]._id}')" href="#modalUpdate" class="waves-effect blue btn modal-trigger">UPDATE</a>
                <a id="delete-task-${i}" onclick="preDelete('task-${i}', '${data[i]._id}')" href="#modalDelete" class="waves-effect red btn modal-trigger">DELETE</a>
              </td>
          </tr>
          `
        }
      }
      $('#todo').append(arrTemp)
    }
  })
})

function newTask(){
  $(document).ready(function(){
    $.ajax({
      url  : "http://localhost:3000/todo/new",
      type : "POST",
      data: {
        task: $('#newTask').val()
      },
      success: function(data) {
        console.log(data);
        location.reload();
      }
    })
  })
}

function newTask(){
  $(document).ready(function(){
    $.ajax({
      url  : "http://localhost:3000/todo/new",
      type : "POST",
      data: {
        task: $('#newTask').val()
      },
      success: function(data) {
        console.log(data);
        location.reload();
      }
    })
  })
}

function preUpdate (index, id) {
  formReset()

  let task = $(`#${index} td`)[0].innerHTML

  let updateMemo = `
    <div id="form-delete">
      <div class="modal-content">
      <h4><b>Update Task</b></h4>
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <input id="updateTask" value="${task}"></input>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <a onclick="update('${index}', '${id}')" class="modal-action modal-close waves-effect waves-light btn" type="submit" name="button">Done</a>
      </div>
    </div>
  `
  $('#modalUpdate').append(updateMemo)
}

function update(index, id) {
  $(document).ready(function(){
    $.ajax({
      url  : `http://localhost:3000/todo/${id}`,
      type : "PUT",
      data: {
        task   : $('#updateTask').val()
      },
      success: function(result) {
        $(`#${index} td`)[0].innerHTML = result.task
      }
    })
  })
}

function updateStatusToDone(id) {
  $(document).ready(function(){
    $.ajax({
      url  : `http://localhost:3000/todo/${id}`,
      type : "PUT",
      data: {
        status   : true
      },
      success: function(result) {
        document.getElementById(`undone-task-${id}`).innerHTML = "DONE"
      }
    })
  })
}

function updateStatusToUndone(id) {
  $(document).ready(function(){
    $.ajax({
      url  : `http://localhost:3000/todo/${id}`,
      type : "PUT",
      data: {
        status   : false
      },
      success: function(result) {
        document.getElementById(`done-task-${id}`).innerHTML = "UNDONE"
      }
    })
  })
}


function preDelete(index, id) {
  formReset()

  let deleteTask = `
      <div id="form-delete">
        <div class="modal-content">
            <h4><b>Are you sure you want to permanently delete this task ?</b></h4>
        </div>
        <div class="modal-footer">
            <a onclick="deleteTask('${index}', '${id}')" class="modal-action modal-close waves-effect red btn">DELETE</a>
            <a class="modal-action modal-close waves-effect blue btn">CANCEL</a>
        </div>
      </div>
      `
  $('#modalDelete').append(deleteTask)
}

function deleteTask(index, id) {
  $(document).ready(function() {
    $.ajax({
      url  :  `http://localhost:3000/todo/${id}`,
      type : "DELETE",
      success: function(result) {
        $(`#${index}`).remove()
      }
    })
  })
}
