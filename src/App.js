import React from "react";
import Form from "./Form";
import Loading from "./Loading";
import Modal from "./Modal";
import { useGlobalContext } from "./context";

const App = () => {
  const {
    isLoading,
    isWaiting,
    isCorrect,
    index,
    questions,
    checkAnswer,
    nextQuestion,
  } = useGlobalContext();

  if (isLoading) {
    return <Loading />;
  }
  if (isWaiting) {
    return <Form />;
  }

  const { question, correct_answer, incorrect_answers } = questions[index];
  let totalAnswers = [...incorrect_answers, correct_answer];
  // SHUFFLING THE ANSWERS BEFORE RENDERING
  totalAnswers.sort(() => 0.5 - Math.random());
  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          {`correct answers : ${isCorrect}/${index}`}
        </p>
        <article className="container">
          <h2>{question}</h2>
          <div className="btn-container">
            {totalAnswers.map((answer, i) => {
              return (
                <button
                  key={i}
                  className="answer-btn"
                  dangerouslySetInnerHTML={{ __html: answer }}
                  onClick={() => checkAnswer(correct_answer === answer)}
                />
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          next
        </button>
      </section>
    </main>
  );
};

export default App;
