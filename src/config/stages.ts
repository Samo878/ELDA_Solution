export interface Section {
  id: string;
  title: string;
  content: string;
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

export const stages: Stage[] = [
  {
    id: 'main',
    label: 'Main',
    path: '/',
    sections: makeSections('Main'),
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
