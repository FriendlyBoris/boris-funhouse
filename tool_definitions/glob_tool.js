// Tool: Glob
// Original name variable in snippet: ZI1
// Original prompt variable for agent in snippet: lk1
// Original schema variable in snippet: i25

const toolDefinition = {
  name: "Glob",
  descriptionForAgent: `- Fast file pattern matching tool that works with any codebase size
- Supports glob patterns like "**/*.js" or "src/**/*.ts"
- Returns matching file paths sorted by modification time
- Use this tool when you need to find files by name patterns
- When you are doing an open ended search that may require multiple rounds of globbing and grepping, use the Agent tool instead
- You have the capability to call multiple tools in a single response. It is always better to speculatively perform multiple searches as a batch that are potentially useful.`,
  // Zod schema from snippet:
  // i25 = i.strictObject({
  //   pattern: i.string().describe("The glob pattern to match files against"),
  //   path: i.string().optional().describe('The directory to search in. If not specified, the current working directory will be used. IMPORTANT: Omit this field to use the default directory. DO NOT enter "undefined" or "null" - simply omit it for the default behavior. Must be a valid directory path if provided.')
  // })
  inputSchema: {
    type: "object",
    properties: {
      pattern: {
        type: "string",
        description: "The glob pattern to match files against"
      },
      path: {
        type: "string",
        description: 'The directory to search in. If not specified, the current working directory will be used. IMPORTANT: Omit this field to use the default directory. DO NOT enter "undefined" or "null" - simply omit it for the default behavior. Must be a valid directory path if provided.',
        optional: true
      }
    },
    required: ["pattern"]
  }
  // Other properties from the snippet's tool structure (fN):
  // userFacingName(){return"Search"}, // Note: "Search" is also used by Grep
  // isEnabled(){return!0},
  // isReadOnly(){return!0},
  // getPath({path:A}){return A||uA()},
  // async checkPermissions(A,B){return lz(fN,A,B.getToolPermissionContext())},
  // ... render/map functions
};

module.exports = toolDefinition;
