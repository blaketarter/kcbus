// const levels = [1, 1.5, 2, 2.5];
const levels = [0.005, 0.01, 0.015, 0.02];

function getInitialZoomLevel() {
  return levels[0];
}

function getPrevZoomLevel(current) {
  const currIndex = levels.indexOf(current);

  if (currIndex === levels.length - 1) {
    return current;
  }

  return levels[currIndex + 1];
}

function getNextZoomLevel(current) {
  const currIndex = levels.indexOf(current);

  if (currIndex === 0) {
    return current;
  }

  return levels[currIndex - 1];
}

export {
  getNextZoomLevel,
  getPrevZoomLevel,
  getInitialZoomLevel
}
