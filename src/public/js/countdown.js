
const countdownTimer = (deadline) => {
  const total = deadline - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);

  return {
    total,
    minutes,
    seconds
  };
};

export default countdownTimer;
