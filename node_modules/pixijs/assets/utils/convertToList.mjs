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

export { convertToList };
//# sourceMappingURL=convertToList.mjs.map
