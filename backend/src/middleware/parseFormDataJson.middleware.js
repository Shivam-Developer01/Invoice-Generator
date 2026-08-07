export const parseFormDataJson = (req, res, next) => {
  if (req.body && typeof req.body.data === "string") {
    try {
      const parsed = JSON.parse(req.body.data);
      req.body = { ...parsed, ...req.body };
      delete req.body.data;
    } catch (error) {
      // If parsing fails, leave body untouched for validators to catch
    }
  }
  next();
};

export default parseFormDataJson;
