'use client';

import Container from '@/components/layout/Container';
import PageHeader from '@/components/ui/PageHeader';
import Dashboard from '@/components/dashboard/Dashboard';

export default function Home() {
  return (
    <Container>
      <div className="space-y-8">
        <PageHeader
          title="Dashboard"
          subtitle="Overview of all calculator sections"
        />

        <Dashboard />
      </div>
    </Container>
  );
}
