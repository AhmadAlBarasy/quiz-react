function NextButton({ dispatch, answer, index, numQuestions }) {
  let lastQuestion = index >= numQuestions - 1;
  if (answer === null) return null;
  return <button className="btn btn-ui" onClick={() => dispatch({ type: !lastQuestion ? 'nextQuestion' : 'finished' })}>
    {!lastQuestion ? 'Next' : 'Finish'}
  </button>
}

export default NextButton;
