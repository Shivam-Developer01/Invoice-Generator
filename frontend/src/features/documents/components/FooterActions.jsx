import PrimaryButton from "../../../components/ui/Button/PrimaryButton";

function FooterActions({ loading, text = "Generate PDF" }) {
  return (
    <div className="d-flex justify-content-end mt-4">
      <PrimaryButton type="submit" loading={loading}>
        {text}
      </PrimaryButton>
    </div>
  );
}

export default FooterActions;