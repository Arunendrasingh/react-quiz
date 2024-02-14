function Progress({ index, totalQuestion, point, totalPoint }) {
  return (
    <header className="progress">
      <progress value={index} max={totalQuestion} />
      <p>
        Question <strong>{index}</strong>/{totalQuestion}
      </p>
      <p>
        Point <strong>{point}</strong>/{totalPoint}
      </p>
    </header>
  );
}

export default Progress;
