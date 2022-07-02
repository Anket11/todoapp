import React,{useState} from 'react'
import '../css/todo.css'
function Todo (props){
    const [checked, setChecked] = useState(false);
    const handleCheckBox = event => {
        if (event.target.checked) {
            {props.onDelete(props)}
          // console.log('✅ Checkbox is checked');
          
          // console.log(checked);
        }
        setChecked(false);
      };
  return (
    <>
    {props.onlyDisplay ? 
    (<li ><input className="form-check-input me-2" type="checkbox" checked={true} aria-label="..."></input>{props.content}</li>)
    :(<li ><input className="form-check-input me-2" type="checkbox" onChange={handleCheckBox} checked={checked} aria-label="..."></input>{props.content}</li>)}

    </>
    
  )
}
export default Todo;
// export {handleCheckBox};
