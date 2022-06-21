import React,{useState} from 'react'
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
    props.onlyDisplay ? 
    (<li ><input className="form-check-input me-1" type="checkbox" checked={true} aria-label="..."></input>{props.content}</li>)
    :(<li ><input className="form-check-input me-1" type="checkbox" onChange={handleCheckBox} checked={checked} aria-label="..."></input>{props.content}</li>)
    
  )
}
export default Todo;
// export {handleCheckBox};
