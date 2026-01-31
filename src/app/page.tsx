'use client';

import Container from '@/components/layout/Container';
import PageHeader from '@/components/ui/PageHeader';
import NonMaskingDashboardSection from '@/components/dashboard/NonMaskingDashboardSection';

export default function Home() {
  return (
    <Container>
      <div className="space-y-8">
        <PageHeader
          title="Dashboard"
          subtitle="Overview of all calculator sections"
        />

        <NonMaskingDashboardSection />
      </div>
    </Container>
  );
}
