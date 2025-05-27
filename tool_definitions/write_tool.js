// Tool: Write
// Original name variable in snippet: hW2
// Original prompt variable for agent in snippet: mW2
// Original schema variable in snippet: qe6

const toolDefinition = {
  name: "Write",
  descriptionForAgent: `Writes a file to the local filesystem.

Usage:
- This tool will overwrite the existing file if there is one at the provided path.
- If this is an existing file, you MUST use the Read tool first to read the file's contents. This tool will fail if you did not read the file first.
- ALWAYS prefer editing existing files in the codebase. NEVER write new files unless explicitly required.
- NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.`,
  // Zod schema from snippet:
  // qe6 = i.strictObject({
  //   file_path: i.string().describe("The absolute path to the file to write (must be absolute, not relative)"),
  //   content: i.string().describe("The content to write to the file")
  // })
  inputSchema: {
    type: "object",
    properties: {
      file_path: {
        type: "string",
        description: "The absolute path to the file to write (must be absolute, not relative)"
      },
      content: {
        type: "string",
        description: "The content to write to the file"
      }
    },
    required: ["file_path", "content"]
  }
  // Other properties from the snippet's tool structure (HD):
  // userFacingName: ()=>"Write",
  // isEnabled(){return!0},
  // isReadOnly(){return!1},
  // getPath(A){return A.file_path},
  // async checkPermissions(A,B){return B_(HD,A,B.getToolPermissionContext())},
  // ... render/map functions
};

module.exports = toolDefinition;
