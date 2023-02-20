const StopIcon = ({ className, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="48"
    viewBox="0 96 960 960"
    width="48"
    className={className}
  >
    <path
      fill={color}
      d="M300 396v360-360Zm-60 420V336h480v480H240Zm60-60h360V396H300v360Z"
    />
  </svg>
);

export default StopIcon;
