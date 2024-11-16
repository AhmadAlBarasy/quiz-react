function StartScreen({ numQuestions, dispatch }) {
  return (
    <div>
      <h2>Welcome to the React quiz!</h2>
      <h3>{numQuestions} questions to test your React skills</h3>
      <button className="btn btn-ui" onClick={() => dispatch({ type: 'active' })}>Let's start</button>
    </div>
  )
}

export default StartScreen
