function Question({ questionDetail, toggleAnswer, questionAnswer }) {
  // TODO: Add a method to verify correct option and mark the correct option with correct color from css file, & mark wrong option with red color and mark the correct answer with correct marker.
  return (
    <div>
      <h4>{questionDetail.question}</h4>
      <div className="options">
        {/* Run a loop to iterate over answers */}
        {questionDetail.options.map((answer, index) => (
          <button
            key={index}
            className={`btn btn-option ${
              questionAnswer === index ? "answer" : ""
            } ${
              questionAnswer !== null &&
              (questionDetail.correctOption === index ? "correct" : "wrong")
            }`}
            onClick={() => toggleAnswer(index)}
            disabled={questionAnswer !== null ? true : false}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
