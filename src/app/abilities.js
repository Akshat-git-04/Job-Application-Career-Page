// src/context/ability.js
import { createMongoAbility, AbilityBuilder } from '@casl/ability';

export function defineAbilityFor(role) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (role === 'admin') {
    can('manage', 'all'); // Admin can do everything
  }

  if (role === 'manager') {
    can('read', 'Application');
    can('update', 'Application');
    cannot('delete', 'Application');
  }

  if (role === 'user') {
    can('create', 'Application');
    can('edit', 'Application', { owner: true });
    can('submit', 'Application', { owner: true });
    cannot('read', 'Application');
  }

  return build();
}
