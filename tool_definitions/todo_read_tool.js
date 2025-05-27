// Tool: TodoRead
// Original name variable in snippet: yU.name
// Original prompt variable for agent in snippet: S70
// Original schema variable in snippet: dR4

const toolDefinition = {
  name: "TodoRead",
  descriptionForAgent: `Use this tool to read the current to-do list for the session. This tool should be used proactively and frequently to ensure that you are aware of
the status of the current task list. You should make use of this tool as often as possible, especially in the following situations:
- At the beginning of conversations to see what's pending
- Before starting new tasks to prioritize work
- When the user asks about previous tasks or plans
- Whenever you're uncertain about what to do next
- After completing tasks to update your understanding of remaining work
- After every few messages to ensure you're on track

Usage:
- This tool takes in no parameters. So leave the input blank or empty. DO NOT include a dummy object, placeholder string or a key like "input" or "empty". LEAVE IT BLANK.
- Returns a list of todo items with their status, priority, and content
- Use this information to track progress and plan next steps
- If no todos exist yet, an empty list will be returned`,
  // Zod schema from snippet:
  // dR4 = i.strictObject({},{description:'No input is required, leave this field blank. NOTE that we do not require a dummy object, placeholder string or a key like "input" or "empty". LEAVE IT BLANK.'})
  inputSchema: {
    type: "object",
    properties: {},
    additionalProperties: false,
    description: 'No input is required, leave this field blank. NOTE that we do not require a dummy object, placeholder string or a key like "input" or "empty". LEAVE IT BLANK.'
  }
  // Other properties from the snippet's tool structure (yU):
  // userFacingName(){return"Read Todos"},
  // isEnabled(){return!0},
  // isReadOnly(){return!0},
  // ... render/map functions
};

module.exports = toolDefinition;
