import React from 'react';
import ProcessplanSelector from '../components/ProcessplanSelector';
import BeolOptionSelector from '../components/BeolOptionSelector';
import ProductSelector from '../components/ProductSelector';
import { RadioGroup } from 'devextreme-react/radio-group';
import { useRequestStore } from '../../application/store/requestStore';

const enum RequestType {
  New = 'New',
  Rev = 'Rev',
}

const requestTypes = [RequestType.New, RequestType.Rev];

const Request: React.FC = () => {
  const {
    selectedProcessplanId,
    selectedBeolOptionId,
    selectedProductId,
    requestType,
    setProcessplanId,
    setBeolOptionId,
    setProductId,
    setRequestType,
  } = useRequestStore();

  return (
    <div>
      <div className="dx-field">
        <div className="dx-field-label">Request Type</div>
        <div className="dx-field-value">
          <RadioGroup
            dataSource={requestTypes}
            value={requestType}
            onValueChanged={(e) => setRequestType(e.value)}
            layout="horizontal"
          />
        </div>
      </div>
      <ProcessplanSelector onSelect={setProcessplanId} />
      {selectedProcessplanId && (
        <BeolOptionSelector
          processplanId={selectedProcessplanId}
          onSelect={setBeolOptionId}
        />
      )}
      {selectedBeolOptionId && selectedProcessplanId && (
        <ProductSelector
          beolOptionId={selectedBeolOptionId}
          processplanId={selectedProcessplanId}
          onSelect={setProductId}
        />
      )}
      {selectedProductId && (
        <div>
          <h3>Selected Product ID: {selectedProductId}</h3>
        </div>
      )}
    </div>
  );
};

export default Request;
