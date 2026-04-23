export interface Block {
  type:
    | 'hero'
    | 'feature-list'
    | 'steps'
    | 'two-columns'
    | 'cta';
  headline?: string;
  subheadline?: string;
  cta?: string;
  intro?: string;
  items?: { title: string; description?: string }[];
  columns?: {
    heading: string;
    items: { title: string; description?: string }[];
  }[];
}

export interface Section {
  id: string;
  title: string;
  content: string;
  blocks?: Block[];
}

export interface Stage {
  id: string;
  label: string;
  path: string;
  sections: Section[];
}

const makeSections = (stageLabel: string): Section[] => [
  {
    id: 'section-1',
    title: `${stageLabel} — Section 1`,
    content:
      'Welcome to the first section. This area introduces the core concepts and sets the stage for everything that follows. Take a moment to orient yourself before moving on.',
  },
  {
    id: 'section-2',
    title: `${stageLabel} — Section 2`,
    content:
      'In this section we dive into the supporting details. Here you will find the context needed to understand the broader picture. Each element connects back to the foundation laid in Section 1.',
  },
  {
    id: 'section-3',
    title: `${stageLabel} — Section 3`,
    content:
      'Section three explores practical applications. Real-world scenarios are outlined here to bridge the gap between theory and execution. Consider how these ideas apply to your own workflow.',
  },
  {
    id: 'section-4',
    title: `${stageLabel} — Section 4`,
    content:
      'This section covers advanced considerations. Edge cases, performance implications, and scalability concerns are addressed. Understanding these trade-offs is essential for robust decision-making.',
  },
  {
    id: 'section-5',
    title: `${stageLabel} — Section 5`,
    content:
      'Section five presents comparative analysis. Different approaches are weighed against each other so you can choose the path that best fits your requirements and constraints.',
  },
  {
    id: 'section-6',
    title: `${stageLabel} — Section 6`,
    content:
      'The final section wraps everything up with a summary and forward-looking outlook. Next steps are proposed, and key takeaways are highlighted for quick reference.',
  },
];

const seniorsSections: Section[] = [
  {
    id: 'about',
    title: 'About',
    content: '',
    blocks: [
      {
        type: 'hero',
        headline: 'Find people and activities near you',
        subheadline:
          'Elda is a simple mobile app that helps you connect with others and join activities in your area.',
        cta: 'Download the app',
        intro:
          'Finding company and activities can become more difficult over time. Elda makes it easier to connect with people nearby and take part in everyday activities.',
      },
    ],
  },
  {
    id: 'with-elda',
    title: 'With Elda, you can:',
    content: '',
    blocks: [
      {
        type: 'feature-list',
        items: [
          { title: 'Meet new pals with similar interests' },
          { title: 'See people in your area' },
          { title: 'Find activities that match your interests' },
          { title: 'Arrange to meet in a simple way' },
          { title: 'Stay socially active' },
        ],
      },
    ],
  },
  {
    id: 'how-it-works',
    title: 'How it works',
    content: '',
    blocks: [
      {
        type: 'steps',
        items: [
          {
            title: 'Download the app',
            description: 'Install Elda on your phone',
          },
          {
            title: 'Create a simple profile',
            description: 'Add basic information about yourself',
          },
          {
            title: 'Find and join activities',
            description: 'Connect with people and meet in real life',
          },
        ],
      },
    ],
  },
  {
    id: 'why-elda',
    title: 'Why Elda',
    content: '',
    blocks: [
      {
        type: 'two-columns',
        columns: [
          {
            heading: 'Designed for easy usage',
            items: [
              { title: 'No previous experience required' },
              { title: 'Step-by-step guidance' },
            ],
          },
          {
            heading: 'Safe and reliable',
            items: [
              { title: 'Real user profiles' },
              { title: 'Moderated environment' },
              { title: 'Your personal data is protected' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'get-started',
    title: 'Get started',
    content: '',
    blocks: [
      {
        type: 'cta',
        headline: 'Download Elda and explore what is available near you.',
        cta: 'Download the app',
      },
    ],
  },
];

export const stages: Stage[] = [
  {
    id: 'main',
    label: 'Seniors',
    path: '/',
    sections: seniorsSections,
  },
  {
    id: 'stage-1',
    label: 'Stage 1',
    path: '/stage-1',
    sections: makeSections('Stage 1'),
  },
  {
    id: 'stage-2',
    label: 'Stage 2',
    path: '/stage-2',
    sections: makeSections('Stage 2'),
  },
  {
    id: 'stage-3',
    label: 'Stage 3',
    path: '/stage-3',
    sections: makeSections('Stage 3'),
  },
];
