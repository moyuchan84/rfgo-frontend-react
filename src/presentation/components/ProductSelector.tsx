import React from 'react';
import { SelectBox } from 'devextreme-react/select-box';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts($beolOptionId: Int!) {
    productsByBeolOptionId(beolOptionId: $beolOptionId) {
      id
      productName
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $beolOptionId: Int!
    $processplanId: Int!
    $productName: String!
    $partId: String!
  ) {
    createProduct(
      createProductInput: {
        beolOptionId: $beolOptionId
        processplanId: $processplanId
        productName: $productName
        partId: $partId
      }
    ) {
      id
      productName
    }
  }
`;

interface ProductSelectorProps {
  beolOptionId: number;
  processplanId: number;
  onSelect: (productId: number) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
  beolOptionId,
  processplanId,
  onSelect,
}) => {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: { beolOptionId },
    skip: !beolOptionId,
  });
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      setProducts(data.productsByBeolOptionId);
    }
  }, [data]);

  const handleCustomItemCreating = (e: any) => {
    if (!e.text) {
      return;
    }

    // A partId is required, for now we will use a placeholder.
    const partId = 'temp-part-id';

    e.customItem = createProduct({
      variables: { beolOptionId, processplanId, productName: e.text, partId },
    }).then((result) => {
      refetch();
      return result.data.createProduct;
    });
  };

  if (!beolOptionId) return null;
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products :(</p>;

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
          onValueChanged={(e) => onSelect(e.value)}
          placeholder="Search or create a new Product"
        />
      </div>
    </div>
  );
};

export default ProductSelector;
