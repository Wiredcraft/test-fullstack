export function parseSaltOrRounds(value: string | number) {
  if (value === undefined) {
    throw new Error(UNDEFINED_SALT_OR_ROUNDS_ERROR);
  }

  const rounds = Number(value);

  if (Number.isNaN(rounds)) {
    return value;
  }
  if (!Number.isInteger(rounds) || rounds < 0) {
    throw new Error(SALT_OR_ROUNDS_TYPE_ERROR);
  }
  return rounds;
}
