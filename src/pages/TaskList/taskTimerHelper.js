/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unneeded-ternary */
function timeToSeconds(timeString) {
  if (
    !timeString.includes(':') ||
    timeString.startsWith(':') ||
    timeString.endsWith(':')
  ) {
    return 0;
  }
  const [minutes, seconds] = timeString.split(':');

  if (isNaN(parseInt(minutes)) || isNaN(parseInt(seconds))) {
    return 0;
  }

  let totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);

  if (totalSeconds > 3599) {
    totalSeconds = 3599;
  }

  return totalSeconds;
}

function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return "Time's up";
  }

  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (minutes > 59 || seconds > 59) {
    minutes = 59;
    seconds = 59;
  }

  return `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
}

export { timeToSeconds, formatTime };
