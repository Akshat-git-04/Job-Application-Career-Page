import { createContext, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { defineAbilityFor } from '../app/abilities';

const AbilityContext = createContext(null);

export function AbilityProvider({ children }) {
  const role = useSelector((state) => state.form.role);

  const ability = useMemo(() => defineAbilityFor(role), [role]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}

export function useAbility() {
  return useContext(AbilityContext);
}
