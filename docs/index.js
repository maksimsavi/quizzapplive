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

let globalScoreCount = 1;
let arrayIndex =0;
let correctCount = 0;
let incorrectCount = 0;


// two lines below are from renderQuestion function, check if they will mutate properly

function startQuizz() {
    //render the quiz section, which will start with init question
    //click button, run renderQuestion()
    //sets global counter to 0, check if these work properly
    let globalScoreCount = 1;
    let correctCount = 0;
    let incorrectCount = 0;
    console.log('startQuizz ran');
    $("#startButton").click(function() {
        renderQuestion();
      });
}
function evaluateAnswer() {
    $( "#quizzForm" ).submit(function( event ) {
        event.preventDefault();
        
        userInput = $("input[name='city']:checked").val();
        function ifElseStatement() {
            if (userInput === dataArray[arrayIndex].correct) {
            console.log('correct');
            correctCount++;
            $(showCorrect());
        } else {
            console.log('nah b');
            incorrectCount++;
            $(showIncorrect());
           }
        };
        ifElseStatement();
        
         
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
    <h2>Oopsies! Capital of ${dataArray[arrayIndex].country} is ${dataArray[arrayIndex].correct}</h2>
    <button type="button" id="nextButton">Next</button>
    `);
    globalScoreCount++;
    arrayIndex++;
    $("#nextButton").click(function() {
        renderQuestion();
      });
    console.log("global score changed to "+globalScoreCount);
    console.log('showcorrecr ran');
}
function showCorrect(){
    //shows correct screens, on 'next' click runs renderQuestion
    $('main').html(`
    <section class="quizzIncorrect">
    <h2>Yes! Capital of ${dataArray[arrayIndex].country} is indeed 
    ${dataArray[arrayIndex].correct}.</h2>
    <button type="button" id="nextButton">Next</button>
    `);
    globalScoreCount++;
    arrayIndex++;
    $("#nextButton").click(function() {
        renderQuestion();
      });
    console.log("global score changed to "+globalScoreCount);
    console.log('showcorrecr ran');
}
function renderQuestion() {
    //if dataArray.length === dataArray.length+1, then load final page??
    //
    //looks at global counter, renders the question page substituting proper values.
    //global counter shows question count, and 
    
    if (globalScoreCount === dataArray.length+1) {
        $(renderEnd());
    }
    else {
        
    $('main').html(`
    <section class="quizz">
    <form id="quizzForm">
        <fieldset>
            <legend>${globalScoreCount}/${dataArray.length}: What is the capital of 
            ${dataArray[arrayIndex].country}?</legend>
            <div><input type="radio" id="${dataArray[arrayIndex].choices[0]}" name="city" value="${dataArray[arrayIndex].choices[0]}">
            <label for="${dataArray[arrayIndex].choices[0]}">${dataArray[arrayIndex].choices[0]}</label></div>
            <div><input type="radio" id="${dataArray[arrayIndex].choices[1]}" name="city" value="${dataArray[arrayIndex].choices[1]}" required>
            <label for="${dataArray[arrayIndex].choices[1]}">${dataArray[arrayIndex].choices[1]}</label></div>
            <div><input type="radio" id="${dataArray[arrayIndex].choices[2]}" name="city" value="${dataArray[arrayIndex].choices[2]}">
            <label for="${dataArray[arrayIndex].choices[2]}">${dataArray[arrayIndex].choices[2]}</label></div>
            <input type="submit" value="Check">
        </fieldset>    
        <p>Correct: ${correctCount}, Incorrect: ${incorrectCount}</p>
        <p></p>
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
    <h2>The End!</h2>
    <p>Here's your score:</p>
    <p>Correct: ${correctCount}, Incorrect: ${incorrectCount}</p>
    <button type="button" id="tryAgainButton">Try Again?</button>
</section>
    `);
        
    $("#tryAgainButton").click(function() {
        $('main').html(`
        <section class="intro">
        <header><h1>Cities Quiz</h1></header>
        <button type="button" id="startButton">Start Quizz</button>
        </section>
        `);
        $(startQuizz());
      });
}
function runQuizApp(){
    startQuizz();   
   
}
$(runQuizApp);
