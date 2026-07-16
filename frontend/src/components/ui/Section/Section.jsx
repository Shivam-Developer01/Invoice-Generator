function Section({ title, subtitle, children, action, className = "" }) {
  return (
    <section className={`app-section ${className}`}>
      {(title || subtitle || action) && (
        <div className="section-header">
          <div>
            {title && <h3 className="section-title">{title}</h3>}

            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>

          {action && <div className="section-action">{action}</div>}
        </div>
      )}

      <div className="section-content">{children}</div>
    </section>
  );
}

export default Section;
