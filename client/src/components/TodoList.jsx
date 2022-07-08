import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { addTodo, deleteList, editListName } from "../redux/listsSlice";
import { useDispatch } from "react-redux";
import Todo from "./Todo";
import "../css/todolist.css";

function TodoList(props) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [done, setDone] = useState(false);

  const [title, setTitle] = useState(props.heading);
  function handleEnterHeading(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      setTitle(event.target.value);
      const index = props.index;
      dispatch(editListName({ index, title }));
      setEditing(false);
    }
  }

  const [inputText, setInputText] = useState("");
  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }
  function handleEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      setInputText(event.target.value);
      addItem();
    }
  }
  function addItem() {
    const idx = props.index;
    // console.log("Todo should be created with:" + inputText);
    dispatch(addTodo({ idx, inputText }));
    setInputText("");
    scrollToBottom();
  }

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    // console.log("I got called")
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // useEffect(scrollToBottom, [props.todoList]);

  return (
    <div className="container">
      <div className="heading">
        {/* <h1 onClick={()=> props.updateList(props.index,"New heading")}>{props.heading}</h1> */}

        {done? (<h1 className="list-title" onDoubleClick={() => setEditing(true)}>
            Done Todos
          </h1>) : 
          !editing ? (
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
          <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
            <FontAwesomeIcon className="moreIcon" icon={faEllipsis} size="xl" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              as="button"
              onClick={() => {
                // console.log("Delete List");
                dispatch(deleteList(props.index));
              }}
            >
              Delete
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => {
                // console.log("Delete List");
                setDone(!done);
              }}
            >
              {done ? "To-dos": "Done Todos"}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {!done && (
        <div className="form">
          <input
            onChange={handleChange}
            onKeyPress={handleEnter}
            type="text"
            value={inputText}
          />
          <button className="addTodoButton" onClick={() => addItem()}>
            <span>Add</span>
          </button>
        </div>
      )}
      <div className="todoitems">
        <ul>
          {/* {props.onlyDisplay
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
              ))} */}

          {done ? 
            props.doneList.map((todoItem,index) => (
                <Todo
                  key={index}
                  content={todoItem}
                  onlyDisplay={props.onlyDisplay}
                />
              )):
          props.todoList.map((todoItem, index) => (
            <Todo
              indexOfList={props.index}
              key={index}
              indexOfCard={index}
              content={todoItem}
            />
          ))}
          {/* <hr/> */}
        </ul>
        <div ref={messagesEndRef} />
      </div>
      <div />
    </div>
  );
}
export default TodoList;
