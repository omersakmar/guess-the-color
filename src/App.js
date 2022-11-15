import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("");
  const [answers, setAnswers] = useState([]);
  const [roundResult, setRoundResult] = useState(undefined);
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const handleOptions = () => {
    let randomOptions = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomOptions}`;
  };

  const getShuffledArr = (arr) => {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr;
  };

  const playRound = () => {
    const actualColor = handleOptions();
    setColor(actualColor);
    setAnswers([actualColor, handleOptions(), handleOptions()]);
  };

  useEffect(() => {
    playRound();
  }, [roundResult]);
  console.log(getShuffledArr(answers));
  console.log(color);
  let shuffleAnswers = getShuffledArr(answers);

  const handleUserAnswer = (answer) => {
    if (answer === color) {
      setRoundResult(true);
      playRound();
    } else {
      setRoundResult(false);
    }
  };

  return (
    <div className="App">
      <div className="game-info">
        <h2>What's this about?</h2>
        <p>
          Each round, you get 3 random colors. Guess which one matches that of
          the box.
        </p>
      </div>
      <div className="col">
        <div className="guess-me" style={{ background: color }}></div>
        {shuffleAnswers.map((answer, index) => (
          <button key={index} onClick={() => handleUserAnswer(answer)}>
            {answer}
          </button>
        ))}
      </div>
      {roundResult === false && <div className="wrong-answer">Wrong</div>}
      {roundResult === true && <div className="correct-answer">Correct</div>}
    </div>
  );
}

export default App;
