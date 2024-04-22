const e = require("express");

function addDelimiter(text, delimiter) {
  return text.replace(/\s/g, delimiter);
}

function removeDelimiter(text) {
  return text.replace(/\s/g, "_");
}

function splitText(text, wordsPerPage) {
  // Remove whitespace between paragraphs
  text = text.replace(/\n\s*\n/g, "");

  // Convert text to array of words
  const words = text.split(" ");

  const pages = [];
  let count = 1;

  if (words.length <= wordsPerPage) {
    pages.push({page: count, text: words.join(" ")});
    return pages;
  }

  console.log("Words", words.length);

  for (i = 0; i < words.length; i += wordsPerPage) {
    let temp = {
      page: count,
      text: words.slice(i, i + wordsPerPage).join(" "),
    };
    pages.push(temp);
    count++;
  }

  return pages;
}

module.exports = {
  addDelimiter,
  removeDelimiter,
  splitText,
};
