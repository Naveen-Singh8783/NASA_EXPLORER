import type { ReactNode } from 'react';


interface SectionProps { title: string; subtitle?: string; children: ReactNode; action?: ReactNode }
export default function Section({ title, subtitle, children, action }: SectionProps) {
return (
<section className="container my-8">
<div className="flex items-end justify-between mb-4">
<div>
<h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
{subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
</div>
{action}
</div>
<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 md:p-6 shadow-soft">
{children}
</div>
</section>
);
}