

let sentences = ['ten ate neite ate nee enet ite ate inet ent eate',
                'Too ato too nOt enot one totA not anot tOO aNot',
                'oat itain oat tain nate eate tea anne inant nean',
                'itant eate anot eat nato inate eat anot tain eat',
                'nee ene ate ite tent tiet ent ine ene ete ene ate'
                /*'one',
                'two',
                'three',
                'four'*/];

let blueHighlight = $("#blue-block")
let upperCaseKey = $('#keyboard-upper-container')
let lowerCaseKey = $('#keyboard-lower-container')
let currentSentence = sentences[0];
let currentLetter = currentSentence[0];
let gameOver = false;
let letterIndex = 0;
let counter = 0;
let error = 0;
let line = 0;
let ascii = 0;


//Automatically hide Upper Case Keys
$("#keyboard-upper-container").hide();

//Change keyboard dependant on shift key press 
$(document).keydown(function (e) {
    if (e.which === 16) {
        $(upperCaseKey).show();
        $(lowerCaseKey).hide();
    }
});
$(document).keyup(function (e) {
    if (e.which === 16) {
        $(lowerCaseKey).show();
        $(upperCaseKey).hide();
    }
});

//Highlight the key Pressed 
$(document).keypress(function (e) {
        let ascii = $("#" + e.which);
        $(ascii).css("background-color", 'navy');
    $(document).keyup(function (e) {
        $(ascii).css("background-color", "black");
    });
});

$("#sentence").text(currentSentence);
$("#target-letter").text(currentLetter);

function checkLetter(){                                             //Check to see if the key pressed matches the current letter
    var getLetter = sentences[line].charCodeAt(counter);
    if(getLetter === ascii && counter < sentences[line].length){
        $('#feedback').append('<i class="glyphicon glyphicon-ok"></i>');
    }else{
        $('#feedback').append('<i class="glyphicon glyphicon-remove"></i>');
        error++;
    }
    $('#blue-block').animate({'left': '+=17.4px'},100);
    $('#target-letter').text(sentences[line][counter + 1]);
}

function init(restart){
    upperCaseKey.hide();
    lowerCaseKey.show();
    if (restart){
        line = 0;
        error= 0;
        endTimer = 0;
        startTimer = 0;
        gameOver = false;
    }
    counter = 0;
    $('#sentence').text(sentences[line]);   
    $('#target-letter').text(sentences[line[0]]);                    //go to new word
    $('#feedback').empty();                                     //Clear out check marks
    $('#blue-block').animate({'left': '12px'});               //Return cursor to start
}

function getWPM(){                                      //Calculate the total words per minute at the end of test
    var timer = endTimer - startTimer;
    var min = Math.floor(timer/60000);
    var sec = Math.floor((timer%60000)/1000);
    var time = min + sec/60;
    return Math.floor((48 - error)/time);
}


$(document).keypress(function(e) {
    ascii = e.which;
    $('#'+ ascii).addClass('keypress');

    if(!gameOver){
        if(counter === 0 && line === 0){
            startTimer = e.timeStamp;
        }else if (line === 4 && counter === sentences[line].length - 1){
            endTimer = e.timeStamp;
        }
    }
    checkLetter();

    if (counter + 1 < sentences[line].length){
        counter++;
    }else if(counter + 1 >= sentences[line].length && line < 4){
        line++;
        init(false);
    }else {
        $('.key').removeClass('keypress');
        $('#feedback').text('You typed ' + getWPM() + ' wpm.  Great Job!');
        setTimeout(function(){
            var again = confirm('Would you like to try again?');
            if (again) {
                init(true);
            } else {
                gameOver = true;
            }
        },2000);
    }
})

$(document).ready(function(){
    init();                                                     //Reset all variables and original state
})

