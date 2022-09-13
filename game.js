var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(".level-title").text(word() + " to Start");

$(document).click(function() {
  if (!started) {
    started = true;

    $(".level-title").text("3");

    // setting timer to start the game
    setTimeout(function() {
      $(".level-title").text("2");
    }, 1000);

    setTimeout(function() {
      $(".level-title").text("1");
    }, 2000);

    setTimeout(function() {
      $(".level-title").text("Go!");
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }, 3000);


  }
});


function getInput() {
  $(".btn").on("click", function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  });
}

function checkAnswer(currentLevel) {
  $(".btn").off("click"); // turning buttons off to avoid unwanted clicks
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    } else {
      getInput(); // take next button (input)
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $(".level-title").text("Game Over!");

    setTimeout(function() {
      $(".level-title").text(word() + " to Restart");
    }, 1000);

    setTimeout(function() {
      startOver();
    }, 1000);

  }
}


function nextSequence() {
  userClickedPattern = []; // reseting it for next level
  level++;
  $(".level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  getInput();
}

// following function generates words
// "Tap" or "Click" depending upon the device
function word() {
  let word = "";
  if (window.innerWidth > 0 && window.innerWidth <= 1280) {
    return word = "Tap";
  } else {
    return word = "Click";
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// following fuction resets the values for restarting the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
