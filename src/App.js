import './App.css'
import {useEffect, useState} from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
    {"src": "/img/helmet-1.png", matched: false},
    {"src": "/img/potion-1.png", matched: false},
    {"src": "/img/ring-1.png", matched: false},
    {"src": "/img/scroll-1.png", matched: false},
    {"src": "/img/shield-1.png", matched: false},
    {"src": "/img/sword-1.png", matched: false},
]


function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false);

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)


    }

    //compareTwo selected choices

    useEffect(() => {
        shuffleCards()
        },[]);



    useEffect(() => {

        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevcards => {
                    return prevcards.map(card => {
                        if (card.src === choiceOne.src) {
                            return {...card, matched: true};
                        } else {
                            return card;
                        }
                    })
                })
                resetTurn()
            } else {
                console.log('do not match');
                setTimeout(() =>
                    resetTurn(), 1000)
            }
        }
    }, [choiceOne, choiceTwo])
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);

    }
    //duplicate each card once
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random()})) //means two slots is there.
        setChoiceOne(null);
        setChoiceTwo(null);


        setCards(shuffledCards);
        setTurns(0); // reset the turn to 0.

    }
    console.log({cards, turns})
    return (
        <div className="App">
            <h1>Magic Match</h1>
            <button onClick={shuffleCards}>New Game</button>
            <div className={'card-grid'}>
                {cards.map(card => <SingleCard
                        card={card} key={card.id}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />
                )}

            </div>
            <p>Turns :{turns}</p>
        </div>
    );
}

export default App