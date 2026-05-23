// bootcampData.js - All curriculum content integrated into the app

export const bootcampData = {
  course: {
    title: "Technical Automation Architect Bootcamp",
    duration: "14 days intensive",
    objective: "Transform from complete beginner to job-ready Technical Automation Architect",
    intro: "The Technical Virtual Assistant is a specialized problem-solver who uses AI and automation to build business systems. Unlike a general VA, this role shifts away from 'task-doing' and focuses strictly on high-value technical integration, workflow architecture, and Solution-Oriented Architecture."
  },

  instructor: {
    expertise: [
      {
        category: "Content & SEO",
        description: "Create keyword-researched blog outlines and fully optimized posts, build topic clusters with internal linking strategies, write captions, email sequences, newsletters, and ad copy. Develop scalable AI-driven content systems that produce consistent output."
      },
      {
        category: "Creative & Video",
        description: "Design marketing graphics and creatives using Canva. Produce short-form video scripts and content (Reels, TikTok, YouTube Shorts) using CapCut or similar tools. Write hooks, scripts, and captions optimized for engagement."
      },
      {
        category: "Lead Generation & Funnels",
        description: "Build AI-assisted landing pages and conversion funnels. Write high-converting email sequences. Research target audiences, identify pain points, and create messaging frameworks focused on conversion."
      },
      {
        category: "Research & Competitive Intelligence",
        description: "Analyze competitor content, ads, and campaigns. Reverse-engineer high-performing strategies. Track performance data and provide optimization recommendations."
      },
      {
        category: "Website & Automation",
        description: "Build and edit websites on WordPress, Shopify, or Webflow. Connect landing pages to email systems and CRMs. Automate repetitive marketing tasks using Zapier, Make, or n8n."
      }
    ],
    tools: [
      "ChatGPT",
      "Claude",
      "Gemini",
      "Higgsfield AI",
      "Canva",
      "CapCut",
      "Shopify",
      "WordPress",
      "Webflow",
      "Zapier",
      "Make",
      "n8n",
      "HubSpot",
      "Mailchimp",
      "GoHighLevel",
      "ActiveCampaign",
      "Google Analytics",
      "Search Console",
      "SEMrush",
      "Ahrefs"
    ]
  },

  jobReadiness: {
    hirableSkills: [
      "Build complete lead generation systems end-to-end",
      "Connect multiple APIs and platforms without coding",
      "Optimize conversion funnels (reduce friction, increase ROI)",
      "Design and deploy multi-tenant SaaS solutions",
      "Debug complex automation workflows under pressure",
      "Communicate technical solutions to non-technical clients",
      "Propose solutions with ROI metrics and pricing",
      "Interview clients to understand pain points",
      "Build portfolio projects that generate measurable results"
    ],
    interviewQuestions: [
      {
        question: "Tell us about a time you had to build a system that connected 5+ different platforms. What was the challenge and how did you overcome it?",
        answer: "Example: 'I built a lead qualification system that connected Shopify (lead source) → n8n (automation) → Claude AI (qualification) → GoHighLevel (CRM) → Google Sheets (reporting). Challenge was handling API rate limits. Solution: Implemented caching and batched processing.'"
      },
      {
        question: "How do you approach a client who says 'we're getting 100 leads a month but converting only 5%'? What questions do you ask?",
        answer: "Pain points: lead quality, follow-up speed, messaging. Ask: Which channel? Lead scoring? Response time? Then propose solution (qualification AI, faster automation, better messaging) with expected ROI improvement (e.g., '20% conversion lift = 20 more customers')."
      },
      {
        question: "You built an automation that worked perfectly in testing but keeps failing in production. Walk us through your debugging process.",
        answer: "1) Check logs for error type. 2) Isolate: Is it API rate limit, malformed data, or timing? 3) Test each component separately. 4) Add error handlers and alerts. 5) Gradually increase volume. 6) Monitor and iterate."
      },
      {
        question: "What's your process for estimating how long a project will take?",
        answer: "Break into components: setup (APIs, accounts), integration (workflows), testing, documentation. Estimate each: simple setup = 1hr, complex integration = 8-16hrs. Add 20-30% buffer for unknowns. Communicate realistic timelines to clients."
      },
      {
        question: "A client says 'Can you also build them a website?' - but that's outside your expertise. How do you respond?",
        answer: "'Great question. My specialty is automating lead flow and business processes. For websites, I can integrate to Webflow/WordPress if you already have a designer, or I can recommend partners I trust. My focus is maximizing ROI of your lead system.'"
      }
    ],
    portfolioTalkingPoints: [
      "This system generated $X in revenue for my client (or X leads/month)",
      "It reduced their manual work from 20 hrs/week to 2 hrs/week",
      "Improved lead quality: X% conversion rate vs Y% baseline",
      "ROI: Built in 2 weeks, pays for itself in X months",
      "Handles 1000+ leads/month with zero downtime",
      "Multi-client capable: Serves X clients with isolated data"
    ],
    salaryExpectations: {
      freelance: "$50-150/hour or $5,000-25,000/project",
      contractor: "$80k-120k/year",
      fullTime: "$120k-200k/year for Senior Automation Architect",
      agencies: "$180k-250k/year with commission"
    }
  },

  realClientProblems: [
    {
      problem: "We get 100 leads/month but manually qualify each one - takes 20 hours/week",
      solution: "AI qualification system (Claude + n8n) auto-scores leads in <5 sec",
      outcome: "Saves 16 hrs/week, improves lead quality, faster response time",
      tools: ["Claude API", "n8n", "GoHighLevel"]
    },
    {
      problem: "Our form conversions dropped from 15% to 8% after we added 5 new fields",
      solution: "Reduce form friction: remove unnecessary fields, progressive disclosure",
      outcome: "Form conversions recover to 14%, same lead quality",
      tools: ["Conversion optimization", "Form design"]
    },
    {
      problem: "We're not sure which ad channel (Facebook, Google, LinkedIn) produces best leads",
      solution: "Track each lead source through full funnel, calculate cost-per-qualified-lead",
      outcome: "Cut ad spend by 40% by shifting budget to best channel",
      tools: ["n8n", "Airtable", "Analytics"]
    },
    {
      problem: "Our sales team gets 50 emails/day but can't prioritize which to follow up first",
      solution: "Auto-score leads by fit, flag hot leads in Slack, assign to sales rep",
      outcome: "Sales team closes 30% more deals, response time drops 60%",
      tools: ["n8n", "Slack", "CRM"]
    },
    {
      problem: "We run email campaigns but can't segment audience effectively",
      solution: "Build audience segments in Mailchimp based on behavior, auto-enroll sequences",
      outcome: "Email open rates up 25%, unsubscribe rate drops 15%",
      tools: ["Zapier", "Mailchimp", "Behavioral data"]
    },
    {
      problem: "We want to sell our product/service to multiple industries but each needs custom messaging",
      solution: "Multi-tenant system: same backend, customizable content per client/industry",
      outcome: "One platform, unlimited revenue streams",
      tools: ["Multi-tenant architecture", "Content templating"]
    }
  ],

  businessSkills: {
    pricing: {
      projectBased: [
        { scope: "Simple automation (1-2 integrations)", cost: "$2,000-5,000", timeline: "1-2 weeks" },
        { scope: "Lead qualification system", cost: "$5,000-15,000", timeline: "2-3 weeks" },
        { scope: "Complete lead gen platform (form→CRM→voice→dashboard)", cost: "$15,000-40,000", timeline: "4-6 weeks" },
        { scope: "Multi-client SaaS platform", cost: "$50,000+", timeline: "8-12 weeks" }
      ],
      recurring: [
        { service: "Monthly automation maintenance & optimization", cost: "$1,000-5,000/month" },
        { service: "Lead generation system management", cost: "$3,000-10,000/month" },
        { service: "Multi-channel marketing automation", cost: "$5,000-15,000/month" }
      ]
    },
    proposalTemplate: {
      sections: ["Executive Summary", "Current State (Their Problem)", "Proposed Solution", "Expected ROI", "Timeline & Deliverables", "Investment & Payment Terms", "Why You (Differentiators)"]
    },
    clientCommunication: [
      {
        scenario: "Client is concerned about ROI",
        response: "Show them: Current state (100 leads/month, 5% close rate = 5 deals). Proposed state (100 leads/month, 15% close rate via better qualification = 15 deals). Cost = $10k. Extra 10 deals × $5k profit = $50k. ROI = 400%. Payback = 2.4 months."
      },
      {
        scenario: "Client wants to add features mid-project",
        response: "'Great idea. Let's scope it: would add 2 weeks. Original cost $10k. This adds $4k. New timeline 4 weeks vs 2 weeks. Sound good?' (Manage scope creep via clear scoping & pricing)"
      },
      {
        scenario: "Client's business model changed, needs pivot",
        response: "'Perfect, happens all the time. Let's map new requirements. This impacts: [component A] (1 week rebuild) and [component B] (already handles it). New estimate $5k, 1 week turnaround.'"
      }
    ]
  },

  realClientProjects: [
    {
      name: "SaaS Lead Qualification for B2B",
      clientType: "B2B SaaS company, $2M revenue",
      problem: "50 MQLs/month, no qualification, sales team wastes time on low-quality leads",
      solution: "Built AI-powered lead scoring (Claude), auto-routed to sales in HubSpot, created dashboard",
      results: "30% more SQLs, 40% faster response, sales team 15 hrs/week freed up",
      tools: ["Claude", "n8n", "HubSpot", "React dashboard"],
      timeline: "3 weeks",
      cost: "$12,000"
    },
    {
      name: "E-commerce Form Optimization",
      clientType: "DTC e-commerce brand, $500k revenue",
      problem: "Checkout form had 12 fields, 8% conversion rate, can't segment customers",
      solution: "Reduced to 5 fields, progressive disclosure for extras, built segmentation rules",
      results: "Conversion rate jumped to 12%, segment quality improved for email campaigns",
      tools: ["Form design", "Zapier", "Mailchimp"],
      timeline: "1.5 weeks",
      cost: "$4,000"
    },
    {
      name: "Multi-Channel Ad Attribution",
      clientType: "Ad agency managing $2M/month ad spend",
      problem: "Can't tell which channel (FB, Google, LinkedIn, Organic) produces best ROI",
      solution: "Built UTM tracking system, automated lead source tracking through CRM, dashboard",
      results: "Identified that LinkedIn produces 3x better ROAS, reallocated budget, saved $300k/month",
      tools: ["n8n", "Airtable", "Google Analytics", "Looker Studio"],
      timeline: "2 weeks",
      cost: "$7,000"
    },
    {
      name: "Customer Support Automation",
      clientType: "SaaS customer support team, 5 agents",
      problem: "50 support tickets/day, average response time 4 hours, no routing logic",
      solution: "Built intelligent routing: urgent issues → senior agents, common questions → AI, auto-escalation",
      results: "Response time dropped to 30 min average, agent satisfaction improved, tickets resolved 3x faster",
      tools: ["n8n", "Intercom API", "Claude", "Slack"],
      timeline: "2.5 weeks",
      cost: "$8,500"
    }
  ],

  lessons: [
  {
  day: 1,
    week: 1,
      title: "APIs, JSON & Webhooks: The Language of Integration",
        focus: "Understanding how systems communicate with each other",
          status: "foundations",
            concepts: [
              { name: "What is an API?", explanation: "An API (Application Programming Interface) is a set of instructions that lets two programs talk to each other.", analogy: "Think of an API like a restaurant menu: You (client) want food → Restaurant (server) has food → Menu (API) is the agreed way to order." },
              {
                name: "REST API & HTTP Methods", explanation: "REST uses HTTP verbs (actions) to tell a server what to do", methods: [
                  { method: "GET", use: "Retrieve data" }, { method: "POST", use: "Create new data" },
                  { method: "PUT", use: "Update existing data" }, { method: "DELETE", use: "Remove data" }
                ]
              },
              { name: "JSON", explanation: "Universal data format for system communication" },
              { name: "Webhooks", explanation: "Automatic notifications between systems" }
            ],
              objectives: ["Understand APIs", "Read/write JSON", "Know webhooks", "System integration basics"],
                steps: [{ title: "Step 1", description: "JSON understanding" }, { title: "Step 2", description: "Validation" }],
                  resources: [
                    { title: "REST APIs Explained", url: "https://www.freecodecamp.org/news/rest-api-tutorial-for-beginners/" },
                    { title: "MDN HTTP Methods", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" },
                    { title: "JSONLint Validator", url: "https://jsonlint.com/" },
                    { title: "Postman API Client", url: "https://www.postman.com/" },
                    { title: "Insomnia API Testing", url: "https://insomnia.rest/" }
                  ],
                    checklist: ["Understand APIs", "Know HTTP methods", "Write JSON", "Validate JSON"],
                      exercises: [
                        {
                          title: "Exercise 1: Write Valid JSON",
                          description: "Create a JSON object representing a lead with: firstName, lastName, email, company, budget",
                          platform: "JSONLint (https://jsonlint.com/)",
                          steps: [
                            "Go to jsonlint.com",
                            "Create JSON with all 5 fields",
                            "Click Validate - it should show green (valid)",
                            "Take a screenshot"
                          ],
                          expected: "Valid JSON with no errors"
                        },
                        {
                          title: "Exercise 2: Test an API with Postman",
                          description: "Make a real API call to a public test API using Postman",
                          platform: "Postman (https://www.postman.com/)",
                          steps: [
                            "Download Postman",
                            "Create a GET request to: https://jsonplaceholder.typicode.com/posts/1",
                            "Click Send",
                            "View the JSON response",
                            "Try changing the ID (1 to 2, 3, etc.)"
                          ],
                          expected: "JSON response showing post data"
                        },
                        {
                          title: "Exercise 3: Understand HTTP Methods",
                          description: "Practice different HTTP methods with JSONPlaceholder API",
                          platform: "Postman or Insomnia",
                          steps: [
                            "POST: Create data at https://jsonplaceholder.typicode.com/posts with {title: 'Test', body: 'Testing'}",
                            "GET: Retrieve data at https://jsonplaceholder.typicode.com/posts",
                            "PUT: Update data at https://jsonplaceholder.typicode.com/posts/1 with {title: 'Updated'}",
                            "Notice how different methods do different things",
                            "Document what each method did"
                          ],
                          expected: "Understand GET=read, POST=create, PUT=update"
                        }
                      ],
                        activities: [
                          {
                            title: "Activity 1: Analyze an API Response",
                            description: "Break down a real API response to understand structure",
                            task: "Call https://jsonplaceholder.typicode.com/users/1 and identify: arrays, objects, strings, numbers",
                            tools: "Postman, JSONLint",
                            time: "20 min"
                          },
                          {
                            title: "Activity 2: Design Your Own JSON",
                            description: "Create JSON for your lead qualification system",
                            task: "Design JSON structure for: lead name, email, company, budget, timeline, qualification_score",
                            tools: "JSONLint, text editor",
                            time: "30 min"
                          },
                          {
                            title: "Activity 3: Debug Broken JSON",
                            description: "Fix JSON syntax errors",
                            task: "Paste invalid JSON (missing quotes, commas) into JSONLint and fix it",
                            tools: "JSONLint",
                            time: "15 min"
                          }
                        ],
                          assignment: {
    title: "Day 1 Assignment: Build a Complete API Request",
      description: "Combine everything learned: Create, send, and validate an API request",
        tasks: [
          {
            step: 1,
            title: "Design JSON for a lead",
            description: "Create complete JSON: name, email, company, budget, timeline, message",
            deliverable: "Valid JSON in JSONLint"
          },
          {
            step: 2,
            title: "Send POST request with Postman",
            description: "POST your JSON to https://jsonplaceholder.typicode.com/posts",
            deliverable: "Screenshot of Postman with response"
          },
          {
            step: 3,
            title: "Understand the webhook concept",
            description: "Write 2-3 sentences: How would a webhook send this data automatically?",
            deliverable: "Written explanation"
          },
          {
            step: 4,
            title: "Document your learnings",
            description: "Screenshot: JSONLint validation + Postman request + Your explanation",
            deliverable: "3 items saved"
          }
        ],
          grading: {
      "Valid JSON created": 25,
        "API request sent successfully": 25,
          "Response received and understood": 25,
            "Webhook concept explained": 25
    },
    submissionFormat: "Screenshots or document with all 4 deliverables"
  }
},
{
  day: 2,
    week: 1,
      title: "Prompt Engineering: Making AI Do What You Want",
        focus: "Master LLMs to generate high-quality, structured outputs",
          status: "foundations",
            concepts: [
              { name: "Why Prompt Engineering", explanation: "AI is powerful but unpredictable. Good prompts = reliable automation." },
              { name: "Good vs Bad Prompts", explanation: "Specific criteria vs vague questions" },
              { name: "JSON Output", explanation: "Forcing AI to return structured JSON for automation" }
            ],
              objectives: ["Write clear prompts", "Extract JSON from AI", "Test consistency"],
                steps: [{ title: "Build Qualification Prompt", description: "Test on ChatGPT" }],
                  resources: [
                    { title: "OpenAI Guide", url: "https://platform.openai.com/docs/guides/prompt-engineering" },
                    { title: "Claude Prompting", url: "https://docs.anthropic.com/claude/docs/prompt-engineering" },
                    { title: "ChatGPT", url: "https://chat.openai.com/" },
                    { title: "Claude", url: "https://claude.ai/" }
                  ],
                    checklist: ["Write prompts", "Test on ChatGPT", "Extract JSON"],
                      exercises: [
                        {
                          title: "Exercise 1: Good vs Bad Prompts",
                          description: "Compare how AI responds to vague vs specific prompts",
                          platform: "ChatGPT or Claude",
                          steps: [
                            "Bad prompt: 'Qualify this lead'",
                            "Good prompt: 'Is this lead qualified? Criteria: Budget > $50k, Timeline < 90 days, Company size > 10 people. Score 0-100 and respond in JSON'",
                            "Compare results",
                            "Notice: Bad prompt = confusing, Good prompt = clear answer"
                          ],
                          expected: "Understand importance of specificity"
                        },
                        {
                          title: "Exercise 2: Extract JSON from AI",
                          description: "Get AI to output structured data as JSON",
                          platform: "ChatGPT or Claude",
                          steps: [
                            "Ask: 'Analyze this lead: John from ACME, $75k budget, wants to move in 30 days. Output ONLY valid JSON with: is_qualified (true/false), score (0-100), reasoning'",
                            "Copy the JSON response",
                            "Validate it at jsonlint.com",
                            "Fix any JSON errors"
                          ],
                          expected: "Valid JSON output from AI"
                        },
                        {
                          title: "Exercise 3: Test Prompt Consistency",
                          description: "Send same prompt multiple times to check reliability",
                          platform: "ChatGPT or Claude",
                          steps: [
                            "Use your qualification prompt from Exercise 2",
                            "Send it 3 different times with same lead data",
                            "Compare responses - are scores consistent?",
                            "Refine prompt if inconsistent"
                          ],
                          expected: "Consistent scores across attempts"
                        }
                      ],
                        activities: [
                          {
                            title: "Activity 1: Write Your Qualification Prompt",
                            description: "Create production-ready lead qualification prompt",
                            task: "Write prompt that: lists criteria, asks for scoring, requests JSON format, includes example",
                            tools: "Text editor, ChatGPT",
                            time: "45 min"
                          },
                          {
                            title: "Activity 2: Test with Real Leads",
                            description: "Qualify 5 different lead scenarios",
                            task: "Use your prompt on: high-quality lead, low-quality lead, edge cases, and note variations",
                            tools: "ChatGPT",
                            time: "45 min"
                          },
                          {
                            title: "Activity 3: Compare ChatGPT vs Claude",
                            description: "Test same prompt on both AI models",
                            task: "Send your prompt to both ChatGPT and Claude, compare: speed, accuracy, JSON quality",
                            tools: "ChatGPT and Claude",
                            time: "30 min"
                          }
                        ],
                          assignment: {
    title: "Day 2 Assignment: Build Production-Ready Qualification Prompt",
      description: "Create and test a prompt you'll use in automation",
        tasks: [
          {
            step: 1,
            title: "Write qualification prompt",
            description: "Include: role, criteria, scoring rules, JSON format, example output",
            deliverable: "Prompt text saved"
          },
          {
            step: 2,
            title: "Test on 3 leads",
            description: "Test prompt with: qualified lead, unqualified lead, edge case",
            deliverable: "Screenshots of 3 responses"
          },
          {
            step: 3,
            title: "Validate JSON outputs",
            description: "Paste each response into jsonlint.com",
            deliverable: "All 3 validate as correct JSON"
          },
          {
            step: 4,
            title: "Document what works",
            description: "Write: What made prompt effective? What would you change?",
            deliverable: "Written reflection (100+ words)"
          }
        ],
          grading: {
      "Prompt includes all components": 25,
        "All 3 test cases work": 25,
          "JSON outputs valid": 25,
            "Reflection shows understanding": 25
    },
    submissionFormat: "Document with prompt, screenshots, validation, and reflection"
  },
  portfolioTip: "Save this prompt! This is your first portfolio asset. When pitching to clients: 'I built this AI qualification system that scores leads in seconds with 95% consistency. Here's the prompt and results.' Real clients doing lead qualification will immediately see ROI.",
    clientApplication: {
    problem: "B2B SaaS client gets 50 leads/month but sales team manually qualifies each one (5-10 min per lead = 4-8 hrs/week)",
      yourSolution: "Use your prompt in n8n + Claude to auto-score all leads in <5 seconds each. Sales only reviews qualified leads.",
        roi: "Saves 3-6 hrs/week × $50/hr = $150-300/week = $7,800-15,600/year saved. You charge $5k for the system. Payback: 3-5 weeks.",
          pitch: "'I'll build you an AI lead scorer that qualifies your leads automatically. Same scoring you'd do manually, but instantly. 100% adoption - your team will love it because they only see qualified leads.'"
  }
},
{
  day: 3,
    week: 1,
      title: "n8n Fundamentals: Building Your First Automation",
        focus: "Understand automation workflows and how n8n connects everything",
          status: "foundations",
            concepts: [
              { name: "What is n8n?", explanation: "Visual tool for connecting apps without coding", analogy: "Like LEGO for automation" },
              { name: "Nodes", explanation: "Building blocks - Trigger, Action, Logic, Transform" },
              { name: "Workflows", explanation: "Connected nodes that execute in sequence" },
              { name: "Alternative Platforms", explanation: "Zapier, Make (formerly Integromat) are similar. n8n is self-hosted & cheaper for high volume. Use when: CMS workflow (WordPress), Email sequences (Mailchimp), Analytics (Google Analytics), Lead management (HubSpot, ActiveCampaign)." },
              { name: "Real-world Automation Examples", explanation: "Website form → email → SMS → CRM. Content publication → social media → newsletter. Lead enrichment → competitor analysis → lead scoring." }
            ],
              objectives: ["Understand nodes", "Set up n8n", "Build first workflow"],
                steps: [{ title: "Create Account", description: "Go to n8n.cloud" }, { title: "Build Workflow", description: "Add webhook + Set node" }],
                  resources: [
                    { title: "n8n Docs", url: "https://docs.n8n.io/" },
                    { title: "n8n Tutorial", url: "https://www.youtube.com/watch?v=hy7DQXt_KVw" },
                    { title: "n8n Community", url: "https://community.n8n.io/" }
                  ],
                    checklist: ["Account created", "First workflow", "Webhook tested"],
                      exercises: [
                        {
                          title: "Exercise 1: Build Echo Workflow",
                          description: "Create simplest workflow: receive data and return it",
                          platform: "n8n (https://n8n.cloud/)",
                          steps: [
                            "Create new workflow",
                            "Add Webhook trigger (POST)",
                            "Add Respond to Webhook node",
                            "Configure response body: use incoming data",
                            "Activate workflow",
                            "Test with curl or Postman by POSTing JSON to webhook URL",
                            "See data echoed back"
                          ],
                          expected: "Data sent to webhook is echoed back"
                        },
                        {
                          title: "Exercise 2: Add Conditional Logic",
                          description: "Route workflow based on data values",
                          platform: "n8n",
                          steps: [
                            "Start with Echo workflow from Exercise 1",
                            "Add 'IF' node after webhook",
                            "Condition: if budget > 50000",
                            "Yes path: respond 'Hot lead'",
                            "No path: respond 'Cold lead'",
                            "Activate and test with different budgets"
                          ],
                          expected: "Different responses based on budget amount"
                        },
                        {
                          title: "Exercise 3: Chain Multiple Nodes",
                          description: "Transform data through multiple nodes",
                          platform: "n8n",
                          steps: [
                            "Webhook → Set node → Change data (add qualification_score field)",
                            "Set node → Another Set node → Add timestamp",
                            "Final node → Respond to Webhook with transformed data",
                            "Test and verify all transformations applied"
                          ],
                          expected: "Data transformed through multiple nodes"
                        }
                      ],
                        activities: [
                          {
                            title: "Activity 1: Explore n8n Interface",
                            description: "Get familiar with n8n UI and features",
                            task: "Create account, explore sidebar, try dragging nodes, check execution history",
                            tools: "n8n",
                            time: "30 min"
                          },
                          {
                            title: "Activity 2: Test Different Node Types",
                            description: "Experiment with Trigger, Action, Logic nodes",
                            task: "Build workflow using: Webhook trigger + Set node + Conditional + Response",
                            tools: "n8n",
                            time: "45 min"
                          },
                          {
                            title: "Activity 3: Understand Webhook Trigger",
                            description: "Learn how webhooks work in n8n",
                            task: "Create webhook, get URL, send data with Postman, see it trigger workflow",
                            tools: "n8n, Postman",
                            time: "30 min"
                          }
                        ],
                          assignment: {
    title: "Day 3 Assignment: Build Complete n8n Workflow",
      description: "Create a workflow that: receives lead data, qualifies it, and logs it",
        tasks: [
          {
            step: 1,
            title: "Build multi-step workflow",
            description: "Webhook → Set node → IF node → Two Response nodes",
            deliverable: "Activated workflow screenshot"
          },
          {
            step: 2,
            title: "Test with different data",
            description: "Send 3 test leads: qualified, unqualified, edge case",
            deliverable: "Screenshots of 3 test results"
          },
          {
            step: 3,
            title: "Check execution history",
            description: "Verify all executions logged and successful",
            deliverable: "Screenshot showing execution history"
          },
          {
            step: 4,
            title: "Document workflow logic",
            description: "Write: What does each node do? How would you add more logic?",
            deliverable: "Written explanation"
          }
        ],
          grading: {
      "Workflow built and activated": 25,
        "All 3 test cases work correctly": 25,
          "Execution history shows success": 25,
            "Logic explained clearly": 25
    },
    submissionFormat: "Screenshots and written documentation of workflow"
  },
  portfolioTip: "Screenshot this workflow! In interviews/pitches: 'I built n8n workflows that handle 1000+ leads/month with 99.9% reliability. Here's one that qualifies and routes leads - I can replicate this for any client automation need.' Workflows are proof you can build scalable systems.",
    clientApplication: {
    problem: "Agency wants to automate lead routing but their team is non-technical",
      yourSolution: "Build visual n8n workflows they can understand and modify. No coding needed.",
        roi: "Saves 2 hrs/day on manual routing = 10 hrs/week = $500/week = $26k/year. You charge $8k. Payback: 2-3 weeks.",
          pitch: "'I'll build your lead workflow in n8n - visual, intuitive, your team can see exactly how it works. You own it, no ongoing dependency on me.'"
  }
},
// WEEK 2: INTEGRATION
{
  day: 4,
    week: 1,
      title: "GoHighLevel (GHL) CRM Fundamentals",
        focus: "Master CRM architecture, pipelines, custom fields, and lead capture",
          status: "integration",
            concepts: [
              { name: "What is a CRM?", explanation: "Database for prospects + auto follow-ups", analogy: "Digital filing cabinet that's smart" },
              { name: "Pipelines", explanation: "Visual workflow: New Lead → Qualified → Contacted → Demo → Proposal → Won/Lost" },
              { name: "Custom Fields", explanation: "Track: Budget, Industry, Timeline, Company Size" },
              { name: "Lead Generation Funnels", explanation: "The journey: Awareness (SEO/Ads) → Interest (Landing page) → Consideration (Email) → Decision (Call/Demo) → Action (Close)" },
              { name: "Qualification Framework", explanation: "BANT: Budget (can they afford?), Authority (right decision maker?), Need (do they need it?), Timeline (when do they decide?)" }
            ],
              objectives: ["Set up GHL", "Build pipeline", "Create custom fields", "Build lead form"],
                steps: [
                  { title: "Create Account", description: "Go to gohighlevel.com" },
                  { title: "Build Pipeline", description: "Create stages" },
                  { title: "Add Fields", description: "Budget, Company Size, Timeline" },
                  { title: "Create Form", description: "Auto-create contacts" }
                ],
                  resources: [
                    { title: "GHL Guide", url: "https://www.gohighlevel.com/help" },
                    { title: "GHL Tutorial", url: "https://www.youtube.com/watch?v=PtF0Vz9Ev2A" },
                    { title: "GHL API Docs", url: "https://docs.gohighlevel.com/api-overview/" }
                  ],
                    checklist: ["GHL account", "Pipeline setup", "Custom fields", "Form working"],
                      exercises: [
                        {
                          title: "Exercise 1: Build Pipeline",
                          description: "Create 7-stage sales pipeline",
                          platform: "GoHighLevel (https://www.gohighlevel.com)",
                          steps: [
                            "Log in to GHL",
                            "Create new pipeline: 'AI Lead Generation'",
                            "Add stages: New Lead, Qualified, Contacted, Demo Booked, Proposal, Won, Lost",
                            "Order them logically",
                            "Save pipeline",
                            "Take screenshot"
                          ],
                          expected: "Pipeline with 7 stages visible"
                        },
                        {
                          title: "Exercise 2: Create Custom Fields",
                          description: "Add fields to track important lead data",
                          platform: "GHL",
                          steps: [
                            "Go to Custom Fields section",
                            "Create: Budget (number), Company Size (dropdown), Timeline (dropdown), Score (number)",
                            "For each, set: name, type, required (yes/no), options if dropdown",
                            "Save all fields",
                            "Screenshot showing all 4 fields created"
                          ],
                          expected: "4 custom fields available for contacts"
                        },
                        {
                          title: "Exercise 3: Create Lead Capture Form",
                          description: "Build form to auto-create contacts",
                          platform: "GHL",
                          steps: [
                            "Create new form",
                            "Add fields: firstName, lastName, email, company, budget, timeline, message",
                            "Configure: Auto-create contact in 'New Lead' stage",
                            "Publish form",
                            "Test: Submit test data and verify contact created",
                            "Check custom fields populated"
                          ],
                          expected: "Form creates contacts automatically"
                        }
                      ],
                        activities: [
                          {
                            title: "Activity 1: Manually Create Test Contact",
                            description: "Get familiar with creating and managing contacts",
                            task: "Create contact manually with all fields, edit it, move it between stages",
                            tools: "GHL",
                            time: "30 min"
                          },
                          {
                            title: "Activity 2: Set Up Automation",
                            description: "Create automated email response",
                            task: "When contact enters 'Qualified' stage → Send email",
                            tools: "GHL",
                            time: "30 min"
                          },
                          {
                            title: "Activity 3: Explore Pipeline Analytics",
                            description: "See how to track conversion rates",
                            task: "Create 5 test contacts at different stages, check conversion metrics",
                            tools: "GHL",
                            time: "30 min"
                          }
                        ],
                          assignment: {
    title: "Day 4 Assignment: Complete GHL Setup",
      description: "Build working CRM ready for leads",
        tasks: [
          {
            step: 1,
            title: "Pipeline created",
            description: "7-stage pipeline with proper names and order",
            deliverable: "Screenshot of pipeline"
          },
          {
            step: 2,
            title: "Custom fields added",
            description: "All 5 key custom fields created and configured",
            deliverable: "Screenshot of custom fields list"
          },
          {
            step: 3,
            title: "Form tested",
            description: "Submit form and verify contact created with all data",
            deliverable: "Screenshot of created contact with all fields"
          },
          {
            step: 4,
            title: "Document your setup",
            description: "Write: What each stage means, why each field matters",
            deliverable: "Written CRM documentation"
          }
        ],
          grading: {
      "Pipeline properly configured": 25,
        "Custom fields complete": 25,
          "Form working and auto-creates": 25,
            "Documentation clear and complete": 25
    },
    submissionFormat: "Screenshots of pipeline, fields, contact, plus documentation"
  },
  portfolioTip: "GHL is the #1 CRM for agencies and service businesses. Save your CRM design! In pitches: 'I've built custom CRM setups for 20+ clients. I understand lead stages, qualification criteria, follow-up workflows. I can build the perfect CRM architecture for your business model.' CRM expertise = $$$.",
    clientApplication: {
    problem: "Small agency managing 200+ leads/month in disorganized spreadsheets, losing deals, missed follow-ups",
      yourSolution: "Implement GHL with: proper pipeline stages, smart custom fields, auto-assign rules, email follow-ups",
        roi: "Reduces missed leads by 80%, improves follow-up speed from 3 days to 2 hours, team saves 5 hrs/week. 15% revenue increase from better organization. Client charges: $100/month = $12k/year value.",
          pitch: "'I'll organize your leads into a world-class CRM system with the right stages and automations. Your team will know exactly who to follow up with and when. You'll close more deals without hiring more people.'"
  }
},
{
  day: 5,
    week: 1,
      title: "Connecting AI to Automation: Claude + n8n",
        focus: "Integrate LLMs with automation for intelligent lead qualification",
          status: "integration",
            concepts: [
              { name: "AI Integration", explanation: "n8n webhook → Claude → qualification → GHL update" },
              { name: "Error Handling", explanation: "Catch failures and alert you" },
              { name: "AI for Content Generation", explanation: "Use Claude/ChatGPT to: write email sequences, generate blog post outlines, create ad copy, analyze competitor content. Integrate with Mailchimp, WordPress for automated publishing." },
              { name: "Competitive Intelligence Automation", explanation: "Use Claude to analyze competitor: websites, email campaigns, landing pages. Extract: messaging, positioning, pricing, unique selling points. Feed this into your lead qualification and sales narratives." },
              { name: "Multiple AI Models", explanation: "Claude, ChatGPT, Gemini, Higgsfield AI each excel at different tasks. Route: content generation → Claude, coding → ChatGPT, quick analysis → Gemini. Use in workflows based on task." }
            ],
              objectives: ["Set up Claude API", "Create n8n AI workflow", "Update GHL automatically"],
                steps: [
                  { title: "Get Claude Keys", description: "anthropic.com" },
                  { title: "HTTP Node", description: "Configure API call" },
                  { title: "Test Data", description: "Verify responses" },
                  { title: "GHL Update", description: "Contact updates" }
                ],
                  resources: [
                    { title: "Claude API", url: "https://docs.anthropic.com/claude/docs/intro" },
                    { title: "n8n HTTP Node", url: "https://docs.n8n.io/nodes/n8n-nodes-base.http/" }
                  ],
                    checklist: ["API keys", "Workflow created", "Tests pass", "GHL updates"],
                      exercises: [
                        {
                          title: "Exercise 1: Get Claude API Key",
                          description: "Set up authentication for Claude",
                          platform: "Claude Console (https://console.anthropic.com)",
                          steps: [
                            "Create account",
                            "Go to API Keys",
                            "Generate new key",
                            "Save securely (password manager)",
                            "Note: Never share this key"
                          ],
                          expected: "Active API key saved"
                        },
                        {
                          title: "Exercise 2: Create HTTP Request Node",
                          description: "Configure n8n to call Claude API",
                          platform: "n8n",
                          steps: [
                            "Create new workflow",
                            "Add HTTP Request node",
                            "Set: POST to https://api.anthropic.com/v1/messages",
                            "Configure headers: x-api-key, content-type",
                            "Add body with qualification prompt",
                            "Test and see Claude response"
                          ],
                          expected: "Claude responds with lead qualification"
                        },
                        {
                          title: "Exercise 3: Parse & Route Response",
                          description: "Extract qualification score and route accordingly",
                          platform: "n8n",
                          steps: [
                            "After HTTP node, add Set node to extract score",
                            "Add IF node: if score > 70 → route to 'Qualified' stage",
                            "Add GHL node: Create/Update contact",
                            "Test end-to-end: webhook → Claude → GHL"
                          ],
                          expected: "Leads automatically qualified and added to GHL"
                        }
                      ],
                        activities: [
                          {
                            title: "Activity 1: Test Qualification Prompt",
                            description: "Verify prompt consistency with real leads",
                            task: "Call Claude 5 times with same lead, check score variation",
                            tools: "Claude",
                            time: "30 min"
                          },
                          {
                            title: "Activity 2: Map n8n Workflow",
                            description: "Document complete integration flow",
                            task: "Draw/document: Webhook → Extract → Claude → Parse → Route → GHL",
                            tools: "n8n, text editor",
                            time: "40 min"
                          },
                          {
                            title: "Activity 3: Error Testing",
                            description: "Test what happens when Claude fails",
                            task: "Test with invalid API key, malformed prompt, network issues",
                            tools: "n8n",
                            time: "30 min"
                          }
                        ],
                          assignment: {
    title: "Day 5 Assignment: AI-Powered Qualification Workflow",
      description: "Build complete workflow: Lead → AI Qualifies → GHL Updates",
        tasks: [
          {
            step: 1,
            title: "API authenticated",
            description: "Claude API key working in n8n",
            deliverable: "Screenshot of successful API call"
          },
          {
            step: 2,
            title: "Qualification workflow built",
            description: "HTTP → Extract → Route → GHL nodes connected",
            deliverable: "Screenshot of workflow diagram"
          },
          {
            step: 3,
            title: "Test with 3 leads",
            description: "Qualified, unqualified, edge case → verify GHL updates",
            deliverable: "Screenshots of all 3 test results in GHL"
          },
          {
            step: 4,
            title: "Document integration",
            description: "How does AI qualify? What are the stages? Error handling?",
            deliverable: "Written technical documentation"
          }
        ],
          grading: {
      "Claude API integrated": 25,
        "Workflow logic correct": 25,
          "All 3 tests successful": 25,
            "Documentation complete": 25
    },
    submissionFormat: "Workflow screenshots, GHL results, documentation"
  }
},
{
  day: 6,
    week: 1,
      title: "Voice AI Setup: Vapi Integration",
        focus: "Deploy AI-driven voice agents for inbound calls",
          status: "integration",
            concepts: [
              { name: "Voice AI", explanation: "AI answers calls, collects info automatically" },
              { name: "Integration", explanation: "Call → Voice AI → Collect → Webhook → n8n → GHL" }
            ],
              objectives: ["Set up Vapi", "Configure phone", "Test call"],
                steps: [
                  { title: "Create Account", description: "vapi.ai" },
                  { title: "Get Number", description: "Buy Vapi phone" },
                  { title: "Script", description: "Write greeting" },
                  { title: "Test", description: "Call your number" }
                ],
                  resources: [
                    { title: "Vapi Docs", url: "https://docs.vapi.ai" },
                    { title: "Vapi Tutorial", url: "https://www.youtube.com/watch?v=Vs6xyVJzFwE" }
                  ],
                    checklist: ["Account", "Phone working", "Script ready"],
                      exercises: [
                        {
                          title: "Exercise 1: Create Vapi Voice Bot",
                          description: "Set up basic voice assistant",
                          platform: "Vapi (https://vapi.ai)",
                          steps: [
                            "Create account",
                            "Create Assistant",
                            "Write system prompt",
                            "Choose voice",
                            "Set first message",
                            "Save"
                          ],
                          expected: "Voice bot configured and ready"
                        },
                        {
                          title: "Exercise 2: Get Phone Number",
                          description: "Allocate real phone number for calls",
                          platform: "Vapi",
                          steps: [
                            "Click Phone Numbers",
                            "Get new number",
                            "Choose area code",
                            "Connect to Assistant",
                            "Note your phone number"
                          ],
                          expected: "Real phone number that people can call"
                        },
                        {
                          title: "Exercise 3: Test Live Call",
                          description: "Call your bot and verify it works",
                          platform: "Your phone + Vapi",
                          steps: [
                            "Dial your Vapi phone number",
                            "Listen to greeting",
                            "Have conversation with bot",
                            "Bot asks questions: name, company, budget, timeline",
                            "Verify bot responds sensibly"
                          ],
                          expected: "Bot answers and has conversation"
                        }
                      ],
                        activities: [
                          {
                            title: "Activity 1: Design Bot Script",
                            description: "Write conversation flow",
                            task: "Create script: greeting → questions → confirmation",
                            tools: "Text editor",
                            time: "30 min"
                          },
                          {
                            title: "Activity 2: Multiple Test Calls",
                            description: "Test different scenarios",
                            task: "Call as: interested prospect, skeptical person, rushed person",
                            tools: "Your phone + Vapi",
                            time: "30 min"
                          },
                          {
                            title: "Activity 3: Connect Webhook",
                            description: "Prepare to log call data",
                            task: "Create n8n webhook, set Vapi to send call transcripts to it",
                            tools: "n8n, Vapi",
                            time: "40 min"
                          }
                        ],
                          assignment: {
    title: "Day 6 Assignment: Voice Bot Fully Operational",
      description: "Build and test AI phone answering system",
        tasks: [
          {
            step: 1,
            title: "Bot created and configured",
            description: "System prompt written, voice chosen, greeting set",
            deliverable: "Screenshot of bot configuration"
          },
          {
            step: 2,
            title: "Phone number active",
            description: "Real phone number assigned and working",
            deliverable: "Screenshot showing active phone number"
          },
          {
            step: 3,
            title: "Live call test",
            description: "3 test calls with different scenarios",
            deliverable: "Screenshots or recordings of call results"
          },
          {
            step: 4,
            title: "Document voice strategy",
            description: "What questions does bot ask? How does it qualify?",
            deliverable: "Written bot strategy and script"
          }
        ],
          grading: {
      "Bot properly configured": 25,
        "Phone number working": 25,
          "Calls handled well": 25,
            "Strategy documented": 25
    },
    submissionFormat: "Configuration screenshots, call test results, documentation"
  }
},
{
  day: 7,
    week: 1,
      title: "Frontend Forms: Building Lead Capture Pages",
        focus: "Create HTML/CSS forms that feed into automation",
          status: "integration",
            concepts: [
              { name: "Form to Webhook", explanation: "Form → POST to n8n → Process → GHL" },
              { name: "Validation", explanation: "Check fields before submit" },
              { name: "Conversion Optimization", explanation: "Reduce friction: fewer fields = higher conversions. Progressive disclosure: ask for more info later." },
              { name: "Landing Page Psychology", explanation: "Clear headline, benefit-driven copy, single CTA button, social proof, trust signals. Use tools: Canva for design inspiration, CapCut for video backgrounds." }
            ],
              objectives: ["Build form", "Connect webhook", "Test end-to-end"],
                steps: [
                  { title: "HTML Form", description: "Name, email, company, budget" },
                  { title: "CSS", description: "Professional styling" },
                  { title: "JavaScript", description: "Validation" },
                  { title: "Webhook", description: "Connect to n8n" }
                ],
                  resources: [
                    { title: "HTML Forms", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form" },
                    { title: "Form Validation", url: "https://www.freecodecamp.org/news/form-validation-tutorial/" },
                    { title: "JSFiddle", url: "https://jsfiddle.net/" }
                  ],
                    checklist: ["Form built", "Styled", "Validation works", "Webhook connected"],
                      exercises: [
                        {
                          title: "Exercise 1: Build Basic HTML Form",
                          description: "Create form structure with all needed fields",
                          platform: "JSFiddle or text editor",
                          steps: [
                            "Create form with: firstName, lastName, email, company, budget (dropdown), timeline, message",
                            "Add submit button",
                            "Test in browser",
                            "Make sure all fields appear"
                          ],
                          expected: "Form displays with all fields"
                        },
                        {
                          title: "Exercise 2: Style with CSS",
                          description: "Make form look professional",
                          platform: "JSFiddle or text editor",
                          steps: [
                            "Add gradient background",
                            "Style inputs: borders, padding, colors",
                            "Add hover effects",
                            "Make button prominent",
                            "Test on mobile (responsive)"
                          ],
                          expected: "Professional-looking form"
                        },
                        {
                          title: "Exercise 3: Add JavaScript Validation",
                          description: "Validate before submission",
                          platform: "JSFiddle or text editor",
                          steps: [
                            "Require: firstName, lastName, email, company",
                            "Validate email format",
                            "Show error messages if invalid",
                            "Prevent submit if errors",
                            "Test with bad data"
                          ],
                          expected: "Form validates correctly"
                        }
                      ],
                        activities: [
                          {
                            title: "Activity 1: Connect Webhook",
                            description: "Make form submit to n8n",
                            task: "Get n8n webhook URL, add to form JavaScript fetch() call",
                            tools: "n8n, text editor",
                            time: "30 min"
                          },
                          {
                            title: "Activity 2: End-to-End Test",
                            description: "Fill form, verify it flows through entire system",
                            task: "Submit form → check n8n execution → verify contact in GHL",
                            tools: "Form, n8n, GHL",
                            time: "40 min"
                          },
                          {
                            title: "Activity 3: Optimize Styling",
                            description: "Improve UX/design",
                            task: "Add success message, loading spinner, better error display",
                            tools: "Text editor, CSS",
                            time: "40 min"
                          }
                        ],
                          assignment: {
    title: "Day 7 Assignment: Production-Ready Lead Form",
      description: "Build and integrate complete form system",
        tasks: [
          {
            step: 1,
            title: "Form built and styled",
            description: "All fields present, professional appearance, mobile responsive",
            deliverable: "Screenshot of form"
          },
          {
            step: 2,
            title: "Validation working",
            description: "Required fields, email validation, error messages",
            deliverable: "Screenshots of validation errors"
          },
          {
            step: 3,
            title: "End-to-end test",
            description: "Submit form → n8n processes → contact in GHL",
            deliverable: "Screenshots showing full flow: form submission, n8n execution, GHL contact"
          },
          {
            step: 4,
            title: "Code documented",
            description: "Explain: HTML structure, CSS styling, JavaScript logic, webhook connection",
            deliverable: "Code comments and written documentation"
          }
        ],
          grading: {
      "Form complete and styled": 25,
        "Validation robust": 25,
          "End-to-end integration works": 25,
            "Code well documented": 25
    },
    submissionFormat: "Form file, screenshots of form/validation/integration, documentation"
  }
},
{
  day: 8,
    week: 2,
      title: "Airtable Database Integration",
        focus: "Set up database layer for data storage",
          status: "integration",
            concepts: [
              { name: "Why Airtable?", explanation: "Easier than databases, more powerful than spreadsheets" },
              { name: "n8n Connection", explanation: "n8n reads/writes to Airtable for data layer" }
            ],
              objectives: ["Create base", "Design schema", "Connect n8n"],
                steps: [
                  { title: "Create Account", description: "airtable.com" },
                  { title: "Design Schema", description: "Fields for leads" },
                  { title: "Connect n8n", description: "Read/write nodes" }
                ],
                  resources: [
                    { title: "Airtable", url: "https://support.airtable.com/hc/en-us" },
                    { title: "n8n Airtable", url: "https://docs.n8n.io/nodes/n8n-nodes-base.airtable/" }
                  ],
                    checklist: ["Base created", "Schema designed", "n8n connected"],
                      exercises: [
                        {
                          title: "Exercise 1: Create Airtable Base",
                          description: "Set up database structure",
                          platform: "Airtable (https://airtable.com)",
                          steps: [
                            "Create account",
                            "Create new base: 'Lead Database'",
                            "Create table: 'Leads'",
                            "Add fields: id, name, email, company, budget, timeline, score, created_date",
                            "Save"
                          ],
                          expected: "Airtable base with Leads table"
                        },
                        {
                          title: "Exercise 2: Connect to n8n",
                          description: "Make n8n read/write to Airtable",
                          platform: "n8n + Airtable",
                          steps: [
                            "In n8n, add Airtable node",
                            "Authenticate with Airtable API key",
                            "Select your base and table",
                            "Test: Create a record from n8n",
                            "Verify it appears in Airtable"
                          ],
                          expected: "n8n successfully writes to Airtable"
                        },
                        {
                          title: "Exercise 3: Log All Leads",
                          description: "Add Airtable to your workflow",
                          platform: "n8n",
                          steps: [
                            "Update your Day 7 form workflow",
                            "After GHL creates contact, add Airtable node",
                            "Airtable: Create lead record with all data",
                            "Test: Submit form, verify in both GHL and Airtable"
                          ],
                          expected: "All leads logged to Airtable"
                        }
                      ],
                        activities: [
                          {
                            title: "Activity 1: Database Design",
                            description: "Plan your data structure",
                            task: "Document: What fields? Which are required? Data types? Relationships?",
                            tools: "Text editor, Airtable",
                            time: "30 min"
                          },
                          {
                            title: "Activity 2: Test Data Load",
                            description: "Load 10 test leads",
                            task: "Create 10 leads in n8n workflow, verify all in Airtable",
                            tools: "n8n, Airtable",
                            time: "30 min"
                          },
                          {
                            title: "Activity 3: Create Views",
                            description: "Build useful data views",
                            task: "Create Airtable views: by status, by score, by date",
                            tools: "Airtable",
                            time: "30 min"
                          }
                        ],
                          assignment: {
    title: "Day 8 Assignment: Data Persistence Layer",
      description: "Build database to store all leads long-term",
        tasks: [
          {
            step: 1,
            title: "Airtable structure designed",
            description: "Base created with proper fields and relationships",
            deliverable: "Screenshot of Airtable base"
          },
          {
            step: 2,
            title: "n8n integration complete",
            description: "Workflow writes all leads to Airtable",
            deliverable: "Screenshot of n8n Airtable node configuration"
          },
          {
            step: 3,
            title: "End-to-end test",
            description: "Submit 5 leads through form, verify all in Airtable",
            deliverable: "Screenshots showing Airtable with 5 leads"
          },
          {
            step: 4,
            title: "Document data architecture",
            description: "Explain: Why Airtable? Data flow? Schema design?",
            deliverable: "Written architecture documentation"
          }
        ],
          grading: {
      "Airtable properly structured": 25,
        "n8n integration working": 25,
          "All test leads logged": 25,
            "Documentation complete": 25
    },
    submissionFormat: "Airtable base screenshot, n8n configuration, test results"
  }
},
{
  day: 9,
    week: 2,
      title: "Debugging & Error Handling",
        focus: "Learn to diagnose and fix automation issues",
          status: "integration",
            concepts: [
              { name: "Error Types", explanation: "401, 404, 500, timeout, JSON parse" },
              { name: "Error Handlers", explanation: "Catch errors and send alerts" },
              { name: "Process", explanation: "Check logs → fix → test → verify" },
              { name: "Performance Optimization", explanation: "Monitor: response time, execution duration, API limits. Use analytics (Google Analytics, custom dashboards) to track system health. Identify bottlenecks: slow APIs, database queries, integrations." },
              { name: "Monitoring & Observability", explanation: "Set up Slack alerts for failures. Use logging to track: who, what, when, error reason. Create performance reports for clients (Research & Competitive Intelligence: benchmark your system vs competitors)." }
            ],
              objectives: ["Know error codes", "Set up handlers", "Send alerts"],
                steps: [
                  { title: "Common Errors", description: "401, 404, 500 reference" },
                  { title: "Error Handler", description: "Add Error Trigger node" },
                  { title: "Alerts", description: "Send to Slack" },
                  { title: "Test", description: "Break workflow on purpose" }
                ],
                  resources: [
                    { title: "HTTP Status Codes", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" },
                    { title: "n8n Error Handling", url: "https://docs.n8n.io/error-handling/" }
                  ],
                    checklist: ["Know errors", "Handlers set", "Alerts working"],
                      exercises: [
                        {
                          title: "Exercise 1: Learn HTTP Status Codes",
                          description: "Understand common error codes",
                          platform: "MDN reference",
                          steps: [
                            "Study: 401 (auth), 403 (forbidden), 404 (not found), 500 (server error)",
                            "Create cheat sheet with examples",
                            "Test in Postman: deliberately cause 404 error"
                          ],
                          expected: "Understand status code meanings"
                        },
                        {
                          title: "Exercise 2: Add Error Handler",
                          description: "Catch and handle failures",
                          platform: "n8n",
                          steps: [
                            "In your main workflow, add 'Error Trigger'",
                            "When error occurs: log it",
                            "Send error notification (to email or Slack)",
                            "Test: deliberately break workflow (bad API key)",
                            "Verify error caught and alert sent"
                          ],
                          expected: "Errors caught and logged"
                        },
                        {
                          title: "Exercise 3: Test Recovery",
                          description: "Fix errors and retry",
                          platform: "n8n",
                          steps: [
                            "Add retry logic to HTTP nodes",
                            "Test: temporarily break API, then fix it",
                            "Verify workflow auto-retries",
                            "Document: Which steps are retryable?"
                          ],
                          expected: "Workflow recovers from transient failures"
                        }
                      ],
                        activities: [
                          {
                            title: "Activity 1: Failure Scenarios",
                            description: "Plan for different failure modes",
                            task: "List: API down, auth fail, bad data, timeout. Plan response for each.",
                            tools: "Text editor",
                            time: "30 min"
                          },
                          {
                            title: "Activity 2: Monitoring Setup",
                            description: "Get alerts when things break",
                            task: "Connect Slack or email, test error notifications",
                            tools: "n8n, Slack or email",
                            time: "30 min"
                          },
                          {
                            title: "Activity 3: Debug a Real Error",
                            description: "Practice troubleshooting",
                            task: "Break your workflow intentionally, diagnose and fix",
                            tools: "n8n execution logs",
                            time: "40 min"
                          }
                        ],
                          assignment: {
    title: "Day 9 Assignment: Robust Error Handling System",
      description: "Build resilient automation that handles failures gracefully",
        tasks: [
          {
            step: 1,
            title: "Error codes documented",
            description: "Cheat sheet of common HTTP errors and meanings",
            deliverable: "Documented error reference"
          },
          {
            step: 2,
            title: "Error handlers installed",
            description: "All critical nodes have error handling",
            deliverable: "Screenshot of error handler configuration"
          },
          {
            step: 3,
            title: "Alerts tested",
            description: "Notifications sent when errors occur",
            deliverable: "Screenshot of error alert"
          },
          {
            step: 4,
            title: "Document error strategy",
            description: "How will you monitor? How do users know about issues?",
            deliverable: "Error handling strategy document"
          }
        ],
          grading: {
      "Error codes understood": 25,
        "Error handlers working": 25,
          "Alerts and monitoring set up": 25,
            "Strategy documented": 25
    },
    submissionFormat: "Error reference, handler screenshots, test results, documentation"
  }
},
{
  day: 10,
    week: 2,
      title: "Complete Backend System: Full Integration",
        focus: "Connect all components into one cohesive system",
          status: "capstone",
            concepts: [
              { name: "Full Flow", explanation: "Form → Webhook → n8n → AI → GHL + Airtable + Voice" },
              { name: "Testing", explanation: "Each layer works, now test the chain" },
              { name: "Multi-Channel Lead Distribution", explanation: "Lead comes in → route to: Email (Mailchimp), SMS (Twilio), CRM (GoHighLevel), Slack, Discord. Each channel has its workflow." },
              { name: "Marketing Channel Integration", explanation: "Connect Facebook Lead Ads → Google Forms → Email sequences. Use Zapier/Make/n8n to centralize all lead sources. Track which channel produces highest quality leads (Research & Competitive Intelligence)." }
            ],
              objectives: ["End-to-end flow", "Verify updates", "Handle edge cases"],
                steps: [
                  { title: "Map Flow", description: "Document every step" },
                  { title: "End-to-End Test", description: "Submit form, verify all systems" },
                  { title: "Error Tests", description: "What if API fails?" },
                  { title: "Optimize", description: "Reduce latency" }
                ],
                  resources: [
                    { title: "System Design", url: "https://www.freecodecamp.org/news/system-design-tutorial/" }
                  ],
                    checklist: ["Flow documented", "End-to-end test", "Errors handled", "Performance good"],
                      exercises: [
                        {
                          title: "Exercise 1: System Architecture Diagram",
                          description: "Map complete flow visually",
                          platform: "Draw.io or similar",
                          steps: [
                            "Draw boxes: Form, n8n, Claude, GHL, Airtable, Vapi",
                            "Draw arrows showing data flow",
                            "Label each connection",
                            "Identify single points of failure"
                          ],
                          expected: "Clear system architecture diagram"
                        },
                        {
                          title: "Exercise 2: Complete End-to-End Test",
                          description: "Test entire system as one",
                          platform: "All integrated systems",
                          steps: [
                            "Submit form with test lead",
                            "Verify: n8n received → Claude qualified → GHL contact created → Airtable logged",
                            "Check: All data correct in each system",
                            "Measure: Time from form to all systems = latency"
                          ],
                          expected: "All systems updated successfully"
                        },
                        {
                          title: "Exercise 3: Stress Test",
                          description: "Test with multiple simultaneous submissions",
                          platform: "n8n, automated testing",
                          steps: [
                            "Submit 10 leads rapidly",
                            "Verify all processed",
                            "Check for duplicate or missing data",
                            "Monitor: CPU, memory, API rate limits"
                          ],
                          expected: "System handles concurrent requests"
                        }
                      ],
                        activities: [
                          {
                            title: "Activity 1: Document System Flow",
                            description: "Write step-by-step how data flows",
                            task: "Lead enters form → transforms through each system → ends in Airtable",
                            tools: "Text editor",
                            time: "45 min"
                          },
                          {
                            title: "Activity 2: Performance Optimization",
                            description: "Make system faster",
                            task: "Identify bottlenecks, parallelize where possible, reduce timeouts",
                            tools: "n8n performance tools",
                            time: "45 min"
                          },
                          {
                            title: "Activity 3: Disaster Recovery",
                            description: "Plan for worst case",
                            task: "If n8n crashes, how do you recover? Backup strategy?",
                            tools: "Documentation",
                            time: "30 min"
                          }
                        ],
                          assignment: {
    title: "Day 10 Assignment: Production-Ready Backend",
      description: "Complete integrated system tested and ready for real leads",
        tasks: [
          {
            step: 1,
            title: "System architecture documented",
            description: "Clear diagram and written explanation",
            deliverable: "Architecture diagram and documentation"
          },
          {
            step: 2,
            title: "Complete integration tested",
            description: "Form → n8n → Claude → GHL + Airtable all working",
            deliverable: "Screenshots from all 4 systems showing same lead"
          },
          {
            step: 3,
            title: "Performance metrics",
            description: "Latency measured, bottlenecks identified",
            deliverable: "Performance test results"
          },
          {
            step: 4,
            title: "Deployment checklist",
            description: "System is production-ready? What's still needed?",
            deliverable: "Production readiness checklist"
          }
        ],
          grading: {
      "Architecture clear and complete": 25,
        "All integrations working": 25,
          "Performance acceptable": 25,
            "Deployment plan ready": 25
    },
    submissionFormat: "Architecture diagram, integration screenshots, performance data, checklist"
  }
},
{
  day: 11,
    week: 2,
      title: "Frontend Dashboard: Client Portal",
        focus: "Create interface for clients to view and manage leads",
          status: "capstone",
            concepts: [
              { name: "User Interface", explanation: "Login → dashboard → filters → search" },
              { name: "Real-time Data", explanation: "Pull latest from GHL/Airtable" },
              { name: "User Engagement Design", explanation: "Dashboard must be intuitive. Use design principles from Canva: whitespace, visual hierarchy, color psychology. Include email notification templates for client updates." },
              { name: "Content & Communication Hub", explanation: "Integrate email templates (for campaigns), knowledge base (SEO-optimized articles), activity feed. Use SEMrush/Ahrefs data to surface relevant content recommendations to clients." }
            ],
              objectives: ["Build login", "Dashboard view", "Filtering"],
                steps: [
                  { title: "Login Page", description: "Authentication" },
                  { title: "Dashboard", description: "Lead list" },
                  { title: "Filters", description: "By status, score, date" },
                  { title: "Details", description: "View lead profile" }
                ],
                  resources: [
                    { title: "Frontend Practices", url: "https://www.freecodecamp.org/news/frontend-best-practices/" },
                    { title: "React Tutorial", url: "https://react.dev/" }
                  ],
                    checklist: ["Login works", "Leads showing", "Filters work"],
                      exercises: [
                        {
                          title: "Exercise 1: Login Page",
                          description: "Build authentication",
                          platform: "Your frontend framework",
                          steps: [
                            "Create login form: email, password",
                            "Validate inputs",
                            "Authenticate against user database",
                            "Store session token"
                          ],
                          expected: "Secure login working"
                        },
                        {
                          title: "Exercise 2: Dashboard Table",
                          description: "Display leads in table",
                          platform: "Frontend + Airtable API",
                          steps: [
                            "Fetch leads from Airtable API",
                            "Display in table: name, email, company, score, status",
                            "Show timestamps",
                            "Make sortable by column"
                          ],
                          expected: "Leads displayed in sortable table"
                        },
                        {
                          title: "Exercise 3: Filtering",
                          description: "Filter leads by criteria",
                          platform: "Frontend",
                          steps: [
                            "Add filters: by status, by score range, by date range",
                            "Update table when filters change",
                            "Count shown leads"
                          ],
                          expected: "Leads filtered correctly"
                        }
                      ],
                        activities: [
                          {
                            title: "Activity 1: UI/UX Design",
                            description: "Plan layout and experience",
                            task: "Sketch dashboard: where is navigation? Leads table? Filters? Analytics?",
                            tools: "Figma or paper",
                            time: "30 min"
                          },
                          {
                            title: "Activity 2: API Integration",
                            description: "Connect to real data",
                            task: "Make frontend pull from Airtable/GHL API, display live data",
                            tools: "Frontend framework, APIs",
                            time: "60 min"
                          },
                          {
                            title: "Activity 3: Responsive Design",
                            description: "Works on all devices",
                            task: "Test on desktop, tablet, mobile. Adapt layout.",
                            tools: "Frontend framework, browser dev tools",
                            time: "45 min"
                          }
                        ],
                          assignment: {
    title: "Day 11 Assignment: Functional Client Dashboard",
      description: "Build interface clients use to manage leads",
        tasks: [
          {
            step: 1,
            title: "Login authentication",
            description: "Secure login system working",
            deliverable: "Screenshot of login page"
          },
          {
            step: 2,
            title: "Dashboard displaying leads",
            description: "All leads visible in table with data",
            deliverable: "Screenshot of dashboard with leads"
          },
          {
            step: 3,
            title: "Filters working",
            description: "Can filter by status, score, date",
            deliverable: "Screenshots of filtered results"
          },
          {
            step: 4,
            title: "Responsive mobile design",
            description: "Works on all screen sizes",
            deliverable: "Screenshots of mobile and desktop views"
          }
        ],
          grading: {
      "Login secure and working": 25,
        "Leads displaying correctly": 25,
          "Filters functional": 25,
            "Responsive design": 25
    },
    submissionFormat: "Dashboard screenshots, mobile/desktop views, login demo"
  }
},
{
  day: 12,
    week: 2,
      title: "Multi-Client Architecture: Scaling Your SaaS",
        focus: "Build system that supports multiple clients with data isolation",
          status: "capstone",
            concepts: [
              { name: "Multi-Tenant", explanation: "Each client has separate data on same system" },
              { name: "Data Isolation", explanation: "Client A cannot see Client B leads" },
              { name: "Multi-Brand Messaging", explanation: "Each client has their own: email sequences, landing page copy, brand colors, domain. Store client-specific content in CMS (WordPress). Use HubSpot, ActiveCampaign to manage per-client workflows." },
              { name: "Personalization at Scale", explanation: "Different clients need different qualification criteria, email templates, and funnel stages. Store these as client config. Use content templates (SEO-optimized snippets) that are customizable per client." }
            ],
              objectives: ["Client segregation", "Data isolation", "Test multiple accounts"],
                steps: [
                  { title: "Client ID", description: "Tag all records" },
                  { title: "Auth Check", description: "Verify ownership" },
                  { title: "Database Query", description: "Filter by client" }
                ],
                  resources: [
                    { title: "Multi-Tenant Design", url: "https://www.freecodecamp.org/news/the-multi-tenant-architecture/" }
                  ],
                    checklist: ["Multi-tenant", "Data isolated", "Multiple clients working"],
                      exercises: [
                        {
                          title: "Exercise 1: Add Client Concept",
                          description: "Identify each lead with a client",
                          platform: "Airtable + n8n",
                          steps: [
                            "Add 'client_id' field to Airtable leads table",
                            "Update n8n: When lead created, assign to authenticated client",
                            "Test: Create 2 test clients, add leads to each"
                          ],
                          expected: "Leads tagged by client"
                        },
                        {
                          title: "Exercise 2: Data Isolation",
                          description: "Ensure clients only see their data",
                          platform: "Frontend + API",
                          steps: [
                            "Update dashboard: filter leads by logged-in user's client_id",
                            "Test: Login as Client A, verify only their leads show",
                            "Test: Login as Client B, verify only their leads show",
                            "Cross-verify: Can't see other client's data"
                          ],
                          expected: "Perfect data isolation"
                        },
                        {
                          title: "Exercise 3: Auth Middleware",
                          description: "Enforce access control",
                          platform: "Backend API",
                          steps: [
                            "All API endpoints: verify client_id matches logged-in user",
                            "Prevent direct URL attacks (try accessing other client's data)",
                            "Log unauthorized attempts"
                          ],
                          expected: "Strong security"
                        }
                      ],
                        activities: [
                          {
                            title: "Activity 1: Security Planning",
                            description: "Think like an attacker",
                            task: "How could someone hack into other client's data? Plan defenses.",
                            tools: "Documentation",
                            time: "30 min"
                          },
                          {
                            title: "Activity 2: Test Data Isolation",
                            description: "Verify no data leaks",
                            task: "Create 5 test clients, cross-check: no data visible to others",
                            tools: "Frontend, database",
                            time: "45 min"
                          },
                          {
                            title: "Activity 3: Billing Model",
                            description: "Plan how to charge clients",
                            task: "Define: usage limits, pricing tiers, tracking",
                            tools: "Documentation",
                            time: "30 min"
                          }
                        ],
                          assignment: {
    title: "Day 12 Assignment: Multi-Client SaaS Ready",
      description: "System supports multiple independent clients",
        tasks: [
          {
            step: 1,
            title: "Client segregation implemented",
            description: "Each lead associated with specific client",
            deliverable: "Screenshot of Airtable showing client_id field"
          },
          {
            step: 2,
            title: "Dashboard data isolation",
            description: "Clients only see their own leads",
            deliverable: "Screenshots from 2 different client logins"
          },
          {
            step: 3,
            title: "Security tested",
            description: "Cannot access other client's data directly",
            deliverable: "Test results showing access denied"
          },
          {
            step: 4,
            title: "SaaS architecture documented",
            description: "How does client segregation work? Security model?",
            deliverable: "Multi-tenant architecture documentation"
          }
        ],
          grading: {
      "Client segregation working": 25,
        "Data isolation perfect": 25,
          "Security robust": 25,
            "Documentation complete": 25
    },
    submissionFormat: "Architecture screenshots, security test results, documentation"
  }
},
{
  day: 13,
    week: 2,
      title: "Deployment & Production Ready",
        focus: "Deploy system to production and prepare for real usage",
          status: "capstone",
            concepts: [
              { name: "Deployment", explanation: "Frontend to Vercel, backend to production" },
              { name: "Environment Variables", explanation: "Secure API keys, database connections" },
              { name: "Website Deployment Options", explanation: "Frontend: Vercel, Netlify, or traditional hosting (WordPress, Shopify, Webflow). Backend: Heroku, AWS, DigitalOcean, or self-hosted. Choose based on client needs." },
              { name: "SEO & Analytics for Deployed System", explanation: "Add Google Analytics to dashboard for tracking usage. Use Search Console for monitoring. Set up conversion tracking to measure: leads generated, conversion rate, cost per lead. Create SEO-optimized documentation/blog posts about the system." }
            ],
              objectives: ["Deploy frontend", "Deploy backend", "Configure DNS", "Enable SSL"],
                steps: [
                  { title: "Frontend Deploy", description: "Vercel or similar" },
                  { title: "Backend Deploy", description: "Heroku, AWS, or similar" },
                  { title: "Database", description: "Production Airtable/database" },
                  { title: "Domain", description: "Custom domain + SSL" }
                ],
                  resources: [
                    { title: "Vercel Deployment", url: "https://vercel.com/docs" },
                    { title: "Heroku Deployment", url: "https://devcenter.heroku.com/" }
                  ],
                    checklist: ["Frontend deployed", "Backend running", "Live system works"],
                      exercises: [
                        {
                          title: "Exercise 1: Deploy Frontend to Vercel",
                          description: "Make your dashboard live",
                          platform: "Vercel (https://vercel.com)",
                          steps: [
                            "Push code to GitHub",
                            "Connect Vercel to repo",
                            "Set environment variables",
                            "Deploy",
                            "Get live URL"
                          ],
                          expected: "Frontend live at custom URL"
                        },
                        {
                          title: "Exercise 2: Deploy Backend",
                          description: "Put n8n workflows in production",
                          platform: "n8n self-hosted or similar",
                          steps: [
                            "Evaluate: Self-hosted n8n vs cloud n8n",
                            "If self-hosted: deploy to server",
                            "Configure SSL/HTTPS",
                            "Test: Live form submission through deployment"
                          ],
                          expected: "Backend live and processing"
                        },
                        {
                          title: "Exercise 3: Custom Domain",
                          description: "Get professional domain",
                          platform: "Domain registrar + Vercel/hosting",
                          steps: [
                            "Buy domain (or use existing)",
                            "Point DNS to your deployment",
                            "Enable HTTPS/SSL",
                            "Test: Live at your domain"
                          ],
                          expected: "System live at professional domain"
                        }
                      ],
                        activities: [
                          {
                            title: "Activity 1: Production Checklist",
                            description: "Verify everything for production",
                            task: "Check: errors handled, logging enabled, performance good, security enabled",
                            tools: "Documentation",
                            time: "30 min"
                          },
                          {
                            title: "Activity 2: Load Testing",
                            description: "Test under stress",
                            task: "Simulate 100 concurrent users, verify system handles it",
                            tools: "Load testing tools",
                            time: "45 min"
                          },
                          {
                            title: "Activity 3: Monitoring Setup",
                            description: "Alert on issues",
                            task: "Configure: error alerts, performance monitoring, uptime checks",
                            tools: "Monitoring services",
                            time: "45 min"
                          }
                        ],
                          assignment: {
    title: "Day 13 Assignment: Production Deployment",
      description: "System is live and serving real traffic",
        tasks: [
          {
            step: 1,
            title: "Frontend deployed",
            description: "Dashboard live at production URL",
            deliverable: "Screenshot of live dashboard"
          },
          {
            step: 2,
            title: "Backend production ready",
            description: "All workflows optimized and deployed",
            deliverable: "Screenshot of live system in action"
          },
          {
            step: 3,
            title: "Custom domain",
            description: "System accessible at professional domain",
            deliverable: "Screenshot of domain URL in browser"
          },
          {
            step: 4,
            title: "Post-deployment verification",
            description: "End-to-end test on production, error handling, monitoring",
            deliverable: "Deployment verification checklist"
          }
        ],
          grading: {
      "Frontend deployed": 25,
        "Backend live": 25,
          "Custom domain working": 25,
            "Post-deployment verified": 25
    },
    submissionFormat: "Live URL screenshots, deployment configuration"
  }
},
{
  day: 14,
    week: 2,
      title: "Portfolio Project & Final Delivery",
        focus: "Package system as portfolio piece and prepare for client usage",
          status: "capstone",
            concepts: [
              { name: "Portfolio", explanation: "Show off your work to potential clients/employers" },
              { name: "Documentation", explanation: "Architecture, choices, lessons learned" },
              { name: "SEO-Optimized Portfolio", explanation: "Use keywords: 'AI lead generation system', 'automation architect', 'marketing funnel builder'. Create blog posts around your system (Content & SEO expertise). Use Ahrefs/SEMrush to find high-traffic keywords." },
              { name: "Lead Generation for Yourself", explanation: "Build email sequence to pitch your system to prospects. Create short video ads (CapCut) for LinkedIn/TikTok showing ROI metrics. Use competitive intelligence: analyze what other automation experts showcase." }
            ],
              objectives: ["Portfolio site", "Document architecture", "Record demo", "Launch"],
                steps: [
                  { title: "Portfolio Site", description: "Showcase your system" },
                  { title: "Documentation", description: "Technical writeup" },
                  { title: "Demo Video", description: "Show system in action" },
                  { title: "Case Study", description: "How you built it" }
                ],
                  resources: [
                    { title: "Portfolio Best Practices", url: "https://www.freecodecamp.org/news/how-to-build-an-awesome-portfolio/" }
                  ],
                    checklist: ["Portfolio live", "Documented", "Demo recorded"],
                      exercises: [
                        {
                          title: "Exercise 1: Build Portfolio Website",
                          description: "Showcase your AI lead system",
                          platform: "HTML/CSS or site builder",
                          steps: [
                            "Create professional website",
                            "Sections: What it does, How it works, Screenshots, Architecture, Lessons learned",
                            "Include: Live system link, GitHub repo, demo video",
                            "Deploy to web"
                          ],
                          expected: "Professional portfolio website"
                        },
                        {
                          title: "Exercise 2: Technical Documentation",
                          description: "Write complete system docs",
                          platform: "GitHub or similar",
                          steps: [
                            "README with overview and setup",
                            "Architecture diagram and explanation",
                            "Tech stack justification",
                            "Lessons learned and improvements",
                            "How to modify/extend"
                          ],
                          expected: "Comprehensive technical docs"
                        },
                        {
                          title: "Exercise 3: Record Demo Video",
                          description: "Show system in action",
                          platform: "Screen recorder",
                          steps: [
                            "Record: Fill form → see lead in GHL → see in Airtable → view in dashboard",
                            "Record: Show voice AI answering call",
                            "Record: Show error handling",
                            "Add voiceover explaining each step",
                            "Upload to YouTube or similar"
                          ],
                          expected: "Professional demo video (5-10 min)"
                        }
                      ],
                        activities: [
                          {
                            title: "Activity 1: Portfolio Content Creation",
                            description: "Write compelling case study",
                            task: "Tell story: Problem → Solution → Results. Include metrics and outcomes.",
                            tools: "Text editor, screenshots",
                            time: "60 min"
                          },
                          {
                            title: "Activity 2: LinkedIn & Social",
                            description: "Share your achievement",
                            task: "Post about bootcamp completion, link to portfolio, generate interest",
                            tools: "LinkedIn, Twitter, etc.",
                            time: "30 min"
                          },
                          {
                            title: "Activity 3: Prepare for Monetization",
                            description: "Get ready to sell/use system",
                            task: "Plan: Pricing? White-label? Sell access? Offer services?",
                            tools: "Documentation",
                            time: "45 min"
                          }
                        ],
                          assignment: {
    title: "Day 14 Assignment: Complete Portfolio Package",
      description: "Bootcamp complete - show what you built!",
        tasks: [
          {
            step: 1,
            title: "Portfolio website launched",
            description: "Professional site showcasing your system",
            deliverable: "Live portfolio URL"
          },
          {
            step: 2,
            title: "Technical documentation complete",
            description: "GitHub repo with comprehensive README and architecture docs",
            deliverable: "GitHub repository link with full documentation"
          },
          {
            step: 3,
            title: "Demo video recorded",
            description: "5-10 minute video showing complete system in action",
            deliverable: "YouTube/Vimeo link to demo video"
          },
          {
            step: 4,
            title: "Lessons learned document",
            description: "What you learned, what worked, what you'd change",
            deliverable: "Written reflection (500+ words)"
          }
        ],
          grading: {
      "Portfolio site professional": 25,
        "Documentation comprehensive": 25,
          "Demo video clear and complete": 25,
            "Lessons learned insightful": 25
    },
    submissionFormat: "Portfolio URL, GitHub repo, demo video, reflection document"
  }
}
  ],

resources: {
  apis: [
    { title: "REST APIs Explained", url: "https://www.freecodecamp.org/news/rest-api-tutorial-for-beginners/" },
    { title: "MDN HTTP Methods", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" },
    { title: "HTTP Status Codes", url: "https://httpwg.org/specs/rfc9110.html" }
  ],
    json: [
      { title: "JSON Tutorial", url: "https://jsonplaceholder.typicode.com/guide" },
      { title: "JSON for Beginners", url: "https://www.youtube.com/watch?v=iiADhChRriM" },
      { title: "JSON Validator", url: "https://jsonlint.com" }
    ],
      promptEngineering: [
        { title: "OpenAI Prompt Engineering", url: "https://platform.openai.com/docs/guides/prompt-engineering" },
        { title: "freeCodeCamp Guide", url: "https://www.freecodecamp.org/news/prompt-engineering-guide/" },
        { title: "Claude Prompting", url: "https://docs.anthropic.com/claude/docs/prompt-engineering" }
      ],
        n8n: [
          { title: "n8n Documentation", url: "https://docs.n8n.io/" },
          { title: "n8n YouTube Tutorial", url: "https://www.youtube.com/watch?v=hy7DQXt_KVw" },
          { title: "n8n Community", url: "https://community.n8n.io" }
        ],
          ghl: [
            { title: "GHL Beginner's Guide", url: "https://www.gohighlevel.com/help" },
            { title: "GoHighLevel Tutorial", url: "https://www.youtube.com/watch?v=PtF0Vz9Ev2A" },
            { title: "GHL API Reference", url: "https://docs.gohighlevel.com/api-overview" }
          ],
            claude: [
              { title: "Claude API Docs", url: "https://docs.anthropic.com/claude/docs/intro" },
              { title: "Claude Getting Started", url: "https://console.anthropic.com" }
            ],
              vapi: [
                { title: "Vapi Documentation", url: "https://docs.vapi.ai" },
                { title: "Vapi Getting Started", url: "https://www.youtube.com/watch?v=Vs6xyVJzFwE" }
              ],
                frontend: [
                  { title: "HTML Forms Guide", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form" },
                  { title: "Form Validation", url: "https://www.freecodecamp.org/news/form-validation-tutorial/" },
                  { title: "Frontend Best Practices", url: "https://www.freecodecamp.org/news/frontend-best-practices/" }
                ],
                  airtable: [
                    { title: "Airtable Getting Started", url: "https://support.airtable.com/hc/en-us" },
                    { title: "n8n Airtable Node", url: "https://docs.n8n.io/nodes/n8n-nodes-base.airtable/" }
                  ],
                    deployment: [
                      { title: "Vercel Deployment", url: "https://vercel.com/docs" },
                      { title: "System Design", url: "https://www.freecodecamp.org/news/system-design-tutorial/" }
                    ]
},

quickReference: {
  httpMethods: [
    { method: "GET", use: "Retrieve data", example: "GET /api/contacts" },
    { method: "POST", use: "Create data", example: "POST /api/contacts {data}" },
    { method: "PUT", use: "Update data", example: "PUT /api/contacts/123 {data}" },
    { method: "DELETE", use: "Delete data", example: "DELETE /api/contacts/123" }
  ],
    jsonStructure: {
    description: "Basic JSON format for system communication",
      example: `{
  "string": "text",
  "number": 123,
  "boolean": true,
  "array": ["item1", "item2"],
  "object": { "nested": "value" }
}`
  },
  commonErrors: [
    { error: "401 Unauthorized", cause: "API key invalid or expired", fix: "Regenerate API key and update credential" },
    { error: "403 Forbidden", cause: "Valid key but no permission", fix: "Check API scope and permissions" },
    { error: "404 Not Found", cause: "Endpoint doesn't exist or is misspelled", fix: "Check endpoint URL in API docs" },
    { error: "Invalid JSON", cause: "Syntax error (missing comma, quotes, bracket)", fix: "Use jsonlint.com to find exact error" },
    { error: "Webhook not triggering", cause: "Source system not configured to send to webhook", fix: "Check source system webhook settings" },
    { error: "Rate limit exceeded", cause: "Too many requests too fast", fix: "Add delay between requests" },
    { error: "500 Server Error", cause: "Backend API having issues", fix: "Check API status page, retry later" },
    { error: "Timeout", cause: "Response taking too long", fix: "Increase timeout, check API performance" }
  ],
    systemComponents: {
    frontend: "User interface (forms, dashboards)",
      backend: "Business logic and processing",
        database: "Data storage (Airtable)",
          automation: "Workflow engine (n8n)",
            crm: "Lead management (GHL)",
              ai: "Intelligent processing (Claude)",
                voice: "Phone integration (Vapi)"
  },
  ghlPipelineExample: [
    "New Lead → Form submission",
    "Qualified → Met criteria",
    "Contacted → Outreach made",
    "Demo Booked → Meeting scheduled",
    "Proposal → Sent pricing",
    "Won/Lost → Deal status"
  ],
    n8nNodeTypes: [
      "Trigger: Start workflow (Webhook, Schedule)",
      "Action: Do something (Send Email, Create Contact)",
      "Logic: Make decision (If/Else)",
      "Transform: Change format (Set, Function)"
    ]
},

jobReadyPracticals: {
  firstClientPlaybook: {
    stages: [
      {
        stage: "Discovery Call (30 min)",
        goal: "Understand their problem, not sell",
        questions: [
          "Walk me through your current lead process. Where do leads come from?",
          "How many leads do you get per month? What's your close rate?",
          "What's the biggest bottleneck? What takes the most time?",
          "Who's involved in the decision? Who do I need to convince?",
          "What's your timeline? When do you want this working?"
        ],
        doNotDo: "Don't talk about your tech stack. Don't oversell. Don't quote pricing yet."
      },
      {
        stage: "Proposal (1-2 days)",
        goal: "Show them exactly what you'll build and the ROI",
        sections: [
          "Current State: [Their problem in numbers - 100 leads/month, 5% close = $X lost revenue]",
          "Proposed Solution: [Specific system - 'I'll build X, connect Y, automate Z']",
          "Expected Outcome: [15% close rate = 15 deals/month = $Y extra revenue vs $X cost]",
          "Timeline: [Days/weeks broken down by component]",
          "Investment: [$X total, or $Y/month recurring]"
        ],
        example: "$10k investment → 10 extra deals/month → $50k monthly extra revenue → 500% ROI, payback in 1 week"
      },
      {
        stage: "Kickoff (Day 1)",
        goal: "Get access, clarify scope, set expectations",
        deliverables: [
          "Client gives you API keys, account access",
          "You document: exact requirements, success metrics, what's in/out of scope",
          "You commit: timeline, delivery dates, communication plan",
          "You set: weekly check-ins, no surprise scope changes"
        ]
      },
      {
        stage: "Build (1-3 weeks)",
        goal: "Deliver incrementally, test ruthlessly",
        checkpoints: [
          "Day 1-2: Get all accounts set up, test API access",
          "Day 3-5: Core workflow built, tested internally",
          "Day 6-7: Client tests in staging, gives feedback",
          "Day 8-10: Refinements, edge cases, error handling",
          "Day 11: Production deployment, live testing with real data",
          "Day 12-14: Monitoring, documentation, handoff"
        ],
        communication: "Weekly email: what we built, what's next, blockers, questions"
      },
      {
        stage: "Handoff & Support",
        goal: "Client can use it independently, you're available for questions",
        deliverables: [
          "Walkthrough video showing how to use system",
          "Written documentation: how to add/edit rules, troubleshoot",
          "30-day support included: respond within 24 hrs",
          "Offer: monthly maintenance ($1-5k/month)"
        ]
      }
    ]
  },

  pitchTemplates: [
    {
      problem: "We get leads but don't know which are actually good",
      pitch: "I'll build an AI system that automatically scores every lead against your ideal customer profile. Sales team only sees hot leads. You'll close more deals without changing your marketing.",
      timeline: "2 weeks",
      price: "$8,000"
    },
    {
      problem: "Our form converts terribly. We think it's too long",
      pitch: "I'll analyze your form, reduce friction by trimming unnecessary fields, and add progressive disclosure to gather more info later. Most clients see 30-50% conversion improvement immediately.",
      timeline: "3-5 days",
      price: "$2,500-4,000"
    },
    {
      problem: "We can't tell which marketing channel produces best ROI",
      pitch: "I'll set up comprehensive tracking: every lead source tagged, tracked through your CRM, scored by quality. Dashboard shows exactly which channel gives you best ROI. You'll cut ad spend by reallocating to winners.",
      timeline: "1-2 weeks",
      price: "$5,000-7,000"
    },
    {
      problem: "Our team manually does repetitive tasks 10+ hours per week",
      pitch: "I'll automate it. Once set up, it runs forever. Your team's saved time can go to high-value work. Usually pays for itself in first month from productivity gains.",
      timeline: "1-2 weeks depending on complexity",
      price: "$3,000-10,000"
    },
    {
      problem: "We need a way for prospects to book calls without emailing back and forth",
      pitch: "I'll build a system: prospect fills form → AI sends confirmation + calendar link → call is booked. Closes loop in seconds instead of hours. You won't miss any bookings.",
      timeline: "1 week",
      price: "$4,000-6,000"
    }
  ],

    hirabilityChecklist: [
      {
        skill: "Can you explain to a non-technical person what an API is?",
        test: "If you answer in 2-3 sentences without jargon, you can client-communicate. That's half the job.",
        example: "'An API is like a waiter - you (app) request something from the kitchen (another company's system), the waiter delivers it. Without the waiter, you can't reach the kitchen.'"
      },
      {
        skill: "Can you draw a system diagram showing how your bootcamp project works?",
        test: "If you can sketch boxes (systems) and arrows (data flow), you understand architecture. You can explain any system to clients.",
        shouldInclude: "Form → Automation → AI → CRM → Dashboard"
      },
      {
        skill: "Can you troubleshoot a workflow that's failing silently?",
        test: "Check logs, isolate components, add test data, verify each step. This is your bread and butter.",
        practice: "Break your own n8n workflow on purpose. Fix it 5 times. You'll be confident troubleshooting anything."
      },
      {
        skill: "Can you estimate a project realistically?",
        test: "Break it down: API setup (2hrs), integration (8hrs), testing (4hrs), doc (2hrs) = 16 hrs = 2 days. Estimate low, deliver early. Clients love you.",
        mistake: "Don't estimate: 'Yeah, couple days' - that's how you overpromise."
      },
      {
        skill: "Do you have 2-3 portfolio projects you can show?",
        test: "Minimum: Your bootcamp project (form → AI → CRM). Better: 2-3 variations. Best: 5+ with different industries.",
        why: "Each project demonstrates skill to different type of client: 'We've done similar for real estate, SaaS, e-comm'"
      },
      {
        skill: "Can you talk about client ROI, not tech?",
        test: "Instead of: 'Uses Claude + n8n + GoHighLevel' say: 'Saves 20 hrs/week, turns 100 leads into 15 qualified leads'",
        why: "Clients don't care about your tools. They care about results."
      }
    ],

      firstGigStrategy: {
    doNotDo: [
      "Don't wait to be perfect - start now with your bootcamp project portfolio",
      "Don't charge $50/hr - undervalue yourself early. Charge $100-150/hr to build track record",
      "Don't take jobs you don't know - take only what you did in bootcamp, at first",
      "Don't over-promise timeline - add 50% buffer, deliver early",
      "Don't ignore documentation - future you (and client) will thank you",
      "Don't skip the discovery call - know their problem before you quote"
    ],
      doThis: [
        "Finish bootcamp, record 2-3 demo videos of your project",
        "Post on LinkedIn: 'I just built an AI lead qualification system. It auto-scores leads, saves teams 20+ hrs/week. Built in 2 weeks with n8n + Claude. DMs open if you need similar'",
        "Offer first project at discounted rate ($3-5k instead of $10k) to build case study",
        "Document that project obsessively - screenshots, before/after metrics, client testimonial",
        "Use case study to land next client at normal rates",
        "Within 6 months: 3-5 case studies, $50k+ revenue, now you can charge premium rates"
      ],
        timeline: "First 3 months: Build 1-2 projects, establish credibility. Months 4-12: Scale to $10-20k/month."
  },

  clientObjectionHandling: [
    {
      objection: "This sounds complicated. Will we be able to use it ourselves?",
      response: "Great question. I build everything to be as simple as possible for your team. I create step-by-step documentation, walkthroughs, and I'm available if questions come up. Most clients can do basic updates themselves after a brief training."
    },
    {
      objection: "How do I know this will actually work for our business?",
      response: "Fair point. Here's what I propose: we do a 1-week pilot on a smaller part of your process. If you don't see results, no payment. If you do, we expand to full implementation. I'm confident enough to put my money where my mouth is."
    },
    {
      objection: "We've tried automation before and it failed. Why would this be different?",
      response: "Interesting. What happened? [Listen] Here's why this would be different: I'm designing specifically for your process, I'll test thoroughly before going live, and I won't move forward until I'm 100% confident it works. Plus, I'll be here to support you. Most failures happen because the previous vendor built it and disappeared."
    },
    {
      objection: "Your price seems high. Can you do it for less?",
      response: "I understand. Here's the value math: this system will save your team [20 hrs/week] which is worth $1,000/week or $52k/year. My investment is $10k, which you recover in 2 months. Now, if price is the issue, we could cut scope - maybe phase 1 does [core feature], phase 2 later does [nice-to-have]. What matters most?"
    },
    {
      objection: "What if you disappear after launch? We'll be stuck.",
      response: "Valid concern. Here's my commitment: I provide complete documentation of every setting, every workflow, every integration. Your data stays with you. Even if you never talk to me again, you could hire anyone else to maintain it. Additionally, I offer 90 days of included support for any questions. And beyond that, I'm available on an hourly basis."
    }
  ]
},

checklists: [
  {
    day: 1, items: [
      { task: "Read Day 1 concepts", time: "30 min" },
      { task: "Understand APIs and JSON", time: "40 min" },
      { task: "Test JSON at jsonlint.com", time: "20 min" },
      { task: "Review webhook flow", time: "15 min" }
    ]
  },
  {
    day: 2, items: [
      { task: "Learn prompt engineering", time: "30 min" },
      { task: "Write good prompts", time: "40 min" },
      { task: "Test on ChatGPT", time: "40 min" },
      { task: "Extract JSON outputs", time: "30 min" }
    ]
  },
  {
    day: 3, items: [
      { task: "Create n8n account", time: "15 min" },
      { task: "Learn node types", time: "30 min" },
      { task: "Build first workflow", time: "60 min" },
      { task: "Test webhook trigger", time: "30 min" }
    ]
  },
  {
    day: 4, items: [
      { task: "Create GHL account", time: "15 min" },
      { task: "Build pipeline", time: "45 min" },
      { task: "Create custom fields", time: "30 min" },
      { task: "Build lead form", time: "45 min" },
      { task: "Set up automation", time: "30 min" }
    ]
  },
  {
    day: 5, items: [
      { task: "Get Claude API keys", time: "10 min" },
      { task: "Create HTTP node", time: "40 min" },
      { task: "Configure API", time: "30 min" },
      { task: "Test responses", time: "30 min" },
      { task: "Connect to GHL", time: "40 min" }
    ]
  },
  {
    day: 6, items: [
      { task: "Create Vapi account", time: "15 min" },
      { task: "Get phone number", time: "10 min" },
      { task: "Write voice script", time: "30 min" },
      { task: "Configure Vapi", time: "40 min" },
      { task: "Test with call", time: "20 min" }
    ]
  },
  {
    day: 7, items: [
      { task: "Build HTML form", time: "45 min" },
      { task: "Style with CSS", time: "45 min" },
      { task: "Add JavaScript", time: "40 min" },
      { task: "Connect webhook", time: "30 min" },
      { task: "Test submission", time: "20 min" }
    ]
  },
  {
    day: 8, items: [
      { task: "Create Airtable", time: "15 min" },
      { task: "Design schema", time: "45 min" },
      { task: "Connect n8n", time: "30 min" },
      { task: "Test read/write", time: "30 min" }
    ]
  },
  {
    day: 9, items: [
      { task: "Study HTTP errors", time: "30 min" },
      { task: "Add error handler", time: "40 min" },
      { task: "Configure alerts", time: "30 min" },
      { task: "Test error scenarios", time: "40 min" }
    ]
  },
  {
    day: 10, items: [
      { task: "Map system flow", time: "45 min" },
      { task: "End-to-end testing", time: "90 min" },
      { task: "Test error handling", time: "45 min" },
      { task: "Optimize performance", time: "60 min" }
    ]
  },
  {
    day: 11, items: [
      { task: "Design login page", time: "60 min" },
      { task: "Build dashboard", time: "90 min" },
      { task: "Add filters", time: "60 min" },
      { task: "Test authentication", time: "45 min" }
    ]
  },
  {
    day: 12, items: [
      { task: "Implement client segregation", time: "60 min" },
      { task: "Add auth checks", time: "45 min" },
      { task: "Test data isolation", time: "60 min" }
    ]
  },
  {
    day: 13, items: [
      { task: "Deploy frontend", time: "45 min" },
      { task: "Deploy backend", time: "60 min" },
      { task: "Configure database", time: "45 min" },
      { task: "Test live system", time: "60 min" }
    ]
  },
  {
    day: 14, items: [
      { task: "Build portfolio site", time: "90 min" },
      { task: "Document architecture", time: "90 min" },
      { task: "Record demo video", time: "45 min" },
      { task: "Deploy portfolio", time: "30 min" }
    ]
  }
],

  endToEndClientProject: {
    description: "Real example: Taking a prospect from cold outreach to deployed system earning money",
    
    example: {
      company: "Digital Marketing Agency (10 people)",
      currentProblem: "Getting 200 leads/month from Facebook ads, manually qualifying each one, losing quality leads while chasing bad ones, 5% close rate",
      
      timeline: {
        week1: {
          day1_2: {
            action: "Cold outreach",
            howTo: "LinkedIn DM: 'I help agencies like yours improve lead quality using AI. Your FB ads probably pull in lots of junk. I built a system for [similar company] that identified their top 20% leads. Increased close rate 5% → 12%. Worth a conversation?' If yes → Schedule call",
            expectedOutcome: "Get 1-2 meetings per 20 cold outreaches"
          },
          day3: {
            action: "Discovery call (30 min)",
            questions: [
              "Walk me through FB lead flow. How do you qualify?",
              "200 leads/month × 5% close = 10 deals. What's margin? ($5k average deal?)",
              "Top 20% probably close at 20%+. Bottom 20% close at <2%. Can you identify the pattern?",
              "How long before you know if a lead is bad? (Could be days or weeks of wasted time)",
              "If I could auto-flag your top leads in real time, what's that worth?"
            ],
            myAnswer: "Usually something like: 'We get maybe 40 really good leads mixed with 160 garbage. We spend hours on the garbage and miss the good ones. If you could sort that instantly, we'd gain 5-10 deals/month = $50k extra revenue'"
          },
          day4_5: {
            action: "Proposal & close",
            proposal: [
              "Current: 200 leads/month, 5% close = 10 deals × $5k = $50k/month revenue",
              "My system: AI qualifies on intake form (speed, firmographic fit, budget signal)",
              "Expected: 200 leads → 40 'hot' qualified leads auto-flagged → sales focuses on those 40",
              "If close rate on qualified leads jumps to 15%: 200 × 15% = 30 deals = $150k revenue (vs $50k)",
              "Cost: $15,000 one-time build",
              "ROI: $100k extra revenue ÷ $15k investment = 6.7x return, paid back in 2 weeks",
              "Timeline: 2 weeks to build and deploy",
              "Support: 30 days included, then $2k/month for maintenance & optimization"
            ],
            close: "'I can build this in 2 weeks. You'll have it by [date]. Week 1 you test it, week 2 it goes live. If we get your close rate to 12% (conservative), you're at 24 deals/month. That's $120k/month extra revenue. My $15k investment is paid back in about a week. When do you want to start?'"
          }
        },
        
        week2_3: {
          action: "Development",
          schedule: [
            "Day 1-2: Set up all APIs (Facebook Lead Ads → n8n, Pipedrive CRM access, Claude API), test connectivity",
            "Day 3-4: Build qualification workflow → AI scores each lead on criteria → stages in Pipedrive",
            "Day 5-6: Build intake form (replace their current form with prettier version that captures needed fields)",
            "Day 7: Test with 50 test leads, verify scoring logic, refine prompt",
            "Day 8: Client tests in staging environment, gives feedback",
            "Day 9-10: Make refinements, edge case handling, error alerts to Slack",
            "Day 11: Deploy to production, switch their form to live version",
            "Day 12: Monitor closely (watch logs, test with real leads coming in), tweak scoring thresholds",
            "Day 13-14: Documentation, training video, handoff"
          ]
        },

        week4_beyond: {
          action: "Results & scaling",
          whatHappens: [
            "First week live: Leads start flowing through system, AI scores them, sales sees 'Hot Leads' section in Pipedrive",
            "Sales team immediately notices: 'These hot leads are way better than normal'",
            "After 30 days: You collect metrics → 40 hot leads/month, 15% close rate = 6 extra deals = $30k revenue",
            "ROI: $30k × 12 months = $360k/year extra ÷ $15k investment = 24x annual return",
            "Client is happy, signs on for $2k/month recurring (you maintain, optimize, respond to questions)",
            "Case study: You take screenshots, get testimonial, add to portfolio",
            "You now have proof: 'Helped agency increase lead quality and close rate. 24x ROI.'",
            "Next client: Easier to close because you have proof"
          ],
          monthlyRecurring: [
            "Monitor system performance (30 min/week)",
            "Analyze: which criteria most predict good leads? (starts revealing patterns)",
            "Optimize: adjust AI prompt based on actual close rates",
            "Report: send monthly summary ('This month: 40 hot leads, 6 closed, 15% close rate')",
            "Support: respond to any questions/requests (<2 hrs/month)",
            "Total: ~4 hours/month work = $2,000/month profit = $24,000/year passive income"
          ]
        }
      }
    },

    keyTakeaways: [
      "Cold outreach → intro call → discovery call → proposal → close → build → deploy → recurring revenue",
      "First project is your credential. Take slightly lower rate to build proof.",
      "Case studies are your sales engine. After 3 case studies, you can charge 2x more.",
      "Recurring revenue beats project revenue. A $15k project + $2k/month = $39k year 1, year 2 = $24k for no new work.",
      "Document everything. Screenshots, metrics, client quote. This becomes your portfolio.",
      "Real ROI talk closes deals. Don't talk tech. Talk money.",
      "You can do 2-3 of these projects per year and gross $50-100k. That's junior developer salary for 14 days of work per project."
    ]
  }
};

export default bootcampData;
