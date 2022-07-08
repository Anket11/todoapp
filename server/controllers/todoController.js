const mongoose = require("mongoose");
const TODO = require("../Todo");



const todo1 = new TODO({
  listName: "Home",
  todoList: ["Buy Sofa"],
  doneList: ["Cushions"]
});

// todo1.save();

exports.helloworld = (req, res) => {
  res.send("Hello World");
};

exports.allTodoLists = (req, res) => {
  TODO.find(function (err, todo) {
    if (err) {
      console.log(err);
    } else {
      res.json(todo);
    }
  });
};

exports.addTodoList = (req, res) => {
  console.log("Recieved Post")
  var user = (req.body);
  console.log(user)

  TODO.collection.drop();
  
  user.allTodos.map((todo,index) =>{
    console.log(todo)
    const todoM = new TODO(todo);
    todoM.save()
  })
  console.log("End")

  // console.log(user)
  res.send("Working");

};
