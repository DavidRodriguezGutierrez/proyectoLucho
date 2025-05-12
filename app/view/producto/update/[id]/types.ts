interface IOption {
  value: string;
  label: string;
}

export interface IProductoUpdateProps {
  presentaciones: IOption[];
  families: IOption[];
  marcas: IOption[];
}
