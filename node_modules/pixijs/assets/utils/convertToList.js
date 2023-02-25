'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const convertToList = (input, transform) => {
  if (!Array.isArray(input)) {
    input = [input];
  }
  if (!transform) {
    return input;
  }
  return input.map((item) => {
    if (typeof item === "string") {
      return transform(item);
    }
    return item;
  });
};

exports.convertToList = convertToList;
//# sourceMappingURL=convertToList.js.map
