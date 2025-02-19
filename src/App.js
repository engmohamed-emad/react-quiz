import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
const initialState = {
  questions: [],
  status: "laoding",
  answer: null,
  questionIndex: 0,
  points: 0,
  progressIndex: 0,
  secondsRemaining: 530,
};
function reducer(state, action) {
  switch (action.type) {
    case "loading": {
      console.log("loading");
      return { ...state, status: "loading" };
    }
    case "fetched": {
      console.log(action.payload);
      return { ...state, questions: action.payload, status: "fetched" };
    }
    case "error": {
      console.log("error");
      return { ...state, status: "error" };
    }
    case "active": {
      return { ...state, status: "active" };
    }
    case "newAnswer": {
      const ques = state.questions.at(state.questionIndex);
      return {
        ...state,
        progressIndex: state.progressIndex + 1,
        answer: action.payload,
        points:
          state.points +
          (action.payload === ques.correctOption ? ques.points : 0),
      };
    }
    case "next": {
      const nextIndex =
        state.questionIndex < state.questions.length - 1
          ? state.questionIndex + 1
          : state.questionIndex;
      return {
        ...state,
        answer: null,
        questionIndex: nextIndex,
      };
    }
    case "finish": {
      return { ...state, status: "finished" };
    }
    case "restart": {
      return {
        ...state,
        status: "fetched",
        answer: null,
        questionIndex: 0,
        points: 0,
        progressIndex: 0,
        secondsRemaining: 10,
      };
    }
    case "tick": {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    answer,
    questionIndex,
    points,
    progressIndex,
    secondsRemaining,
  } = state;
  console.log(points);
  useEffect(function () {
    dispatch({ type: "loading" });
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "fetched", payload: data }))
      .catch((err) => dispatch({ type: "error" }));
  }, []);

  function handleStart() {
    dispatch({ type: "active" });
  }

  const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "fetched" && (
          <StartScreen numQuestions={questions.length} onStart={handleStart} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={questionIndex}
              progressIndex={progressIndex}
              totalQs={questions.length}
              score={points}
              totalPoints={totalPoints}
            />
            <Question
              question={questions[questionIndex]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                questionIndex={questionIndex}
                maxIndex={questions.length}
              />
            </footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

// {
//   "question": "When to use derived state?",
//   "options": [
//     "Whenever the state should not trigger a re-render",
//     "Whenever the state can be synchronized with an effect",
//     "Whenever the state should be accessible to all components",
//     "Whenever the state can be computed from another state variable"
//   ],
//   "correctOption": 3,
//   "points": 30
// },
// {
//   "question": "What triggers a UI re-render in React?",
//   "options": [
//     "Running an effect",
//     "Passing props",
//     "Updating state",
//     "Adding event listeners to DOM elements"
//   ],
//   "correctOption": 2,
//   "points": 20
// },
// {
//   "question": "When do we directly \"touch\" the DOM in React?",
//   "options": [
//     "When we need to listen to an event",
//     "When we need to change the UI",
//     "When we need to add styles",
//     "Almost never"
//   ],
//   "correctOption": 3,
//   "points": 20
// },
// {
//   "question": "In what situation do we use a callback to update state?",
//   "options": [
//     "When updating the state will be slow",
//     "When the updated state is very data-intensive",
//     "When the state update should happen faster",
//     "When the new state depends on the previous state"
//   ],
//   "correctOption": 3,
//   "points": 30
// },
// {
//   "question": "If we pass a function to useState, when will that function be called?",
//   "options": [
//     "On each re-render",
//     "Each time we update the state",
//     "Only on the initial render",
//     "The first time we update the state"
//   ],
//   "correctOption": 2,
//   "points": 30
// },
// {
//   "question": "Which hook to use for an API request on the component's initial render?",
//   "options": ["useState", "useEffect", "useRef", "useReducer"],
//   "correctOption": 1,
//   "points": 10
// },
// {
//   "question": "Which variables should go into the useEffect dependency array?",
//   "options": [
//     "Usually none",
//     "All our state variables",
//     "All state and props referenced in the effect",
//     "All variables needed for clean up"
//   ],
//   "correctOption": 2,
//   "points": 30
// },
// {
//   "question": "An effect will always run on the initial render.",
//   "options": [
//     "True",
//     "It depends on the dependency array",
//     "False",
//     "In depends on the code in the effect"
//   ],
//   "correctOption": 0,
//   "points": 30
// },
// {
//   "question": "When will an effect run if it doesn't have a dependency array?",
//   "options": [
//     "Only when the component mounts",
//     "Only when the component unmounts",
//     "The first time the component re-renders",
//     "Each time the component is re-rendered"
//   ],
//   "correctOption": 3,
//   "points": 20
// }
