export function EmptyInputIndicator({ name = 'empty-input-check', required = true, empty = true }) {
  if (!required || !empty) return null;
  return (
    <input
      type="input"
      name={name}
      value=""
      required
      onChange={() => {}}
      tabIndex={-1}
      className="opacity-0 w-[1px] h-[1px] absolute bottom-0 left-1/2"
      onInvalid={(e) => e.currentTarget.setCustomValidity('Please sign here')}
    />
  );
}
