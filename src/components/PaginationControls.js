import React from 'react';
import { Button } from '@mui/material';

const PaginationControls = ({ currentPage, onNext, onPrev }) => (
  <div>
    <Button onClick={onPrev} disabled={currentPage <= 1}>
      Previous
    </Button>
    <Button onClick={onNext}>Next</Button>
  </div>
);

export default PaginationControls;
