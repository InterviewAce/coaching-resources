const LEFT = -1;
const RIGHT = 1;

const getDirection = (asteroid) => {
  if (asteroid < 0) return LEFT;
  if (asteroid > 0) return RIGHT;
};

const peek = (stack) => {
  if (stack.length === 0) throw new Error('cannot peek, stack is empty');

  const lastIdx = stack.length - 1;
  return stack[lastIdx];
};

const makeCollisionUpdates = (asteroidState, newAsteroid) => {
  const newAsteroidSize = Math.abs(newAsteroid);

  while (true) {
    if (asteroidState.length === 0) {
      asteroidState.push(newAsteroid);
      break;
    }

    const topAsteroid = peek(asteroidState);
    const topAsteroidSize = Math.abs(topAsteroid);
    const topAsteroidDirection = getDirection(topAsteroid);

    if (topAsteroidDirection === LEFT) {
      asteroidState.push(newAsteroid);
      break;
    }

    if (newAsteroidSize > topAsteroidSize) {
      asteroidState.pop();
      continue;
    }

    if (newAsteroidSize < topAsteroidSize) {
      break;
    }

    if (newAsteroidSize === topAsteroidSize) {
      asteroidState.pop();
      break;
    }
  }
};

const asteroidCollision = (asteroids) => {
  const asteroidState = [];

  asteroids.forEach((newAsteroid) => {
    const newAsteroidDirection = getDirection(newAsteroid);

    if (newAsteroidDirection === RIGHT) {
      asteroidState.push(newAsteroid);
      return;
    }

    // At this point, asteroid must be going to the LEFT

    makeCollisionUpdates(asteroidState, newAsteroid);
  });

  return asteroidState;
};
