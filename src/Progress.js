function Progress({ index, totalQs, score, totalPoints, progressIndex }) {
  return (
    <header className="progress">
      <progress value={progressIndex} max={totalQs} />
      <p>
        Question <strong>{index + 1}</strong>/{totalQs}
      </p>
      <p>
        <strong>{score}</strong>/{totalPoints} points
      </p>
    </header>
  );
}

export default Progress;
