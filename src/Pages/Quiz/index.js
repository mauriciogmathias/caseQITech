import { Button, CircularProgress, FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/Errormessage";
import { Context } from "../../Contexts/questions";
import {decode} from 'html-entities';
import "./Quiz.css"

const Quiz = () => {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(Context);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState([null, null, null, null, null, null, null, null, null, null]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [resultQuestions, setResultQuestions] = useState([]);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setAnswer({ ...answer, [currentQuestion]: event.target.value });
    setCorrectAnswers({ ...correctAnswers, [currentQuestion]: state.questions[currentQuestion].correct_answer });
    setResultQuestions({ ...resultQuestions, [currentQuestion]: state.questions[currentQuestion].question });
  };

  const handleQuit = () => {
    dispatch({
      type: "CLEAN_QUESTIONS"
    });
    navigate("/");
  }

  const handleFinish = () => {
    for (var i = 0; i < state.questions.length; i++) {
      if (answer[i] === null) {
        setError(true);
        return;
      }
    }
    navigate("/result")
  }

  useEffect(() => {
    if (state.loading === false && state.questions === null) {
      navigate("/");
    }
  }, [state, navigate]);

  useEffect(() => {
    localStorage.setItem('answer', JSON.stringify(answer));
    localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
    localStorage.setItem('resultQuestions', JSON.stringify(resultQuestions));
  }, [answer, correctAnswers, resultQuestions]);

  return state.loading || state.questions === null || state.questions === undefined? (
    <div className="loading"><CircularProgress/></div>
  ) : (
    <div className="quiz">
      {error && <ErrorMessage>Please answer all the questions before finishing the quiz.</ErrorMessage>}
      <div>
        <p className="lead">Question {currentQuestion+1}</p>
        <p className="question"> {decode(state?.questions?.[currentQuestion]?.question)}</p>
        <div  className="alternatives">
          <FormControl>
            <RadioGroup
              value={answer[currentQuestion]}
              onChange={handleChange}
            >
              {state.answers[currentQuestion].map((question, index) => {
                return (
                  <FormControlLabel key={index} value={decode(question)} control={<Radio />} label={decode(question)} />
                );
              })}
            </RadioGroup>
          </FormControl>
        </div>
        <div className="buttons">
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
          >
            PREVIOUS
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={currentQuestion === state.questions.length - 1}
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
          >
            NEXT
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleQuit}
          >
            QUIT
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleFinish}
          >
            FINISH
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
