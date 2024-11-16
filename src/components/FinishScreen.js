function FinishScreen({ points, maxPoints, dispatch }) {
  return (
    <div>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints}
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'reset' })}>Back to home</button>
    </div>
  )
}

export default FinishScreen;
