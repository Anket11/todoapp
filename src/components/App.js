import React, { useState, useEffect, useRef } from "react";
import ListContainer from "./ListContainer";
import { InputGroup, FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../css/app.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [lists, setLists] = useState(["To-do"]);
  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }
  function handleEnter(event) {
    if (event.key == "Enter") {
      event.preventDefault();
      setInputText(event.target.value);
      addList();
    }
  }
  function addList() {
    setLists((prevLists) => {
      return [...prevLists, inputText];
    });
    setInputText("");
    {
      console.log(lists);
    }
  }
  function delList(i) {
    setLists(
      lists.filter((e, index) => {
        return index !== i;
      })
    );
    // console.log("I got clicked")
  }
  function updateList(index, newHeading) {
    const newLists = [...lists];
    newLists[index] = newHeading;
    setLists(newLists);
    console.log("I got clicked from updateList");
    console.log(lists);
  }

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    console.log("I got called boarditem")
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(scrollToBottom, [lists]);

  return (
    <div className="boardContainer">
      {lists.map((listsItem, index) => (
        <ListContainer
          key={index}
          index={index}
          heading={listsItem}
          delList={delList}
          updateList={updateList}
        />
      ))}
      <div className="newList" >
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
        <Button onClick={addList} variant="primary">
          Add new list
        </Button>{" "}
      </div>
      <div className="last" />
    </div>
  );
}

export default App;
