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

// const initialState = {
//   questions: [],
//   state: "loading",
// };

function App() {
  // First start with useState hook then switch to useReducer hook.
  const [questions, setQuestions] = useState([]);
  const [status, setStatus] = useState("loading"); // loading, error, ready, active, finished.
  const totalQuestion = questions.length;
  const [activeQuestion, setActiveQuestion] = useState(0);

  //  Methods to move the questions
  function nextQuestion(){
    setActiveQuestion(activeQuestion+1)
  }
  
  function previousQuestion(){
    setActiveQuestion(activeQuestion-1)
  }
  
  // Load all question using use reducer
  useEffect(() => {
    fetch("http://localhost:8080/questions")
      .then((response) => response.json())
      .then((data) => {
        // Here set the question ans status status with new data.
        setQuestions(data);
        setStatus("ready");
        console.log(data);
      })
      .catch((reason) => {
        console.error("Failed to Fetch.", reason);
        setStatus("error");
      });
  }, []);
  console.log("Value is: ", questions[activeQuestion])
  console.log("Active is: ", activeQuestion)

  return (
    <>
      <Header />
      <Main>
        {status === "error" && <Error />}
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen
            totalQuestions={totalQuestion}
            toggleQuizStatus={setStatus}
          />
        )}
        {status === "active" && (
          <>
            <Question questionDetail={questions[activeQuestion]} />
            {activeQuestion !== questions.length-1 && <NextButton toggleButton={nextQuestion} />}
            {activeQuestion !== 0 && <PreviousButton toggleButton={previousQuestion} />}
          </>
        )}
        {/* Add Two forword and previous button */}
      </Main>
    </>
  );
}

export default App;
