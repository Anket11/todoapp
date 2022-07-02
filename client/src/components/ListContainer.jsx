import React, { useState } from 'react';
import TodoList from "./TodoList";
import '../css/listContainer.css';
  
function ListContainer(props){
    const [delItems, setDelItems] = useState([]);
    function updateDelItems(item) {
        setDelItems((prevDelItems) => {
          return [...prevDelItems, item];
        });
      }
    return(
        <div className="boardItem">
        <TodoList key={props.index}
                  index={props.index} heading={props.heading} updateDelItems={updateDelItems} delList={props.delList} updateList = {props.updateList}/>
        {delItems.length ? (
          <TodoList heading="Done" onlyDisplay="true" displayItems={delItems} />
        ) : (
          ""
        )}
        </div>
    )
}
export default ListContainer;