import React, { useState } from "react";
import Todo, { handleCheckBox } from "./Todo";
function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }
  function handleEnter(event){
    if(event.key == "Enter"){
      event.preventDefault();
      setInputText(event.target.value);
      addItem();
    }
  }
  function addItem() {
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
    setInputText("");
  }
  
  const onDelete = (item) => {
    setItems(
      items.filter((e) => {
        return e !== item.content;
      })
    );
    console.log("deleted", item);
  };
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} onKeyPress={handleEnter} type="text" value={inputText} />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((todoItem) => (
            <Todo key={todoItem} content={todoItem} onDelete={onDelete} />
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;
