import React from 'react';
import { Target, Zap } from 'lucide-react';

const ReferenceSection = ({ title, icon, children, darkMode }) => (
  <div>
    <h3 
      className={`text-xl font-semibold mb-4 flex items-center gap-2 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}
    >
      <span aria-hidden="true">{icon}</span> {title}
    </h3>
    {children}
  </div>
);

const ReferenceView = ({ reference, darkMode }) => (
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
      Quick Reference Guide
    </h2>

    <div className="space-y-8">
      {/* HTTP Methods */}
      <ReferenceSection
        title="HTTP Methods"
        icon="🌐"
        darkMode={darkMode}
      >
        <div className="overflow-x-auto" role="region" aria-label="HTTP Methods table">
          <table 
            className={`w-full text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            <thead>
              <tr className={`border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                <th scope="col" className="text-left py-2 px-3">Method</th>
                <th scope="col" className="text-left py-2 px-3">Use Case</th>
                <th scope="col" className="text-left py-2 px-3">Example</th>
              </tr>
            </thead>
            <tbody>
              {reference.httpMethods.map((method, idx) => (
                <tr key={idx} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <td className="py-2 px-3 font-mono font-semibold text-blue-500">{method.method}</td>
                  <td className="py-2 px-3">{method.use}</td>
                  <td className="py-2 px-3 font-mono text-xs">{method.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ReferenceSection>

      {/* JSON Structure */}
      <ReferenceSection
        title="JSON Structure"
        icon="📝"
        darkMode={darkMode}
      >
        <p className={`mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {reference.jsonStructure.description}
        </p>
        <pre 
          className={`p-4 rounded-lg overflow-x-auto text-sm ${
            darkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-900 text-green-400'
          }`}
          aria-label="JSON example code"
        >
          {reference.jsonStructure.example}
        </pre>
      </ReferenceSection>

      {/* Common Errors */}
      <ReferenceSection
        title="Common Errors & Solutions"
        icon="⚠️"
        darkMode={darkMode}
      >
        <div className="space-y-3">
          {reference.commonErrors.map((err, idx) => (
            <div key={idx} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`font-semibold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                {err.error}
              </div>
              <div className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Cause:</strong> {err.cause}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Fix:</strong> {err.fix}
              </div>
            </div>
          ))}
        </div>
      </ReferenceSection>

      {/* System Components */}
      <ReferenceSection
        title="System Components"
        icon="🏗️"
        darkMode={darkMode}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(reference.systemComponents).map(([key, value]) => (
            <div key={key} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`font-semibold capitalize ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {key}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </ReferenceSection>

      {/* GHL Pipeline Example */}
      <ReferenceSection
        title="GHL Pipeline Stages"
        icon="🔄"
        darkMode={darkMode}
      >
        <div className="flex flex-wrap gap-2" role="list" aria-label="GHL Pipeline stages">
          {reference.ghlPipelineExample.map((stage, idx) => (
            <span
              key={idx}
              className={`px-3 py-2 rounded-full text-sm ${
                darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
              }`}
              role="listitem"
            >
              {stage}
            </span>
          ))}
        </div>
      </ReferenceSection>

      {/* n8n Node Types */}
      <ReferenceSection
        title="n8n Node Types"
        icon="🔧"
        darkMode={darkMode}
      >
        <ul className="space-y-2">
          {reference.n8nNodeTypes.map((node, idx) => (
            <li key={idx} className={`flex items-start gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <span 
                className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                  darkMode ? 'bg-blue-400' : 'bg-blue-600'
                }`}
                aria-hidden="true"
              />
              {node}
            </li>
          ))}
        </ul>
      </ReferenceSection>
    </div>
  </div>
);

export default ReferenceView;
export { ReferenceSection };
