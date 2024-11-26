import Link from 'next/link';

export default function Button({ children, href, className = '' }) {
  const baseClass =
    'centerContent w-full h-12 rounded-lg bg-accent-500 shadow text-primary-950 select-none tracking-widest uppercase font-bold text-sm duration-150';
  const disabledClass =
    'opacity-30 cursor-default bg-accent-500 text-primary-500 font-medium';
  const activeClass =
    'hover:cursor-pointer active:scale-[0.98]';

  if (!href) {
    // Render a disabled button
    return (
      <div className="centerContent w-full">
        <button
          className={`${baseClass} ${disabledClass} ${className}`}
          disabled
        >
          {children}
        </button>
      </div>
    );
  }

  const isExternal = href.startsWith('http')

  if (isExternal) {
    return (
      <div className="centerContent w-full">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={`${baseClass} ${activeClass} ${className} flex justify-center items-center`}
        >
          {children}
        </a>
      </div>
    );
  }

  // Internal link (Next.js Link)
  return (
    <div className="centerContent w-full">
      <Link
        href={href}
        className={`${baseClass} ${activeClass} ${className} flex justify-center items-center`}
      >
        {children}
      </Link>
    </div>
  );
}
