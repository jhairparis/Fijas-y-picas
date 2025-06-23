export type pistas = { picas: number; fijas: number; text?: string };
export type fnHistorial = (val: number, help: pistas, user?: number) => void;
export type Props = {
  numeroPrincipal: number;
  actualizarHistoial: fnHistorial;
};
export type arrayC = [number, boolean];
export interface inputs {
  [key: string]: string;
}
export type FadeProps = {
  in: boolean;
  time?: number;
  children?: React.ReactNode;
};
