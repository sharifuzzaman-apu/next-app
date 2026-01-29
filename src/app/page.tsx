import Link from 'next/link';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';

export default function Home() {
  return (
    <Container>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-2xl text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to SMS Billing Calculator
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Calculate SMS billing and gross profit with ease
          </p>

          <div className="space-y-4">
            <Link
              href="/non-masking"
              className="block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              Open Non-Masking Calculator →
            </Link>

            <p className="text-sm text-gray-500">
              More calculator types coming soon...
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                📊 Accurate Calculations
              </h3>
              <p className="text-sm text-gray-600">
                Precise billing calculations with VAT and profit margins
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                🚀 Easy to Use
              </h3>
              <p className="text-sm text-gray-600">
                Simple interface for quick data entry and results
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                📈 Multiple Companies
              </h3>
              <p className="text-sm text-gray-600">
                Calculate for multiple companies at once
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
}
