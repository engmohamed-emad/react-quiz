import { useReducer } from "react";

const initialState = { count: 0, step: 1 };
function reducer(state, action) {
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + action.step };
    case "dec":
      return { ...state, count: state.count - action.step };
    case "setCounter":
      return { ...state, count: action.value };
    case "setStep":
      return { ...state, step: action.value };
    case "reset":
      return initialState;
    default:
      return state;
  }
}
function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec", step: step });
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({ type: "inc", step: step });
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ type: "setCounter", value: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "setStep", value: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
