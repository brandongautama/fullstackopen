import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  const totalCount = good + neutral + bad;
  const percentage = (good * 100) / totalCount;
  const average = (good * 1 + neutral * 0 + bad * -1) / totalCount;
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {totalCount}</p>
      <p>average {average}</p>
      <p>positive {percentage} %</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (func, value) => {
    return () => func(value);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleClick(setGood, good + 1)} />
      <Button text="neutral" onClick={handleClick(setNeutral, neutral + 1)} />
      <Button text="bad" onClick={handleClick(setBad, bad + 1)} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
