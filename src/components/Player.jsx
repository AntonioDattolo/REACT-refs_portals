import { useState, useRef } from "react";
export default function Player() {
  const playerName = useRef( )

  const [player,setPlayer]=useState('unknown entity');

  function handleClick(){
    setPlayer(playerName.current.value);
  }
  
  // in questo modo è possibile ottnere l'output dell'input e salvarlo in una variabiale
  // avendo allo stesso modo un codice semplice e snello

  return (
    <section id="player">
      <h2>Welcome {player ? player : 'unknown entity'}</h2>
      <p>
        <input 
          ref={playerName} 
          type="text"
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
