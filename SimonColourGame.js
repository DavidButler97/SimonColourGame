const sequence = [];
        let humanSequence = [];
        var count = 0;
        var level =0;
        var highscore=0;
        var intervalLength = 800;
        var timer = 1000;

        let secondsGoingBy = setInterval(function() //this is the timer that will end the game if the player
        {                                           //takes too long entering the signals 
          timer--;
          if(timer<=0)
          {
            clearInterval(secondsGoingBy);
            gameOver();
          } 
        }, 1000) 

         function reset() //Clears the game sequence and human sequence arrays and resets all the variables
        {                 //except the highscore variable as that should stay
          while (humanSequence.length > 0) 
          {
              humanSequence.pop();
          } 
          while (sequence.length > 0) 
          {
              sequence.pop();
          } 
          count = 0;
          level = 0;
          document.getElementById('level').textContent = "00";
          intervalLength = 800;
          timer=1000;
          clearInterval(secondsGoingBy);
          secondsGoingBy = setInterval(function() 
          {
          timer--;
          if(timer<=0)
          {
            clearInterval(secondsGoingBy);
            gameOver();
          } 
        }, 1000) 
          timer=1000;
        }

        function startButton() { //Starts the game if it hasn't already started. If the game has started, it resets the game.
          if (count == 0) {
            document.getElementById('tinyIndicator').style.backgroundColor = 'green';
            count++;
            timer=1000;
            setTimeout(()=>nextlevel(), 3000)
            
          } 
          else 
          {
            document.getElementById('tinyIndicator').style.backgroundColor = 'red';
            timer=1000;
            reset();
            
          }
        }

        function nextlevel() { //Generates a random button press, adds it to the sequence array, 
                              //updates the level display, and runs the sequence by calling runSequence()
          var newNum = Math.floor(Math.random() * (3 + 1) + 0);
          sequence.push(newNum);
          level++;
          document.getElementById("level").textContent = "0" + (level - 1);
          timer = 1000;
          runSequence();
          
          
        }


        function runSequence() //Runs the game sequence by looping through the sequence array and activating the 
                  //appropriate button press and light Once the sequence is complete, it enables user input by calling enableUserInput()
        {
          var count2 = 0; 
          timer=1000;
          humanSequence = [];
          if(level == 5)
          {
            intervalLength = 500;
          }
          if(level == 9)
          {
            intervalLength = 400;
          }
          if(level == 13)
          {
            intervalLength = 300;
          }
          var interval = setInterval(function() 
          {
            timer=1000;
            if (count2 >= sequence.length) 
            {
              clearInterval(interval); //clears when we hit the end of the sequence
              enableUserInput();
              return;
            }

            //console.log(sequence);
            if (sequence[count2] == 0) {
              topLeftGlow();
              timer==1000;
              setTimeout(()=>topLeftDim(), intervalLength)
            }
            if (sequence[count2] == 1) {
              bottomLeftGlow();
              timer==1000;
              setTimeout(()=>bottomLeftDim(), intervalLength)
            }
            if (sequence[count2] == 2) {
              topRightGlow();
              timer==1000;
              setTimeout(()=>topRightDim(), intervalLength)
            }
            if (sequence[count2] == 3) {
              bottomRightGlow();
              timer==1000;
              setTimeout(() =>bottomRightDim(), intervalLength)
            }
            count2++;
          }, (intervalLength*2));
            while (humanSequence.length > 0) 
            {
              humanSequence.pop();
            } 
        }
        
        function enableUserInput() //Enables user input by adding event listeners to the four buttons. 
        //It checks the human sequence against the game sequence by calling checkSequence() after each button press.
        {
            allLightsOn();  // this will indicate to the player that its their turn to
            setTimeout(() =>allLightsOff(), 100); //try and repeat the signals(quick flash of all buttons)
            timer =8;
            humanSequence = [];
            document.getElementById('topLeftSmall-circle').addEventListener('click', function() 
            {
              timer = 7;
              humanSequence.push(0);
              console.log('humanSequence', humanSequence);
              setTimeout(()=>document.getElementById('topLeftSmall-circle').removeEventListener('click', arguments.callee ), 6000)
              checkSequence();
            });
            document.getElementById('bottomLeftSmall-circle').addEventListener('click', function() 
            {
              timer = 7;
              humanSequence.push(1);
              console.log('humanSequence',humanSequence);
              setTimeout(()=>document.getElementById('bottomLeftSmall-circle').removeEventListener('click', arguments.callee ), 6000)
              checkSequence();
            });
            document.getElementById('topRightSmall-circle').addEventListener('click', function() 
            {
              timer = 7;
              humanSequence.push(2);
              console.log('humanSequence',humanSequence);
              setTimeout(()=>document.getElementById('topRightSmall-circle').removeEventListener('click', arguments.callee ), 6000)          
              checkSequence();
            });
            document.getElementById('bottomRightSmall-circle').addEventListener('click', function() 
            {
              timer = 7;
              humanSequence.push(3);
              console.log('humanSequence',humanSequence);
              setTimeout(()=>document.getElementById('bottomRightSmall-circle').removeEventListener('click', arguments.callee ), 6000)
              checkSequence();
            });

        }


        function checkSequence() // Checks whether the human sequence matches the game sequence so far. 
        //If it does, it starts the next level by calling nextlevel(). 
        //If it doesn't, it triggers a game over by calling gameOver()
        {
          if (humanSequence.length === sequence.length) 
          {
            for (var i = 0; i < sequence.length; i++) 
            {
              if (humanSequence[i] !== sequence[i]) 
              {
                gameOver();
                return;
              }
            }
            nextlevel();
          }
        }
        timer=1000;
        function gameOver() //Triggers a game over by flashing the button press lights five times,
                    // updating the high score if necessary, and resets the game.
        {
          console.log("game over");
          var intervalCount = 0;
          var interval1 = setInterval(function() 
          {
            allLightsOn();  
            setTimeout(() =>allLightsOff(), 100);
            intervalCount++;
            //stops the repeating once has flashed 5 times
            if(intervalCount==5) clearInterval(interval1);
            // updates highscore if its higher than current level at end
                   
          }, 200) 
          if(level>highscore) document.getElementById("highscore").textContent =  "0" + (level-1);
          startButton();
        }
        
        function topLeftGlow()
        {
          document.getElementById('topLeftSmall-circle').style.filter = "brightness(200%)";
        }
        function topLeftDim()
        {
          document.getElementById('topLeftSmall-circle').style.filter = "brightness(70%)";
        }

        function bottomLeftGlow()
        {
          document.getElementById('bottomLeftSmall-circle').style.filter = "brightness(200%)";
        }
        function bottomLeftDim()
        {
          document.getElementById('bottomLeftSmall-circle').style.filter = "brightness(70%)";
        }


        function topRightGlow()
        {
          document.getElementById('topRightSmall-circle').style.filter = "brightness(200%)";
        }
        function topRightDim()
        {
          document.getElementById('topRightSmall-circle').style.filter = "brightness(70%)";
        }


        function bottomRightGlow()
        {
          document.getElementById('bottomRightSmall-circle').style.filter = "brightness(200%)";
        }
        function bottomRightDim()
        {
          document.getElementById('bottomRightSmall-circle').style.filter = "brightness(70%)";
        }  
        function allLightsOn()
        {
          topLeftGlow();
          topRightGlow();
          bottomLeftGlow();
          bottomRightGlow();
        }
        function allLightsOff()
        {
          topLeftDim();
          topRightDim();
          bottomLeftDim();
          bottomRightDim();
        }