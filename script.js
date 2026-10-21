const grid = document.querySelector('#grid');
const resizeButton = document.querySelector('#resize-button');
const DEFAULT_GRID_SIZE = 16;

function createGrid(size) {
  const fragment = document.createDocumentFragment();

  for (let rowIndex = 0; rowIndex < size; rowIndex += 1) {
    const row = document.createElement('div');
    row.className = 'grid-row';

    for (let columnIndex = 0; columnIndex < size; columnIndex += 1) {
      const square = document.createElement('div');
      square.className = 'grid-square';
      square.dataset.interactions = '0';
      row.append(square);
    }

    fragment.append(row);
  }

  grid.replaceChildren(fragment);
}

function randomRgbColor() {
  const channels = Array.from({ length: 3 }, () => Math.floor(Math.random() * 256));
  return `rgb(${channels.join(', ')})`;
}

function drawOnSquare(square) {
  const interactions = Math.min(Number(square.dataset.interactions) + 1, 10);
  square.dataset.interactions = String(interactions);

  const color = randomRgbColor();
  const darkness = 1 - interactions / 10;
  const darkenedColor = color.replace(/\d+/g, (channel) => String(Math.round(Number(channel) * darkness)));
  square.style.backgroundColor = darkenedColor;
}

function requestGridSize() {
  const answer = prompt('¿Cuántos cuadrados por lado quieres? (1–100)');
  const size = Number(answer);
  const isIntegerInput = answer !== null && /^\s*\d+\s*$/.test(answer);

  if (!isIntegerInput || !Number.isInteger(size) || size < 1 || size > 100) {
    alert('Introduce un número entero del 1 al 100 para cambiar la cuadrícula.');
    return;
  }

  createGrid(size);
}

grid.addEventListener('mouseover', (event) => {
  const square = event.target.closest('.grid-square');
  if (square && grid.contains(square)) drawOnSquare(square);
});

resizeButton.addEventListener('click', requestGridSize);
createGrid(DEFAULT_GRID_SIZE);
