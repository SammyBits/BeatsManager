interface props {
  show: boolean;
  children: React.ReactNode;
}

export const ShowComponent: React.FC<props> = ({ show, children }) => {
  return show ? <>{children}</> : null;
};