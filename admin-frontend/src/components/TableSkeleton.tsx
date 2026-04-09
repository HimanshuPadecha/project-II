import React from 'react';

interface TableSkeletonProps {
  rows?: number;
  columns: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5, columns }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="animate-pulse border-b border-glass-border border-b-white/5 last:border-none">
          {Array.from({ length: columns }).map((_, j) => (
            <td key={j} className="p-4">
              <div 
                className="h-4 bg-white/10 rounded" 
                style={{ width: `${Math.floor(Math.random() * (100 - 40 + 1)) + 40}%` }}
              ></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};
