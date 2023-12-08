export const calcPasswordStrength = (password: string) => {
  let strength = 0;

  const NUMS_CHECK = password.match(/[0-9]/g);
  const LOWERCASE_CHECK = password.match(/[a-z]/g);
  const UPPERCASE_CHECK = password.match(/[A-Z]/g);
  const SYMBOLS_CHECK = password.match(/(\$|%|!|@|\^|&|\*|~)/g);

  if (password.length >= 8) {
    strength += 1
  }

  if (NUMS_CHECK) {
    strength += 1
  }

  if (LOWERCASE_CHECK) {
    strength += 1
  }

  if (UPPERCASE_CHECK) {
    strength += 1
  }

  if (SYMBOLS_CHECK) {
    strength += 1
  }

  if (NUMS_CHECK && LOWERCASE_CHECK && UPPERCASE_CHECK && SYMBOLS_CHECK) {
    strength += 1
  }

  return strength
};
