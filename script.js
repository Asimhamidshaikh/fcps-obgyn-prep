let questions = [];
let currentIndex = 0;
let score = 0;

const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const explanation = document.getElementById('explanation');
const nextBtn = document.getElementById('nextBtn');
const scoreDisplay = document.getElementById('score');

// Load Questions from JSON file
async function loadQuestions() {
  const response = await fetch('questions.json');
  questions = await response.json();
  showQuestion();
}

function showQuestion() {
  explanation.classList.add('hidden');
  nextBtn.classList.add('hidden');
  optionsContainer.innerHTML = '';

  const q = questions[currentIndex];
  questionText.textContent = `Q${currentIndex + 1}. ${q.question}`;

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => selectOption(idx, btn);
    optionsContainer.appendChild(btn);
  });
}

function selectOption(selectedIdx, selectedBtn) {
  const q = questions[currentIndex];
  const allBtns = optionsContainer.querySelectorAll('.option-btn');

  // Freeze all buttons after pick
  allBtns.forEach(btn => btn.style.pointerEvents = 'none');

  if (selectedIdx === q.correct) {
    selectedBtn.classList.add('correct');
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  } else {
    selectedBtn.classList.add('wrong');
    allBtns[q.correct].classList.add('correct');
  }

  explanation.innerHTML = `<strong>Explanation:</strong> ${q.explanation}`;
  explanation.classList.remove('hidden');
  nextBtn.classList.remove('hidden');
}

nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    questionText.textContent = "🎉 Session Complete!";
    optionsContainer.innerHTML = `<p style="text-align:center; font-size:18px;">You scored <strong>${score} out of ${questions.length}</strong>.</p>`;
    explanation.classList.add('hidden');
    nextBtn.classList.add('hidden');
  }
};

loadQuestions();

