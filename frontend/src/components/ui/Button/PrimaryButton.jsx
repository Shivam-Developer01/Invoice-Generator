import { Spinner } from "react-bootstrap";

function PrimaryButton({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  icon = null,
  className = "",
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`primary-btn ${variant} ${className}`}
    >
      {loading ? (
        <>
          <Spinner animation="border" size="sm" />
          <span>Please wait...</span>
        </>
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}

export default PrimaryButton;
