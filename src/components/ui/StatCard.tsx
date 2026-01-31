import React from 'react';
import Card from '@/components/ui/Card';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  gradient: 'blue' | 'purple' | 'orange' | 'green';
}

const gradientClasses = {
  blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
  purple: 'bg-gradient-to-br from-purple-500 to-purple-600',
  orange: 'bg-gradient-to-br from-orange-500 to-orange-600',
  green: 'bg-gradient-to-br from-green-500 to-green-600',
};

export default function StatCard({
  title,
  value,
  subtitle,
  gradient,
}: StatCardProps) {
  return (
    <Card className={`${gradientClasses[gradient]} text-white`}>
      <p className="text-sm opacity-90 mb-1">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
      {subtitle && <p className="text-xs opacity-75 mt-2">{subtitle}</p>}
    </Card>
  );
}
