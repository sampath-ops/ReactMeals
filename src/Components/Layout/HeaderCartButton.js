import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCart.module.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../Store/CartContext";
const HeaderCartButton = () => {
 
    const [isBtnHighlighted,setIsBtnHighlighted] = useState(false);

    const ctx = useContext(CartContext);

    const numberOfCartItem = ctx.items.reduce((curNumber,item)=>{
        return curNumber + item.amount;
    },0);

    useEffect(()=>{
        if(ctx.items.length === 0){
            return;
        }
        setIsBtnHighlighted(true);
        const timer = setTimeout(()=>{
            setIsBtnHighlighted(false);
        },300);
        return ()=>{
            clearTimeout(timer);
        }
    },[ctx.items])

    const btnClasses = `${classes.button}  ${isBtnHighlighted ? classes.bump : ''}`;

    return ( 
        <button className={btnClasses} onClick={ctx.showCart}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItem}</span>
        </button>
     );
}
 
export default HeaderCartButton;