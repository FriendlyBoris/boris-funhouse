// Tool: MultiEdit
// Original name variable in snippet: dF1
// Original prompt variable for agent in snippet: Lu0
// Original schema variable in snippet: xe6 (using ke6)

const toolDefinition = {
  name: "MultiEdit",
  descriptionForAgent: `This is a tool for making multiple edits to a single file in one operation. It is built on top of the Edit tool and allows you to perform multiple find-and-replace operations efficiently. Prefer this tool over the Edit tool when you need to make multiple edits to the same file.

Before using this tool:

1. Use the Read tool to understand the file's contents and context
2. Verify the directory path is correct

To make multiple file edits, provide the following:
1. file_path: The absolute path to the file to modify (must be absolute, not relative)
2. edits: An array of edit operations to perform, where each edit contains:
   - old_string: The text to replace (must match the file contents exactly, including all whitespace and indentation)
   - new_string: The edited text to replace the old_string
   - expected_replacements: The number of replacements you expect to make. Defaults to 1 if not specified.

IMPORTANT:
- All edits are applied in sequence, in the order they are provided
- Each edit operates on the result of the previous edit
- All edits must be valid for the operation to succeed - if any edit fails, none will be applied
- This tool is ideal when you need to make several changes to different parts of the same file
- For Jupyter notebooks (.ipynb files), use the NotebookEdit instead

CRITICAL REQUIREMENTS:
1. All edits follow the same requirements as the single Edit tool
2. The edits are atomic - either all succeed or none are applied
3. Plan your edits carefully to avoid conflicts between sequential operations

WARNING:
- The tool will fail if edits.old_string matches multiple locations and edits.expected_replacements isn't specified
- The tool will fail if the number of matches doesn't equal edits.expected_replacements when it's specified
- The tool will fail if edits.old_string doesn't match the file contents exactly (including whitespace)
- The tool will fail if edits.old_string and edits.new_string are the same
- Since edits are applied in sequence, ensure that earlier edits don't affect the text that later edits are trying to find

When making edits:
- Ensure all edits result in idiomatic, correct code
- Do not leave the code in a broken state
- Always use absolute file paths (starting with /)

If you want to create a new file, use:
- A new file path, including dir name if needed
- First edit: empty old_string and the new file's contents as new_string
- Subsequent edits: normal edit operations on the created content`,
  // Zod schema from snippet:
  // xe6 = i.strictObject({
  //   file_path: i.string().describe("The absolute path to the file to modify"),
  //   edits: i.array(ke6).min(1,"At least one edit is required").describe("Array of edit operations to perform sequentially on the file")
  // })
  // ke6 = i.strictObject({
  //   old_string: i.string().describe("The text to replace"),
  //   new_string: i.string().describe("The text to replace it with"),
  //   expected_replacements: i.number().default(1).optional().describe("The expected number of replacements to perform. Defaults to 1 if not specified.")
  // })
  inputSchema: {
    type: "object",
    properties: {
      file_path: {
        type: "string",
        description: "The absolute path to the file to modify"
      },
      edits: {
        type: "array",
        minItems: 1,
        description: "Array of edit operations to perform sequentially on the file",
        items: {
          type: "object",
          properties: {
            old_string: {
              type: "string",
              description: "The text to replace"
            },
            new_string: {
              type: "string",
              description: "The text to replace it with"
            },
            expected_replacements: {
              type: "number",
              description: "The expected number of replacements to perform. Defaults to 1 if not specified.",
              optional: true,
              default: 1
            }
          },
          required: ["old_string", "new_string"]
        }
      }
    },
    required: ["file_path", "edits"]
  }
  // Other properties from the snippet's tool structure (oV):
  // userFacingName(A){if(!A)return"Update";if(eW2(A.edits))return"Create";return"Update"},
  // isEnabled(){return!0},
  // isReadOnly(){return!1},
  // getPath(A){return A.file_path},
  // async checkPermissions(A,B){return $Q.checkPermissions({file_path:A.file_path,old_string:"",new_string:""},B)},
  // ... render/map functions
};

module.exports = toolDefinition;
