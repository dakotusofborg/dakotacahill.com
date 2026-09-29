// CV content. The /cv page renders this; "Save as PDF" uses the print stylesheet.
// Game projects are pulled from the games collection automatically.
// Keep client names out of this file: it's public.

export const cv = {
  headline: 'Game Developer · Systems Engineer',
  location: 'New York Metro Region',

  summary:
    'C++ / Unreal Engine game developer with 8+ years in IT, from help desk to systems engineering. I build automation and tooling that other people rely on: PowerShell and RMM self-healing scripts, API integrations, and a suite of custom MCP servers that connect Claude Code to production platforms. Now bringing that systems and tooling background to game development.',

  experience: [
    {
      role: 'Systems Engineer',
      org: 'TeamLogic IT',
      location: 'New York, NY · Hybrid',
      period: 'Feb 2026 – Present',
      points: [
        'Engineer and operate Microsoft 365 and Azure environments (Entra ID, Intune, Exchange Online, VMs, SQL, Backup Vault) across 9+ client organizations',
        'Build PowerShell and NinjaRMM automation for endpoint remediation: EDR agent deployment, compliance fixes, and RMM-triggered self-healing scripts',
        'Design Zero Trust architecture with Microsoft Entra Private Access (ZTNA) and Conditional Access, replacing legacy VPN with identity-based segmentation',
        'Run the endpoint and email security stack (SentinelOne, Blackpoint MDR, Defender, Proofpoint) and lead business-email-compromise investigations',
        'Author disaster recovery and incident response plans aligned to RPO/RTO targets for regulated financial and CPA clients',
      ],
    },
    {
      role: 'Infrastructure Engineer',
      org: 'Petersen Games',
      location: 'New York, NY',
      period: 'Aug 2025 – Present',
      points: [
        'Run infrastructure and support operations for a tabletop and digital game publisher, sustaining 95% SLA (<24h) across 100+ weekly tickets through custom API integrations',
        'Developed backend Liquid templates for the Shopify storefront, reducing render errors by 60%',
        'Integrated ML-based ticket classification in Freshdesk to auto-route issues, cutting initial triage time by 40%',
        'Partner with engineering on backend issues for globally distributed gaming products',
      ],
    },
    {
      role: 'Client Services Engineer',
      org: 'RFA (Fintech)',
      location: 'New York, NY',
      period: 'Oct 2024 – Mar 2025',
      points: [
        'Led migrations of financial institutions from on-prem Active Directory to Entra ID with full FINRA/SEC compliance',
        'Implemented anomaly detection with Azure Sentinel and custom scripts, reducing incident recurrence by 35%',
      ],
    },
    {
      role: 'System Administrator',
      org: 'Cipriani',
      location: 'New York, NY',
      period: 'May 2024 – Aug 2024',
      points: [
        'Wrote PowerShell and Bash automation for user provisioning and maintenance, reducing manual workload by 40%',
        'Built Intune MDM policies and Entra ID Conditional Access rules; configured Meraki and Barracuda networking (VLANs, site-to-site VPN)',
      ],
    },
    {
      role: 'Migration Engineer (Contract)',
      org: 'Fanatics via Robert Half',
      location: 'New York, NY',
      period: 'Jan 2024 – Apr 2024',
      points: [
        'Led the NYC corporate domain migration (mail and OneDrive) with Quest Migration Manager, delivering zero downtime for executive operations',
      ],
    },
    {
      role: 'Deskside Analyst (Contract)',
      org: 'NBC via VortalSoft',
      location: 'New York, NY',
      period: 'Aug 2023 – Jan 2024',
      points: [
        'Supported live broadcast operations for the Today Show control room, resolving time-critical AWS and VPN issues for international contractors',
      ],
    },
    {
      role: 'Technical Support Engineer',
      org: 'Options-IT',
      location: 'New York, NY',
      period: 'Jan 2022 – Dec 2022',
      points: ['Migrated financial firms from on-prem infrastructure to Azure AD, supporting global trading stacks'],
    },
  ],

  earlier: [
    { role: 'Desktop Support Engineer (Contract)', org: 'Barclays Corporate & Investment Bank', period: '2021 – 2022' },
    { role: 'IT Support Specialist (Contract)', org: 'Google', period: '2018 – 2019' },
    { role: 'Wireless Technical Consultant & ASM', org: 'Verizon Wireless / Victra', period: '2018' },
    { role: 'Tech Support (Contract)', org: 'Google', period: '2017 – 2018' },
  ],

  builds: [
    {
      name: 'Custom MCP integration suite',
      stack: 'TypeScript · Model Context Protocol · REST APIs',
      points: [
        'Built 10+ custom MCP servers giving Claude Code live access to PSA, RMM, documentation, identity, security, and network platforms (Autotask, NinjaOne, IT Glue, Microsoft Graph, AWS, Cloudflare, UniFi, and more)',
        'Reverse-engineered undocumented private APIs where no official API existed, including session-based auth and 2FA-gated logins',
        'Designed write-safety guardrails for production systems: per-account write opt-in, dry-run modes, and confirm-by-ID on every mutation',
      ],
    },
    {
      name: 'dakotacahill.com',
      stack: 'Astro · TypeScript · Cloudflare Workers',
      points: ['This site: a type-checked content pipeline for games, devlogs, and CV, deployed on Cloudflare'],
    },
    {
      name: 'Hybrid infrastructure home lab',
      stack: 'Windows Server 2022 · Hyper-V · Docker',
      points: [
        'Domain controller, DNS/DHCP, GPO hardening, VLAN segmentation, and site-to-site VPN across Windows and Linux endpoints',
      ],
    },
  ],

  skills: [
    { group: 'Game Development', items: ['C++', 'Unreal Engine 5', 'Blueprints', 'Git / GitHub'] },
    { group: 'AI Tooling', items: ['Claude Code', 'MCP servers', 'Agentic workflows'] },
    {
      group: 'Programming & Automation',
      items: ['TypeScript', 'PowerShell', 'Python', 'Bash', 'REST APIs', 'Liquid', 'Terraform', 'Ansible'],
    },
    { group: 'Cloud & Identity', items: ['Azure', 'Entra ID', 'Intune', 'Microsoft 365', 'AWS'] },
    {
      group: 'Security & Networking',
      items: ['Zero Trust / ZTNA', 'Conditional Access', 'SentinelOne', 'Defender', 'Cisco', 'Meraki', 'Fortinet'],
    },
    { group: 'Infrastructure', items: ['Windows Server', 'Active Directory', 'Hyper-V', 'VMware', 'Docker', 'Linux'] },
  ],

  education: [{ title: 'B.S. Computer Science (coursework completed)', org: 'Western Governors University', period: '2017' }],

  certifications: [{ title: 'CompTIA A+', period: '2018' }],
};
