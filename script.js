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
  }
  
  function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    showQuestion();
  }
  
  showQuestion();
  