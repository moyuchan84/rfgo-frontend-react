import React, { useEffect, useState, useMemo } from 'react';
import { SelectBox } from 'devextreme-react/select-box';
import { useApolloClient } from '@apollo/client';
import { ProductService } from '../../application/services/ProductService';
import { ProductRepository } from '../../domain/repositories/ProductRepository';

interface ProductSelectorProps {
  beolOptionId: number;
  processplanId: number;
  onSelect: (productId: number | null) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
  beolOptionId,
  processplanId,
  onSelect,
}) => {
  const client = useApolloClient();
  const productService = useMemo(() => new ProductService(new ProductRepository(client)), [client]);

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!beolOptionId) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductsByBeolOptionId(beolOptionId);
        setProducts(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [beolOptionId, productService]);

  const handleCustomItemCreating = async (e: any) => {
    if (!e.text) {
      return;
    }

    try {
      const newProduct = await productService.createProduct({
        beolOptionId,
        processplanId,
        name: e.text,
      });
      setProducts((prev) => [...prev, newProduct]);
      e.customItem = newProduct;
    } catch (err) {
      console.error('Error creating product:', err);
      // Handle error appropriately, maybe show a toast
    }
  };

  if (!beolOptionId) return null;
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div className="dx-field">
      <div className="dx-field-label">Product</div>
      <div className="dx-field-value">
        <SelectBox
          dataSource={products}
          displayExpr="productName"
          valueExpr="id"
          searchEnabled={true}
          onCustomItemCreating={handleCustomItemCreating}
          onValueChanged={(e) => {
            onSelect(e.value);
          }}
          placeholder="Search or create a new Product"
        />
      </div>
    </div>
  );
};

export default ProductSelector;
