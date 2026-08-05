import DocumentSettings from "../models/documentSettings.model.js";
import ApiError from "../errors/ApiError.js";

const generateDocumentNumber = async (companyId, documentType) => {
  const settings = await DocumentSettings.findOneAndUpdate(
    { companyId },
    {
      $inc: {
        currentSequence: 1,
      },
    },
    {
      new: false,
    },
  );

  if (!settings) {
    throw new ApiError(404, "Document settings are not configured");
  }

  const document = settings.documentPrefixes.find(
    (item) => item.type === documentType,
  );

  if (!document) {
    throw new ApiError(400, `Prefix not configured for ${documentType}`);
  }

  return (
    settings.companyPrefix +
    settings.separator +
    document.prefix +
    settings.separator +
    settings.financialYear +
    String(settings.currentSequence).padStart(3, "0")
  );
};

export default generateDocumentNumber;
