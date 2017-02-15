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
                <a id="update-task-${i}" onclick="" href="" class="waves-effect blue btn modal-trigger">UPDATE</a>
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
