import React from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime';

const sizes = {
  md: 'px-5 py-3 text-sm',
  lg: 'px-[30px] py-4 text-base',
} as const;

const variants: Record<Variant, string> = {
  primary: 'bg-lime text-bg hover:bg-lime-2',
  ghost: 'border border-[rgba(244,241,234,0.2)] text-ink hover:border-[rgba(244,241,234,0.45)]',
};

type CommonProps = {
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
