import { create } from 'zustand';
import { ProductKeyTableService } from '../services/ProductKeyTableService';

interface KeyTableState {
  selectedProcessplanId: number | null;
  selectedBeolOptionId: number | null;
  selectedProductId: number | null;
  keyTables: any[];
  selectedKeyTable: any | null;
  gridData: any[];
  loading: boolean;
  error: Error | null;
  setProcessplanId: (id: number | null) => void;
  setBeolOptionId: (id: number | null) => void;
  setProductId: (id: number | null) => void;
  fetchKeyTables: (productKeyTableService: ProductKeyTableService) => Promise<void>;
  setSelectedKeyTable: (keyTable: any | null) => void;
}

export const useKeyTableStore = create<KeyTableState>((set, get) => ({
  selectedProcessplanId: null,
  selectedBeolOptionId: null,
  selectedProductId: null,
  keyTables: [],
  selectedKeyTable: null,
  gridData: [],
  loading: false,
  error: null,

  setProcessplanId: (id) => {
    set({
      selectedProcessplanId: id,
      selectedBeolOptionId: null,
      selectedProductId: null,
      keyTables: [],
      selectedKeyTable: null,
      gridData: [],
    });
  },

  setBeolOptionId: (id) => {
    set({
      selectedBeolOptionId: id,
      selectedProductId: null,
      keyTables: [],
      selectedKeyTable: null,
      gridData: [],
    });
  },

  setProductId: (id) => {
    set({ selectedProductId: id, keyTables: [], selectedKeyTable: null, gridData: [] });
    if (id) {
      get().fetchKeyTables(null as any); // service will be passed from component
    }
  },

  fetchKeyTables: async (productKeyTableService: ProductKeyTableService) => {
    const { selectedProductId } = get();
    if (!selectedProductId) return;

    set({ loading: true, error: null });
    try {
      const data = await productKeyTableService.getProductKeyTablesByProductId(selectedProductId);
      set({ keyTables: data, loading: false });
    } catch (err) {
      set({ error: err as Error, loading: false });
    }
  },

  setSelectedKeyTable: (keyTable) => {
    console.log(keyTable);
    set({
      selectedKeyTable: keyTable,
      gridData:
        keyTable && keyTable.keyTableJson
          ? Array.isArray(keyTable.keyTableJson)
            ? keyTable.keyTableJson
            : []
          : [],
    });
  },
}));
