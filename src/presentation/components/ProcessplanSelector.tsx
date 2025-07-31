import React, { useEffect, useState, useMemo } from 'react';
import { SelectBox } from 'devextreme-react/select-box';
import { useApolloClient } from '@apollo/client';
import { ProcessplanService } from '../../application/services/ProcessplanService';
import { ProcessplanRepository } from '../../domain/repositories/ProcessplanRepository';

interface ProcessplanSelectorProps {
  onSelect: (processplanId: number | null) => void;
}

const ProcessplanSelector: React.FC<ProcessplanSelectorProps> = ({ onSelect }) => {
  const client = useApolloClient();
  const processplanService = useMemo(
    () => new ProcessplanService(new ProcessplanRepository(client)),
    [client],
  );

  const [processplans, setProcessplans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProcessplans = async () => {
      try {
        setLoading(true);
        const data = await processplanService.getProcessplans();
        setProcessplans(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchProcessplans();
  }, [processplanService]);

  const handleCustomItemCreating = async (e: any) => {
    if (!e.text) {
      return;
    }

    try {
      const newProcessplan = await processplanService.createProcessplan({ name: e.text });
      setProcessplans((prev) => [...prev, newProcessplan]);
      e.customItem = newProcessplan;
    } catch (err) {
      console.error('Error creating processplan:', err);
      // Handle error appropriately, maybe show a toast
    }
  };

  if (loading) return <p>Loading process plans...</p>;
  if (error) return <p>Error loading process plans: {error.message}</p>;

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
          onValueChanged={(e) => {
            onSelect(e.value);
          }}
          placeholder="Search or create a new Process Plan"
        />
      </div>
    </div>
  );
};

export default ProcessplanSelector;
