import { useMemo } from 'react';
import type { Stage } from '../../config/stages';
import { useFullPageScroll } from '../../hooks/useFullPageScroll';
import Sidebar from '../../components/Sidebar/Sidebar';
import FullPageScroll from '../../components/FullPageScroll/FullPageScroll';
import SectionContent from '../../components/SectionContent/SectionContent';
import '../../components/SectionContent/SectionContent.css';

interface StagePageProps {
  stage: Stage;
}

export default function StagePage({ stage }: StagePageProps) {
  const { activeIndex, scrollTo, containerRef } = useFullPageScroll(
    stage.sections.length,
  );

  const sectionElements = useMemo(
    () =>
      stage.sections.map((_, i) => (
        <SectionContent key={i} stage={stage} sectionIndex={i} />
      )),
    [stage],
  );

  return (
    <>
      <Sidebar
        sections={stage.sections}
        activeIndex={activeIndex}
        onSelect={scrollTo}
      />
      <FullPageScroll
        activeIndex={activeIndex}
        containerRef={containerRef}
      >
        {sectionElements}
      </FullPageScroll>
    </>
  );
}
