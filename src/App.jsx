import React, { useEffect, useState } from "react";
import Emojis from "./data/cards.json";
import Card from "./components/Card";
import "./App.css";

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const emojisCard = Emojis.cardImages;

  //! Kartların karıştırıldığı yer.
  const shuffleCards = () => {
    const shuffledCards = [...emojisCard, ...emojisCard]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  //! Seçilen kartın kaçıncı kart olduğunu anladığımız yer.
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //! Girilen her kart bilgisinde renderlanan, ve iki kart girildiği anda if bloğunu render eden yer. 
  //! Kısaca şöyle diyebilirm, if bloğu çalıştığı anda açılan kartlar aynı ise bu kartların "matched" bilgisini true yapıyoruz.
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.emoji === choiceTwo.emoji) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.emoji === choiceOne.emoji) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
    console.log(turns);
    console.log(cards);
  }, [choiceOne, choiceTwo]);

  //! Kart bilgilerini bellekten sildiğimiz yer.
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  //! Kartın dönme efektinin çalışması için gerekli olan yer.
  const handleCardFlip = () => {
    setIsFlipped(true);
  };

  return (
    <div>
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <div className="card-item">
            <Card
              key={card.id}
              handleChoice={handleChoice}
              isFlipped={card === choiceOne || card === choiceTwo || card.matched}
              handleCardFlip={handleCardFlip}
              card={card}
              disabled={disabled}
            />
          </div>
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
};

export default App;
