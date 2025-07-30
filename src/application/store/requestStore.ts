import { create } from 'zustand';

enum RequestType {
  New = 'New',
  Rev = 'Rev',
}

interface RequestState {
  selectedProcessplanId: number | null;
  selectedBeolOptionId: number | null;
  selectedProductId: number | null;
  requestType: RequestType;
  setProcessplanId: (id: number | null) => void;
  setBeolOptionId: (id: number | null) => void;
  setProductId: (id: number | null) => void;
  setRequestType: (type: RequestType) => void;
}

export const useRequestStore = create<RequestState>((set) => ({
  selectedProcessplanId: null,
  selectedBeolOptionId: null,
  selectedProductId: null,
  requestType: RequestType.New,
  setProcessplanId: (id) => set({ selectedProcessplanId: id }),
  setBeolOptionId: (id) => set({ selectedBeolOptionId: id }),
  setProductId: (id) => set({ selectedProductId: id }),
  setRequestType: (type) => set({ requestType: type }),
}));
