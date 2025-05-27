// Tool: LS (List)
// Original name variable in snippet: WI1
// Original prompt variable for agent in snippet: nk1
// Original schema variable in snippet: _w6

const toolDefinition = {
  name: "LS",
  descriptionForAgent: `Lists files and directories in a given path. The path parameter must be an absolute path, not a relative path. You can optionally provide an array of glob patterns to ignore with the ignore parameter. You should generally prefer the Glob and Grep tools, if you know which directories to search.`,
  // Zod schema from snippet:
  // _w6 = i.strictObject({
  //   path: i.string().describe("The absolute path to the directory to list (must be absolute, not relative)"),
  //   ignore: i.array(i.string()).optional().describe("List of glob patterns to ignore")
  // })
  inputSchema: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description: "The absolute path to the directory to list (must be absolute, not relative)"
      },
      ignore: {
        type: "array",
        items: {
          type: "string"
        },
        optional: true,
        description: "List of glob patterns to ignore"
      }
    },
    required: ["path"]
  }
  // Other properties from the snippet's tool structure (VC):
  // userFacingName(){return"List"},
  // isEnabled(){return!0},
  // isReadOnly(){return!0},
  // getPath({path:A}){return A},
  // async checkPermissions(A,B){return lz(VC,A,B.getToolPermissionContext())},
  // ... render/map functions
};

module.exports = toolDefinition;
