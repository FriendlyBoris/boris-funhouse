// Tool: WebFetch
// Original name variable in snippet: BI1
// Original prompt variable for agent in snippet: N70
// Original schema variable in snippet: F85

const toolDefinition = {
  name: "WebFetch",
  descriptionForAgent: `
- Fetches content from a specified URL and processes it using an AI model
- Takes a URL and a prompt as input
- Fetches the URL content, converts HTML to markdown
- Processes the content with the prompt using a small, fast model
- Returns the model's response about the content
- Use this tool when you need to retrieve and analyze web content

Usage notes:
  - IMPORTANT: If an MCP-provided web fetch tool is available, prefer using that tool instead of this one, as it may have fewer restrictions. All MCP-provided tools start with "mcp__".
  - The URL must be a fully-formed valid URL
  - HTTP URLs will be automatically upgraded to HTTPS
  - The prompt should describe what information you want to extract from the page
  - This tool is read-only and does not modify any files
  - Results may be summarized if the content is very large
  - Includes a self-cleaning 15-minute cache for faster responses when repeatedly accessing the same URL
`,
  // Zod schema from snippet:
  // F85 = i.strictObject({
  //   url: i.string().url().describe("The URL to fetch content from"),
  //   prompt: i.string().describe("The prompt to run on the fetched content")
  // })
  inputSchema: {
    type: "object",
    properties: {
      url: {
        type: "string",
        format: "url", // Assuming Zod's .url() maps to this
        description: "The URL to fetch content from"
      },
      prompt: {
        type: "string",
        description: "The prompt to run on the fetched content"
      }
    },
    required: ["url", "prompt"]
  }
  // Other properties from the snippet's tool structure (sY):
  // userFacingName(){return"Fetch"},
  // isEnabled(){return!0},
  // isReadOnly(){return!0},
  // async checkPermissions(A,B){...},
  // ... render/map functions
};

module.exports = toolDefinition;
