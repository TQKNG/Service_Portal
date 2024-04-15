function addDelimiter(text, delimiter) {
    return text.replace(/\s/g, delimiter);
}

function removeDelimiter(text, delimiter) {
    return text.replace(new RegExp(delimiter, 'g'), '');
}
  

module.exports  = {
    addDelimiter,
    removeDelimiter,
};