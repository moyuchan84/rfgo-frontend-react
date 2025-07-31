import React, { useEffect, useState, useMemo } from 'react';
import { SelectBox } from 'devextreme-react/select-box';
import { useApolloClient } from '@apollo/client';
import { BeolOptionService } from '../../application/services/BeolOptionService';
import { BeolOptionRepository } from '../../domain/repositories/BeolOptionRepository';

interface BeolOptionSelectorProps {
  processplanId: number;
  onSelect: (beolOptionId: number | null) => void;
}

const BeolOptionSelector: React.FC<BeolOptionSelectorProps> = ({ processplanId, onSelect }) => {
  const client = useApolloClient();
  const beolOptionService = useMemo(
    () => new BeolOptionService(new BeolOptionRepository(client)),
    [client],
  );

  const [beolOptions, setBeolOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!processplanId) {
      setBeolOptions([]);
      return;
    }

    const fetchBeolOptions = async () => {
      try {
        setLoading(true);
        const data = await beolOptionService.getBeolOptionsByProcessplanId(processplanId);
        setBeolOptions(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchBeolOptions();
  }, [processplanId, beolOptionService]);

  const handleCustomItemCreating = async (e: any) => {
    if (!e.text) {
      return;
    }

    try {
      const newBeolOption = await beolOptionService.createBeolOption({
        processplanId,
        name: e.text,
      });
      setBeolOptions((prev) => [...prev, newBeolOption]);
      e.customItem = newBeolOption;
    } catch (err) {
      console.error('Error creating beol option:', err);
      // Handle error appropriately, maybe show a toast
    }
  };

  if (!processplanId) return null;
  if (loading) return <p>Loading beol options...</p>;
  if (error) return <p>Error loading beol options: {error.message}</p>;

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
          onValueChanged={(e) => {
            onSelect(e.value);
          }}
          placeholder="Search or create a new Beol Option"
        />
      </div>
    </div>
  );
};

export default BeolOptionSelector;
