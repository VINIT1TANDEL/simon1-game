var buttonColours=["red","blue","green","yellow"];
var userclicked=[];
var gamePattern=[];
var start=false;
var level=0;

$(document).keypress(function(){
  if(!start){
  $("#level-title").text("Level "+level);
  nextSequence();
  start=true;
  }

});

//yahan par this bohot kaam ka he
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userclicked.push(userChosenColour);
  playSound(userChosenColour);
  animatedPress(userChosenColour);
  checkAnswer(userclicked.length-1);

});


function nextSequence(){
  userclicked=[];
  level++;
  $("#level-title").text("Level " +level);
  var randomNumber=Math.floor(Math.random()* 4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userclicked[currentLevel]){
      if(gamePattern.length===userclicked.length){
         setTimeout(function(){
          nextSequence();
         },1000);
      }

    }else{
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game-over ,Press any key to Restart");

      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
    
      startOver();
    }


}

function animatedPress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);

}

function playSound(name){
  var audio= new Audio("./sounds/"+name+".mp3");
  audio.play();
}

function startOver(){
     start=false;
     level=0;
     gamePattern=[];
}