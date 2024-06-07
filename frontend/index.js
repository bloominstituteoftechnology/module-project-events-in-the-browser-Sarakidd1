function moduleProject2() {
  let startTime = new Date().getTime(); // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime();
    return currentTime - startTime;
  }

  // Setting up the footer content
  let footer = document.querySelector('footer');
  let currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  };

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square');

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div');
    document.querySelector('#grid').appendChild(row);
    row.classList.add('row');
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div');
      square.classList.add('square');
      row.appendChild(square);
      square.addEventListener('click', () => {
        const targeted = document.querySelector('.targeted');
        targeted.classList.remove('targeted');
        square.classList.add('targeted');
      });
    }
  }

  // Select a random square to be targeted initially
  const allSquares = getAllSquares();
  const randomIndex = Math.floor(Math.random() * allSquares.length);
  allSquares[randomIndex].classList.add('targeted');

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = [];
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25);
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt);
      }
    }
    return randomInts;
  }
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img');
    mosquito.src = './mosquito.png';
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`;
    mosquito.dataset.status = 'alive';
    allSquares[randomInt].appendChild(mosquito);
  });

  document.addEventListener('keydown', evt => {
    const targeted = document.querySelector('.targeted');
    const squares = Array.from(getAllSquares());
    const index = squares.indexOf(targeted);
    let newIndex;

    switch (evt.key) {
      case keys.up:
        newIndex = index - 5 >= 0 ? index - 5 : index;
        break;
      case keys.right:
        newIndex = (index + 1) % 5 !== 0 ? index + 1 : index;
        break;
      case keys.down:
        newIndex = index + 5 < 25 ? index + 5 : index;
        break;
      case keys.left:
        newIndex = index % 5 !== 0 ? index - 1 : index;
        break;
    }

    if (newIndex !== undefined) {
      targeted.classList.remove('targeted');
      squares[newIndex].classList.add('targeted');
    }

    // Task 4: Use the Space Bar to Exterminate a Mosquito
    if (evt.key === keys.space) {
      const mosquito = targeted.querySelector('img');
      if (mosquito && mosquito.dataset.status === 'alive') {
        mosquito.dataset.status = 'exterminated';
        mosquito.style.display = 'none';
      }
    }

    // Task 5: End the Game
    if (Array.from(document.querySelectorAll('img')).every(img => img.dataset.status === 'exterminated')) {
      const timeElapsed = getTimeElapsed();
      alert(`Game over! Time taken: ${timeElapsed / 1000} seconds`);
    }
  });

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
