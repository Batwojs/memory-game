import React, { useState } from 'react'
import './Card.css'

const Card = ({ card, handleChoice, isFlipped, handleCardFlip, disabled }) => {

  //! handleMouseEnter
  const handleMouseEnter = () => {
    handleCardFlip(true);
  };

  //! handleClick
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }


  return (
    <div key={card.id}
    className={`card-container ${isFlipped ? "" : "flipped"}`}
    onClick={handleMouseEnter}

    >
      <div className='card'>  {/*className={flipped ? "flipped" : ""} ¿?*/}
        <div className="card-front">{card.emoji}</div>
        <div onClick={handleClick} className="card-back">¿?</div>
      </div>
    </div>
  )
}

export default Card
