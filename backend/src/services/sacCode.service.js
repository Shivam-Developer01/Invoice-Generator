import SacCode from "../models/sacCode.model.js";
import ApiError from "../errors/ApiError.js";
import QueryFeatures from "../utils/QueryFeatures.js";

export const createSacCode = async (data, userId) => {
  const exists = await SacCode.findOne({
    code: data.code.toUpperCase(),
  });

  if (exists) {
    throw new ApiError(409, "SAC code already exists");
  }

  return await SacCode.create({
    ...data,
    code: data.code.toUpperCase(),
    createdBy: userId,
    updatedBy: userId,
  });
};

export const getSacCodes = async (query) => {
  const features = new QueryFeatures(SacCode, query)
    .search(["code", "description"])
    .filter();

  return await features.execute();
};

export const updateSacCode = async (id, data, userId) => {
  const sacCode = await SacCode.findById(id);

  if (!sacCode) {
    throw new ApiError(404, "SAC code not found");
  }

  if (data.code) {
    const exists = await SacCode.findOne({
      code: data.code.toUpperCase(),
      _id: { $ne: id },
    });

    if (exists) {
      throw new ApiError(409, "SAC Code already exists");
    }

    data.code = data.code.toUpperCase();
  }

  Object.assign(sacCode, {
    ...data,
    updatedBy: userId,
  });

  return await sacCode.save();
};

export const deleteSacCode = async (id, userId) => {
  const sacCode = await SacCode.findById(id);

  if (!sacCode) {
    throw new ApiError(404, "SAC code not found");
  }

  sacCode.isActive = false;
  sacCode.updatedBy = userId;

  await sacCode.save();
};

export const getActiveSacCodes = async () => {
  return await SacCode.find({
    isActive: true,
  })
    .sort({
      code: 1,
    })
    .select("code description");
};
