function Progress({ index, totalQuestion, point, totalPoint, answer }) {
  return (
    <header className="progress">
      <progress
        value={Number(answer !== null) ? index : index-1}
        max={totalQuestion}
      />
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
