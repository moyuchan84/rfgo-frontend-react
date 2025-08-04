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
  title: string;
  content: string;
  edmUrls: string[];
  productMetas: { metaKey: string; metaValue: string }[];
  setProcessplanId: (id: number | null) => void;
  setBeolOptionId: (id: number | null) => void;
  setProductId: (id: number | null) => void;
  setRequestType: (type: RequestType) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  addEdmUrl: (url: string) => void;
  removeEdmUrl: (url: string) => void;
  setProductMetas: (metas: { metaKey: string; metaValue: string }[]) => void;
  updateProductMeta: (metaKey: string, metaValue: string) => void;
}

export const useRequestStore = create<RequestState>((set) => ({
  selectedProcessplanId: null,
  selectedBeolOptionId: null,
  selectedProductId: null,
  requestType: RequestType.New,
  title: '',
  content: '',
  edmUrls: [],
  productMetas: [],
  setProcessplanId: (id) => set({ selectedProcessplanId: id, selectedBeolOptionId: null, selectedProductId: null }),
  setBeolOptionId: (id) => set({ selectedBeolOptionId: id, selectedProductId: null }),
  setProductId: (id) => set({ selectedProductId: id }),
  setRequestType: (type) => set({ requestType: type }),
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  addEdmUrl: (url) => set((state) => ({ edmUrls: [...state.edmUrls, url] })),
  removeEdmUrl: (url) => set((state) => ({ edmUrls: state.edmUrls.filter((u) => u !== url) })),
  setProductMetas: (metas) => set({ productMetas: metas }),
  updateProductMeta: (metaKey, metaValue) =>
    set((state) => ({
      productMetas: state.productMetas.map((meta) =>
        meta.metaKey === metaKey ? { ...meta, metaValue } : meta,
      ),
    })),
}));
