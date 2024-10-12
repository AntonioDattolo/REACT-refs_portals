import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({ title, targetTime }) {

    // const [timerExpired, setTimerExpired] = useState(false)

    // const [timerStarted, setTimerStarted] = useState(false)

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000)

    const timerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000
  
    
    const timerRef = useRef()

    const dialog = useRef()

    if(timeRemaining <= 0){
        clearInterval(timerRef.current)
       
        dialog.current.open()
    }
    function handleReset(){
        setTimeRemaining(targetTime * 1000)
    }
    // function handleStart() {
    //     setTimerExpired(oldTimer => false)
    //     timerRef.current = setTimeout(() => {
    //         setTimerExpired(oldTimer => true)
    //         setTimerStarted(oldStart => false)
    //         dialog.current.open()
    //     }, targetTime * 1000);
    //     setTimerStarted(oldStart => true)
    // }

    function handleStart(){
        timerRef.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10 )
        }, 10);
    }

    // function handleStop() {
    //     clearTimeout(timerRef.current)
    //     setTimerStarted(oldStart => false)
    // }
    function handleStop(){
        clearInterval(timerRef.current)
        dialog.current.open()
    }
    return (
        <>
            <ResultModal 
                result="LOST" 
                targetTime={targetTime} 
                ref={dialog}
                remainingTime={timeRemaining} 
                onReset={handleReset}
            />
            <section className="challenge">
                <h2>{title}</h2>
                {/* {timerExpired && <p>YOU LOST!</p>} */}
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerActive ? handleStop : handleStart}>
                        {timerActive ? 'Stop' : 'Start'} challenge
                    </button>
                </p>
                <p className={timerActive ? 'active' : ''}>
                    {timerActive ? 'Time running' : 'Time not running'}
                </p>
            </section>
        </>
    )
}