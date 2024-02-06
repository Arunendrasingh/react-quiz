function Question({ questionDetail }) {
  // TODO: Add a method to verify correct option and mark the correct option with correct color from css file, & mark wrong option with red color and mark the correct answer with correct marker.
  return (
    <div>
      <h4>{questionDetail.question}</h4>
      <div className="options">
        {/* Run a loop to iterate over answers */}
        {questionDetail.options.map((answer) => (
          <button className="btn btn-option">{answer}</button>
        ))}
      </div>
    </div>
  );
}

export default Question;
