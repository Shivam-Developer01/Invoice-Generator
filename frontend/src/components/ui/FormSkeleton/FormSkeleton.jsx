import { Placeholder } from "react-bootstrap";

function FormSkeleton({ rows = 8 }) {
  return (
    <div className="p-2">
      {[...Array(rows)].map((_, index) => (
        <div className="mb-4" key={index}>
          <Placeholder
            animation="glow"
            className="mb-2"
          >
            <Placeholder xs={2} />
          </Placeholder>

          <Placeholder animation="glow">
            <Placeholder
              xs={12}
              style={{
                height: "38px",
                borderRadius: "8px",
              }}
            />
          </Placeholder>
        </div>
      ))}
    </div>
  );
}

export default FormSkeleton;