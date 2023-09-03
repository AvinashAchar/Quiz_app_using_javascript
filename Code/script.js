const quizData = [
    {
        question: "1. Which language runs in a web browser?",
        a: "a. Java",
        b: "b. C",
        c: "c. Python",
        d: "d. javascript",
        correct: "d",
    },
    {
        question: "2. What does CSS stand for?",
        a: "a. Central Style Sheets",
        b: "b. Cascading Style Sheets",
        c: "c. Cascading Simple Sheets",
        d: "d. Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "3. What is the capital of France?",
        a: "a. Paris",
        b: "b. London",
        c: "c. Berlin",
        d: "d. Madrid",
        correct: "a",
    },
    {
        question: "4. What does HTML stand for?",
        a: "a. Hypertext Markup Language",
        b: "b. Hypertext Markdown Language",
        c: "c. Hyperloop Machine Language",
        d: "d. Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "5. What year was JavaScript launched?",
        a: "a. 1996",
        b: "b. 1995",
        c: "c. 1994",
        d: "d.none of the above",
        correct: "b",
    },
];
const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')
const previousBtn = document.getElementById('previous')

let currentQuiz = 0
let score = 0
let selectedAnswers = new Array(quizData.length).fill(null);


loadQuiz()
function loadQuiz() {
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d

    const prevAnswer = selectedAnswers[currentQuiz];
    if (prevAnswer) {
        document.getElementById(prevAnswer).checked = true;
    }

    if (currentQuiz === 0) {
        previousBtn.style.display = 'none';
    } else {
        previousBtn.style.display = 'block';
    }


    if (currentQuiz === quizData.length - 1) {
        submitBtn.innerText = "Submit";
    } else {
        submitBtn.innerText = "Next";
    }
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}
function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}


submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        // Store the selected answer for the current question
        selectedAnswers[currentQuiz] = answer;

        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            calculateScore();
            showResultMessage();
        }
    }
});
function calculateScore() {
    score = 0;
    for (let i = 0; i < quizData.length; i++) {
        if (selectedAnswers[i] === quizData[i].correct) {
            score++;
        }
    }
}

function showResultMessage() {
    if (score >= 4) {
        quiz.innerHTML = `<div class="center-text2">Congratulations!</div>
        <img src="congratulations_image.png" alt="Congratulations">
        <div class="center-text">You answered ${score}/${quizData.length} questions correctly</div>
        <button onclick="location.reload()">Play Again</button>
        `;
    } else {
        quiz.innerHTML = `<div class="center-text1">Oh No! Hard Luck!!</div>
        <img src="tragain_images.png" alt="Try Again">
        <div class="center-text">You answered ${score}/${quizData.length} questions correctly</div>
        <button onclick="location.reload()">Play Again</button>
        `;
    }
}
previousBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer === quizData[currentQuiz].correct) {
        selectedAnswers[currentQuiz] = answer;
    }
    
    currentQuiz--;
    loadQuiz();
});