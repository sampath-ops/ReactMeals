import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
import { useRef, useState } from "react";
const MealItemForm = (props) => {

    const amountInputRef = useRef();
    const [amountISValid,setAmountIsValid] = useState(true);

    const submitHandler = (e)=>{
        e.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if(enteredAmountNumber < 1 || enteredAmountNumber > 5 || enteredAmount.trim().length === 0){
            setAmountIsValid(false);
        }

        props.onAddToCart(enteredAmountNumber);

    }

    return ( 
        <form className={classes.form} onSubmit={submitHandler}>
            <Input lable="Amount" ref={amountInputRef} input={{
                type:"number",
                min:1,
                max:5,
                defaultValue:1,
                set:1,
                id:props.id
            }}/>
            <button>+ Add</button>
            {!amountISValid && <p>Please enter a valid amount (1-5)</p> }
        </form>
     );
}
 
export default MealItemForm;