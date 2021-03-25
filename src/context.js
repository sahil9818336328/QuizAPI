import React, { createContext, useContext, useState } from "react";

const API_ENDPOINT = "https://opentdb.com/api.php?";
const resources = {
  sports: 21,
  history: 23,
  politics: 24,
};
const globalContext = createContext();
const AppProvider = ({ children }) => {
  const Provider = globalContext.Provider;

  //  STATE VARIABLES
  const [isWaiting, setIsWaiting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCorrect, setIsCorrect] = useState(0);
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions, setQuestions] = useState([]);

  // initial values for the form
  const [quiz, setQuiz] = useState({
    amount: 5,
    category: "sports",
    difficulty: "easy",
  });

  const fetchQuiz = async (url) => {
    setIsLoading(true);
    setIsWaiting(false);
    try {
      const response = await fetch(url);
      const finalData = await response.json();

      if (finalData) {
        setQuestions(finalData.results);
        setIsLoading(false);
        setIsWaiting(false);
      } else {
        setIsError(true);
        setIsWaiting(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //  EXECUTE THIS FUNCTION ON ONCHANGE
  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setQuiz({ ...quiz, [inputName]: inputValue });
  };

  //   HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    fetchQuiz(
      `${API_ENDPOINT}amount=${amount}&category=${resources[category]}&difficulty=${difficulty}&type=multiple`
    );
  };
  //  NEXT QUESTION
  const nextQuestion = () => {
    setIndex((old) => {
      let index = old + 1;
      if (index > questions.length - 1) {
        setIsModalOpen(true);
        return 0;
      } else {
        return index;
      }
    });
  };
  //  CHECK ANSWER
  const checkAnswer = (value) => {
    if (value) {
      setIsCorrect((old) => old + 1);
    }
    nextQuestion();
  };
  //  CLOSE MODAL
  const closeModal = () => {
    setIndex(0);
    setIsCorrect(0);
    setIsWaiting(true);
    setIsModalOpen(false);
  };
  return (
    <Provider
      value={{
        isLoading,
        isWaiting,
        quiz,
        handleChange,
        handleSubmit,
        isError,
        questions,
        isCorrect,
        index,
        checkAnswer,
        nextQuestion,
        isModalOpen,
        closeModal,
      }}
    >
      {children}
    </Provider>
  );
};

const useGlobalContext = () => {
  return useContext(globalContext);
};
export { AppProvider, useGlobalContext };
