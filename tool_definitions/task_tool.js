// Tool: Task (Agent)
// Original name variable in snippet: Wz
// Original prompt function in snippet: B$2 (simulated)
// Original schema variable in snippet: G75

// Simulate the list of tools available to the agent for prompt generation
const AVAILABLE_TOOLS_FOR_AGENT = [
  "Edit",
  "MultiEdit",
  "Write",
  "Read",
  "Bash",
  "TodoWrite",
  "TodoRead",
  "Glob",
  "Grep",
  "LS",
  "NotebookRead", // Assuming NotebookRead (kh) is also available
  "NotebookEdit", // Assuming NotebookEdit (ch) is also available
  "WebFetch"      // Assuming WebFetch (BI1) is also available
];

const descriptionForAgent = `Launch a new agent that has access to the following tools: \${AVAILABLE_TOOLS_FOR_AGENT.filter(name => name !== "Task").join(", ")}. When you are searching for a keyword or file and are not confident that you will find the right match in the first few tries, use the Agent tool to perform the search for you.

When to use the Agent tool:
- If you are searching for a keyword like "config" or "logger", or for questions like "which file does X?", the Agent tool is strongly recommended

When NOT to use the Agent tool:
- If you want to read a specific file path, use the Read tool or Glob tool instead of the Agent tool, to find the match more quickly
- If you are searching for a specific class definition like "class Foo", use the Glob tool instead, to find the match more quickly
- If you are searching for code within a specific file or set of 2-3 files, use the Read tool instead of the Agent tool, to find the match more quickly

Usage notes:
1. Launch multiple agents concurrently whenever possible, to maximize performance; to do that, use a single message with multiple tool uses
2. When the agent is done, it will return a single message back to you. The result returned by the agent is not visible to the user. To show the user the result, you should send a text message back to the user with a concise summary of the result.
3. Each agent invocation is stateless. You will not be able to send additional messages to the agent, nor will the agent be able to communicate with you outside of its final report. Therefore, your prompt should contain a highly detailed task description for the agent to perform autonomously and you should specify exactly what information the agent should return back to you in its final and only message to you.
4. The agent's outputs should generally be trusted
5. Clearly tell the agent whether you expect it to write code or just to do research (search, file reads, web fetches, etc.), since it is not aware of the user's intent`;

const toolDefinition = {
  name: "Task",
  descriptionForAgent: descriptionForAgent,
  // Zod schema from snippet:
  // G75 = i.object({
  //   description: i.string().describe("A short (3-5 word) description of the task"),
  //   prompt: i.string().describe("The task for the agent to perform")
  // })
  inputSchema: {
    type: "object",
    properties: {
      description: {
        type: "string",
        description: "A short (3-5 word) description of the task"
      },
      prompt: {
        type: "string",
        description: "The task for the agent to perform"
      }
    },
    required: ["description", "prompt"]
  }
  // Other properties from the snippet's tool structure (Q$2):
  // isReadOnly(){return!0},
  // isEnabled(){return!0},
  // userFacingName(){return"Task"},
  // async checkPermissions(A){return{behavior:"allow",updatedInput:A}},
  // ... render/map functions
};

module.exports = toolDefinition;
