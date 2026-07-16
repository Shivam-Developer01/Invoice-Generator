import DocumentSettings from "../models/documentSettings.model.js";
import ApiError from "../errors/ApiError.js";

const generateDocumentNumber = async (documentType) => {
  const settings = await DocumentSettings.findOneAndUpdate(
    {},
    {
      $inc: {
        currentSequence: 1,
      },
    },
    {
      new: false, // Returns document BEFORE increment
    }
  );

  if (!settings) {
    throw new ApiError(
      404,
      "Document settings are not configured"
    );
  }

  const document = settings.documentPrefixes.find(
    (item) => item.type === documentType
  );

  if (!document) {
    throw new ApiError(
      400,
      `Prefix not configured for ${documentType}`
    );
  }

  const documentNumber =
    `${settings.companyPrefix}` +
    `${settings.separator}` +
    `${document.prefix}` +
    `${settings.separator}` +
    `${settings.financialYear}` +
    `${String(settings.currentSequence).padStart(3, "0")}`;

  return documentNumber;
};

export default generateDocumentNumber;