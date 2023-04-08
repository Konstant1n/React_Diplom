import React from 'react';
import { useSelector } from 'react-redux';

const ErrorDisplay = () => {
  const error = useSelector(state => state.user.error);
  if (!error) {
    return null;
  }
  return (
    <div className="error">
      <p>{error}</p>
    </div>
  );
};

export default ErrorDisplay;
