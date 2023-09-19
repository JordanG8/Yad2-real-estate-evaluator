const fs = require("fs");
const cheerio = require("cheerio");

// Read the HTML content from the "dump.txt" file
fs.readFile("dump.txt", "utf8", (err, html) => {
  if (err) {
    console.error("Error reading the HTML file:", err);
    return;
  }

  // Use Cheerio to parse the HTML content
  const $ = cheerio.load(html);

  // Define a function to convert HTML elements to JSON
  function elementToJson(element) {
    const result = {};
    result.tag = element.tagName.toLowerCase();

    // Convert attributes to JSON
    const attributes = element.attribs;
    if (Object.keys(attributes).length > 0) {
      result.attributes = attributes;
    }

    // Convert child elements recursively
    const children = element.children;
    if (children.length > 0) {
      result.children = [];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.type === "tag") {
          result.children.push(elementToJson(child));
        } else if (child.type === "text") {
          result.text = child.data.trim();
        }
      }
    }

    return result;
  }

  // Convert the entire HTML document to JSON
  const jsonOutput = elementToJson($("html")[0]);

  // Write the JSON output to the "output.json" file
  fs.writeFile("output.json", JSON.stringify(jsonOutput, null, 2), (err) => {
    if (err) {
      console.error("Error writing the JSON output file:", err);
    } else {
      console.log(
        'HTML to JSON conversion completed. JSON data saved in "output.json".'
      );
    }
  });
});
