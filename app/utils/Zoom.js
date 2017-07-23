const levels = [0.005, 0.01, 0.015, 0.02, 0.05, 0.075, 0.1, 0.15];

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
