import React, { useState, useMemo, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import ProcessplanSelector from '../components/ProcessplanSelector';
import BeolOptionSelector from '../components/BeolOptionSelector';
import ProductSelector from '../components/ProductSelector';
import { ProductKeyTableService } from '../../application/services/ProductKeyTableService';
import { ProductKeyTableRepository } from '../../domain/repositories/ProductKeyTableRepository';
import List from 'devextreme-react/list';
import DataGrid, { Column, Paging, FilterRow } from 'devextreme-react/data-grid';

import './KeyTable.css';

const KeyTable: React.FC = () => {
  const [selectedProcessplanId, setProcessplanId] = useState<number | null>(null);
  const [selectedBeolOptionId, setBeolOptionId] = useState<number | null>(null);
  const [selectedProductId, setProductId] = useState<number | null>(null);

  const [keyTables, setKeyTables] = useState<any[]>([]);
  const [selectedKeyTable, setSelectedKeyTable] = useState<any | null>(null);
  const [gridData, setGridData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const client = useApolloClient();
  const productKeyTableService = useMemo(
    () => new ProductKeyTableService(new ProductKeyTableRepository(client)),
    [client],
  );

  useEffect(() => {
    if (!selectedProductId) {
      setKeyTables([]);
      setSelectedKeyTable(null);
      return;
    }

    const fetchKeyTables = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productKeyTableService.getProductKeyTablesByProductId(selectedProductId);
        setKeyTables(data);
        setSelectedKeyTable(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeyTables();
  }, [selectedProductId, productKeyTableService]);

  useEffect(() => {
    if (selectedKeyTable && selectedKeyTable.keyTableJson) {
      try {
        const jsonData = selectedKeyTable.keyTableJson;
        setGridData(Array.isArray(jsonData) ? jsonData : []);
      } catch (e) {
        console.error('Failed to parse keyTableJson', e);
        setGridData([]);
      }
    } else {
      setGridData([]);
    }
  }, [selectedKeyTable]);

  const handleListSelectionChange = (e: any) => {
    console.log(e);
    if (e.addedItems.length > 0) {
      setSelectedKeyTable(e.addedItems[0]);
    }
  };

  const handleProcessplanSelect = (id: number | null) => {
    setProcessplanId(id);
    setBeolOptionId(null);
    setProductId(null);
    setKeyTables([]);
    setSelectedKeyTable(null);
  };

  const handleBeolOptionSelect = (id: number | null) => {
    setBeolOptionId(id);
    setProductId(null);
    setKeyTables([]);
    setSelectedKeyTable(null);
  };

  return (
    <div className="key-table-page">
      <div className="card">
        <div className="card-header">Search</div>
        <div className="card-body search-box">
          <ProcessplanSelector onSelect={handleProcessplanSelect} />
          {selectedProcessplanId && (
            <BeolOptionSelector
              processplanId={selectedProcessplanId}
              onSelect={handleBeolOptionSelect}
            />
          )}
          {selectedBeolOptionId && selectedProcessplanId && (
            <ProductSelector
              beolOptionId={selectedBeolOptionId}
              processplanId={selectedProcessplanId}
              onSelect={setProductId}
            />
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">KeyTable</div>
        <div className="card-body key-table-box">
          <div className="key-table-list">
            {loading ? (
              <p>Loading Key Tables...</p>
            ) : (
              <List
                dataSource={keyTables}
                displayExpr="keyTableName"
                onSelectionChanged={handleListSelectionChange}
                searchEnabled={true}
                searchExpr="keyTableName"
                height="100%"
                noDataText="Select a Product to see Key Tables"
                selectionMode="single"
              />
            )}
          </div>
          <div className="key-table-grid">
            {error && <p>Error: {error.message}</p>}
            <DataGrid
              dataSource={gridData}
              showBorders={true}
              columnAutoWidth={true}
              hoverStateEnabled={true}
              noDataText="Select a Key Table from the list"
            >
              <Paging defaultPageSize={15} />
              <FilterRow visible={true} />
              {Object.keys(gridData[0] || {}).map((key) => (
                <Column
                  key={key}
                  dataField={key}
                  caption={key.charAt(0).toUpperCase() + key.slice(1)}
                />
              ))}
            </DataGrid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyTable;
