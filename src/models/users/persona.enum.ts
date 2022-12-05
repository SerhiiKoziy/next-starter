import { TFunction } from 'next-i18next';

export enum Persona {
  Dealer = 'dealer',
  Installer = 'installer',
  Architect = 'architect',
  Customer = 'customer',
}

export const personasSelectOptions = (t: TFunction) => {
  return Object.values(Persona).map(persona => ({
    label: t(`common:personas.${persona}`),
    value: persona,
  }));
};
