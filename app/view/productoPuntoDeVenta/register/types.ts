interface IOption {
  value: string;
  label: string;
}

export interface IProductoPuntoVentaCreateProps {
  productos: IOption[];
  puntoVentas: IOption[];
}
