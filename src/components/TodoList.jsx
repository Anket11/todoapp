import React, { useState } from "react";
import Todo from "./Todo";

function TodoList(props) {


  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }
  function handleEnter(event) {
    if (event.key == "Enter") {
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
  function onDelete (item){
    setItems(
      items.filter((e) => {
        return e !== item.content;
      })
    );
    props.updateDelItems(item.content);
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>{props.name}</h1>
      </div>
      {!props.displayItems && <div className="form">
        <input
          onChange={handleChange}
          onKeyPress={handleEnter}
          type="text"
          value={inputText}
        />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>}
      <div>
        <ul>
          {props.onlyDisplay ? (
            props.displayItems.map((todoItem) => (
            <Todo key={todoItem} content={todoItem} onlyDisplay={props.onlyDisplay}/>
          ))):
            items.map((todoItem) => (
            <Todo key={todoItem} content={todoItem} onDelete={onDelete} />
          ))}
        </ul>
      </div>
    </div>
  );
}
export default TodoList;
