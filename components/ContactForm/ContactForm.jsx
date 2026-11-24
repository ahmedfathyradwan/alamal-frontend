"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import FormField from "../FormField/FormField";
import { CheckIcon, SendIcon } from "../Icons/Icons";
import styles from "./ContactForm.module.css";

const initialValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

function validateField(field, values) {
  const value = values[field].trim();

  switch (field) {
    case "name":
      if (value.length < 3) return "يرجى إدخال الاسم الكامل (3 أحرف على الأقل).";
      return "";
    case "phone": {
      if (!value) return "يرجى إدخال رقم الهاتف.";
      const normalized = value.replace(/[\s-]/g, "");
      if (!/^(?:\+20|0)?1[0125]\d{8}$/.test(normalized)) {
        return "يرجى إدخال رقم هاتف مصري صحيح، مثال: 01001234567.";
      }
      return "";
    }
    case "email":
      if (!value) return "يرجى إدخال البريد الإلكتروني.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        return "يرجى إدخال بريد إلكتروني صحيح.";
      }
      return "";
    case "message":
      if (value.length < 10) return "يرجى كتابة رسالة من 10 أحرف على الأقل.";
      return "";
    default:
      return "";
  }
}

function validateAll(values) {
  return {
    name: validateField("name", values),
    phone: validateField("phone", values),
    email: validateField("email", values),
    message: validateField("message", values),
  };
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    const message = validateField(name, values);
    setErrors((previous) => ({ ...previous, [name]: message }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateAll(values);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors).find((key) => nextErrors[key]);
    if (firstError) {
      document.getElementById(`contact-${firstError}`)?.focus();
      return;
    }

    setStatus("sending");
    timerRef.current = window.setTimeout(() => {
      setStatus("success");
      setValues(initialValues);
    }, 900);
  };

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successIcon}>
          <CheckIcon size={30} />
        </span>
        <h3 className={styles.successTitle}>تم إرسال رسالتك بنجاح</h3>
        <p className={styles.successText}>
          شكرًا لتواصلك مع الأمل للعقارات. سيتواصل معك فريقنا خلال ساعات العمل في
          أقرب وقت ممكن.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          إرسال رسالة أخرى
        </Button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid}>
        <FormField
          id="contact-name"
          name="name"
          label="الاسم بالكامل"
          placeholder="مثال: أحمد محمد"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          required
          autoComplete="name"
        />
        <FormField
          id="contact-phone"
          name="phone"
          label="رقم الهاتف"
          type="tel"
          placeholder="01xxxxxxxxx"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          required
          autoComplete="tel"
          inputMode="tel"
        />
        <FormField
          id="contact-email"
          name="email"
          label="البريد الإلكتروني"
          type="email"
          placeholder="name@example.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          required
          autoComplete="email"
          className={styles.full}
        />
        <FormField
          id="contact-message"
          name="message"
          label="رسالتك"
          as="textarea"
          rows={5}
          placeholder="أخبرنا بما تبحث عنه، وسنقترح عليك أفضل الخيارات المتاحة."
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.message}
          required
          className={styles.full}
        />
      </div>

      <div className={styles.footer}>
        <Button type="submit" variant="primary" size="lg" disabled={sending}>
          {sending ? (
            <>
              <span className={styles.spinner} aria-hidden="true" />
              جارٍ الإرسال...
            </>
          ) : (
            <>
              <SendIcon size={17} />
              إرسال الرسالة
            </>
          )}
        </Button>
        <p className={styles.note}>
          بإرسال الرسالة أنت توافق على تواصل فريقنا معك عبر الهاتف أو البريد.
        </p>
      </div>
    </form>
  );
}
