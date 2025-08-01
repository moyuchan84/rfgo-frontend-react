import React from 'react';
import ProcessplanSelector from './ProcessplanSelector';
import BeolOptionSelector from './BeolOptionSelector';
import ProductSelector from './ProductSelector';
import { useKeyTableStore } from '../../application/store/keyTableStore';

const KeyTableSearch: React.FC = () => {
  const {
    selectedProcessplanId,
    selectedBeolOptionId,
    setProcessplanId,
    setBeolOptionId,
    setProductId,
  } = useKeyTableStore();

  return (
    <div className="card">
      <div className="card-header">Search</div>
      <div className="card-body search-box">
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
      </div>
    </div>
  );
};

export default KeyTableSearch;
