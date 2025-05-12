interface IOption {
  value: string;
  label: string;
}

export interface IProductoCreateProps {
  presentaciones: IOption[];
  families: IOption[];
  marcas: IOption[];
}
