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

var globalScoreCount = 1;
var correctCount = 0;
var incorrectCount = 0;
// two lines below are from renderQuestion function, check if they will mutate properly
let currentQuestionObject = dataArray[globalScoreCount-1];
let currentQuestionChoices = currentQuestionObject.choices;
function startQuizz() {
    //render the quiz section, which will start with init question
    //click button, run renderQuestion()
    //sets global counter to 0, check if these work properly
    var globalScoreCount = 1;
    var correctCount = 0;
    var incorrectCount = 0;
    console.log('startQuizz ran');
    $("#startButton").click(function() {
        renderQuestion();
      });
}
function evaluateAnswer() {
    $( "#quizzForm" ).submit(function( event ) {
        event.preventDefault();
        userInput = $("input[name='city']:checked").val();
        if (userInput === currentQuestionObject.correct) {
            console.log('correct');
            globalScoreCount++;
        } else {
            console.log('nah b');
            globalScoreCount++;
        }
        
      });
    //increment counter;
    console.log(globalScoreCount);
    //if right show the right screen()
    //if wrong show the wrong screen()
    //in both scenarios, next button will do the same thing - render next question.
    console.log('handleQuestionAnswer ran')
    renderQuestion();
}
function showCorrect(){
    //shows correct screens, on 'next' click runs renderQuestion
}
function renderQuestion() {
    //if dataArray.length === dataArray.length+1, then load final page??
    //
    //looks at global counter, renders the question page substituting proper values.
    //global counter shows question count, and 
    
    $('main').html(`
    <section class="quizz">
    <form id="quizzForm">
        <fieldset>
            <legend>${globalScoreCount}/${dataArray.length}: What is the capital of 
            ${currentQuestionObject.country}?</legend>
            <div><input type="radio" id="${currentQuestionChoices[0]}" name="city" value="${currentQuestionChoices[0]}">
            <label for="${currentQuestionChoices[0]}">${currentQuestionChoices[0]}</label></div>
            <div><input type="radio" id="${currentQuestionChoices[1]}" name="city" value="${currentQuestionChoices[1]}" required>
            <label for="${currentQuestionChoices[1]}">${currentQuestionChoices[1]}</label></div>
            <div><input type="radio" id="${currentQuestionChoices[2]}" name="city" value="${currentQuestionChoices[2]}">
            <label for="${currentQuestionChoices[2]}">${currentQuestionChoices[2]}</label></div>
            <input type="submit" value="Check">
        </fieldset>    
        <p>Correct: ${correctCount}, Incorrect: ${incorrectCount}</p>
        <p></p>
    </form>
</section>
    `);
}

function renderEnd() {
    //this will render the final page, and listen for the 'try again button' which 
    //will just run -startQuizz()-
}
function runQuizApp(){
    startQuizz();
    //delete after completing the func
    renderQuestion();
    evaluateAnswer();
    
}
$(runQuizApp);
