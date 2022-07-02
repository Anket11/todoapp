import React, { useState, useEffect, useRef } from "react";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkSquare, faEllipsis } from "@fortawesome/free-solid-svg-icons";

import Todo from "./Todo";
import "../css/todolist.css";

function TodoList(props) {

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(props.heading);
  function handleEnterHeading(event) {
    if (event.key == "Enter") {
      event.preventDefault();
      setTitle(event.target.value);
      props.updateList(props.index, title);
      setEditing(false);
    }
  }

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
  function onDelete(item) {
    setItems(
      items.filter((e, index) => {
        return index !== item.index;
      })
    );
    props.updateDelItems(item.content);
  }

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    console.log("I got called")
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(scrollToBottom, [items]);

  return (
    <div className="container">
      <div className="heading">
        {/* <h1 onClick={()=> props.updateList(props.index,"New heading")}>{props.heading}</h1> */}

        {!editing ? (
          <h1 className="list-title" onDoubleClick={() => setEditing(true)}>
            {props.heading}
          </h1>
        ) : (
          <input
          autoFocus={true}
          size={title.length}
            onKeyPress={handleEnterHeading}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        )}

        <Dropdown>
          <Dropdown.Toggle variant="outline-light" Transparent button id="dropdown-basic">
            <FontAwesomeIcon className="moreIcon" icon={faEllipsis} size="xl" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              as="button"
              onClick={() => {
                return props.delList(props.index);
              }}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {!props.displayItems && (
        <div className="form">
          <input
            onChange={handleChange}
            onKeyPress={handleEnter}
            type="text"
            value={inputText}
          />
          <button className="addTodoButton" onClick={addItem}>
            <span>Add</span>
          </button>
        </div>
      )}
      <div className="todoitems">
        <ul>
          {props.onlyDisplay
            ? props.displayItems.map((todoItem) => (
              <>
                <Todo
                messagesEndRef={messagesEndRef} 
                  key={todoItem}
                  content={todoItem}
                  onlyDisplay={props.onlyDisplay}
                />
                <hr/>
              </>
              ))
            : items.map((todoItem, index) => (
              <>
                <Todo
                messagesEndRef={messagesEndRef} 
                  key={index}
                  index={index}
                  content={todoItem}
                  onDelete={onDelete}
                />
                <hr/>
              </>
              ))}
        </ul>
        <div ref={messagesEndRef} />
      </div>
      <div />
    </div>
  );
}
export default TodoList;
