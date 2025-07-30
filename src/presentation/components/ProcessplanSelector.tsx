import React from 'react';
import { SelectBox } from 'devextreme-react/select-box';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_PROCESSPLANS = gql`
  query GetProcessplans {
    processplans {
      id
      designRule
    }
  }
`;

const CREATE_PROCESSPLAN = gql`
  mutation CreateProcessplan($designRule: String!) {
    createProcessplan(createProcessplanInput: { designRule: $designRule }) {
      id
      designRule
    }
  }
`;

interface ProcessplanSelectorProps {
  onSelect: (processplanId: number) => void;
}

const ProcessplanSelector: React.FC<ProcessplanSelectorProps> = ({ onSelect }) => {
  const { loading, error, data, refetch } = useQuery(GET_PROCESSPLANS);
  const [createProcessplan] = useMutation(CREATE_PROCESSPLAN);

  const [processplans, setProcessplans] = React.useState([]);

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
        refetch();
        return result.data.createProcessplan;
      });
  };

  if (loading) return <p>Loading process plans...</p>;
  if (error) return <p>Error loading process plans :(</p>;

  return (
    <div className="dx-field">
      <div className="dx-field-label">Process Plan</div>
      <div className="dx-field-value">
        <SelectBox
          dataSource={processplans}
          displayExpr="designRule"
          valueExpr="id"
          searchEnabled={true}
          onCustomItemCreating={handleCustomItemCreating}
          onValueChanged={(e) => onSelect(e.value)}
          placeholder="Search or create a new Process Plan"
        />
      </div>
    </div>
  );
};

export default ProcessplanSelector;
