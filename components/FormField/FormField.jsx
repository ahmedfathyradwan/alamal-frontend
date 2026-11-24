import styles from "./FormField.module.css";

export default function FormField({
  id,
  label,
  type = "text",
  error,
  required = false,
  as = "input",
  className = "",
  children,
  ...rest
}) {
  const Control = as === "textarea" ? "textarea" : as === "select" ? "select" : "input";

  return (
    <div
      className={[styles.field, error ? styles.hasError : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      <label htmlFor={id} className={styles.label}>
        {label}
        {required ? (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <Control
        id={id}
        type={as === "input" ? type : undefined}
        className={styles.control}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      >
        {children}
      </Control>
      {error ? (
        <p className={styles.error} id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
