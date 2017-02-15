$(document).ready(function() {

  // $('.modal').modal();

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
                <a id="delete-task-${i}" onclick="" href="" class="waves-effect red btn modal-trigger">DELETE</a>
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
