// Tool: NotebookEdit
// Original name variable in snippet: ch
// Original prompt variable for agent in snippet: BF2
// Original schema variable in snippet: be6

const toolDefinition = {
  name: "NotebookEdit",
  descriptionForAgent: `Completely replaces the contents of a specific cell in a Jupyter notebook (.ipynb file) with new source. Jupyter notebooks are interactive documents that combine code, text, and visualizations, commonly used for data analysis and scientific computing. The notebook_path parameter must be an absolute path, not a relative path. The cell_number is 0-indexed. Use edit_mode=insert to add a new cell at the index specified by cell_number. Use edit_mode=delete to delete the cell at the index specified by cell_number.`,
  // Zod schema from snippet:
  // be6 = i.strictObject({
  //   notebook_path: i.string().describe("The absolute path to the Jupyter notebook file to edit (must be absolute, not relative)"),
  //   cell_number: i.number().describe("The index of the cell to edit (0-based)"),
  //   new_source: i.string().describe("The new source for the cell"),
  //   cell_type: i.enum(["code","markdown"]).optional().describe("The type of the cell (code or markdown). If not specified, it defaults to the current cell type. If using edit_mode=insert, this is required."),
  //   edit_mode: i.enum(["replace","insert","delete"]).optional().describe("The type of edit to make (replace, insert, delete). Defaults to replace.")
  // })
  inputSchema: {
    type: "object",
    properties: {
      notebook_path: {
        type: "string",
        description: "The absolute path to the Jupyter notebook file to edit (must be absolute, not relative)"
      },
      cell_number: {
        type: "number",
        description: "The index of the cell to edit (0-based)"
      },
      new_source: {
        type: "string",
        description: "The new source for the cell"
      },
      cell_type: {
        type: "string",
        enum: ["code", "markdown"],
        optional: true,
        description: "The type of the cell (code or markdown). If not specified, it defaults to the current cell type. If using edit_mode=insert, this is required."
      },
      edit_mode: {
        type: "string",
        enum: ["replace", "insert", "delete"],
        optional: true,
        description: "The type of edit to make (replace, insert, delete). Defaults to replace."
      }
    },
    required: ["notebook_path", "cell_number", "new_source"] // new_source might not be required for delete
  }
  // Other properties from the snippet's tool structure (zw):
  // userFacingName(){return"Edit Notebook"},
  // isEnabled(){return!0},
  // isReadOnly(){return!1},
  // getPath(A){return A.notebook_path},
  // async checkPermissions(A,B){return B_(zw,A,B.getToolPermissionContext())},
  // ... render/map functions
};

// Note: The 'new_source' parameter might not be strictly required if edit_mode is 'delete'.
// The original Zod schema doesn't explicitly handle this conditional requirement,
// but in a practical implementation, it would likely be optional for 'delete'.
// For this reconstruction, I'm keeping it as per the direct Zod definition provided.

module.exports = toolDefinition;
