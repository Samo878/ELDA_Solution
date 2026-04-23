import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const { activeIndex, scrollTo, containerRef } = useFullPageScroll(
    stage.sections.length,
  );

  // Reset scroll to section 1 when logo is clicked (even on same route)
  useEffect(() => {
    if (location.state?.resetScroll) {
      scrollTo(0);
    }
  }, [location.state?.resetScroll, scrollTo]);

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
