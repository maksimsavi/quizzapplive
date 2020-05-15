//question data
const dataArray = [
{country: 'Italy',
 choices: ['Rome', 'Budapest', 'Florence'],
 correct: 'Rome'},
{country: 'Switzerland',
 choices: ['Zurich', 'Bern', 'Geneva'],
 correct: 'Bern'},
{country: 'France',
 choices: ['Nantes', 'Bordeaux', 'Paris'],
 correct: 'Paris'},    
{country: 'Spain',
 choices: ['Valencia', 'Madrid', 'Barcelona'],
 correct: 'Madrid'}, 
{country: 'Hungary',
 choices: ['Budapest', 'Gyor', 'Pecs'],
 correct: 'Budapest'},
];
// globally mutated array which keeps track of variables
const counterObject = {
    globalScoreCount: 1,
    arrayIndex: 0,
    correctCount: 0,
    incorrectCount: 0,
    userInput: null
}
//resets variables, renders first question
function startQuizz() {
    counterObject.globalScoreCount = 1;
    counterObject.correctCount = 0;
    counterObject.incorrectCount = 0;
    counterObject.arrayIndex = 0;
    console.log('startQuizz ran');
    $("#startButton").click(function() {
        checkWhatToLoad();
      });
}
//check if answer is correct and reacts accordingly
function evaluateAnswer() {
    if (counterObject.userInput === dataArray[counterObject.arrayIndex].correct) {
        console.log('correct');
        counterObject.correctCount++;
        $(showCorrect());
    } else {
        console.log('nah b');
        counterObject.incorrectCount++;
        $(showIncorrect());
       }
    
}
//handles question answer (collects it, and runs evaluation function)
function collectAnswer() {
    $('main').on( "submit","#quizzForm",(function() {
        event.preventDefault();
        counterObject.userInput = $("input[name='city']:checked").val();
        evaluateAnswer();
      }));
}
//renders incorrect screen, updates score
function showIncorrect(){
    
    $('main').html(`
    <section class="quizzIncorrect fadeInAnimation">
    <h2>Oops! Capital of ${dataArray[counterObject.arrayIndex].country} is ${dataArray[counterObject.arrayIndex].correct}.</h2>
    <button type="button" id="nextButton">Next</button>
    `);
    counterObject.globalScoreCount++;
    counterObject.arrayIndex++;
    
}
//renders correct screen, updates score
function showCorrect(){
    //shows correct screens, on 'next' click runs renderQuestion
    $('main').html(`
    <section class="quizzIncorrect fadeInAnimation">
    <h2>Yes! Capital of ${dataArray[counterObject.arrayIndex].country} is indeed 
    ${dataArray[counterObject.arrayIndex].correct}.</h2>
    <button type="button" id="nextButton">Next</button>
    `);
    counterObject.globalScoreCount++;
    counterObject.arrayIndex++;
}
//tells browser to render next question
function reactToNextButtonClick() {
    $('main').on( "click","#nextButton",(function() { 
        checkWhatToLoad();
        }));
}
//check what browser should load
function checkWhatToLoad() {
    if (counterObject.globalScoreCount === dataArray.length+1) {
        $(renderEnd());
    }
    else {
        renderQuestion();
}
}
//renders a question

function renderQuestion() {
    $('main').html(`
    <section class="quizz fadeInAnimation">
    <form id="quizzForm">
        <fieldset>
            <legend><h2>${counterObject.globalScoreCount}/${dataArray.length}: What is the capital of 
            ${dataArray[counterObject.arrayIndex].country}?</h2></legend>
            
            <label for="${dataArray[counterObject.arrayIndex].choices[0]}">
            <div class="answerOption"><input class="design" type="radio" id="${dataArray[counterObject.arrayIndex].choices[0]}" name="city" value="${dataArray[counterObject.arrayIndex].choices[0]}" required>
            ${dataArray[counterObject.arrayIndex].choices[0]}</div></label>
            
            <label for="${dataArray[counterObject.arrayIndex].choices[1]}">
            <div class="answerOption"><input class="design" type="radio" id="${dataArray[counterObject.arrayIndex].choices[1]}" name="city" value="${dataArray[counterObject.arrayIndex].choices[1]}" required>
            ${dataArray[counterObject.arrayIndex].choices[1]}</div></label>

            
            <label for="${dataArray[counterObject.arrayIndex].choices[2]}"><div class="answerOption"><input class="design" type="radio" id="${dataArray[counterObject.arrayIndex].choices[2]}" name="city" value="${dataArray[counterObject.arrayIndex].choices[2]}">${dataArray[counterObject.arrayIndex].choices[2]}</div></label>
            <div class="inputholder"><input id="checkButton" type="submit" value="check"></div>
            </fieldset>    
        <p class="scorePar">Correct: ${counterObject.correctCount}, Incorrect: ${counterObject.incorrectCount}</p>
        
    </form>
</section>
    `);
    
}
//renders final page
function renderEnd() {
    $('main').html(`
    <section class="quizzEnd fadeInAnimation">
    <h2 id="endTitle">The End!</h2>
    <button type="button" id="tryAgainButton">try again?</button>
    <p class="scorePar">Correct: ${counterObject.correctCount}, Incorrect: ${counterObject.incorrectCount}</p>
    </section>
    `);
}
// restarts quizz
function reactToTryAgainButtonClick() {
    $('main').on( "click","#tryAgainButton",(function() {
        $(startQuizz());
        $(checkWhatToLoad());
      }));
}
//all the listeners
function runQuizApp(){
    startQuizz(); 
    reactToNextButtonClick();  
    reactToTryAgainButtonClick();
    collectAnswer();
}
//initiates system launch lol am I cool now
$(runQuizApp);
