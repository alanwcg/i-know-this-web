export function cpf(e: React.KeyboardEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 14;

  let { value } = e.currentTarget;

  if (value.length === 14 && !value.includes('.')) {
    const rawValue = value.slice(0, 11);

    const fixedValue = rawValue.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4',
    );

    e.currentTarget.value = fixedValue;

    return e;
  }

  if (e.key === 'Backspace') {
    return e;
  }

  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  e.currentTarget.value = value;

  return e;
}
