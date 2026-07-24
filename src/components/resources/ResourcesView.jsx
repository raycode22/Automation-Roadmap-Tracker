import React from 'react';
import { ExternalLink } from 'lucide-react';

const ResourceSection = ({ title, icon, items, darkMode }) => (
  <div 
    className={`p-4 rounded-lg border ${
      darkMode ? 'border-gray-600 bg-gray-750' : 'border-gray-200 bg-gray-50'
    }`}
  >
    <h3 
      className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}
    >
      <span aria-hidden="true">{icon}</span> {title}
    </h3>
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-sm transition ${
              darkMode
                ? 'text-blue-400 hover:text-blue-300'
                : 'text-blue-600 hover:text-blue-800'
            }`}
            aria-label={`Open ${item.title} in new tab`}
          >
            <ExternalLink size={14} aria-hidden="true" />
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const ResourcesView = ({ resources, darkMode }) => (
  <div 
    className={`p-8 rounded-xl border-2 ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}
  >
    <h2 
      className={`text-2xl font-bold mb-6 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}
    >
      Learning Resources
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ResourceSection
        title="REST APIs"
        icon="🔌"
        items={resources.apis}
        darkMode={darkMode}
      />

      <ResourceSection
        title="JSON"
        icon="📄"
        items={resources.json}
        darkMode={darkMode}
      />

      <ResourceSection
        title="Prompt Engineering"
        icon="🎯"
        items={resources.promptEngineering}
        darkMode={darkMode}
      />

      <ResourceSection
        title="n8n Automation"
        icon="⚡"
        items={resources.n8n}
        darkMode={darkMode}
      />

      <ResourceSection
        title="GoHighLevel (GHL)"
        icon="🏢"
        items={resources.ghl}
        darkMode={darkMode}
      />

      <ResourceSection
        title="Claude AI"
        icon="🤖"
        items={resources.claude}
        darkMode={darkMode}
      />

      <ResourceSection
        title="Vapi Voice"
        icon="📞"
        items={resources.vapi}
        darkMode={darkMode}
      />

      <ResourceSection
        title="Frontend Development"
        icon="🎨"
        items={resources.frontend}
        darkMode={darkMode}
      />

      <ResourceSection
        title="Airtable"
        icon="📊"
        items={resources.airtable}
        darkMode={darkMode}
      />

      <ResourceSection
        title="Deployment & System Design"
        icon="🚀"
        items={resources.deployment}
        darkMode={darkMode}
      />
    </div>
  </div>
);

export default ResourcesView;
export { ResourceSection };
