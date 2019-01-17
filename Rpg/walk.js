//Global variables that will be accessed in the functions below.
var currentKey;          //records the current key pressed
var TimerWalk;          //timer handle
var charStep = 2;       //1=1st foot, 2=stand, 3=2nd foot, 4=stand
var charSpeed = 400; //how fast the character will move
var currentRoom = 1;

//Once the DOM is ready, set the character to facing forward (default position)
$(document).ready(function() {

//add character state class
$('#character').addClass('back-stand');

});

//KeyDown Function
//if there is no currentKey down, execute charWalk
$(document).keydown(function(e) {
  if (!currentKey) {

    //set the currentKey to the key that is down
    currentKey = e.keyCode;

    //execute character movement function charWalk('direction')
    switch(e.keyCode) {
      case 38: charWalk('up');    break;
      case 39: charWalk('right'); break;
      case 40: charWalk('down');  break;
      case 37: charWalk('left');  break;
    }

  }

});

//KeyUp Function
$(document).keyup(function(e) {

  //don't stop the walk if the player is pushing other buttons
  //only stop the walk if the key that started the walk is released
  if (e.keyCode == currentKey) {

    //set the currentKey to false, this will enable a new key to be pressed
    currentKey = false;

    //clear the walk timer
    clearInterval(TimerWalk);

    //finish the character's movement
    $('#character').stop(true, true);

  }

});

//Character Walk Function
function charWalk(dir) {

  //adjust from lang to code
  if (dir == 'up') dir = 'back';
  if (dir == 'down') dir = 'front';

  //move the character
  processWalk(dir);

  //set the interval timer to continually move the character
  TimerWalk = setInterval(function() { processWalk(dir); }, charSpeed);

}

