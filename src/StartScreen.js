function StartScreen({ numQuestions, onStart }) {
  return (
    <div className="start">
      <h2>welcome to the React quiz</h2>
      <h3>{numQuestions} questions to test your react mastery</h3>
      <button className="btn btn-ui" onClick={onStart}>
        let`s go
      </button>
    </div>
  );
}

export default StartScreen;
