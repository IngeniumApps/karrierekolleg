import clsx from 'clsx';

export interface CollegeCardProps {
    name: string;
    topic: string;
    link: string;
    color: string;
}

export default function CollegeCard({ name, topic, link, color }: CollegeCardProps) {
    return (
        <a
            href={link}
            className="group relative overflow-hidden rounded-3xl border border-gray-200 shadow-lg p-6 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-primary/40"
        >
            {/* Decorative rotated background shape */}
            <div
                className={clsx(
                    'absolute -top-4 -left-4 w-20 h-20 rotate-45 opacity-10',
                    color
                )}
                aria-hidden="true"
            />

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition">
                {name}
            </h3>

            {/* Topic badge */}
            <span
                className={clsx(
                    'inline-block mt-3 text-xs font-semibold text-white px-3 py-1 rounded-full',
                    color
                )}
            >
        {topic}
      </span>
        </a>
    );
}