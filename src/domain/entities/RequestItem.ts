
export interface RequestItem {
  id: number;
  title: string;
  description: string;
  requesterName: string;
  updateTime: string;
  product: {
    id: number;
    name: string;
    processplan: {
      id: number;
      name: string;
    };
    beolOption: {
      id: number;
      name: string;
    };
  };
}
