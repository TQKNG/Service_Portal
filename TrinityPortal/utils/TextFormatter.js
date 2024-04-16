function addDelimiter(text, delimiter) {
    return text.replace(/\s/g, delimiter);
}

function removeDelimiter(text) {
    return text.replace(/\s/g, '_');
}
  

module.exports  = {
    addDelimiter,
    removeDelimiter,
};