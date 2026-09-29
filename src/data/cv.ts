// CV content. The /cv page renders this; "Save as PDF" uses the print stylesheet.
// Replace the placeholder entries with your real history.

export const cv = {
  summary:
    'Game developer specializing in C++ gameplay systems in Unreal Engine, with a background in systems engineering and a workflow built around Claude Code and custom MCP tooling.',

  skills: [
    { group: 'Languages', items: ['C++', 'Blueprints', 'TypeScript', 'PowerShell'] },
    { group: 'Engine', items: ['Unreal Engine 5', 'Gameplay Ability System', 'Enhanced Input', 'Niagara', 'UMG'] },
    { group: 'Tools', items: ['Claude Code', 'MCP servers', 'Git / GitHub', 'Visual Studio / Rider', 'Perforce'] },
  ],

  experience: [
    {
      role: 'Independent Game Developer',
      org: 'Self-directed',
      period: '20XX – Present',
      points: ['Placeholder: shipped X, built Y system in C++, etc.'],
    },
    {
      role: 'Senior Engineer',
      org: 'Placeholder Company',
      period: '20XX – Present',
      points: ['Placeholder: transferable experience (automation, systems, tooling).'],
    },
  ],

  // Game projects are pulled from the games collection automatically.
  education: [{ title: 'Placeholder degree / certification', org: 'Institution', period: '20XX' }],
};
