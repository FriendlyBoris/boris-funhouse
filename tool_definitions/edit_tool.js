// Tool: Edit
// Original name variable in snippet: _U
// Original prompt variable for agent in snippet: aW2
// Original schema variable in snippet: _e6

const toolDefinition = {
  name: "Edit",
  descriptionForAgent: `Performs exact string replacements in files with strict occurrence count validation.

Usage:
- When editing text from Read tool output, ensure you preserve the exact indentation (tabs/spaces) as it appears AFTER the line number prefix. The line number prefix format is: spaces + line number + tab. Everything after that tab is the actual file content to match. Never include any part of the line number prefix in the old_string or new_string.
- ALWAYS prefer editing existing files in the codebase. NEVER write new files unless explicitly required.`,
  // Zod schema from snippet:
  // _e6 = i.strictObject({
  //   file_path: i.string().describe("The absolute path to the file to modify"),
  //   old_string: i.string().describe("The text to replace"),
  //   new_string: i.string().describe("The text to replace it with (must be different from old_string)"),
  //   expected_replacements: i.number().default(1).optional().describe("The expected number of replacements to perform. Defaults to 1 if not specified.")
  // })
  inputSchema: {
    type: "object",
    properties: {
      file_path: {
        type: "string",
        description: "The absolute path to the file to modify"
      },
      old_string: {
        type: "string",
        description: "The text to replace"
      },
      new_string: {
        type: "string",
        description: "The text to replace it with (must be different from old_string)"
      },
      expected_replacements: {
        type: "number",
        description: "The expected number of replacements to perform. Defaults to 1 if not specified.",
        optional: true,
        default: 1
      }
    },
    required: ["file_path", "old_string", "new_string"]
  }
  // Other properties from the snippet's tool structure ($Q):
  // userFacingName(A){if(!A)return"Update";if(A.old_string==="")return"Create";return"Update"},
  // isEnabled(){return!0},
  // isReadOnly(){return!1},
  // getPath(A){return A.file_path},
  // async checkPermissions(A,B){return B_($Q,A,B.getToolPermissionContext())},
  // ... render/map functions
};

module.exports = toolDefinition;
