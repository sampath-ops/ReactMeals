import { Fragment, useContext } from "react";
import  ReactDOM from "react-dom";
import CartContext from "../../Store/CartContext";
import classes from "./Modal.module.css";

const Backdrop = props =>{
    const ctx = useContext(CartContext);
    return <div className={classes.backdrop} onClick={ctx.hideCart}></div>
}

const ModalOverlay = props =>{
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const Modal = (props) => {
    const portalElement = document.getElementById("overlays");
    return ( 
        <Fragment>
            
            {ReactDOM.createPortal(<Backdrop/>,portalElement)}
            {   
               ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement) 
            }
        </Fragment>
     );
}
 
export default Modal;