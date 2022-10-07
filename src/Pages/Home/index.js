import { Button, MenuItem, TextField } from "@material-ui/core";
import "./Home.css";
import Categories from "../../Data/Categories";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import ErrorMessage from "../../components/ErrorMessage/Errormessage";
import axios from "axios";
import { Context } from "../../Contexts/questions";

const Home = () => {
  const naviagte = useNavigate();
  // eslint-disable-next-line
  const [state, dispatch] = useContext(Context);

  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);

  const shuffleAnswers = (data) => {
    var values = {}
    for (var i = 0; i < data.length; i++) {
      const aux = [...data[i].incorrect_answers, data[i].correct_answer];
      values[i] = aux.sort(() => Math.random() - 0.5);
    }
    return values;
  }

  const fetchQuestions = async (category = "", difficulty = "") => {

    dispatch({
      type: "SET_LOADING"
    });

    const { data } = await axios.get(`https://opentdb.com/api.php?`, {
      params: {
        amount: 10,
        category,
        difficulty,
        type: "multiple",
      },
    });

    const questions = data.results;
    const answers = shuffleAnswers(data.results);

    dispatch({
      type: "SET_QUESTIONS",
      payload: {questions, answers},
    });
  };

  const handleSubmit = () => {
    if (!category || !difficulty) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      naviagte("/quiz");
    }
  };

  const handleShowResults = () => {
    naviagte("/result");
  }

  return (
    <div className="content">
      <div className="settings">
        <span className="quizSettings">Quiz Settings</span>
        <div className="settingsSelect">
          {error && <ErrorMessage>Please Fill all the feilds</ErrorMessage>}
          <TextField
            className="textField"
            select
            label="Select Category"
            variant="outlined"
            onChange={(aux) => setCategory(aux.target.value)}
            value={category}
            style={{ marginBottom: 30 }}
          >
            {Categories.map((aux) => (
              <MenuItem key={aux.category} value={aux.value}>
                {aux.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className="textField"
            select
            label="Select Difficulty"
            variant="outlined"
            onChange={(aux) => setDifficulty(aux.target.value)}
            value={difficulty}
            style={{ marginBottom: 30 }}
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Start Quiz
          </Button>
          <div className="space"/>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleShowResults}
          >
            Show previous attempt
          </Button>
        </div>
      </div>

      <img src="/quiz.svg" className="banner" alt="quiz" />
    </div>
  );
};

export default Home;
