function Stack() {
  //this.grid;
}
const SCORING = [0, 100, 300, 500, 800, 400, 800, 1200, 1600, 100, 200, 400, 3500, 1.5, 50, 2, 1] // single, double, triple, quad, t-0, t-1, t-2, t-3, mt-0, mt-1, mt-2, pc, b2b multi, combo multi, hd multi, sd multi
/**
 * Creates a matrix for the playfield.
 */
Stack.prototype.new = function(x, y) {
  var cells = new Array(x);
  for (var i = 0; i < x; i++) {
    cells[i] = new Array(y).fill(undefined);
  }
  this.grid = cells;
};
/**
 * Adds tetro to the stack, and clears lines if they fill up.
 */
Stack.prototype.addPiece = function(tetro) {
  var once = false;

  // Add the piece to the stack.
  var range = [];
  var valid = false;
  for (var x = 0; x < tetro.length; x++) {
    for (var y = 0; y < tetro[x].length; y++) {
      if (tetro[x][y]) {
        this.grid[x + piece.x][y + piece.y] = tetro[x][y];
        // Get column for finesse
        if (!once || x + piece.x < column) {
          column = x + piece.x;
          once = true;
        }
        // Check which lines get modified
        if (range.indexOf(y + piece.y) === -1) {
          range.push(y + piece.y);
          // This checks if any cell is in the play field. If there
          //  isn't any this is called a lock out and the game ends.
          if (y + piece.y > 1) valid = true;
        }
      }
    }
  }
  // Lock out
  if (!valid) {
    gameState = 9;
    msg.innerHTML = 'LOCK OUT!';
    menu(3);
    return;
  }

  // Check modified lines for full lines.
  range = range.sort(function(a, b) {
    return a - b;
  });
  console.log(range);
  var clearedAtOnce = 0;
  for (var i = 0; i < range.length; i++) {
    var row = range[i]
	var count = 0;
    for (var x = 0; x < 10; x++) {
      if (this.grid[x][row]) count++;
    }
    // Clear the line. This basically just moves down the stack.
    // TODO Ponder during the day and see if there is a more elegant solution.
    if (count === 10) {
      lines++; // NOTE stats
	  clearedAtOnce++;
      if (gametype === 3) {
        if (digLines.indexOf(row) !== -1) {
          digLines.splice(digLines.indexOf(row), 1);
        }
      }
      for (var y = row; y >= -1; y--) {
        for (var x = 0; x < 10; x++) {
          this.grid[x][y] = this.grid[x][y - 1];
        }
      }
    }
  }
  
  var pc = true;
  meow:
  for (var x = 0; x < this.grid.length; x++) {
    for (var y = 0; y < this.grid[x].length; y++) {
	  if (this.grid[x][y] !== undefined) {
	    pc = false;
	    break meow;
	  }
    }
  }
  var actiontext = [];
  var audio = null;
  if (pc) {
	  score += SCORING[12];
	  attack(10, 0, 0);
	  actiontext.push('Perfect Clear');
	  audio = new Audio('./sounds/allclear.ogg');
      audio.play();
  }
  if (lastWasTspin && !lastTSWasMini) {
	  if (b2b) score += SCORING[13]*SCORING[clearedAtOnce+4];
	  else score += SCORING[clearedAtOnce+4];
	  switch(clearedAtOnce) {
		  case 0:
			actiontext.push('T-Spin');
			break;
		  case 1:
		    b2b += 1;
		    actiontext.push('T-Spin Single');
			attack(attackTable(5, combo, b2b-1));
			audio = new Audio('./sounds/clearspin.ogg');
			audio.play();
			break;
		  case 2:
		    b2b += 1;
			actiontext.push('T-Spin Double');
			attack(attackTable(7, combo, b2b-1));
			audio = new Audio('./sounds/clearspin.ogg');
			audio.play();
			break;
		  case 3:
		    b2b += 1;
			actiontext.push('T-Spin Triple');
			attack(attackTable(8, combo, b2b-1));
			audio = new Audio('./sounds/clearspin.ogg');
			audio.play();
			break;
	  }
  } else if (lastWasTspin) {
	  if (b2b) score += SCORING[13]*SCORING[clearedAtOnce+9];
	  else score += SCORING[clearedAtOnce+9];
	  switch(clearedAtOnce) {
		  case 0:
			actiontext.push('T-Spin Mini');
			break;
		  case 1:
		    b2b += 1;
		    actiontext.push('T-Spin Mini Single');
			attack(attackTable(4, combo, b2b-1));
			audio = new Audio('./sounds/clearspin.ogg');
			audio.play();
			break;
		  case 2:
		    b2b += 1;
			actiontext.push('T-Spin Mini Double');
			attack(attackTable(6, combo, b2b-1));
			audio = new Audio('./sounds/clearspin.ogg');
			audio.play();
			break;
	  }
  }
  else {
	if (b2b && clearedAtOnce === 4) score += SCORING[13]*SCORING[clearedAtOnce];
	else score += SCORING[clearedAtOnce];
	switch(clearedAtOnce) {
	  case 1:
	    b2b = 0;
	    actiontext.push('Single');
		attack(attackTable(0, combo, b2b-1));
		audio = new Audio('./sounds/clearline.ogg');
		audio.play();
		break;
	  case 2:
	    b2b = 0;
		actiontext.push('Double');
		attack(attackTable(1, combo, b2b-1));
		audio = new Audio('./sounds/clearline.ogg');
		audio.play();
		break;
	  case 3:
	    b2b = 0;
		actiontext.push('Triple');
		attack(attackTable(2, combo, b2b-1));
		audio = new Audio('./sounds/clearline.ogg');
		audio.play();
		break;
	  case 4:
		b2b += 1;
		actiontext.push('Quad');
		attack(attackTable(3, combo, b2b-1));
		audio = new Audio('./sounds/clearline.ogg');
		audio.play();
		audio = new Audio('./sounds/clearquad.ogg');
		audio.play();
		if (b2b > 1) {
			audio = new Audio('./sounds/clearbtb.ogg');
			audio.play();
		}
		break;
	}
  }
  if (combo && clearedAtOnce) {
	  if (combo <= 16) audio = new Audio('./sounds/combo_' + combo.toString() + '.ogg');
	  else audio = new Audio('./sounds/combo_16.ogg');
	  if (combo >= 3 && combo <= 16 && (clearedAtOnce === 4 || lastWasTspin)) audio = new Audio('./sounds/combo_' + combo.toString() + '_power.ogg');
	  else if (combo >= 3 && (clearedAtOnce === 4 || lastWasTspin)) audio = new Audio('./sounds/combo_16_power.ogg');
	  audio.play();
	  score += SCORING[14]*combo
	  actiontext[actiontext.length-1] += " " + combo.toString() + " Combo";
  } else if (combo) {
	  if (combo > 3) {
		audio = new Audio('./sounds/combobreak.ogg');
		audio.play();
	  }
	  combo = 0;
  }
  if (clearedAtOnce) combo += 1;
  if ((b2b-1) > 0 && clearedAtOnce) actiontext[actiontext.length-1] += " B2B " + (b2b-1).toString();
  for (var i = 0; i < actiontext.length; i++) displayAT(actiontext[i], ATDISPLAYTIME);
  lastWasTspin = false;
  
  statsFinesse += piece.finesse - finesse[piece.index][piece.pos][column];
  piecesSet++; // NOTE Stats
  // TODO Might not need this (same for in init)
  column = 0;

  statsPiece.innerHTML = piecesSet;

  if (gametype !== 2 && gametype !== 3) statsLines.innerHTML = lineLimit - lines;
  else if (gametype === 3) statsLines.innerHTML = digLines.length;
  this.draw();
};
/**
 * Draws the stack.
 */
