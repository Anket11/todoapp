import React, { useState } from "react";
import { deleteTodo } from "../redux/listsSlice";
import { useDispatch } from "react-redux";

import "../css/todo.css";
function Todo(props) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const handleCheckBox = (event) => {
    if (event.target.checked) {
      const indexOfList = props.indexOfList;
      const indexOfCard = props.indexOfCard;

      dispatch(deleteTodo({ indexOfList, indexOfCard }));
      // console.log("✅ Checkbox is checked");

    }
    setChecked(false);
  };
  return (
    <>
      {props.onlyDisplay ? (
        <li>
          <input
            className="form-check-input me-2"
            type="checkbox"
            checked={true}
            aria-label="..."
          ></input>
          {props.content}
        </li>
      ) : (
        <li>
          <input
            className="form-check-input me-2"
            type="checkbox"
            onChange={handleCheckBox}
            checked={checked}
            aria-label="..."
          ></input>
          {props.content}
        </li>
      )}
    </>
  );
}
export default Todo;
// export {handleCheckBox};
