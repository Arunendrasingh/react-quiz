import { useEffect, useState } from "react";

function Timer({ setStatus }) {
  const [secondRemaining, setSecondRemaining] = useState(10);
  useEffect(
    function () {
      const timer = setInterval(() => {
        if (Number(secondRemaining) === 0) {
          setStatus("finished");
        }
        setSecondRemaining((currentState) => currentState - 1);
        return clearInterval(timer);
      }, 1000);
    },
    [secondRemaining, setStatus]
  );
  return <div className="timer">{secondRemaining}</div>;
}

export default Timer;
