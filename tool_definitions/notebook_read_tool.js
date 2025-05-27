// Tool: NotebookRead
// Original name variable in snippet: kh
// Original prompt variable for agent in snippet: Mm0
// Original schema variable in snippet: s25

const toolDefinition = {
  name: "NotebookRead",
  descriptionForAgent: `Reads a Jupyter notebook (.ipynb file) and returns all of the cells with their outputs. Jupyter notebooks are interactive documents that combine code, text, and visualizations, commonly used for data analysis and scientific computing. The notebook_path parameter must be an absolute path, not a relative path.`,
  // Zod schema from snippet:
  // s25 = i.strictObject({
  //   notebook_path: i.string().describe("The absolute path to the Jupyter notebook file to read (must be absolute, not relative)")
  // })
  inputSchema: {
    type: "object",
    properties: {
      notebook_path: {
        type: "string",
        description: "The absolute path to the Jupyter notebook file to read (must be absolute, not relative)"
      }
    },
    required: ["notebook_path"]
  }
  // Other properties from the snippet's tool structure (Xe):
  // userFacingName(){return"Read Notebook"},
  // isEnabled(){return!0},
  // isReadOnly(){return!0},
  // getPath({notebook_path:A}){return A},
  // async checkPermissions(A,B){return lz(Xe,A,B.getToolPermissionContext())},
  // ... render/map functions
};

module.exports = toolDefinition;
