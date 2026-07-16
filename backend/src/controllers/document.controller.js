import asyncHandler from "../middleware/async.middleware.js";
import ApiResponse from "../errors/ApiResponse.js";
import { downloadPdf } from "../services/document.service.js";
import { regeneratePdf } from "../services/document.service.js";

import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../services/document.service.js";

export const create = asyncHandler(async (req, res) => {
  const document = await createDocument(req.body, req.user);

  return res
    .status(201)
    .json(new ApiResponse(201, "Document created successfully", document));
});

export const getAll = asyncHandler(async (req, res) => {
  const documents = await getDocuments(req.query);

  return res
    .status(200)
    .json(new ApiResponse(200, "Documents fetched successfully", documents));
});

export const getOne = asyncHandler(async (req, res) => {
  const document = await getDocumentById(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Document fetched successfully", document));
});

export const update = asyncHandler(async (req, res) => {
  const document = await updateDocument(req.params.id, req.body, req.user);

  return res
    .status(200)
    .json(new ApiResponse(200, "Document updated successfully", document));
});

export const remove = asyncHandler(async (req, res) => {
  const document = await deleteDocument(req.params.id, req.user);

  return res
    .status(200)
    .json(new ApiResponse(200, "Document deleted successfully", document));
});

export const download = asyncHandler(async (req, res) => {
  const { fileName, filePath } = await downloadPdf(req.params.id);

  return res.download(filePath, fileName);
});

export const regenerate = asyncHandler(async (req, res) => {
  const document = await regeneratePdf(req.params.id, req.user);

  return res
    .status(200)
    .json(new ApiResponse(200, "PDF regenerated successfully", document));
});
