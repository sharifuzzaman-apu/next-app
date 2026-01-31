import React from 'react';
import Link from 'next/link';

interface SectionHeaderProps {
  icon: string;
  title: string;
  linkHref: string;
  linkText: string;
}

export default function SectionHeader({
  icon,
  title,
  linkHref,
  linkText,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h2>
      <Link
        href={linkHref}
        className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1"
      >
        {linkText} →
      </Link>
    </div>
  );
}
