'use client';

import { ReactNode } from 'react';
import StatsCard from './StatsCard';

interface Stat {
  title: string;
  value: string | number;
  icon?: ReactNode | string;
  bgColor?: string;
  iconColor?: string;
  valueColor?: string;
  badgeText?: string;
  badgeVariant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'gray';
}

interface BalanceStatsProps {
  stats: Stat[];
}

export default function BalanceStats({ stats = [] }: BalanceStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          bgColor={stat.bgColor}
          iconColor={stat.iconColor}
          valueColor={stat.valueColor}
          badgeText={stat.badgeText}
          badgeVariant={stat.badgeVariant}
        />
      ))}
    </div>
  );
}
