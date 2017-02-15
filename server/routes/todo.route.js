const express = require('express');
const router  = express.Router();
const controller = require('../controllers/todo.controller')

router.get('/', controller.getAllTask)

router.post('/new', controller.createTask)

router.put('/:_id', controller.updateTask)

router.delete('/:_id', controller.deleteTask)

module.exports = router;
