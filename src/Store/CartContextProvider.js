import CartContext from "./CartContext";
import { useReducer, useState } from "react";
import Cart from "../Components/Cart/Cart";

const defaultCartState = {
    items:[],
    totalAmount:0
}

const cartReducer = (state,action)=>{
    if(action.type === 'ADD'){
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingIndex = state.items.findIndex(item => item.id === action.item.id);

        const existingCartItem = state.items[existingIndex];

        let updatedItems;
        
        if(existingIndex !==-1){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            }
            updatedItems = [...state.items];
            updatedItems[existingIndex] = updatedItem;
        }
        else{
            updatedItems = state.items.concat(action.item);
        }

        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }
    if(action.type === "REMOVE"){
        
        const existingIndex = state.items.findIndex(item => item.id === action.id);

        const existingCartItem = state.items[existingIndex];
    
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;

        let updatedItems;

        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        }
        else{
           const updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount - 1
           }
           updatedItems = [...state.items];
           updatedItems[existingIndex] = updatedItem;
        }
        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }
    return defaultCartState;
}

const CartContextProvider = (props) => {

    const [cartState,dispatchCartAction] = useReducer(cartReducer,defaultCartState);

    const [cartIsShown,setCartIsShown] = useState(false);

    const showCartHandler = ()=>{
      setCartIsShown(true);
    }
  
    const hideCartHandler = ()=>{
      setCartIsShown(false);
    }

    const addItemToCartHandler = (item)=>{
        dispatchCartAction({
            type:'ADD',
            item:item
        })
    };

    const removeItemFromCartHandler = (id)=>{
        dispatchCartAction({
            type:'REMOVE',
            id:id
        })
    };


    const cartContext = {
        items:cartState.items,
        totalAmount: cartState.totalAmount,
        addItem:addItemToCartHandler,
        removeItem:removeItemFromCartHandler
    }
  
    return ( 
        <CartContext.Provider value={{
            showCart:showCartHandler,
            hideCart:hideCartHandler,
            ...cartContext}}>
                 {cartIsShown && <Cart/>}
                 {props.children}
          </CartContext.Provider>
     );
}
 
export default CartContextProvider;