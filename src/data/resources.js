/**
 * Resource data for the Technical Automation Bootcamp
 * Contains external resources, references, and quick reference guides
 */

export const resources = {
  apis: [
    { title: "REST API Tutorial", url: "https://restfulapi.net/" },
    { title: "API Design Best Practices", url: "https://www.openapis.org/" },
    { title: "Postman Learning Center", url: "https://learning.postman.com/" }
  ],
  json: [
    { title: "JSON Overview", url: "https://www.json.org/json-en.html" },
    { title: "JSON Formatter", url: "https://jsonformatter.org/" }
  ],
  promptEngineering: [
    { title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/" },
    { title: "Learn Prompting", url: "https://learnprompting.org/" }
  ],
  n8n: [
    { title: "n8n Documentation", url: "https://docs.n8n.io/" },
    { title: "n8n Workflow Templates", url: "https://n8n.io/workflows/" }
  ],
  ghl: [
    { title: "GoHighLevel Documentation", url: "https://help.gohighlevel.com/" },
    { title: "GHL API Reference", url: "https://highlevel.stoplight.io/" }
  ],
  claude: [
    { title: "Claude Documentation", url: "https://docs.anthropic.com/" },
    { title: "Claude AI Platform", url: "https://claude.ai/" }
  ],
  vapi: [
    { title: "Vapi AI Platform", url: "https://vapi.ai/" },
    { title: "Voice AI Documentation", url: "https://docs.vapi.ai/" }
  ],
  frontend: [
    { title: "React Documentation", url: "https://react.dev/" },
    { title: "Tailwind CSS", url: "https://tailwindcss.com/" }
  ],
  airtable: [
    { title: "Airtable Guide", url: "https://airtable.com/guides" },
    { title: "Airtable API", url: "https://www.airtable.com/developers/web-api" }
  ],
  deployment: [
    { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
    { title: "Deployment Best Practices", url: "https://aws.amazon.com/architecture/" }
  ]
};

export const quickReference = {
  httpMethods: [
    { method: "GET", use: "Retrieve data from server", example: "/api/users" },
    { method: "POST", use: "Create new resource", example: "/api/users" },
    { method: "PUT", use: "Update entire resource", example: "/api/users/1" },
    { method: "PATCH", use: "Partially update resource", example: "/api/users/1" },
    { method: "DELETE", use: "Remove resource", example: "/api/users/1" }
  ],
  jsonStructure: {
    description: "JSON (JavaScript Object Notation) is a lightweight data interchange format.",
    example: `{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "active": true,
    "roles": ["admin", "editor"],
    "metadata": {
      "createdAt": "2024-01-15T10:30:00Z",
      "lastLogin": "2024-01-20T14:22:00Z"
    }
  }
}`
  },
  commonErrors: [
    { error: "400 Bad Request", cause: "Invalid input or malformed request", fix: "Check request body and parameters" },
    { error: "401 Unauthorized", cause: "Missing or invalid authentication", fix: "Include valid API key or token" },
    { error: "403 Forbidden", cause: "Insufficient permissions", fix: "Verify user has required access rights" },
    { error: "404 Not Found", cause: "Resource does not exist", fix: "Check URL and resource ID" },
    { error: "429 Too Many Requests", cause: "Rate limit exceeded", fix: "Implement retry logic with backoff" },
    { error: "500 Internal Server Error", cause: "Server-side failure", fix: "Check server logs, retry later" }
  ],
  systemComponents: {
    "frontend": "User interface (React, Vue, etc.)",
    "backend": "Server-side logic and APIs",
    "database": "Data storage (SQL, NoSQL)",
    "cache": "Fast data retrieval (Redis, Memcached)",
    "queue": "Async task processing (RabbitMQ, SQS)",
    "cdn": "Content delivery network"
  },
  ghlPipelineExample: [
    "New Lead",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Negotiation",
    "Closed Won",
    "Closed Lost"
  ],
  n8nNodeTypes: [
    "Trigger Nodes (Webhook, Schedule, App Events)",
    "Action Nodes (HTTP Request, Code, Function)",
    "Logic Nodes (IF, Switch, Merge)",
    "Data Transformation (Set, Split In Batches)",
    "Integration Nodes (App-specific connectors)"
  ]
};

export default { resources, quickReference };
