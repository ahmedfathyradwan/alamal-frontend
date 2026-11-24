import Link from "next/link";
import styles from "./Button.module.css";

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  ...rest
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);
    const externalProps = href.startsWith("http")
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    if (isExternal) {
      return (
        <a href={href} className={classes} {...externalProps} {...rest}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
