import type { Stage } from '../../config/stages';

interface SectionContentProps {
  stage: Stage;
  sectionIndex: number;
}

export default function SectionContent({ stage, sectionIndex }: SectionContentProps) {
  const section = stage.sections[sectionIndex];
  if (!section) return null;

  return (
    <div className="section-content">
      <span className="section-content__label">{stage.label}</span>
      <h1 className="section-content__title">{section.title}</h1>
      <p className="section-content__text">{section.content}</p>
      <div className="section-content__indicator">
        {sectionIndex + 1} / {stage.sections.length}
      </div>
    </div>
  );
}
