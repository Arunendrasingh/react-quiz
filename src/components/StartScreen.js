function StartScreen({ totalQuestions }) {
  return (
    <div className="start">
      <h2>Welcome to React - Quiz</h2>
      <h4>
        <i>{totalQuestions}</i> Questions to test your skill.
      </h4>
      <button className="btn">Start Quiz</button>
      {/* Add a method to start the quiz */}
    </div>
  );
}

export default StartScreen;
