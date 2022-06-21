import React, { useState } from "react";
import TodoList from "./TodoList";
function App() {
  const [delItems, setDelItems] = useState([]);
  function updateDelItems(item)
  {
    setDelItems((prevDelItems) => {
      return [...prevDelItems, item];
    });
  }
  return (
    <div className="board">
    <TodoList name="To-Do" updateDelItems={updateDelItems}  />
    {delItems.length ? <TodoList name="Done" onlyDisplay = "true" displayItems={delItems} /> : ""}
    {console.log(delItems)}
    
    
    </div>
    );
}

export default App;
