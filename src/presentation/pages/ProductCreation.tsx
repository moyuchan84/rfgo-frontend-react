import React, { useState } from 'react';
import { SelectBox } from 'devextreme-react/select-box';
import { gql, useQuery, useMutation } from '@apollo/client';

// GraphQL query to fetch process plans
const GET_PROCESSPLANS = gql`
  query GetProcessplans {
    processplans {
      id
      designRule
    }
  }
`;

// GraphQL mutation to create a process plan
const CREATE_PROCESSPLAN = gql`
  mutation CreateProcessplan($designRule: String!) {
    createProcessplan(createProcessplanInput: { designRule: $designRule }) {
      id
      designRule
    }
  }
`;

const ProductCreation: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_PROCESSPLANS);
  const [createProcessplan] = useMutation(CREATE_PROCESSPLAN);

  const [processplans, setProcessplans] = useState([]);

  React.useEffect(() => {
    if (data) {
      setProcessplans(data.processplans);
    }
  }, [data]);

  const handleCustomItemCreating = (e: any) => {
    if (!e.text) {
      return;
    }

    e.customItem = createProcessplan({ variables: { designRule: e.text } })
      .then(result => {
        refetch(); // Refetch the list to include the new item
        return result.data.createProcessplan;
      });
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>Product Creation</h2>
      <div className="dx-field">
        <div className="dx-field-label">Process Plan</div>
        <div className="dx-field-value">
          <SelectBox
            dataSource={processplans}
            displayExpr="designRule"
            valueExpr="id"
            searchEnabled={true}
            onCustomItemCreating={handleCustomItemCreating}
            placeholder="Search or create a new Process Plan"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreation;
