import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import PreviousButton from "./components/PreviousButton";
import Progress from "./components/Progress";

function App() {
  // First start with useState hook then switch to useReducer hook.
  const [questions, setQuestions] = useState([]);
  const [status, setStatus] = useState("loading"); // loading, error, ready, active, finished.
  const totalQuestion = questions.length;
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [point, setPoint] = useState(0);

  // Current Version do not support the previous button functionality.

  //  Methods to move the questions
  function nextQuestion() {
    setAnswer(null);
    setActiveQuestion(activeQuestion + 1);
  }

  function previousQuestion() {
    setActiveQuestion(activeQuestion - 1);
  }

  // set answer
  function setNewAnswer(answer) {
    // Here set New Answer and the points.
    setAnswer(answer);
    // Here validate the answer & if answer is valid then increase the point by 5.
    let correctAnswer = questions[activeQuestion].correctOption;

    if (correctAnswer === Number(answer)) {
      setPoint((s) => s + 5);
    }
  }

  // Load all question using use reducer
  useEffect(() => {
    fetch("http://localhost:8080/questions")
      .then((response) => response.json())
      .then((data) => {
        // Here set the question ans status status with new data.
        setQuestions(data);
        setStatus("ready");
      })
      .catch((reason) => {
        setStatus("error");
      });
  }, []);

  function startQuiz() {
    // set states like answer, points, activequestion to their intial question.
    setStatus("active");
    setActiveQuestion(0);
    setAnswer(null);
    setPoint(0);
  }

  return (
    <>
      <Header />
      <Main>
        {status === "error" && <Error />}
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen
            totalQuestions={totalQuestion}
            toggleQuizStatus={startQuiz}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={activeQuestion + 1}
              totalQuestion={totalQuestion}
              point={point}
              totalPoint={totalQuestion*5}
            />
            <Question
              questionDetail={questions[activeQuestion]}
              toggleAnswer={setNewAnswer}
              questionAnswer={answer}
            />
            {(activeQuestion !== questions.length - 1) & (answer !== null) ? (
              <NextButton toggleButton={nextQuestion} />
            ) : null}
            {/* Do not support previous buttonfor now {activeQuestion !== 0 && (
              <PreviousButton toggleButton={previousQuestion} />
            )} */}
          </>
        )}
      </Main>
    </>
  );
}

export default App;
