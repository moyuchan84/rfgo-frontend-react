import React, { useState } from 'react';
import ProcessplanSelector from '../components/ProcessplanSelector';
import BeolOptionSelector from '../components/BeolOptionSelector';
import ProductSelector from '../components/ProductSelector';
import { RadioGroup } from 'devextreme-react/radio-group';

const enum RequestType {
  New = 'New',
  Rev = 'Rev',
}

const requestTypes = [RequestType.New, RequestType.Rev];

const Request: React.FC = () => {
  const [selectedProcessplan, setSelectedProcessplan] = useState<number | null>(null);
  const [selectedBeolOption, setSelectedBeolOption] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [requestType, setRequestType] = useState<RequestType>(RequestType.New);

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
      <ProcessplanSelector onSelect={setSelectedProcessplan} />
      {selectedProcessplan && (
        <BeolOptionSelector
          processplanId={selectedProcessplan}
          onSelect={setSelectedBeolOption}
        />
      )}
      {selectedBeolOption && selectedProcessplan && (
        <ProductSelector
          beolOptionId={selectedBeolOption}
          processplanId={selectedProcessplan}
          onSelect={setSelectedProduct}
        />
      )}
      {selectedProduct && (
        <div>
          <h3>Selected Product ID: {selectedProduct}</h3>
        </div>
      )}
    </div>
  );
};

export default Request;
