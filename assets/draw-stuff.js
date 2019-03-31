  var refreshIntervalId = 0;
var downCounter = 1;
var across = 0;
var down = 0;
var acrossCounter = 1;
// creates a multi dimentional array of size 400x400
var SIZE2 = 41;
var SIZE = 20;
var matrix = createMatrix(SIZE, SIZE2);


  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");
  
   var canvas2 = document.getElementById('canvas2');
  var ctx2 = canvas2.getContext("2d");
  
  makeGrid();
  
  var elem = document.getElementById("block");
function autoRun()
{
refreshIntervalId = setInterval(move, 1010);//don't change time, this connects with how fast animations go
}

function pause()
{
  clearInterval(refreshIntervalId);
}

function makeGrid()
{
	var x =0;
	var	y=0;
	for( i = 0; i < 5; i++)
	{
		
		ctx2.strokeRect(x,y,10,10);
		ctx2.strokeRect(x,y+10,10,10);
		x += 10;
	}
}

function fillMatrix()
{
  // initializes the first row
  for(var i = 0; i < SIZE2; i++)
  {
    if(i != 20)
    {
      matrix[0][i] = 0;
    }
    else
    {
      matrix[0][i] = 1;
    }
  }
  for(i = 1; i < SIZE; i++) // for down
  {
    for(var j = 0; j < SIZE2; j++) //for across
    {
      if(j==0)
      {
        //special case for left edge cells
        if(matrix[i-1][j]==1 && matrix[i-1][j+1]==1)//rule 5
          matrix[i][j]=0;
        if(matrix[i-1][j]==1 && matrix[i-1][j+1]==0)//rule 6
          matrix[i][j]=1;
        if(matrix[i-1][j]==0 && matrix[i-1][j+1]==1)//rule 7
          matrix[i][j]=1;
        if(matrix[i-1][j]==0 && matrix[i-1][j+1]==0)//rule 8
          matrix[i][j]=0;
      }
      else if(j==(SIZE2-1))
      {
        //special case for right edge cells
        if(matrix[i-1][j-1]==1 && matrix[i-1][j]==1)//rule 2
          matrix[i][j]=0;
        if(matrix[i-1][j-1]==1 && matrix[i-1][j]==0)//rule 4
          matrix[i][j]=1;
        if(matrix[i-1][j-1]==0 && matrix[i-1][j]==1)//rule 6
          matrix[i][j]=1;
        if(matrix[i-1][j-1]==0 && matrix[i-1][j]==0)//rule 8
          matrix[i][j]=0;
      }
      else
      {
        //for all non-edge cells
        if(matrix[i-1][j-1]==1 && matrix[i-1][j]==1 && matrix[i-1][j+1]==1)//rule 1
          matrix[i][j]=1;
        if(matrix[i-1][j-1]==1 && matrix[i-1][j]==1 && matrix[i-1][j+1]==0)//rule 2
          matrix[i][j]=0;
        if(matrix[i-1][j-1]==1 && matrix[i-1][j]==0 && matrix[i-1][j+1]==1)//rule 3
          matrix[i][j]=0;
        if(matrix[i-1][j-1]==1 && matrix[i-1][j]==0 && matrix[i-1][j+1]==0)//rule 4
          matrix[i][j]=1;
        if(matrix[i-1][j-1]==0 && matrix[i-1][j]==1 && matrix[i-1][j+1]==1)//rule 5
          matrix[i][j]=0;
        if(matrix[i-1][j-1]==0 && matrix[i-1][j]==1 && matrix[i-1][j+1]==0)//rule 6
          matrix[i][j]=1;
        if(matrix[i-1][j-1]==0 && matrix[i-1][j]==0 && matrix[i-1][j+1]==1)//rule 7
          matrix[i][j]=1;
        if(matrix[i-1][j-1]==0 && matrix[i-1][j]==0 && matrix[i-1][j+1]==0)//rule 8
          matrix[i][j]=0;
      }
    }
  }
}

/* function that creates a matrix
   function was created with help of Stack Overflow answer by Matthew Crumley
 link: https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript */
function createMatrix(length)
{
      var array = new Array(length || 0), y = length;
      if (arguments.length > 1)
      {
          var argument = Array.prototype.slice.call(arguments, 1);
          while(y-- != 0)
          {
            array[length-1 - y] = createMatrix.apply(this, argument);
          }
      }
      return array;
  }

fillMatrix();
//drawTM();

var states = [];
var stateCounter = 0;

function fillIn()
{
	ctx.fillRect((across)*10, (down+1)*10, 10, 10);
}

