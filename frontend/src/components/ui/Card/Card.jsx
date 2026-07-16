function Card({
  title,
  subtitle,
  children,
  className = "",
  headerAction = null,
}) {
  return (
    <div className={`app-card ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className="app-card-header">
          <div>
            {title && <h5 className="app-card-title">{title}</h5>}

            {subtitle && <p className="app-card-subtitle">{subtitle}</p>}
          </div>

          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      <div className="app-card-body">{children}</div>
    </div>
  );
}

export default Card;
