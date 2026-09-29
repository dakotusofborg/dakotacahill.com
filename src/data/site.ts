// Single source of truth for identity + contact links.
// Leave a link as '' to hide it everywhere.
export const site = {
  name: 'Dakota Cahill',
  handle: 'dakotacahill',
  title: 'Game Developer',
  class: 'Systems Engineer → Game Dev', // shown on the "character sheet"
  tagline: 'C++ and Unreal Engine. Building games and the tools that make them.',
  description:
    'Portfolio of Dakota Cahill, a C++ / Unreal Engine game developer and systems engineer. Playable builds, source code, devlogs, and CV.',
  email: 'dakota.cahill@protonmail.com',
  links: {
    github: 'https://github.com/dakotusofborg',
    itch: '',
    linkedin: 'https://www.linkedin.com/in/dakotajcahill/',
    youtube: '',
  },
};

export const nav = [
  { href: '/games/', label: 'Games' },
  { href: '/blog/', label: 'Devlog' },
  { href: '/workflow/', label: 'Workflow' },
  { href: '/cv/', label: 'CV' },
  { href: '/about/', label: 'About' },
];
