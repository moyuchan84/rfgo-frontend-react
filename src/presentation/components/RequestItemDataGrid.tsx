
import React, { useEffect } from 'react';
import { DataGrid } from 'devextreme-react/data-grid';
import { useRequestItemStore } from '../../application/store/requestItemStore';
import { RequestItemService } from '../../application/services/RequestItemService';
import { RequestItemRepositoryImpl } from '../../data/repositories/RequestItemRepositoryImpl';

const requestItemRepository = new RequestItemRepositoryImpl();
const requestItemService = new RequestItemService(requestItemRepository);

import { Column } from 'devextreme-react/data-grid';

const RequestItemDataGrid: React.FC = () => {
  const { requestItems, loading, error, fetchRequestItems } = useRequestItemStore();

  useEffect(() => {
    const fromTime = new Date();
    fromTime.setDate(fromTime.getDate() - 7);
    const endTime = new Date();
    fetchRequestItems(requestItemService, fromTime, endTime);
  }, [fetchRequestItems]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <DataGrid dataSource={requestItems} showBorders={true} width="80%" columnAutoWidth={true}>
      <Column dataField="id" caption="ID" />
      <Column dataField="title" caption="Title" />
      <Column dataField="description" caption="Description" />
      <Column dataField="requesterName" caption="Requester Name" />
      <Column dataField="updateTime" caption="Update Time" dataType="datetime" />
      <Column dataField="product.name" caption="Product Name" />
      <Column dataField="product.processplan.name" caption="Process Plan Name" />
      <Column dataField="product.beolOption.name" caption="Beol Option Name" />
    </DataGrid>
  );
};

export default RequestItemDataGrid;
