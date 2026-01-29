import React from 'react';
import Button from '@/components/ui/Button';

interface CalculatorActionsProps {
  onExport?: () => void;
  onReset: () => void;
  hasResults: boolean;
}

export default function CalculatorActions({
  onExport,
  onReset,
  hasResults,
}: CalculatorActionsProps) {
  return (
    <div className="flex gap-3 justify-center mt-6">
      {hasResults && onExport && (
        <Button variant="success" onClick={onExport}>
          Export Results
        </Button>
      )}
      <Button variant="secondary" onClick={onReset}>
        Clear All
      </Button>
    </div>
  );
}
