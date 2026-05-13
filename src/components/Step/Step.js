import "./Step.css";

function Step({ number, title, active }) {
  return (
    <div className="step">
      <div className={`step-circle ${active ? "active" : ""}`}>
        {number}
      </div>

      <span className={active ? "active-text" : ""}>
        {title}
      </span>
    </div>
  );
}

export default Step;