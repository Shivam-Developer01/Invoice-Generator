import { Placeholder } from "react-bootstrap";

function StatCardSkeleton() {
  return (
    <div className="stat-card">
      <Placeholder animation="glow">
        <Placeholder
          style={{
            width: 60,
            height: 60,
            borderRadius: 16,
          }}
        />
      </Placeholder>

      <div className="flex-grow-1">
        <Placeholder animation="glow">
          <Placeholder xs={5} />
        </Placeholder>

        <Placeholder animation="glow" className="mt-2">
          <Placeholder xs={8} />
        </Placeholder>
      </div>
    </div>
  );
}

export default StatCardSkeleton;
