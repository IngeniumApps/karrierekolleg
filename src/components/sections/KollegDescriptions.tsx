import { cloneElement, type FC, type JSX } from 'react';
import { kollegDescriptions } from '../../constants/kollegDescriptions.tsx';

interface Props {
  topic: string;
}
export const KollegDescriptions: FC<Props> = ({ topic }) => {
  const elems: JSX.Element[] = kollegDescriptions[topic] ?? [];
  return <>{elems.map((el, i) => cloneElement(el, { key: i }))}</>;
};
