export const bookFilterableFields: string[] = [
  "search",
  "price",
  "minPrice",
  "maxPrice",
  "category",
  "minPrice",
  "maxPrice",
];

export const bookSearchableFields: string[] = [
  "author",
  "title",
  "genre",
  "minPrice",
  "maxPrice",
];

export const bookRelationalFields: string[] = ["categoryId"];

export const bookRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: "category",
};
