import React from 'react';
import List from 'devextreme-react/list';
import DataGrid, { Column, Paging, FilterRow } from 'devextreme-react/data-grid';
import { useKeyTableStore } from '../../application/store/keyTableStore';

const KeyTableDisplay: React.FC = () => {
  const { keyTables, gridData, loading, error, setSelectedKeyTable } = useKeyTableStore();

  const handleListSelectionChange = (e: any) => {
    if (e.addedItems.length > 0) {
      setSelectedKeyTable(e.addedItems[0]);
    }
  };

  return (
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
  );
};

export default KeyTableDisplay;
