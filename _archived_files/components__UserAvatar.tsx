'use client';

import { useMemo } from 'react';

interface UserAvatarProps {
  name: string;
  email: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export function UserAvatar({
  name,
  email,
  size = 'md',
  onClick,
  className = '',
}: UserAvatarProps) {
  const initials = useMemo(() => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [name]);

  const backgroundColor = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = ((hash << 5) - hash) + email.charCodeAt(i);
      hash = hash & hash;
    }

    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-orange-500',
      'bg-red-500',
      'bg-indigo-500',
      'bg-cyan-500',
      'bg-teal-500',
      'bg-emerald-500',
    ];

    return colors[Math.abs(hash) % colors.length];
  }, [email]);

  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${backgroundColor}
        rounded-full
        flex items-center justify-center
        text-white font-semibold
        flex-shrink-0
        ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
        ${className}
      `}
      onClick={onClick}
      title={name}
    >
      {initials || '?'}
    </div>
  );
}

export function UserAvatarWithName({
  name,
  email,
  size = 'md',
  onClick,
}: Omit<UserAvatarProps, 'className'>) {
  return (
    <div className="flex items-center gap-2">
      <UserAvatar name={name} email={email} size={size} onClick={onClick} />
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
          {name}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
          {email}
        </p>
      </div>
    </div>
  );
}
