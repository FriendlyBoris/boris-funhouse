// Tool: Grep
// Original name variable in snippet: YI1
// Original prompt function in snippet: ik1
// Original schema variable in snippet: u25

// Assuming YV (Bash tool name) is available for the prompt construction
const YV_TOOL_NAME = "Bash"; // From snippet variable YV

const descriptionForAgent = `
- Fast content search tool that works with any codebase size
- Searches file contents using regular expressions
- Supports full regex syntax (eg. "log.*Error", "function\\\\s+\\\\w+", etc.)
- Filter files by pattern with the include parameter (eg. "*.js", "*.{ts,tsx}")
- Returns file paths with at least one match sorted by modification time
- Use this tool when you need to find files containing specific patterns
- If you need to identify/count the number of matches within files, use the \${YV_TOOL_NAME} tool with \\\`rg\\\` (ripgrep) directly. Do NOT use \\\`grep\\\`.
- When you are doing an open ended search that may require multiple rounds of globbing and grepping, use the Agent tool instead
`;

const toolDefinition = {
  name: "Grep",
  descriptionForAgent: descriptionForAgent.trim(),
  // Zod schema from snippet:
  // u25 = i.strictObject({
  //   pattern: i.string().describe("The regular expression pattern to search for in file contents"),
  //   path: i.string().optional().describe("The directory to search in. Defaults to the current working directory."),
  //   include: i.string().optional().describe('File pattern to include in the search (e.g. "*.js", "*.{ts,tsx}")')
  // })
  inputSchema: {
    type: "object",
    properties: {
      pattern: {
        type: "string",
        description: "The regular expression pattern to search for in file contents"
      },
      path: {
        type: "string",
        description: "The directory to search in. Defaults to the current working directory.",
        optional: true
      },
      include: {
        type: "string",
        description: 'File pattern to include in the search (e.g. "*.js", "*.{ts,tsx}")',
        optional: true
      }
    },
    required: ["pattern"]
  }
  // Other properties from the snippet's tool structure (Qj):
  // userFacingName(){return"Search"}, // Note: "Search" is also used by Glob
  // isEnabled(){return!0},
  // isReadOnly(){return!0},
  // getPath({path:A}){return A||uA()},
  // async checkPermissions(A,B){return lz(Qj,A,B.getToolPermissionContext())},
  // ... render/map functions
};

module.exports = toolDefinition;
