function PageHeader({ title, subtitle, children }) {
  return (
    <div className="page-header">
      <div>
        <h2 className="page-header-title">{title}</h2>

        {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
      </div>

      {children && <div className="page-header-actions">{children}</div>}
    </div>
  );
}

export default PageHeader;
