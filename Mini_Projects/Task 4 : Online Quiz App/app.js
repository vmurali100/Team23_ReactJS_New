// Question Class
class Question {
    constructor(text, options, correctIndex) {
      this.text = text;
      this.options = options;
      this.correctIndex = correctIndex;
    }
  
    isCorrectAnswer(selectedIndex) {
      return this.correctIndex === selectedIndex;
    }
  }
  
  // Sample Questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], 1),
    new Question("What is the capital of France?", ["Berlin", "Madrid", "Paris", "Rome"], 2),
    new Question("What is the largest planet?", ["Earth", "Jupiter", "Mars", "Saturn"], 1),
  ];
  
  // Quiz State
  let currentQuestionIndex = 0;
  let score = 0;
  
  // Initialize Quiz
  function initializeQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("resultSection").classList.add("hidden");
    document.getElementById("restartQuiz").classList.add("hidden");
    renderQuestion();
  }
  
  // Render Question
  function renderQuestion() {
    const quizContainer = document.getElementById("quizContainer");
    quizContainer.innerHTML = ""; // Clear previous content
  
    const question = questions[currentQuestionIndex];
  
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `
      <h2 class="text-xl font-semibold mb-4">${question.text}</h2>
      <div class="space-y-2">
        ${question.options
          .map(
            (option, index) =>
              `<button onclick="handleAnswer(${index})" class="block w-full bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">${option}</button>`
          )
          .join("")}
      </div>
    `;
  
    quizContainer.appendChild(questionElement);
  }
  
  // Handle Answer
  function handleAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
  
    if (question.isCorrectAnswer(selectedIndex)) {
      score++;
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      renderQuestion();
    } else {
      showResults();
    }
  }
  
  // Show Results
  function showResults() {
    const resultSection = document.getElementById("resultSection");
    const resultText = document.getElementById("resultText");
    const restartButton = document.getElementById("restartQuiz");
  
    resultSection.classList.remove("hidden");
    resultText.textContent = `You scored ${score} out of ${questions.length}!`;
  
    restartButton.classList.remove("hidden");
  }
  
  // Restart Quiz
  document.getElementById("restartQuiz").addEventListener("click", initializeQuiz);
  
  // Start the Quiz on Page Load
  initializeQuiz();
  