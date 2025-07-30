import React, { useState } from 'react';
import ProcessplanSelector from '../components/ProcessplanSelector';
import BeolOptionSelector from '../components/BeolOptionSelector';
import ProductSelector from '../components/ProductSelector';

const Request: React.FC = () => {
  const [selectedProcessplan, setSelectedProcessplan] = useState<number | null>(null);
  const [selectedBeolOption, setSelectedBeolOption] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  return (
    <div>
      <h1>Request Page</h1>
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
