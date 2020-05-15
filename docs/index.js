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
const counterObject = {
    globalScoreCount: 1,
    arrayIndex: 0,
    correctCount: 0,
    incorrectCount: 0
}
/*
let globalScoreCount = 1;
let arrayIndex =0;
let correctCount = 0;
let incorrectCount = 0;
*/

// two lines below are from renderQuestion function, check if they will mutate properly

function startQuizz() {
    //render the quiz section, which will start with init question
    //click button, run renderQuestion()
    //sets global counter to 0, check if these work properly
    //let globalScoreCount = 1;
    counterObject.globalScoreCount = 1;
    //let correctCount = 0;
    counterObject.correctCount = 0;
    // let incorrectCount = 0;
    counterObject.incorrectCount = 0;
    counterObject.arrayIndex = 0;
    console.log('startQuizz ran');
    $("#startButton").click(function() {
        renderQuestion();
      });
}
function evaluateAnswer() {
    $( "#quizzForm" ).submit(function( event ) {
        event.preventDefault();
        userInput = $("input[name='city']:checked").val();
            if (userInput === dataArray[counterObject.arrayIndex].correct) {
            console.log('correct');
            counterObject.correctCount++;
            $(showCorrect());
        } else {
            console.log('nah b');
            counterObject.incorrectCount++;
            $(showIncorrect());
           }
      //  };
       // ifElseStatement();
        
         
      });
    //increment counter;
    
    //if right show the right screen()
    //if wrong show the wrong screen()
    //in both scenarios, next button will do the same thing - render next question.
    console.log('evaluateAnswer ran')
    
}
function showIncorrect(){
    //shows incorrect screens, on 'next' click runs renderQuestion
    $('main').html(`
    <section class="quizzIncorrect">
    <h2>Oops! Capital of ${dataArray[counterObject.arrayIndex].country} is ${dataArray[counterObject.arrayIndex].correct}.</h2>
    <button type="button" id="nextButton">Next</button>
    `);
    counterObject.globalScoreCount++;
    counterObject.arrayIndex++;
    
}
function showCorrect(){
    //shows correct screens, on 'next' click runs renderQuestion
    $('main').html(`
    <section class="quizzIncorrect">
    <h2>Yes! Capital of ${dataArray[counterObject.arrayIndex].country} is indeed 
    ${dataArray[counterObject.arrayIndex].correct}.</h2>
    <button type="button" id="nextButton">Next</button>
    `);
    counterObject.globalScoreCount++;
    counterObject.arrayIndex++;
 }
function reactToNextButtonClick() {
    $('main').on( "click","#nextButton",(function() {
        
        renderQuestion();
      }));

      console.log('react to next ran');
}
function renderQuestion() {
    //if dataArray.length === dataArray.length+1, then load final page??
    //
    //looks at global counter, renders the question page substituting proper values.
    //global counter shows question count, and 
    
    if (counterObject.globalScoreCount === dataArray.length+1) {
        $(renderEnd());
    }
    else {
        
    $('main').html(`
    <section class="quizz">
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
            <div class="inputholder"><input type="submit" value="check"></div>
            </fieldset>    
        <p class="scorePar">Correct: ${counterObject.correctCount}, Incorrect: ${counterObject.incorrectCount}</p>
        
    </form>
</section>
    `);
    evaluateAnswer();}
}
function renderEnd() {
    //this will render the final page, and listen for the 'try again button' which 
    //will just run -startQuizz()-
    $('main').html(`
    <section class="quizzEnd">
    <h2 id="endTitle">The End!</h2>
    <button type="button" id="tryAgainButton">try again?</button>
    <p class="scorePar">Correct: ${counterObject.correctCount}, Incorrect: ${counterObject.incorrectCount}</p>
    </section>
    `);
}
function reactToTryAgainButtonClick() {
    $('main').on( "click","#tryAgainButton",(function() {
        $(startQuizz());
        $(renderQuestion);
      }));

      console.log('react to try again ran');
}
function runQuizApp(){
    startQuizz(); 
    reactToNextButtonClick();  
    reactToTryAgainButtonClick();
    
}
$(runQuizApp);
