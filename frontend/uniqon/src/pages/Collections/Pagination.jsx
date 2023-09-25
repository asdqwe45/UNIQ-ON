import React, { useEffect, useState } from 'react';
import { IconButton, ButtonGroup } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export function Pagination({ currentPage, totalPages, onPageChange }) {
  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const next = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const getPageButtons = () => {
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <IconButton
          key={i}
          onClick={() => onPageChange(i)}
          className={currentPage === i ? 'bg-gray-400 text-gray-900' : ''}
        >
          {i}
        </IconButton>
      );
    }
    return pageButtons;
  };

  return (
    <ButtonGroup variant="outlined">
      <IconButton onClick={prev}>
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      {getPageButtons()}
      {/* <IconButton {...getItemProps(1)}>1</IconButton>
      <IconButton {...getItemProps(2)}>2</IconButton>
      <IconButton {...getItemProps(3)}>3</IconButton>
      <IconButton {...getItemProps(4)}>4</IconButton>
      <IconButton {...getItemProps(5)}>5</IconButton> */}
      <IconButton onClick={next}>
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </ButtonGroup>
  );
}
