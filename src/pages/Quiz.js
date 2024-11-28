import React, { useState } from 'react';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

const QuizQuestion = ({ question, options, selectedOption, onSelectOption }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 className="text-xl font-semibold mb-4">{question}</h3>
    <div className="space-y-2">
      {options.map((option, index) => (
        <button
          key={index}
          className={`w-full text-left p-3 rounded-lg ${
            selectedOption === index
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => onSelectOption(index)}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export default function QuizAssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(5).fill(null));
  const [showResults, setShowResults] = useState(false);

  const quizData = [
    {
      question: "What is the output of print(2 + 3 * 4)?",
      options: ["14", "20", "11", "24"],
      correctAnswer: 0
    },
    {
      question: "Which of the following is used to define a function in Python?",
      options: ["function", "def", "define", "func"],
      correctAnswer: 1
    },
    {
      question: "What does the len() function do in Python?",
      options: ["Returns the largest item in an iterable", "Returns the smallest item in an iterable", "Returns the length of an object", "Returns the average of all items in an iterable"],
      correctAnswer: 2
    },
    {
      question: "Which of these is NOT a valid Python data type?",
      options: ["int", "float", "complex", "char"],
      correctAnswer: 3
    },
    {
      question: "What is the correct way to create a list in Python?",
      options: ["list = (1, 2, 3)", "list = {1, 2, 3}", "list = [1, 2, 3]", "list = '1, 2, 3'"],
      correctAnswer: 2
    }
  ];

  const handleSelectOption = (optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return selectedOptions.reduce((score, selected, index) => {
      return selected === quizData[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Python Fundamentals Quiz</h1>
        
        {!showResults ? (
          <>
            <div className="mb-4 flex justify-between items-center">
              <span className="text-lg font-semibold">Question {currentQuestion + 1} of {quizData.length}</span>
              <span className="text-sm text-gray-500">{Math.round(((currentQuestion + 1) / quizData.length) * 100)}% Complete</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}></div>
            </div>
            
            <QuizQuestion
              question={quizData[currentQuestion].question}
              options={quizData[currentQuestion].options}
              selectedOption={selectedOptions[currentQuestion]}
              onSelectOption={handleSelectOption}
            />
            
            <div className="flex justify-between mt-6">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg flex items-center"
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft size={20} className="mr-2" /> Previous
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center"
                onClick={handleNextQuestion}
              >
                {currentQuestion === quizData.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={20} className="ml-2" />
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
            <p className="text-xl mb-4">You scored {calculateScore()} out of {quizData.length}</p>
            {quizData.map((question, index) => (
              <div key={index} className="mb-4">
                <p className="font-semibold">{question.question}</p>
                <p className="flex items-center">
                  Your answer: {question.options[selectedOptions[index]]}
                  {selectedOptions[index] === question.correctAnswer ? (
                    <CheckCircle size={20} className="text-green-500 ml-2" />
                  ) : (
                    <XCircle size={20} className="text-red-500 ml-2" />
                  )}
                </p>
                {selectedOptions[index] !== question.correctAnswer && (
                  <p className="text-sm text-gray-600">
                    Correct answer: {question.options[question.correctAnswer]}
                  </p>
                )}
              </div>
            ))}
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center">
              <AlertCircle size={20} className="mr-2" /> Review Answers
            </button>
          </div>
        )}
      </div>
    </div>
  );
}