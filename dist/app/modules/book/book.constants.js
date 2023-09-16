"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRelationalFieldsMapper = exports.bookRelationalFields = exports.bookSearchableFields = exports.bookFilterableFields = void 0;
exports.bookFilterableFields = [
    "search",
    "price",
    "minPrice",
    "maxPrice",
    "category",
    "minPrice",
    "maxPrice",
];
exports.bookSearchableFields = [
    "author",
    "title",
    "genre",
    "minPrice",
    "maxPrice",
];
exports.bookRelationalFields = ["categoryId"];
exports.bookRelationalFieldsMapper = {
    categoryId: "category",
};
