function FinishScreen({ points, totalPoints, dispatch }) {
  const percentage = (points / totalPoints) * 100;
  let emoji;
  if (percentage <= 100 && percentage >= 85) {
    emoji = "🏅";
  } else if (percentage <= 85 && percentage >= 70) {
    emoji = "👏";
  } else if (percentage <= 70 && percentage >= 50) {
    emoji = "👍";
  } else {
    emoji = "👎";
  }

  return (
    <>
      <p className="result">
        {emoji} Yot scored<strong> {points} </strong> out of {totalPoints}
        {"   :  "}
        {Math.ceil(percentage)}%
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Try again
      </button>
    </>
  );
}

export default FinishScreen;
