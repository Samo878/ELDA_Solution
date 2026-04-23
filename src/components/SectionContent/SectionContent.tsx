import type { Stage, Block } from '../../config/stages';

interface SectionContentProps {
  stage: Stage;
  sectionIndex: number;
}

function HeroBlock({ block }: { block: Block }) {
  return (
    <div className="block-hero">
      <h1 className="block-hero__headline">{block.headline}</h1>
      <p className="block-hero__subheadline">{block.subheadline}</p>
      {block.cta && (
        <button className="block-cta-btn" onClick={() => {}}>
          {block.cta}
        </button>
      )}
      {block.intro && <p className="block-hero__intro">{block.intro}</p>}
    </div>
  );
}

function FeatureListBlock({ block }: { block: Block }) {
  return (
    <div className="block-features">
      <ul className="block-features__list">
        {block.items?.map((item, i) => (
          <li key={i} className="block-features__item">
            <span className="block-features__icon">✓</span>
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepsBlock({ block }: { block: Block }) {
  return (
    <div className="block-steps">
      {block.items?.map((item, i) => (
        <div key={i} className="block-steps__step">
          <div className="block-steps__number">{i + 1}</div>
          <div className="block-steps__body">
            <h3 className="block-steps__title">{item.title}</h3>
            {item.description && (
              <p className="block-steps__desc">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function TwoColumnsBlock({ block }: { block: Block }) {
  return (
    <div className="block-columns">
      {block.columns?.map((col, i) => (
        <div key={i} className="block-columns__col">
          <h3 className="block-columns__heading">{col.heading}</h3>
          <ul className="block-columns__list">
            {col.items.map((item, j) => (
              <li key={j} className="block-columns__item">
                <span className="block-columns__bullet" />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function CtaBlock({ block }: { block: Block }) {
  return (
    <div className="block-cta">
      <h2 className="block-cta__headline">{block.headline}</h2>
      {block.cta && (
        <button className="block-cta-btn block-cta-btn--large" onClick={() => {}}>
          {block.cta}
        </button>
      )}
    </div>
  );
}

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case 'hero':
      return <HeroBlock key={index} block={block} />;
    case 'feature-list':
      return <FeatureListBlock key={index} block={block} />;
    case 'steps':
      return <StepsBlock key={index} block={block} />;
    case 'two-columns':
      return <TwoColumnsBlock key={index} block={block} />;
    case 'cta':
      return <CtaBlock key={index} block={block} />;
    default:
      return null;
  }
}

export default function SectionContent({ stage, sectionIndex }: SectionContentProps) {
  const section = stage.sections[sectionIndex];
  if (!section) return null;

  // Rich block-based layout
  if (section.blocks && section.blocks.length > 0) {
    const isHero = section.blocks[0].type === 'hero';
    return (
      <div className="section-content section-content--blocks">
        {!isHero && (
          <h2 className="section-content__section-title">{section.title}</h2>
        )}
        {section.blocks.map((block, i) => renderBlock(block, i))}
      </div>
    );
  }

  // Fallback: generic content layout
  return (
    <div className="section-content">
      <span className="section-content__label">{stage.label}</span>
      <h1 className="section-content__title">{section.title}</h1>
      <p className="section-content__text">{section.content}</p>
    </div>
  );
}
