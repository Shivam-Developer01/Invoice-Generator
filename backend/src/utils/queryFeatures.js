class QueryFeatures {
  constructor(model, queryString) {
    this.model = model;
    this.queryString = queryString;
    this.filterQuery = {};
    this.searchQuery = {};
  }
  
  search(fields = []) {
    const { search } = this.queryString;

    if (search && fields.length) {
      this.searchQuery = {
        $or: fields.map((field) => ({
          [field]: {
            $regex: search,
            $options: "i",
          },
        })),
      };
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.queryString };

    const excludedFields = ["page", "limit", "sort", "order", "search"];

    excludedFields.forEach((field) => delete queryObj[field]);

    Object.keys(queryObj).forEach((key) => {
      if (queryObj[key] === "true") queryObj[key] = true;
      if (queryObj[key] === "false") queryObj[key] = false;
    });

    this.filterQuery = queryObj;

    return this;
  }

  withSoftDelete() {
    if (!Object.prototype.hasOwnProperty.call(this.filterQuery, "isDeleted")) {
      this.filterQuery.isDeleted = false;
    }

    return this;
  }

  async execute(populate = "") {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;
    const skip = (page - 1) * limit;

    const sortField = this.queryString.sort || "createdAt";
    const sortOrder = this.queryString.order === "asc" ? 1 : -1;

    const finalQuery = {
      ...this.filterQuery,
      ...this.searchQuery,
    };

    const totalDocuments = await this.model.countDocuments(finalQuery);

    let query = this.model
      .find(finalQuery)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    if (populate) {
      if (Array.isArray(populate)) {
        populate.forEach((item) => {
          query = query.populate(item);
        });
      } else {
        query = query.populate(populate);
      }
    }

    const data = await query;

    return {
      data,

      pagination: {
        page,
        limit,
        totalDocuments,
        totalPages: Math.ceil(totalDocuments / limit),
        hasNextPage: page * limit < totalDocuments,
        hasPreviousPage: page > 1,
      },
    };
  }
}

export default QueryFeatures;