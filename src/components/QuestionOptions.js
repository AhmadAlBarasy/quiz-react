function QuestionOptions({ question, dispatch, answer }) {
  const answered = answer !== null;
  return (
    <div className="options">
        {
        question.options.map((option, index) => {
        return <button 
          key={option}
          disabled={ answered } 
          onClick={() => dispatch({ type: 'newAnswer', payload: index })} 
          className={
            `btn btn-option 
            ${ index === answer ? "answer" : "" } 
            ${ answered ? index === question.correctOption ? "correct" : "wrong" : ""}`
          }
          >
          {option}
        </button>
      })
        }
      </div>
  )
}

export default QuestionOptions
