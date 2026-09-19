function ProgressBar({ value }) {
  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default ProgressBar;