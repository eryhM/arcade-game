'use strict';

// Variables
var MAP_ROWS = 7,
	MAP_COLUMNS = 5;

// Rows where enemies roam
var enemyRows =
{
	1: 0,
	2: 1,
	4: 2,
	5: 3
};

var playerSprites =
[
	'images/char-boy.png',
	'images/char-cat-girl.png',
	'images/char-horn-girl.png',
	'images/char-pink-girl.png',
	'images/char-princess-girl.png'
];

// Returns precise pixel coordinates on the canvas based on row or column value
function getTrueCoordinate(c, v) {
	if(c === 'x')
		return v * 101;
	else if(c === 'y');
		return -34 + (v * 82);
}

// Objects
// Enemy Object
var Enemy = function(row) {
	this.sprite = 'images/enemy-bug.png';
	this.x = -1; // Spawn offscreen
	this.y = row;
	this.speed = this.getRandomSpeed();
};

Enemy.prototype.update = function(dt) {
	this.x += dt * this.speed; // Enemy moves to the right

	// Enemy is fully offscreen again, teleport it back and randomize its speed
	if(Math.floor(this.x) >= MAP_COLUMNS) {
		this.x = -1;
		this.speed = this.getRandomSpeed();
	}
};

Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), getTrueCoordinate('x', this.x), getTrueCoordinate('y', this.y));
};

Enemy.prototype.getRandomSpeed = function() {
	var min = 1.5,
		max = 4;

	return Math.random() * (max - min) + min;
};

// Player Object
var Player = function() {
	this.sprite = playerSprites[Math.floor(Math.random() * playerSprites.length)]; // Randomized sprite
	this.x = 2;
	this.y = 6;
	this.score = 0;
};

Player.prototype.update = function(dt) {
	this.checkCollisions();
};

// Same render logic
Player.prototype.render = Enemy.prototype.render;

Player.prototype.reset = function() {
	this.x = 2;
	this.y = 6;
};

Player.prototype.handleInput = function(key) {
	switch(key)
	{
		case 'up':
			if((this.y - 1) > 0)
				this.y--;
			else
				this.win(); // Player has reached the water!
			break;
		case 'left':
			if((this.x - 1) >= 0)
				this.x--;
			break;
		case 'right':
			if((this.x + 1) < MAP_COLUMNS)
				this.x++;
			break;
		case 'down':
			if((this.y + 1) < MAP_ROWS)
				this.y++;
			break;
	}
};

Player.prototype.checkCollisions = function() {
	// Player has to be on the road (rows where bugs roam)
	if(enemyRows[player.y] !== undefined) {
		var distance = player.x - allEnemies[enemyRows[player.y]].x;

		if(distance >= -0.6 && distance <= 0.6) {
			setTimeout(function() {
				player.reset();
				player.updateScore(false);
			}, 100);
		}
	}
};

Player.prototype.win = function() {
	this.reset();
	this.updateScore(true);
};

Player.prototype.updateScore = function(increment) {
	if(increment)
		this.score++;
	else
		this.score = 0;

	var el = document.getElementById('score');
	el.innerHTML = 'Your score: ' + this.score;
};

// Event listeners
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});

// Instancing
// Enemy
var allEnemies = [];

// Generate 4 enemies with randomized speed
for(var i = 0; i < Object.keys(enemyRows).length; i++) {
	allEnemies.push(new Enemy(Object.keys(enemyRows)[i]));
}

// Player
var player = new Player();