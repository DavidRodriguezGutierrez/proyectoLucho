interface IOption {
  value: string;
  label: string; 
}

export interface IProductoPuntoVentaUpdateProps {
  productos: IOption[];
  puntoVentas: IOption[];
}
