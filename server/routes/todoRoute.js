const express = require('express');
const app = express();
router = express.Router()
todo = require('../controllers/todoController')


router.get('/',todo.helloworld);

router.get('/api',todo.allTodoLists);
router.post('/api',todo.addTodoList);


module.exports = router