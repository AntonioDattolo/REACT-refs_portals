import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef( function ResultModal({ targetTime, remainingTime, onReset}, ref){
    const dialog = useRef()
    const lost = remainingTime <= 0
    const formattedTimeRemaining = (remainingTime / 1000).toFixed(2); 
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100)
    useImperativeHandle(ref, () => {
        return{
                open(){
                    dialog.current.showModal();
                }
        };
    });
    return createPortal(
    <dialog className="result-modal" ref={dialog}>
        {lost && <h2>YOU LOST!</h2>}
        {!lost && <h2>YOU WIN! YOUR SCORE is {score}</h2>}
        <p>
            The target time was {targetTime}.
        </p>
        <p>
            You stopped the timer with {formattedTimeRemaining} seconds left.
        </p>
        <form method="dialog">
            <button onClick={onReset}>Close</button>
        </form>
    </dialog>,
    document.getElementById('modal')
    );
})

export default ResultModal;