// Enemies our player must avoid
var Enemy = function(row, speed) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
	this.speed = speed;
	this.x = 0;
	this.y = row;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.

	// if(Math.floor(this.x) >= 4)
	// 	Remove bug and generate a new one at the same row, with different speed

	// this.x += dt * this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), getTrueCoordinate('x', this.x), getTrueCoordinate('y', this.y));
};

function getTrueCoordinate(c, v) {
	if(c === 'x')
		return v * 101;
	else if(c === 'y');
		return -34 + (v * 82);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.sprite = allPlayers[Math.floor(Math.random() * allPlayers.length)]; // Random character from a list of character images
	this.x = 2;
	this.y = 5;
};

Player.prototype.update = function(dt) {
	// Check for collisions with enemy class
}

Player.prototype.render = Enemy.prototype.render; // Same rendering method as the Enemy class

// Teleports player back to start
Player.prototype.reset = function() {
	this.x = 2;
	this.y = 5;
}

Player.prototype.handleInput = function(key) {
	switch(key)
	{
		case 'up':
			if((this.y - 1) > 0)
				this.y--;
			else
				win(); // Player has reached the water!
			break;
		case 'left':
			if((this.x - 1) >= 0)
				this.x--;
			break;
		case 'right':
			if((this.x + 1) <= 4)
				this.x++;
			break;
		case 'down':
			if((this.y + 1) <= 5)
				this.y++;
			break;
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allPlayers =
	[
		'images/char-boy.png',
		'images/char-cat-girl.png',
		'images/char-horn-girl.png',
		'images/char-pink-girl.png',
		'images/char-princess-girl.png'
	];

var allEnemies = [];

// Geerate three enemies to add to row 1, 2, and 3.
for(var i = 1; i < 4; i++) {
	allEnemies.push(new Enemy(i, getRandomSpeed()));
}

function getRandomSpeed() {
	return Math.round((Math.random() * (2.5 - 1) + 1));
}

var player = new Player();

function win() {
	console.log('You win!');
	player.reset();
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
