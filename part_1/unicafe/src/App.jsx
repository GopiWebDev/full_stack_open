import { useState } from 'react';

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <th>{text}</th>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (!all) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No Feedback Given</p>
      </>
    );
  } else {
    return (
      <>
        <table>
          <caption>
            <h2>Statistics</h2>
          </caption>
          <tbody>
            <StatisticsLine text='good' value={good} />
            <StatisticsLine text='neutral' value={neutral} />
            <StatisticsLine text='bad' value={bad} />
          </tbody>
          <tfoot>
            <StatisticsLine text='all' value={all} />
            <StatisticsLine text='average' value={(good - bad) / all} />
            <StatisticsLine text='positive' value={`${good / all} %`} />
          </tfoot>
        </table>
      </>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  return (
    <>
      <div>
        <h1>Give Feedback</h1>
        <button onClick={increaseGood}>Good</button>
        <button onClick={increaseNeutral}>Neutral</button>
        <button onClick={increaseBad}>Bad</button>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </>
  );
};

export default App;

