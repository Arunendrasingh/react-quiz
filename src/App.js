import { useEffect, useState } from "react";

import "./App.css";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import RestartQuiz from "./components/RestartQuiz";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

function App() {
  // First start with useState hook then switch to useReducer hook.
  const [questions, setQuestions] = useState([]);
  const [status, setStatus] = useState("loading"); // loading, error, ready, active, finished.
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [point, setPoint] = useState(0);

  const totalQuestion = questions.length;
  // Current Version do not support the previous button functionality.

  //  Methods to move the questions
  function nextQuestion() {
    setAnswer(null);
    setActiveQuestion(activeQuestion + 1);
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

    if (Number(activeQuestion + 1) === totalQuestion) {
      setStatus("finished");
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
              totalPoint={totalQuestion * 5}
              answer={answer}
            />
            <Question
              questionDetail={questions[activeQuestion]}
              toggleAnswer={setNewAnswer}
              questionAnswer={answer}
            />
            {/* Do not support previous buttonfor now {activeQuestion !== 0 && (
              <PreviousButton toggleButton={previousQuestion} />
            )} */}
          </>
        )}
        {status === "finished" && (
          <>
            <FinishScreen point={point} maxPoint={totalQuestion * 5} />
            <RestartQuiz toggleButton={() => setStatus("ready")} />
          </>
        )}
      </Main>
      <Footer>
        {status === "active" && <Timer setStatus={setStatus} />}
        {(activeQuestion !== questions.length - 1) & (answer !== null) ? (
          <NextButton toggleButton={nextQuestion} />
        ) : null}
      </Footer>
    </>
  );
}

export default App;