Stack.prototype.draw = function() {
  if (gametype === 4) return;
  clear(stackCtx);
  draw(this.grid, 0, 0, stackCtx);

  // Darken Stack
  // TODO wrap this with an option.
  stackCtx.globalCompositeOperation = 'source-atop';
  stackCtx.fillStyle = 'rgba(0,0,0,0.3)';
  stackCtx.fillRect(0, 0, stackCanvas.width, stackCanvas.height);
  stackCtx.globalCompositeOperation = 'source-over';

  if (settings.Outline) {
    var b = ~~(cellSize / 8);
    var c = cellSize;
    var lineCanvas = document.createElement('canvas');
    lineCanvas.width = stackCanvas.width;
    lineCanvas.height = stackCanvas.height;
    var lineCtx = lineCanvas.getContext('2d');
    lineCtx.fillStyle = 'rgba(255,255,255,0.5)';
    lineCtx.beginPath();
    for (var x = 0, len = this.grid.length; x < len; x++) {
      for (var y = 0, wid = this.grid[x].length; y < wid; y++) {
        if (this.grid[x][y]) {
          if (x < 9 && !this.grid[x + 1][y]) {
            lineCtx.fillRect(x * c + c - b, y * c - 2 * c, b, c);
          }
          if (x > 0 && !this.grid[x - 1][y]) {
            lineCtx.fillRect(x * c, y * c - 2 * c, b, c);
          }
          if (y < 21 && !this.grid[x][y + 1]) {
            lineCtx.fillRect(x * c, y * c - 2 * c + c - b, c, b);
          }
          if (!this.grid[x][y - 1]) {
            lineCtx.fillRect(x * c, y * c - 2 * c, c, b);
          }
          // Diags
          if (x < 9 && y < 21) {
            if (!this.grid[x + 1][y] && !this.grid[x][y + 1]) {
              lineCtx.clearRect(x * c + c - b, y * c - 2 * c + c - b, b, b);
              lineCtx.fillRect(x * c + c - b, y * c - 2 * c + c - b, b, b);
            } else if (
              !this.grid[x + 1][y + 1] &&
              this.grid[x + 1][y] &&
              this.grid[x][y + 1]
            ) {
              lineCtx.moveTo(x * c + c, y * c - 2 * c + c - b);
              lineCtx.lineTo(x * c + c, y * c - 2 * c + c);
              lineCtx.lineTo(x * c + c - b, y * c - 2 * c + c);
              lineCtx.arc(
                x * c + c,
                y * c - 2 * c + c,
                b,
                (3 * Math.PI) / 2,
                Math.PI,
                true,
              );
            }
          }
          if (x < 9) {
            if (!this.grid[x + 1][y] && !this.grid[x][y - 1]) {
              lineCtx.clearRect(x * c + c - b, y * c - 2 * c, b, b);
              lineCtx.fillRect(x * c + c - b, y * c - 2 * c, b, b);
            } else if (
              !this.grid[x + 1][y - 1] &&
              this.grid[x + 1][y] &&
              this.grid[x][y - 1]
            ) {
              lineCtx.moveTo(x * c + c - b, y * c - 2 * c);
              lineCtx.lineTo(x * c + c, y * c - 2 * c);
              lineCtx.lineTo(x * c + c, y * c - 2 * c + b);
              lineCtx.arc(
                x * c + c,
                y * c - 2 * c,
                b,
                Math.PI / 2,
                Math.PI,
                false,
              );
            }
          }
          if (x > 0 && y < 21) {
            if (!this.grid[x - 1][y] && !this.grid[x][y + 1]) {
              lineCtx.clearRect(x * c, y * c - 2 * c + c - b, b, b);
              lineCtx.fillRect(x * c, y * c - 2 * c + c - b, b, b);
            } else if (
              !this.grid[x - 1][y + 1] &&
              this.grid[x - 1][y] &&
              this.grid[x][y + 1]
            ) {
              lineCtx.moveTo(x * c, y * c - 2 * c + c - b);
              lineCtx.lineTo(x * c, y * c - 2 * c + c);
              lineCtx.lineTo(x * c + b, y * c - 2 * c + c);
              lineCtx.arc(
                x * c,
                y * c - 2 * c + c,
                b,
                Math.PI * 2,
                (3 * Math.PI) / 2,
                true,
              );
            }
          }
          if (x > 0) {
            if (!this.grid[x - 1][y] && !this.grid[x][y - 1]) {
              lineCtx.clearRect(x * c, y * c - 2 * c, b, b);
              lineCtx.fillRect(x * c, y * c - 2 * c, b, b);
            } else if (
              !this.grid[x - 1][y - 1] &&
              this.grid[x - 1][y] &&
              this.grid[x][y - 1]
            ) {
              lineCtx.moveTo(x * c + b, y * c - 2 * c);
              lineCtx.lineTo(x * c, y * c - 2 * c);
              lineCtx.lineTo(x * c, y * c - 2 * c + b);
              lineCtx.arc(
                x * c,
                y * c - 2 * c,
                b,
                Math.PI / 2,
                Math.PI * 2,
                true,
              );
            }
          }
        }
      }
    }
    lineCtx.fill();
    stackCtx.drawImage(lineCanvas, 0, 0);
  } 
};
var stack = new Stack();
