import React from 'react';
import TodoList from "./TodoList";
import '../css/listContainer.css';
  
function ListContainer(props){
    return(
        <div className="boardItem">
        <TodoList key={props.index}
                  index={props.index} heading={props.list.listName} todoList = {props.list.todoList} doneList={props.list.doneList} />
        </div>
    )
}
export default ListContainer;