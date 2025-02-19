function Options({ question, dispatch, answer }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${
            answer !== null
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          } ${index === answer ? "answer" : ""}`}
          key={index}
          disabled={answer !== null}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {index + 1} - {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
