import classes from "../UI/Input.module.css";
import React from "react";
// props.input => {type:"text"} => {...props.input} -> used to extract key value from object
const Input = React.forwardRef((props,ref) => {
    return ( 
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input key={props.id} ref={ref} {...props.input}/>
        </div>
     );
})
 
export default Input;