const quizApp = {
  questions: [],

  userAnswers: {},

  // Add questions to the quiz
  addQuestion(question) {
    this.questions.push(question);
  },

  // Randomize question order
  randomizeQuestions() {
    this.questions.sort(() => Math.random() - 0.5);
  },

  // Render quiz questions
  renderQuiz() {
    const quizContainer = document.getElementById("quizContainer");
    quizContainer.innerHTML = ""; // Clear previous content

    this.questions.forEach((question, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.className = "mb-6";

      questionDiv.innerHTML = `
          <p class="mb-2 font-semibold">${index + 1}. ${question.text}</p>
          ${question.options
            .map(
              (option, i) =>
                `<label class="block">
                  <input type="radio" name="question-${index}" value="${option}" />
                  ${option}
                </label>`
            )
            .join("")}
        `;

      quizContainer.appendChild(questionDiv);
    });
  },

  // Collect user answers
  collectAnswers() {
    this.questions.forEach((question, index) => {
      const selectedOption = document.querySelector(
        `input[name="question-${index}"]:checked`
      );
      this.userAnswers[question.id] = selectedOption
        ? selectedOption.value
        : null;
    });
  },

  // Validate and score the quiz
  calculateScore() {
    let score = 0;
    const unanswered = [];

    this.questions.forEach((question) => {
      const userAnswer = this.userAnswers[question.id];

      if (!userAnswer) {
        unanswered.push(question.text);
        return;
      }

      const correctAnswer = question.options.find(
        (option) => option === question.correctAnswer
      );

      if (userAnswer === correctAnswer) {
        score++;
      }
    });

    return { score, unanswered };
  },

  // Display score
  displayScore(result) {
    const scoreContainer = document.getElementById("scoreContainer");
    scoreContainer.classList.remove("hidden");

    if (result.unanswered.length > 0) {
      scoreContainer.innerHTML = `
          <p>Your score: ${result.score}/${this.questions.length}</p>
          <p class="text-red-500">Unanswered questions:</p>
          <ul>${result.unanswered.map((q) => `<li>${q}</li>`).join("")}</ul>
        `;
    } else {
      scoreContainer.innerHTML = `<p>Your score: ${result.score}/${this.questions.length}</p>`;
    }
  },
};

// Add sample questions
quizApp.addQuestion({
  id: 1,
  text: "What is the capital of France?",
  options: ["Paris", "London", "Rome", "Berlin"],
  correctAnswer: "Paris",
});
quizApp.addQuestion({
  id: 2,
  text: "Which language is primarily used for web development?",
  options: ["Python", "JavaScript", "C++", "Ruby"],
  correctAnswer: "JavaScript",
});
quizApp.addQuestion({
  id: 3,
  text: "Is Earth the third planet from the Sun?",
  options: ["True", "False"],
  correctAnswer: "True",
});

// Randomize and render the quiz
quizApp.randomizeQuestions();
quizApp.renderQuiz();

// Handle quiz submission
document.getElementById("submitQuiz").addEventListener("click", () => {
  quizApp.collectAnswers();
  const result = quizApp.calculateScore();
  quizApp.displayScore(result);
});