function move()
{

//  console.log("stateCounter = " + stateCounter);
  ctx.fillRect(200, 0, 10, 10);
  //if(stateCounter < 3)
  //{
  if(across > 0)
  {
  $( ".block" ).animate({ "left": "+=10px" }, "fast");//go right 1
  }
  console.log("states[" + stateCounter + "] = matrix[" + down + "][" + across +"]");
  states[stateCounter] = matrix[down][across];
  //}
  if(across == 0)
  {
    states[0] = 0;
    states[1] = matrix[down][across];
    states[2] = matrix[down][across+1];
  }
  if(across == 41)
  {
    states[2] = 0;
  }
  across++;
  stateCounter++;
  if(stateCounter == 3)
  {
    console.log("states = [" + states[0] + states[1] + states[2] + "]");
    if(states[0] == 1 && states[1] == 1 && states[2] == 1) //state 1
    { //write
      document.getElementById("state").innerHTML = "1";
      $( ".block" ).animate({ "left": "-=10px" }, "fast");//go left 1
      $( ".block" ).animate({ "top": "+=10px" },"fast");//go Down
      $( ".block" ).animate({ "top": "-=10px" }, "fast");//go Up
      $( ".block" ).animate({ "left": "-=10px" }, "fast");//go left 1
      across-=2;
	  ctx2.clearRect(0, 0, 50, 20); // clear canvas	
	  makeGrid();
	  ctx2.fillRect(10,0,30,10);
	  ctx2.fillRect(20,10,10,10);
	  t = setTimeout(fillIn, 500);

    }
    if(states[0] == 1 && states[1] == 1 && states[2] == 0) //state 2
    {//nothing
      document.getElementById("state").innerHTML = "2";
      $( ".block" ).animate({ "left": "-=10px" }, "fast");//go left 1
      $( ".block" ).animate({ "left": "-=10px" }, "fast");//go left 1
	  ctx2.clearRect(0, 0, 50, 20); // clear canvas	 
	  makeGrid();	  
	  ctx2.fillRect(10,0,20,10);
      across-=2;
    }
    if(states[0] == 1 && states[1] == 0 && states[2] == 1)//state 3
    {//nothing
      document.getElementById("state").innerHTML = "3";
      $( ".block" ).animate({ "left": "-=10px" }, "fast");//go left 1
      $( ".block" ).animate({ "left": "-=10px" }, "fast");//go left 1
	  ctx2.clearRect(0, 0, 50, 20); // clear canvas	  
 	  makeGrid();
	  ctx2.fillRect(10,0,10,10);
	  ctx2.fillRect(30,0,10,10);
      across-=2;
    }
    if(states[0] == 1 && states[1] == 0 && states[2] == 0)//state 4
    { //write
      document.getElementById("state").innerHTML = "4";
      $( ".block" ).animate({ "left": "-=10px" }, "fast");//go left 1
      $( ".block" ).animate({ "top": "+=10px" },"fast");//go Down
      $( ".block" ).animate({ "top": "-=10px" }, "fast");//go Up
      $( ".block" ).animate({ "left": "-=10px" }, "fast");//go left 1
	  ctx2.clearRect(0, 0, 50, 20); // clear canvas	  
	  makeGrid();
	  ctx2.fillRect(10,0,10,10);
	  ctx2.fillRect(20,10,10,10);
      across-=2;
      t = setTimeout(fillIn, 500);
    }
    if(states[0] == 0 && states[1] == 1 && states[2] == 1)//state 5
    {//nothing
      document.getElementById("state").innerHTML = "5";
      $( ".block" ).animate({ "left": "-=10px" }, "fast");//go left 1
      $( ".block" ).animate({ "left": "-=10px" }, "fast");//go left 1
	  ctx2.clearRect(0, 0, 50, 20); // clear canvas	  
	  makeGrid();	  
	  ctx2.fillRect(20,0,20,10);
      across-=2;
    }
    if(states[0] == 0 && states[1] == 1 && states[2] == 0)//state 6
    { //write
      document.getElementById("state").innerHTML = "6";
      $( ".block" ).animate({ "left": "-=10px" }, "fast");//go left 1
      $( ".block" ).animate({ "top": "+=10px" },"fast");//go Down
      $( ".block" ).animate({ "top": "-=10px" }, "fast");//go Up
      $( ".block" ).animate({ "left": "-=10px" }, "fast");//go left 1
	  ctx2.clearRect(0, 0, 50, 20); // clear canvas
	  makeGrid();	  
	  ctx2.fillRect(20,0,10,10);
	  ctx2.fillRect(20,10,10,10);
      across-=2;
      t = setTimeout(fillIn, 500);
    }
    if(states[0] == 0 && states[1] == 0 && states[2] == 1)//state 7
    { //write
      document.getElementById("state").innerHTML = "7";
      $( ".block" ).animate({ "left": "-=10px" }, "fast");//go left 1
      $( ".block" ).animate({ "top": "+=10px" },"fast");//go Down
      $( ".block" ).animate({ "top": "-=10px" }, "fast");//go Up
      $( ".block" ).animate({ "left": "-=10px" }, "fast");//go left 1
	  ctx2.clearRect(0, 0, 50, 20); // clear canvas
	  makeGrid();	  
	  ctx2.fillRect(30,0,10,10);
	  ctx2.fillRect(20,10,10,10);
      across-=2;
      t = setTimeout(fillIn, 500);
    }
    if(states[0] == 0 && states[1] == 0 && states[2] == 0)//state 8
    {//nothing
      document.getElementById("state").innerHTML = "8";
      $( ".block" ).animate({ "left": "-=10px" }, "fast");//go left 1
      $( ".block" ).animate({ "left": "-=10px" }, "fast");//go left 1
	  ctx2.clearRect(0, 0, 50, 20); // clear canvas
	  makeGrid();
      across-=2;
    }
    stateCounter = 0;
    states = [];
  }
  if(across == 42)
  {
    $( ".block" ).animate({ "top": "+=10px" }, "fast");//move down
    $( ".block" ).animate({ "left": "-=410px" }, "fast");//go left 1
    //$( ".block" ).animate({ "left": "-=10px" }, "fast");//go left 1
    down++;
    across=0;
    stateCounter = 0;
    states = [];
  }
  if(down == 20)
  {
    pause();
  }
  


}
