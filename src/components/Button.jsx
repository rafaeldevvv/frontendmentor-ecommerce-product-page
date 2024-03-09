export default function Button({ label, onClick = () => {}, type = "button", children }) {
  if (label) {
    return (
      <button type={type} onClick={onClick} aria-label={label}>
        {children}
      </button>
    );
  } else {
    return (
      <button type={type} onClick={onClick}>
        {children}
      </button>
    );
  }
}
