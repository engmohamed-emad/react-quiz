function NextButton({ dispatch, answer, questionIndex, maxIndex }) {
  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({ type: questionIndex < maxIndex - 1 ? "next" : "finish" })
      }
      disabled={answer === null}
    >
      {questionIndex < maxIndex - 1 ? "Next" : "Finish"}
    </button>
  );
}

export default NextButton;
