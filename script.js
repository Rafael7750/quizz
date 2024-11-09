const questions = [
    {
      question: "O que é biotecnologia?",
      answers: [
        { text: "Uso de organismos para fins terapêuticos", correct: false },
        { text: "Estudo exclusivo de vírus", correct: false },
        { text: "Manipulação genética de organismos para fins industriais", correct: true },
        { text: "Técnica de cultivo de plantas sem solo", correct: false }
      ]
    },
    {
      question: "Qual é uma aplicação comum da biotecnologia na medicina?",
      answers: [
        { text: "Desenvolvimento de vacinas", correct: true },
        { text: "Produção de alimentos transgênicos", correct: false },
        { text: "Cultivo de células solares", correct: false },
        { text: "Extração de petróleo", correct: false }
      ]
    },
    {
      question: "O que são organismos geneticamente modificados (OGMs)?",
      answers: [
        { text: "Organismos que não sofreram alteração genética", correct: false },
        { text: "Organismos com genes alterados por técnicas de biotecnologia", correct: true },
        { text: "Organismos que foram clonados", correct: false },
        { text: "Organismos que vivem em ambientes extremos", correct: false }
      ]
    },
    {
      question: "Qual é um dos principais métodos utilizados na engenharia genética?",
      answers: [
        { text: "Fotossíntese", correct: false },
        { text: "Recombinação do DNA", correct: true },
        { text: "Fermentação", correct: false },
        { text: "Polimerização", correct: false }
      ]
    },
    {
      question: "Qual é a principal função da biotecnologia agrícola?",
      answers: [
        { text: "Produzir combustíveis renováveis", correct: false },
        { text: "Criar novas espécies de animais de estimação", correct: false },
        { text: "Melhorar a produtividade e resistência na agricultura", correct: true },
        { text: "Estudar o comportamento dos insetos", correct: false }
      ]
    },
    {
      question: "Qual é um risco associado ao uso de biotecnologia?",
      answers: [
        { text: "Aumento da biodiversidade", correct: false },
        { text: "Perda involuntária de biodiversidade e ecossistema", correct: true },
        { text: "Melhoria da segurança alimentar", correct: false },
        { text: "Redução de doenças em plantas", correct: false }
      ]
    }
  ];
  
  let currentQuestionIndex = 0;
let score = 0;

function showHomeScreen() {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = `
    <h1>Bem-vindo ao Quiz!</h1>
    <button onclick="startQuiz()">Começar</button>
    <button onclick="showLeaderboard()">Classificação</button>
  `;
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  answerButtons.innerHTML = "";

  const question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;

  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  selectedButton.style.backgroundColor = correct ? "green" : "red";

  // Desabilitar todos os botões após a escolha
  const answerButtons = document.getElementById("answer-buttons").children;
  for (let button of answerButtons) {
    button.disabled = true;
  }

  // Incrementa a pontuação se a resposta estiver correta
  if (correct) {
    score += 10;
  }
  
  // Verifica se ainda há perguntas ou se é o final do quiz
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    setTimeout(showQuestion, 1000); // Mostra a próxima pergunta após 1 segundo
  } else {
    setTimeout(showFinalScore, 1000); // Exibe o resultado final após a última pergunta
  }
}

function showFinalScore() {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = `
    <h1>Parabéns!</h1>
    <p>Você terminou o quiz!</p>
    <p>Sua pontuação: ${score} pontos</p>
    <label for="username">Digite seu nome para salvar na classificação:</label>
    <input type="text" id="username" placeholder="Seu nome" />
    <button onclick="saveScore()">Salvar Pontuação</button>
    <button onclick="showHomeScreen()">Voltar à Página Inicial</button>
  `;
}

function saveScore() {
  const username = document.getElementById("username").value;
  if (username) {
    const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
    scores.push({ name: username, score: score });
    localStorage.setItem("quizScores", JSON.stringify(scores));
    showLeaderboard();
  } else {
    alert("Por favor, insira seu nome!");
  }
}

function showLeaderboard() {
  const quizContainer = document.getElementById("quiz-container");
  const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  
  // Ordena as pontuações de forma decrescente
  scores.sort((a, b) => b.score - a.score);

  // Cria a interface de classificação
  quizContainer.innerHTML = `
    <h1>Classificação</h1>
    <ul>
      ${scores.map(score => `<li>${score.name}: ${score.score} pontos</li>`).join("")}
    </ul>
    <button onclick="showHomeScreen()">Voltar à Página Inicial</button>
  `;
}

// Inicia o quiz exibindo a tela inicial
showHomeScreen();