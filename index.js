var buttonColors = ["red", "blue", "green", "yellow", ]
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

$('.btn').click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
})

function checkAnswer(currentLevel) {
    for (var i = 0; i<userClickedPattern.length;i++){
        if (userClickedPattern[i] !== gamePattern[i] && gamePattern != 0){
            $('#level-title').text("Perdiste Awebao");
            $(document).addClass("game-over");
            started = false;
            level = 0;
            userClickedPattern = [];
            gamePattern = [];
            $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
            return;
        }
    }
    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
    }

}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    for (var i = 0; i < gamePattern.length; i++) {
        (function(index) {
            setTimeout(function() {
                $("#" + gamePattern[index]).fadeIn(100).fadeOut(100).fadeIn(100);
                playSound(gamePattern[index]);
            }, 300 * index);
        })(i);
    }
}


function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $('#'+currentColor).addClass('pressed');
    setTimeout(function() {$('#'+currentColor).removeClass('pressed');
    }, 100);
}



