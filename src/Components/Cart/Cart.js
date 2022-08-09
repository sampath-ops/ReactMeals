import { useContext } from "react";
import CartContext from "../../Store/CartContext";
import Modal from "../UI/Modal";
import CartItem from "./CartItem"
import classes from "./Cart.module.css";

const Cart = () => {

    const ctx = useContext(CartContext);

    const cartItemRemoveHandler = (index)=>{
        ctx.removeItem(index)
    };

    const cartItemAddHandler = (item)=>{
        ctx.addItem({...item,amount:1});
    };

    const cartitems = <ul className={classes["cart-items"]}>{
        ctx.items.map((item)=> <CartItem 
        key={item.id} 
        name={item.name} 
        amount={item.amount} 
        price={item.price} 
        onRemove={cartItemRemoveHandler.bind(null,item.id)} 
        onAdd={cartItemAddHandler.bind(null,item)}/>)
    }</ul>

    const totalAmount = `$${Math.abs(ctx.totalAmount).toFixed(2)}`;
    const hasItems = ctx.items.length > 0;

    return ( 
        <Modal>
            {cartitems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={ctx.hideCart}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
     );
}
 
export default Cart;