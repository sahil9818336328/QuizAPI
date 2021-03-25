import React from "react";
import { useGlobalContext } from "./context";

const Form = () => {
  const { quiz, handleChange, handleSubmit, isError } = useGlobalContext();

  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <h2>setup quiz</h2>

          {/* AMOUNT */}
          <div className="form-control">
            <label htmlFor="amount">number of questions</label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={quiz.amount}
              className="form-input"
              min={1}
              max={20}
              onChange={handleChange}
            />
          </div>

          {/* CATEGORY */}
          <div className="form-control">
            <label htmlFor="category">category</label>
            <select
              type="number"
              name="category"
              id="category"
              value={quiz.category}
              className="form-input"
              onChange={handleChange}
            >
              <option value="sports">sports</option>
              <option value="history">history</option>
              <option value="politics">politics</option>
            </select>
          </div>
        </form>

        {/* DIFFICULTY */}
        <div className="form-control">
          <label htmlFor="difficulty">select difficulty</label>
          <select
            name="difficulty"
            id="difficulty"
            value={quiz.difficulty}
            className="form-input"
            onChange={handleChange}
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>
        {isError && (
          <p className="error">
            can't generate questions, please try different options.
          </p>
        )}

        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          start
        </button>
      </section>
    </main>
  );
};

export default Form;
