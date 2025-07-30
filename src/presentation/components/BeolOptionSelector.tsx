import React from 'react';
import { SelectBox } from 'devextreme-react/select-box';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_BEOL_OPTIONS = gql`
  query GetBeolOptions($processplanId: Int!) {
    beolOptionsByProcessplanId(processplanId: $processplanId) {
      id
      optionName
    }
  }
`;

const CREATE_BEOL_OPTION = gql`
  mutation CreateBeolOption($processplanId: Int!, $optionName: String!) {
    createBeolOption(createBeolOptionInput: { processplanId: $processplanId, optionName: $optionName }) {
      id
      optionName
    }
  }
`;

interface BeolOptionSelectorProps {
  processplanId: number;
  onSelect: (beolOptionId: number) => void;
}

const BeolOptionSelector: React.FC<BeolOptionSelectorProps> = ({ processplanId, onSelect }) => {
  const { loading, error, data, refetch } = useQuery(GET_BEOL_OPTIONS, {
    variables: { processplanId },
    skip: !processplanId,
  });
  const [createBeolOption] = useMutation(CREATE_BEOL_OPTION);

  const [beolOptions, setBeolOptions] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      setBeolOptions(data.beolOptionsByProcessplanId);
    }
  }, [data]);

  const handleCustomItemCreating = (e: any) => {
    if (!e.text) {
      return;
    }

    e.customItem = createBeolOption({ variables: { processplanId, optionName: e.text } })
      .then(result => {
        refetch();
        return result.data.createBeolOption;
      });
  };

  if (!processplanId) return null;
  if (loading) return <p>Loading beol options...</p>;
  if (error) return <p>Error loading beol options :(</p>;

  return (
    <div className="dx-field">
      <div className="dx-field-label">Beol Option</div>
      <div className="dx-field-value">
        <SelectBox
          dataSource={beolOptions}
          displayExpr="optionName"
          valueExpr="id"
          searchEnabled={true}
          onCustomItemCreating={handleCustomItemCreating}
          onValueChanged={(e) => onSelect(e.value)}
          placeholder="Search or create a new Beol Option"
        />
      </div>
    </div>
  );
};

export default BeolOptionSelector;
