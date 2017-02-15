let todo = require ('../models/todo.model')

module.exports = {

  getAllTask : function(req, res) {
    todo.find({}, (err,data) =>{
      res.send(data)
    })
  },

  createTask : function(req, res, next) {
    var newTask = todo({
      task      : req.body.task,
      status    : false,
      createdAt : new Date(),
      updatedAt : new Date()
    })
    newTask.save((err) => {
      res.send({task: req.body.task, status: false})
    })
  },

  updateTask : function(req, res, next) {
    todo.findOneAndUpdate({_id: req.params._id},req.body,
      {new: true}).then( (data) => {
        res.send(data)
      })
  },

  deleteTask : function(req,res){
    todo.findOneAndRemove( {_id: req.params._id})
    .then(function(data){
      res.send('task has been removed')
    })
  }
}
