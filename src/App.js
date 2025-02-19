import React, { useState, useEffect } from "react";
import "./App.css";

const quizData = [
  { question: "Who is known as the father of the computer?", options: ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"], answer: "Charles Babbage" },
  { question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Performance Utility", "Core Processing Unit"], answer: "Central Processing Unit" },
  { question: "Which programming language is known as the backbone of web development?", options: ["Python", "JavaScript", "C++", "Swift"], answer: "JavaScript" },
  { question: "Which company developed the Android operating system?", options: ["Microsoft", "Google", "Apple", "IBM"], answer: "Google" },
  { question: "What does HTTP stand for?", options: ["HyperText Transfer Protocol", "HyperText Transmission Process", "High Transfer Text Protocol", "Hyper Terminal Text Process"], answer: "HyperText Transfer Protocol" },
  { question: "Which data structure follows the LIFO principle?", options: ["Queue", "Array", "Stack", "Linked List"], answer: "Stack" },
  { question: "What does AI stand for?", options: ["Automated Interface", "Artificial Intelligence", "Advanced Integration", "Automated Internet"], answer: "Artificial Intelligence" },
  { question: "Which company created the C programming language?", options: ["Microsoft", "Bell Labs", "Apple", "IBM"], answer: "Bell Labs" },
  { question: "What is the primary function of an operating system?", options: ["Running applications", "Managing hardware and software resources", "Connecting to the internet", "Designing user interfaces"], answer: "Managing hardware and software resources" },
  { question: "Which of the following is an open-source database management system?", options: ["Oracle", "MySQL", "Microsoft SQL Server", "IBM Db2"], answer: "MySQL" },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(quizData.length).fill(null));
  const [lockedOptions, setLockedOptions] = useState(Array(quizData.length).fill(false));
  const [isCorrect, setIsCorrect] = useState(Array(quizData.length).fill(null));
  const [timer, setTimer] = useState(15);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      handleSubmit();
    }
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(15);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTimer(15);
    }
  };

  const handleOptionSelect = (opt) => {
    if (!lockedOptions[currentQuestion]) {
      let newSelectedOptions = [...selectedOptions];
      newSelectedOptions[currentQuestion] = opt;
      setSelectedOptions(newSelectedOptions);
    }
  };

  const handleSubmit = () => {
    if (!lockedOptions[currentQuestion]) {
      let newLockedOptions = [...lockedOptions];
      let newIsCorrect = [...isCorrect];
      newLockedOptions[currentQuestion] = true;
      const isAnswerCorrect = selectedOptions[currentQuestion] === quizData[currentQuestion].answer;
      newIsCorrect[currentQuestion] = isAnswerCorrect;

      if (isAnswerCorrect) {
        setScore(score + 1);
      }

      setLockedOptions(newLockedOptions);
      setIsCorrect(newIsCorrect);
    }
  };

  // Calculate attempted & non-attempted questions
  const attemptedQuestions = selectedOptions.filter(opt => opt !== null).length;
  const nonAttemptedQuestions = quizData.length - attemptedQuestions;

  return (
    <div className="quiz">
      {quizCompleted ? (
        <div className="result">
          <h1>Quiz Completed!</h1>
          <h2>Your Score: {score} / {quizData.length}</h2>
          <h3>✅ Attempted Questions: {attemptedQuestions}</h3>
          <h3>❌ Non-Attempted Questions: {nonAttemptedQuestions}</h3>
        </div>
      ) : (
        <>
          <header>
            <h1>Quiz Competition</h1>
            <div className="timer">⏳ Time Left: 00:{timer < 10 ? `0${timer}` : timer}</div>
          </header>

          <h2 className="question">{quizData[currentQuestion].question}</h2>

          <div className="options-grid">
            {quizData[currentQuestion].options.map((opt, index) => {
              let optionClass = "";
              if (lockedOptions[currentQuestion]) {
                if (opt === selectedOptions[currentQuestion]) {
                  optionClass = isCorrect[currentQuestion] ? "correct" : "wrong";
                }
                if (opt === quizData[currentQuestion].answer) {
                  optionClass = "correct";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(opt)}
                  className={`option ${optionClass}`}
                  disabled={lockedOptions[currentQuestion]}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="controls">
            {currentQuestion > 0 && <button onClick={handlePreviousQuestion} className="prev-btn">PREVIOUS</button>}
            {!lockedOptions[currentQuestion] ? (
              <button onClick={handleSubmit} className="submit-btn">SUBMIT</button>
            ) : (
              <button onClick={handleNextQuestion} className="next-btn">NEXT</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
