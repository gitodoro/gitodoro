
const countdownTimer = (deadline) => {
  const total = deadline - Date.now();
  const seconds = Math.round((total / 1000) % 60);
  const minutes = Math.round((total / 1000 / 60) % 60);
  return {
    total,
    minutes,
    seconds
  };
};

export default countdownTimer;
