import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Result.css";
import {decode} from 'html-entities';

const Result = () => {
  const navigate = useNavigate();

  const [score, setScore] = useState(0);

  const [answers, setAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [resultQuestions, setResultQuestions] = useState([]);

  useEffect(() => {
    const answer = JSON.parse(localStorage.getItem("answer"));
    const correctAnswers = JSON.parse(localStorage.getItem("correctAnswers"));
    const resultQuestions = JSON.parse(localStorage.getItem("resultQuestions"));
    if (answer) {
      setAnswers(answer);
      setCorrectAnswers(correctAnswers);
      setResultQuestions(resultQuestions);
    }
    getScore(answer, correctAnswers);
  }, []);

  const getScore = (answer, correctAnswers) => {
    var aux = 0;
    for (let key in answer) {
      if (answer[key] === correctAnswers[key]) {
        aux = aux + 1;
      }
      setScore(aux);
    }
  };

  return answers.length === 0 || answers[0] === null? (
    <div className="loading">
      <p className="score">There is no previous attempt to show the results.</p>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => navigate("/")}
      >
        GO TO HOMEPAGE
      </Button>
    </div>
  ) : (
    <div className="result">
      <p className="score">Score: {score}</p>
      <TableContainer className="table">
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" className="tableHeader">
                Question
              </TableCell>
              <TableCell align="center" className="tableHeader">
                Answer
              </TableCell>
              <TableCell align="center" className="tableHeader">
                Correct answer
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(answers).map((key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{decode(resultQuestions[key])}</TableCell>
                <TableCell align="center">{decode(answers[key])}</TableCell>
                <TableCell align="center">
                  {decode(correctAnswers[key])}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => navigate("/")}
      >
        GO TO HOMEPAGE
      </Button>
    </div>
  );
};

export default Result;
