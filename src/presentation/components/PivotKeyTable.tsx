import React, { useMemo } from 'react';
import { DataGrid, Column } from 'devextreme-react/data-grid';
import { useKeyTableStore } from '../../application/store/keyTableStore';
import _ from 'lodash';

const PivotKeyTable: React.FC = () => {
  const { keyTables } = useKeyTableStore();

  const { pivotedData, columns } = useMemo(() => {
    if (!keyTables || keyTables.length === 0) {
      return { pivotedData: [], columns: [] };
    }

    const columnNames = _.uniq(keyTables.map((kt) => kt.keyTableName));

    const allSteps = _.uniq(
      _.flatten(
        keyTables.map((kt) =>
          Array.isArray(kt.keyTableJson) ? kt.keyTableJson.map((item) => item.step) : [],
        ),
      ),
    );

    const pivotedDataMap = new Map<string, any>();
    allSteps.forEach((step) => {
      pivotedDataMap.set(step, { step });
    });

    keyTables.forEach((keyTable) => {
      if (Array.isArray(keyTable.keyTableJson)) {
        keyTable.keyTableJson.forEach((item) => {
          if (pivotedDataMap.has(item.step)) {
            const row = pivotedDataMap.get(item.step);
            row[keyTable.keyTableName] = item.count;
          }
        });
      }
    });

    const pivotedData = Array.from(pivotedDataMap.values());

    return { pivotedData, columns: columnNames };
  }, [keyTables]);

  if (pivotedData.length === 0) {
    return null;
  }

  return (
    <div className="pivot-key-table-container" style={{ marginTop: '2rem' }}>
      <h2>Pivot Key Table</h2>
      <DataGrid dataSource={pivotedData} showBorders={true} columnAutoWidth={true} keyExpr="step">
        <Column dataField="step" caption="Step" />
        {columns.map((colName) => (
          <Column key={colName} dataField={colName} caption={colName} />
        ))}
      </DataGrid>
    </div>
  );
};

export default PivotKeyTable;
