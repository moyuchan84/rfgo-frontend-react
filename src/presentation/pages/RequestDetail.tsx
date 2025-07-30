import React from 'react';
import { useParams } from 'react-router-dom';

const RequestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <div>Request Detail Page for ID: {id}</div>;
};

export default RequestDetail;
