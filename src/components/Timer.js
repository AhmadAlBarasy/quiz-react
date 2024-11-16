import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  let minutes = secondsRemaining / 60;
  let seconds = secondsRemaining % 60;
  useEffect(() => {
    const id = setInterval(() =>{
      dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {Math.floor(minutes)}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  )
}

export default Timer;
