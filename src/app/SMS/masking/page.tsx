import Container from '@/components/layout/Container';
import PageHeader from '@/components/ui/PageHeader';
export default function MaskingCalculator() {
  return (
    <Container>
      <div className="space-y-8">
        <PageHeader
          title="Masking SMS Calculator"
          subtitle="Calculate billing and gross profit for masking SMS services"
        />
        <h1 className="text-center text-blue-600 font-semibold text-2xl border-2 border-dashed border-blue-300 p-8 rounded-lg shadow-md">
          Masking Calculator Feature is Coming Soon
        </h1>
      </div>
    </Container>
  );
}
