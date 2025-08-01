import React, { useEffect, useMemo } from 'react';
import { useApolloClient } from '@apollo/client';
import KeyTableSearch from '../components/KeyTableSearch';
import KeyTableDisplay from '../components/KeyTableDisplay';
import { useKeyTableStore } from '../../application/store/keyTableStore';
import { ProductKeyTableService } from '../../application/services/ProductKeyTableService';
import { ProductKeyTableRepository } from '../../domain/repositories/ProductKeyTableRepository';
import './KeyTable.css';

const KeyTable: React.FC = () => {
  const { selectedProductId, fetchKeyTables } = useKeyTableStore();
  const client = useApolloClient();
  const productKeyTableService = useMemo(
    () => new ProductKeyTableService(new ProductKeyTableRepository(client)),
    [client],
  );

  useEffect(() => {
    if (selectedProductId) {
      fetchKeyTables(productKeyTableService);
    }
  }, [selectedProductId, fetchKeyTables, productKeyTableService]);

  return (
    <div className="key-table-page">
      <KeyTableSearch />
      <KeyTableDisplay />
    </div>
  );
};

export default KeyTable;