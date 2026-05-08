import React from 'react';
import { Button } from '../atoms/Button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { usePagination, DOTS } from '../../hooks/usePagination';

interface PaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="flex items-center space-x-2">
      <li>
        <Button
          variant="outline"
          size="icon"
          onClick={onPrevious}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </li>
      {paginationRange.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return (
            <li key={idx} className="flex h-10 w-10 items-center justify-center">
              <MoreHorizontal className="h-4 w-4" />
            </li>
          );
        }

        return (
          <li key={idx}>
            <Button
              variant={pageNumber === currentPage ? 'primary' : 'ghost'}
              size="icon"
              onClick={() => onPageChange(pageNumber as number)}
            >
              {pageNumber}
            </Button>
          </li>
        );
      })}
      <li>
        <Button
          variant="outline"
          size="icon"
          onClick={onNext}
          disabled={currentPage === lastPage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </li>
    </ul>
  );
};