//Process Character Walk Function
function processWalk(dir) {

  //increment the charStep as we will want to use the next stance in the animation
 //if the character is at the end of the animation, go back to the beginning
  charStep++;
  if (charStep == 5) charStep = 1;

  //remove the current class
  $('#character').removeAttr('class');

  //add the new class
  switch(charStep) {
    case 1: $('#character').addClass(dir+'-stand'); break;
    case 2: $('#character').addClass(dir+'-right'); break;
    case 3: $('#character').addClass(dir+'-stand'); break;
    case 4: $('#character').addClass(dir+'-left');  break;
  }

  var top = parseInt($("#character").css("top"));
  var left = parseInt($("#character").css("left"));
  console.log ("top: " + top + " | left: " + left + " | currentRoom : " + currentRoom);

  // == upstairs ==

  if((top >= 0 && top <= 68) && (left >= 448 && left <= 512) && currentRoom == 1){
    top = 0;
    left = 0;
    currentRoom = 2;
    $("#character").remove();
    $("#room1").hide();
    $("#room2").show();
    $("#room2").append("<div id='wall1' class='tembok'> </div> <div id='character' style='top:280px; left:98px;'>");
    $('#character').addClass('back-stand');
  }

  // == balik ke lobby ==

  if((top >= 320 && top <= 352) && (left >= 32 && left <= 160) && currentRoom == 2){
    top = 0;
    left = 0;
    currentRoom = 1;
    $("#character").remove();
    $("#room2").hide();
    $("#room1").show();
    $("#room1").append("<div id='character' style='top:64px;left:460px;'></div>");
  }

  // == hallway 1 ==

  if ((top >= 96 && top <= 150) && (left >= 530 && left <= 576) && currentRoom == 2){
    top = 0;
    left = 0;
    currentRoom = 3;
    $("#character").remove();
    $("#room2").hide();
    $("#room3").show();
    $("#room3").append("<div id='wall1' class='tembok'> <div id='character'style='top:120px;left:96px;'></div>");
    $('#character').addClass('right-stand');
  } 

  // == back ke hallway 1 == 

  if((top >= 96 && top <= 150) && (left >= 0 && left <= 64) && currentRoom == 3){
    top = 0;
    left = 0;
    currentRoom = 2;
    $("#character").remove();
    $("#room3").hide();
    $("#room2").show();
    $("#room2").append("<div id='wall1' class='tembok'> <div id='character'style='top:120px;left:520px;'></div>");
    $('#character').addClass('left-stand');
  }

  // == classRoom1 (room 3) ==

  if((top >= 32 && top <= 64) && (left >= 544 && left <= 576) && currentRoom == 3){
    top = 0;
    left = 0;
    currentRoom = 4;
    $("#character").remove();
    $("#room3").hide();
    $("#room4").show();
    $("#room4").append("<div id='wall1' class='tembok'> <div id='character'style='top:64px;left:64px;'></div>");
    $('#character').addClass('right-stand');
  } 

  // == classRoom 2 (room 3) ==

  // == keluar classRoom1 (room 3) == 

  if((top >= 32 && top <= 64) && (left >= 0 && left <= 64) && currentRoom == 4){
    top = 0;
    left = 0;
    currentRoom = 3;
    $("#character").remove();
    $("#room4").hide();
    $("#room3").show();
    $("#room3").append("<div id='wall1' class='tembok'> <div id='character'style='top:64px;left:544px;'></div>");
    $('#character').addClass('left-stand');
  }

  // == hallway 2 == 

  if((top >= 320 && top <= 352) && (left >= 444 && left <= 500) && currentRoom == 3){
    top = 0;
    left = 0;
    currentRoom = 5;
    $("#character").remove();
    $("#room3").hide();
    $("#room5").show();
    $("#room5").append("<div id='character'style='top:64px;left:490px;'></div>");
    $('#wall1').setAttribute("style","width :430px");
  }

  // == balik ke hallway 2 == 
  if((top >= 0 && top <= 32) && (left >= 468 && left <= 522) && currentRoom == 5){
    top = 0;
    left = 0;
    currentRoom = 3;
    $("#character").remove();
    $("#room5").hide();
    $("#room3").show();
    $("#room3").append("<div id='wall1' class='tembok'> <div id='character' style='top:294px; left:500px;'></div>");
    $('#character').addClass('back-stand');
  }

  // == masuk ke canteen == 
  if((top >= 192 && top <= 352) && (left >= 0 && left <= 20) && currentRoom == 5){
    top = 0;
    left = 0;
    currentRoom = 6;
    $("#character").remove();
    $("#room5").hide();
    $("#room6").show();
    $("#room6").append("<div id='wall1' class='tembok'> <div id='character' style='top:315px; left:490px;'></div>");
    $('#character').addClass('left-stand');
  }

  // == balik ke hallway 3 (yg ada canteen nya) == 
  if((top >= 187 && top <= 352) && (left >= 522 && left <= 586) && currentRoom == 6){
    top = 0;
    left = 0;
    currentRoom = 5;
    $("#character").remove();
    $("#room6").hide();
    $("#room5").show();
    $("#room5").append("<div id='wall1' class='tembok'> <div id='character' style='top:315px; left: 74px;'></div>");
    $('#character').addClass('right-stand');
  }

  //move the char
  //we will only want to move the character 32px (which is 1 unit) in any direction
  switch(dir) {
    case'front':
      if($('#character').position().top < 352){
         $('#character').animate({top: '+=32'}, charSpeed);
      }
      break;
    case'back':
      //don't let the character move any further up if they are already at the top of the screen
      if ($('#character').position().top > 0) {
          $('#character').animate({top: '-=32'}, charSpeed);
      }
      break;
    case'left':
    //don't let the character move any further left if they are already at the left side of the screen  
    if ($('#character').position().left > 0) {
        $('#character').animate({left: '-=32'}, charSpeed);
      }
      break;
    case'right':
    if ($('#character').position().left < 564){
      $('#character').animate({left: '+=32'}, charSpeed);
    }
      break;

    }


}
