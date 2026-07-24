const bootcampData = {
  lessons: [
    {
      day: 1,
      week: 1,
      title: "Advanced Prompt Engineering & AI Workflows",
      focus: "Master the art of crafting effective prompts and building AI-powered workflows",
      status: "general",
      objectives: [
        "Understand prompt engineering fundamentals and advanced techniques",
        "Learn to structure prompts for consistent AI outputs",
        "Build AI workflows that integrate with business systems"
      ],
      concepts: [
        {
          name: "Prompt Structure",
          explanation: "A well-structured prompt includes context, task, constraints, and output format.",
          analogy: "Think of prompting like giving directions to a very literal assistant - be specific about where you're going and how you want to get there.",
          example: "Context: You are a marketing expert\nTask: Write a product description\nConstraints: Under 100 words, friendly tone\nOutput: JSON with title and body"
        },
        {
          name: "Chain of Thought",
          explanation: "Encourage the AI to think step-by-step before providing final answers.",
          methods: [
            { method: "Zero-shot CoT", use: "Add 'Let's think step by step' to prompts" },
            { method: "Few-shot CoT", use: "Provide examples with reasoning steps" }
          ]
        }
      ],
      steps: [
        {
          title: "Set up your AI environment",
          description: "Choose an AI platform and familiarize yourself with its interface.",
          action: "Sign up for Claude, ChatGPT, or similar AI platform",
          notes: "Most platforms offer free tiers for learning"
        },
        {
          title: "Practice basic prompting",
          description: "Start with simple tasks and gradually increase complexity.",
          action: "Try: 'Explain quantum computing in 3 sentences'",
          notes: "Notice how different phrasings yield different results"
        }
      ],
      exercises: [
        {
          title: "Create a Prompt Template",
          description: "Build a reusable template for generating blog post outlines.",
          platform: "Any AI chatbot",
          steps: [
            "Define the context (you are a content strategist)",
            "Specify the task (create blog outline)",
            "Add constraints (target audience, word count, tone)",
            "Test with 3 different topics"
          ],
          expected: "A template that consistently produces structured blog outlines"
        }
      ],
      activities: [
        {
          title: "Prompt Analysis Exercise",
          description: "Compare outputs from different prompt variations on the same task.",
          duration: "30 minutes"
        }
      ],
      resources: [
        {
          title: "Prompt Engineering Guide",
          url: "https://www.promptingguide.ai/",
          description: "Comprehensive guide to prompt engineering techniques"
        }
      ]
    },
    {
      day: 2,
      week: 1,
      title: "CRM Architecture & The Lead Engine",
      focus: "Design and implement CRM systems that automate lead management",
      status: "crm",
      objectives: [
        "Understand CRM system architecture and data models",
        "Learn lead scoring and qualification automation",
        "Build integrations between marketing and sales systems"
      ],
      concepts: [
        {
          name: "Lead Lifecycle",
          explanation: "Leads progress through stages: Awareness → Interest → Consideration → Decision",
          analogy: "Like a funnel where prospects enter at the top and qualified customers exit at the bottom."
        },
        {
          name: "CRM Data Model",
          explanation: "Core entities include Leads, Contacts, Accounts, Opportunities, and Activities.",
          example: "Lead → Contact conversion happens when a lead is qualified and ready for sales engagement."
        }
      ],
      steps: [
        {
          title: "Map your lead sources",
          description: "Identify all channels where leads originate.",
          action: "List: Website forms, social media, referrals, events, ads"
        },
        {
          title: "Define qualification criteria",
          description: "Establish clear BANT criteria (Budget, Authority, Need, Timeline).",
          action: "Create a scoring rubric with weighted factors"
        }
      ],
      exercises: [
        {
          title: "Build a Lead Scoring System",
          description: "Create an automated scoring model based on behavior and demographics.",
          platform: "Spreadsheet or CRM",
          steps: [
            "Assign points for job title seniority",
            "Add points for website engagement",
            "Subtract points for disqualifying factors",
            "Set threshold for sales-ready leads"
          ],
          expected: "A scoring system that ranks leads by conversion likelihood"
        }
      ],
      activities: [
        {
          title: "CRM Comparison Research",
          description: "Evaluate 3 CRM platforms for features and pricing.",
          duration: "45 minutes"
        }
      ],
      resources: [
        {
          title: "HubSpot CRM Guide",
          url: "https://www.hubspot.com/crm",
          description: "Free CRM platform with extensive documentation"
        }
      ]
    },
    {
      day: 3,
      week: 1,
      title: "Integration Architecture & n8n Fundamentals",
      focus: "Master workflow automation using n8n and API integrations",
      status: "integration",
      objectives: [
        "Understand REST API fundamentals and authentication",
        "Learn n8n workflow design patterns",
        "Build multi-step automation workflows"
      ],
      concepts: [
        {
          name: "REST APIs",
          explanation: "APIs use HTTP methods (GET, POST, PUT, DELETE) to interact with resources.",
          example: "GET /api/contacts retrieves contact list\nPOST /api/contacts creates new contact"
        },
        {
          name: "Webhooks",
          explanation: "Webhooks are user-defined HTTP callbacks triggered by events.",
          analogy: "Like a doorbell - instead of constantly checking if someone is there, you get notified when they arrive."
        }
      ],
      steps: [
        {
          title: "Install n8n",
          description: "Set up n8n locally or on a server.",
          action: "npm install n8n -g && n8n start",
          notes: "Access at http://localhost:5678"
        },
        {
          title: "Create your first workflow",
          description: "Build a simple automation connecting two apps.",
          action: "Trigger: Schedule → Action: Send email"
        }
      ],
      exercises: [
        {
          title: "Form to Spreadsheet Automation",
          description: "Automatically save form submissions to Google Sheets.",
          platform: "n8n",
          steps: [
            "Set up webhook trigger for form submission",
            "Add Google Sheets node",
            "Map form fields to spreadsheet columns",
            "Test with sample submission"
          ],
          expected: "Form data automatically appears in spreadsheet within seconds"
        }
      ],
      activities: [
        {
          title: "API Exploration",
          description: "Use Postman to test 3 different public APIs.",
          duration: "40 minutes"
        }
      ],
      resources: [
        {
          title: "n8n Documentation",
          url: "https://docs.n8n.io/",
          description: "Official n8n workflow automation documentation"
        }
      ]
    },
    {
      day: 4,
      week: 1,
      title: "Voice AI Deployment",
      focus: "Implement voice AI agents for customer interaction",
      status: "ai",
      objectives: [
        "Understand voice AI technology stack",
        "Learn call flow design and conversation logic",
        "Deploy voice agents for real-world scenarios"
      ],
      concepts: [
        {
          name: "Speech-to-Text (STT)",
          explanation: "Converts spoken audio into text for processing.",
          analogy: "Like a court stenographer transcribing spoken words into written text in real-time."
        },
        {
          name: "Natural Language Understanding",
          explanation: "AI interprets the meaning and intent behind transcribed text."
        }
      ],
      steps: [
        {
          title: "Choose a voice AI platform",
          description: "Select from Vapi, Retell, Bland, or similar providers.",
          action: "Sign up for a trial account"
        },
        {
          title: "Design conversation flow",
          description: "Map out possible conversation paths and responses.",
          action: "Create a flowchart with decision points"
        }
      ],
      exercises: [
        {
          title: "Build a Receptionist Agent",
          description: "Create a voice agent that answers calls and takes messages.",
          platform: "Vapi or Retell",
          steps: [
            "Define greeting and purpose",
            "Set up call routing logic",
            "Configure voicemail capture",
            "Test with actual phone call"
          ],
          expected: "Agent successfully handles inbound calls"
        }
      ],
      activities: [
        {
          title: "Call Flow Testing",
          description: "Record and analyze test calls for improvement areas.",
          duration: "35 minutes"
        }
      ],
      resources: [
        {
          title: "Vapi AI Platform",
          url: "https://vapi.ai/",
          description: "Voice AI development platform"
        }
      ]
    },
    {
      day: 5,
      week: 1,
      title: "Vibe Coding & Frontend Prototyping",
      focus: "Rapidly prototype interfaces using AI-assisted development",
      status: "frontend",
      objectives: [
        "Learn AI-assisted coding techniques",
        "Build responsive web interfaces quickly",
        "Iterate on designs with AI feedback"
      ],
      concepts: [
        {
          name: "Vibe Coding",
          explanation: "Using natural language to describe desired functionality and letting AI generate the code.",
          analogy: "Like having a pair programmer who types exactly what you describe."
        },
        {
          name: "Component-Based Architecture",
          explanation: "Building UIs from reusable, self-contained components."
        }
      ],
      steps: [
        {
          title: "Set up development environment",
          description: "Install VS Code with AI extensions.",
          action: "Add GitHub Copilot or Cursor editor"
        },
        {
          title: "Describe your component",
          description: "Use natural language to specify UI requirements.",
          action: "Prompt: 'Create a responsive navbar with dropdown menu'"
        }
      ],
      exercises: [
        {
          title: "Landing Page Prototype",
          description: "Build a complete landing page using AI assistance.",
          platform: "VS Code + AI",
          steps: [
            "Describe hero section layout",
            "Generate features grid component",
            "Create contact form with validation",
            "Style with Tailwind CSS"
          ],
          expected: "Functional landing page built in under 2 hours"
        }
      ],
      activities: [
        {
          title: "Code Review Session",
          description: "Analyze AI-generated code for optimization opportunities.",
          duration: "30 minutes"
        }
      ],
      resources: [
        {
          title: "Cursor Editor",
          url: "https://cursor.sh/",
          description: "AI-first code editor"
        }
      ]
    },
    {
      day: 6,
      week: 2,
      title: "Advanced API Routing & Affiliate Systems",
      focus: "Build sophisticated routing logic for affiliate tracking and commission systems",
      status: "integration",
      objectives: [
        "Master advanced API routing patterns",
        "Implement affiliate tracking systems",
        "Handle complex commission calculations"
      ],
      concepts: [
        {
          name: "Affiliate Tracking",
          explanation: "Systems that attribute sales to referring partners using unique identifiers.",
          example: "Tracking link: example.com?affiliate=john123 stores referral in cookie"
        }
      ],
      steps: [
        {
          title: "Design tracking schema",
          description: "Plan database structure for affiliates and referrals.",
          action: "Create tables: affiliates, referrals, commissions"
        }
      ],
      exercises: [
        {
          title: "Affiliate Dashboard",
          description: "Build a dashboard showing affiliate performance metrics.",
          platform: "n8n + Database",
          steps: [
            "Track click-through rates",
            "Calculate conversion rates",
            "Display earnings over time",
            "Generate payout reports"
          ],
          expected: "Real-time affiliate performance dashboard"
        }
      ],
      activities: [
        {
          title: "Commission Logic Design",
          description: "Map out tiered commission structures.",
          duration: "40 minutes"
        }
      ],
      resources: [
        {
          title: "API Design Best Practices",
          url: "https://restfulapi.net/",
          description: "Guide to RESTful API design"
        }
      ]
    },
    {
      day: 7,
      week: 2,
      title: "No-Code SaaS Building & Multi-User Logic",
      focus: "Create multi-tenant SaaS applications without traditional coding",
      status: "saas",
      objectives: [
        "Understand multi-tenant architecture",
        "Build user authentication and authorization",
        "Implement role-based access control"
      ],
      concepts: [
        {
          name: "Multi-Tenancy",
          explanation: "Single application instance serves multiple customer organizations with data isolation.",
          analogy: "Like an apartment building - same structure, but each tenant has their own private space."
        }
      ],
      steps: [
        {
          title: "Choose no-code platform",
          description: "Select Bubble, Softr, or similar for SaaS building.",
          action: "Create account and explore templates"
        }
      ],
      exercises: [
        {
          title: "Member Portal",
          description: "Build a gated content portal with user accounts.",
          platform: "Bubble or Softr",
          steps: [
            "Set up user registration",
            "Create membership tiers",
            "Gate content by subscription level",
            "Add payment integration"
          ],
          expected: "Working member portal with tiered access"
        }
      ],
      activities: [
        {
          title: "UX Flow Mapping",
          description: "Design user journey from signup to activation.",
          duration: "35 minutes"
        }
      ],
      resources: [
        {
          title: "Bubble Documentation",
          url: "https://bubble.io/docs",
          description: "No-code app building platform"
        }
      ]
    },
    {
      day: 8,
      week: 2,
      title: "Systemic Precision & Debugging Protocol",
      focus: "Develop systematic approaches to debugging and quality assurance",
      status: "general",
      objectives: [
        "Learn systematic debugging methodologies",
        "Implement logging and monitoring",
        "Create testing protocols for automations"
      ],
      concepts: [
        {
          name: "Debugging Pyramid",
          explanation: "Start with reproduction, isolate variables, hypothesize, test, fix, verify.",
          analogy: "Like a doctor diagnosing illness - observe symptoms, run tests, identify cause, prescribe treatment."
        }
      ],
      steps: [
        {
          title: "Set up logging",
          description: "Implement comprehensive logging in your workflows.",
          action: "Add log nodes at key workflow checkpoints"
        }
      ],
      exercises: [
        {
          title: "Break and Fix Challenge",
          description: "Intentionally break a workflow and systematically debug it.",
          platform: "n8n",
          steps: [
            "Remove a critical node",
            "Observe error messages",
            "Check execution logs",
            "Restore and verify"
          ],
          expected: "Documented debugging process"
        }
      ],
      activities: [
        {
          title: "Error Handling Workshop",
          description: "Design error handling for common failure scenarios.",
          duration: "45 minutes"
        }
      ],
      resources: [
        {
          title: "Debugging Best Practices",
          url: "https://www.browserstack.com/guide/debugging-best-practices",
          description: "Comprehensive debugging guide"
        }
      ]
    },
    {
      day: 9,
      week: 2,
      title: "Capstone Architecture (Backend & Integration)",
      focus: "Design and architect your capstone project backend systems",
      status: "capstone",
      objectives: [
        "Architect scalable backend systems",
        "Design database schemas for real applications",
        "Plan integration touchpoints"
      ],
      concepts: [
        {
          name: "System Design",
          explanation: "High-level planning of components, data flow, and infrastructure.",
          analogy: "Like architectural blueprints before building a house."
        }
      ],
      steps: [
        {
          title: "Define project scope",
          description: "Clearly articulate what your capstone will accomplish.",
          action: "Write problem statement and success criteria"
        }
      ],
      exercises: [
        {
          title: "Architecture Diagram",
          description: "Create visual representation of your system architecture.",
          platform: "Draw.io or Excalidraw",
          steps: [
            "Identify all system components",
            "Map data flows between components",
            "Note external integrations",
            "Document APIs and endpoints"
          ],
          expected: "Complete architecture diagram"
        }
      ],
      activities: [
        {
          title: "Technical Specification",
          description: "Write detailed technical spec document.",
          duration: "60 minutes"
        }
      ],
      resources: [
        {
          title: "System Design Primer",
          url: "https://github.com/donnemartin/system-design-primer",
          description: "Guide to system design interviews and concepts"
        }
      ]
    },
    {
      day: 10,
      week: 2,
      title: "Proof of Competence (Frontend & Portfolio)",
      focus: "Build portfolio presentation and demonstrate mastery",
      status: "capstone",
      objectives: [
        "Create professional portfolio presentation",
        "Document projects with case studies",
        "Prepare for technical interviews"
      ],
      concepts: [
        {
          name: "Portfolio Strategy",
          explanation: "Showcase projects that demonstrate problem-solving and technical skills.",
          analogy: "Your portfolio is your greatest hits album - only include your best work."
        }
      ],
      steps: [
        {
          title: "Select showcase projects",
          description: "Choose 3-5 projects that best represent your abilities.",
          action: "Prioritize complexity and business impact"
        }
      ],
      exercises: [
        {
          title: "Case Study Document",
          description: "Write detailed case study for your capstone project.",
          platform: "Notion or Google Docs",
          steps: [
            "Describe the problem solved",
            "Explain your approach and tools",
            "Show results and metrics",
            "Include screenshots and demos"
          ],
          expected: "Professional case study ready for portfolio"
        }
      ],
      activities: [
        {
          title: "Mock Interview Practice",
          description: "Practice explaining your projects aloud.",
          duration: "45 minutes"
        }
      ],
      resources: [
        {
          title: "Portfolio Examples",
          url: "https://github.com/topics/portfolio",
          description: "Browse developer portfolio examples"
        }
      ]
    }
  ],
  checklists: [
    {
      day: 1,
      items: [
        { task: "Review prompt engineering basics", time: "15 min" },
        { task: "Complete hands-on exercise", time: "30 min" },
        { task: "Document learnings", time: "15 min" }
      ]
    },
    {
      day: 2,
      items: [
        { task: "Study CRM data models", time: "20 min" },
        { task: "Build lead scoring system", time: "40 min" },
        { task: "Research CRM platforms", time: "20 min" }
      ]
    },
    {
      day: 3,
      items: [
        { task: "Install and configure n8n", time: "15 min" },
        { task: "Build first workflow", time: "30 min" },
        { task: "Test API connections", time: "25 min" }
      ]
    },
    {
      day: 4,
      items: [
        { task: "Research voice AI platforms", time: "20 min" },
        { task: "Design conversation flow", time: "30 min" },
        { task: "Deploy test agent", time: "30 min" }
      ]
    },
    {
      day: 5,
      items: [
        { task: "Set up AI coding environment", time: "15 min" },
        { task: "Build landing page prototype", time: "60 min" },
        { task: "Refine with AI feedback", time: "30 min" }
      ]
    },
    {
      day: 6,
      items: [
        { task: "Design affiliate tracking schema", time: "25 min" },
        { task: "Implement tracking logic", time: "45 min" },
        { task: "Test with sample data", time: "20 min" }
      ]
    },
    {
      day: 7,
      items: [
        { task: "Set up no-code platform", time: "20 min" },
        { task: "Build member portal", time: "60 min" },
        { task: "Test user flows", time: "25 min" }
      ]
    },
    {
      day: 8,
      items: [
        { task: "Study debugging methodologies", time: "20 min" },
        { task: "Complete break-and-fix challenge", time: "40 min" },
        { task: "Document debugging process", time: "20 min" }
      ]
    },
    {
      day: 9,
      items: [
        { task: "Define capstone scope", time: "30 min" },
        { task: "Create architecture diagram", time: "60 min" },
        { task: "Write technical spec", time: "45 min" }
      ]
    },
    {
      day: 10,
      items: [
        { task: "Select portfolio projects", time: "20 min" },
        { task: "Write case study", time: "60 min" },
        { task: "Practice presentation", time: "40 min" }
      ]
    }
  ],
  resources: {
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
  },
  quickReference: {
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
  },
  instructor: {
    name: "Ray - Technical Automation Architect",
    bio: "I'm your guide through this intensive 14-day bootcamp. My mission is to transform you from a complete beginner into a job-ready Technical Automation Architect who can build sophisticated business systems using AI, APIs, and automation tools.",
    contact: "support@automationbootcamp.example",
    officeHours: "Monday-Friday, 9am-5pm EST",
    expertise: [
      { category: "Content & SEO Systems", description: "Creating SEO-optimized content workflows and automated publishing pipelines" },
      { category: "Video & Graphics Production", description: "Automated video editing, thumbnail generation, and graphic design workflows" },
      { category: "Funnel Building", description: "High-converting sales funnels with integrated tracking and optimization" },
      { category: "Competitive Research", description: "Automated market analysis and competitor monitoring systems" },
      { category: "Workflow Automation", description: "Complex multi-step automations connecting various business tools" },
      { category: "AI Integration", description: "Implementing AI models for content generation, analysis, and decision making" }
    ],
    tools: [
      "ChatGPT", "Claude", "Gemini", "Canva", "CapCut", 
      "Zapier", "Make", "n8n", "Google Analytics", "Airtable",
      "GoHighLevel", "Vapi", "Retell", "Bubble", "Softr"
    ]
  }
};

export default bootcampData;
