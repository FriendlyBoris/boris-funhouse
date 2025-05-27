// This file attempts to replicate the core logic of the MultiEdit tool
// as inferred from the provided compiled JavaScript snippet.

/**
 * Normalizes line endings in a string (replaces \r\n with \n).
 * Equivalent to the 'Ex' function in the snippet.
 * @param {string} text The input text.
 * @returns {string} Text with normalized newlines.
 */
function normalizeNewlines(text) {
  if (typeof text !== 'string') return text;
  return text.replace(/\r\n/g, '\n');
}

/**
 * Applies a single edit operation (old_string -> new_string) to the content.
 * This function aims to replicate the behavior of 'sW2' from the snippet.
 * @param {string} currentContent The current content of the file.
 * @param {string} oldString The exact string to be replaced.
 * @param {string} newString The string to replace with.
 * @returns {string} The content after applying the replacement.
 */
function applySingleEditInternal(currentContent, oldString, newString) {
  if (newString !== "") {
    return currentContent.replaceAll(oldString, newString);
  }
  // newString is empty, so this is a deletion
  if (!oldString.endsWith('\n') && currentContent.includes(oldString + '\n')) {
    // If oldString doesn't end with a newline but is followed by one in the content,
    // replace oldString + newline to effectively delete the line.
    return currentContent.replaceAll(oldString + '\n', ''); // newString is empty
  } else {
    // Otherwise, just replace oldString.
    return currentContent.replaceAll(oldString, ''); // newString is empty
  }
}

/**
 * Applies a series of edits to a file's content sequentially.
 * This function aims to replicate the behavior of 'mm' from the snippet.
 * @param {string} initialFileContent The original content of the file.
 * @param {Array<{old_string: string, new_string: string}>} edits An array of edit objects.
 * @returns {{updatedFileContent: string}} An object containing the final updated content.
 * @throws {Error} If a conflict is detected or an edit fails.
 */
function applyMultipleEdits(initialFileContent, edits) {
  let currentFileContent = normalizeNewlines(initialFileContent);
  const originalContentForComparison = currentFileContent; // Store normalized original for final check
  const previousNewStrings = [];

  for (const edit of edits) {
    const normalizedOldString = normalizeNewlines(edit.old_string);
    const normalizedNewString = normalizeNewlines(edit.new_string);

    // Conflict check: old_string (without its own trailing newlines for this check)
    // should not be a substring of any previously inserted new_string.
    const oldStringForConflictCheck = normalizedOldString.replace(/\n+$/, "");
    if (oldStringForConflictCheck !== "") {
      for (const prevNew of previousNewStrings) {
        if (prevNew.includes(oldStringForConflictCheck)) {
          throw new Error("Cannot edit file: old_string is a substring of a new_string from a previous edit.");
        }
      }
    }

    const contentBeforeThisEdit = currentFileContent;

    if (normalizedOldString === "") {
      // If old_string is empty, new_string becomes the entire current content.
      currentFileContent = normalizedNewString;
    } else {
      currentFileContent = applySingleEditInternal(currentFileContent, normalizedOldString, normalizedNewString);
    }

    // Verbatim from snippet: if assignment results in no change from contentBeforeThisEdit, throw.
    // This covers:
    // 1. normalizedOldString was "" and normalizedNewString was === contentBeforeThisEdit.
    // 2. normalizedOldString was non-empty and was not found in contentBeforeThisEdit (applySingleEditInternal would return contentBeforeThisEdit).
    // Note: The case where normalizedOldString === normalizedNewString (a true no-op edit) should ideally be caught
    // by validation before this function, as per the Edit tool's validation logic. If it reaches here
    // and causes currentFileContent === contentBeforeThisEdit, this error will be thrown.
    if (currentFileContent === contentBeforeThisEdit) {
      throw new Error("String not found in file. Failed to apply edit.");
    }
    
    previousNewStrings.push(normalizedNewString);
  }

  // Verbatim from snippet: if final content is same as original, throw.
  // (Assumes edits array is non-empty due to schema i.array(ke6).min(1,...))
  if (currentFileContent === originalContentForComparison) {
    throw new Error("Original and edited file match exactly. Failed to apply edit.");
  }

  return { updatedFileContent: currentFileContent };
}

module.exports = {
  normalizeNewlines,
  applySingleEditInternal,
  applyMultipleEdits
};
