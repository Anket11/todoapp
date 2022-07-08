import React, { useState, useEffect, useRef } from "react";
import ListContainer from "./ListContainer";
import { InputGroup, FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../css/app.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {addNewList,storeData} from "../redux/listsSlice";

function App() {
  const lists = useSelector((state) => state.lists);
  // console.log(lists);


  const dispatch = useDispatch();

  // Api calls
  const getAllTodos = () => {
    console.log("Called to server");
    axios.get(`http://localhost:5500/api/`).then((response) => {
      // console.log(response.data);
      // setMLists(allTodos);
      // console.log(mLists);
      dispatch(storeData(response.data));

    });
  };
  useEffect(getAllTodos, []);

  const postAllTodos = () => {
    console.log("Send to server");
    axios.post(`http://localhost:5500/api/`,{
      allTodos: lists,
    }).then((response) => {
      console.log(response.status);

    });
  };
  useEffect(postAllTodos, [lists]);

  const [inputText, setInputText] = useState("");
  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }
  function handleEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      setInputText(event.target.value);
      addList();
    }
  }
  function addList() {
    
    dispatch(addNewList(inputText));
    setInputText("");
  }

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    // console.log("I got called boarditem");
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [lists]);

  return (
    <div className="boardContainer">
      {lists.map((listsItem, index) => (
        <ListContainer
          key={index}
          index={index}
          list = {listsItem}
        />
      ))}
      <div className="newList">
        <InputGroup size="lg">
          <FormControl
            onChange={handleChange}
            onKeyPress={handleEnter}
            type="text"
            value={inputText}
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Enter list name"
          />
        </InputGroup>
        <Button onClick={() => addList()} variant="primary">
          Add new list
        </Button>{" "}
      </div>
      {/* <Button
        onClick={() => {
          console.log("I got clicked");
          getAllTodos();
        }}
        variant="primary"
      >
        Add new list
      </Button>{" "} */}
      <div className="last" />
    </div>
  );
}

export default App;
