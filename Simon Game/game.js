var gamepattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
var buttonColors =["red", "blue", "green", "yellow"];
function startOver() {
     started=false;
     level=0;
     gamepattern=[];
}


$(document).keypress(function () {
    if(!started){
       $("#level-title").html("Level "+level);
       nextSequence();
       started = true;
    }
    
    
});

$(".btn").click(function () {
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(this);
    checkAnswer(userClickedPattern.length-1);
    
})

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel]===gamepattern[currentLevel]){
        if(userClickedPattern.length===gamepattern.length){
            setTimeout(function() {
               nextSequence();
            }, 1000);
    
        }
        
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 200);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();
    }
        
    
}




function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").html("Level "+level);
    var rand= Math.random()*4;
    rand=Math.floor(rand);
    var randomChosenColor=buttonColors[rand];
    gamepattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
    
}


function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $(currentColor).addClass("pressed");
    setTimeout(function(){
        $(currentColor).removeClass("pressed");
    }, 100);
    
}




