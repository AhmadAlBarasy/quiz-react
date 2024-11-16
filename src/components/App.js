import { useReducer } from 'react';
import Header from './Header';
import Main from './main';
import Loader from './Loader';
import Error from './Error';
import Question from './Question';
import { useEffect } from 'react';
import StartScreen from './StartScreen';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';

const initialState = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    secondsRemaining: null,
};

const reducer = (state, action) => {
    switch(action.type){
        case 'dataRecieved':
            return {
                ...state,
                questions: action.payload,
                status: 'ready',
                secondsRemaining: action.secondsRemaining
            };
        case 'dataFailed':
            return {
                ...state,
                status: 'error'
            };
        case 'active':
            return {
                ...state,
                status: 'active'
            };
        case 'finished':
            return {
                ...state,
                status: 'finished'
            };
        case 'newAnswer':
            const question = state.questions.at(state.index);
            return { 
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? 
                state.points + question.points 
                : 
                state.points,
            };
        case 'nextQuestion':
            return {
                ...state,
                index: state.index + 1,
                answer: null
            };
        case 'tick':
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? 'finished' : state.status
            };
        case 'reset':
            return {
                ...initialState,
                questions: state.questions,
                status: 'ready',
                secondsRemaining: state.questions.length * 15,
            };
        default:
            throw new Error('Something went wrong');
    }
};

function App (){
    const [{ questions, status, index, answer, points, secondsRemaining }, dispatch] = useReducer(reducer, initialState);
    const numQuestions = questions.length;
    const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0); // calculating total scoring by adding worth points of all questions
    useEffect(function() {
        fetch('http://localhost:3001/questions')
            .then((res) => res.json())
            .then((data) => dispatch({
                type: 'dataRecieved',
                payload: data,
                secondsRemaining: data.length * 15 // 30 seconds for each question
            }))
            .catch((err) => dispatch({type: 'dataFailed'}));
    }, []);

    return <div className="app">
        <Header/>
        <Main>
            {
            status === 'loading' && <Loader/>
            }
            {
                status === 'error' && <Error/>
            }
            {
                status === 'ready' && 
                <StartScreen
                    dispatch={dispatch}
                    numQuestions={numQuestions}
                />
            }
            {
                status === 'active' && 
                <>
                    <Progress 
                        index={index} 
                        numQuestions={numQuestions}
                        points={points}
                        maxPoints={maxPoints}
                        answer={answer}
                    />
                    <Question 
                        question={questions[index]} 
                        dispatch={dispatch} 
                        answer={answer}
                    />
                    <Footer>
                        <Timer 
                            dispatch={dispatch}
                            secondsRemaining={secondsRemaining}
                        />
                        <NextButton 
                        dispatch={dispatch} 
                        numQuestions={numQuestions}
                        index={index}
                        />
                    </Footer>
                </>
            }
            {
                status === 'finished' && 
                <FinishScreen 
                    points={points}
                    maxPoints={maxPoints}
                    dispatch={dispatch}
                />
            }
        </Main>
    </div>
};

export default App;