/** Empty or whitespace meta is “not set”. */
export function nonEmptyMeta(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

/**
 * True when the visitor must choose a password.
 * A stored password only counts if both salt and hash are present — a partial
 * record made the UI say “password is set” while login said it was not.
 */
export function needsCmsSetup(
  envPassword: string | undefined,
  salt: string | null | undefined,
  hash: string | null | undefined,
): boolean {
  if (nonEmptyMeta(envPassword)) return false;
  return !(nonEmptyMeta(salt) && nonEmptyMeta(hash));
}
