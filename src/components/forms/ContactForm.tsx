'use client';

import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import AreaWithModeSelect from '@components/forms/AreaWithModeSelect.tsx';
import FadeDownOnScroll from '@components/visual/animation/FadeDownOnScroll.tsx';

type FormState = {
  area: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
  privacy: boolean;
};

type FormErrors = Partial<{
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  area: string;
  message: string;
  captcha: string;
}>;

export default function ContactForm() {
  const formAction = import.meta.env.PUBLIC_CONTACT_FORM_URL;
  const [form, setForm] = useState<FormState>({
    area: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: '',
    privacy: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [formErrorSummary, setFormErrorSummary] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [showCaptcha, setShowCaptcha] = useState(false);

  useEffect(() => {
    setShowCaptcha(true);
    const script = document.createElement('script');
    script.src = 'https://web3forms.com/client/script.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (submitted && wrapperRef.current) {
      setTimeout(() => {
        wrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [submitted]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, type, value } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const resetForm = () => {
    setForm({
      area: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      message: '',
      privacy: false,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formEl = e.target as HTMLFormElement;
    const honeypot = (formEl.elements.namedItem('website') as HTMLInputElement)?.value;
    const hcaptchaResponse = (
      document.querySelector('[name="h-captcha-response"]') as HTMLTextAreaElement
    )?.value;
    if (honeypot) return;

    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s\-()]{6,20}$/;

    if (!form.firstname) newErrors.firstname = 'Bitte gib deinen Vornamen ein.';
    if (!form.lastname) newErrors.lastname = 'Bitte gib deinen Nachnamen ein.';
    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = 'Bitte gib eine gültige E-Mail-Adresse ein.';
    }
    if (form.phone && !phoneRegex.test(form.phone)) {
      newErrors.phone = 'Bitte gib eine gültige Telefonnummer ein.';
    }
    if (!form.area) newErrors.area = 'Bitte wähle einen Bereich.';
    if (!form.message) newErrors.message = 'Bitte gib eine Nachricht ein.';
    if (!hcaptchaResponse) newErrors.captcha = 'Bitte bestätige, dass du kein Roboter bist.';
    if (!form.privacy) return;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormErrorSummary('Bitte überprüfe die markierten Felder.');
      return;
    }

    setErrors({});
    setFormErrorSummary(null);

    const ACCESS_KEYS: Record<string, string> = {
      'Bautechnik (Abendkolleg)': import.meta.env
        .PUBLIC_CONTACT_FORM_ACCESS_KEY_ORTWEIN_BAUTECHNIK_ABEND,
      'Bautechnik (Tageskolleg)': import.meta.env
        .PUBLIC_CONTACT_FORM_ACCESS_KEY_ORTWEIN_BAUTECHNIK_TAG,
      'Maschinenbau (Abendkolleg)': import.meta.env
        .PUBLIC_CONTACT_FORM_ACCESS_KEY_BULME_MASCHINENBAU_ABEND,
      'Maschinenbau (Tageskolleg)': import.meta.env
        .PUBLIC_CONTACT_FORM_ACCESS_KEY_BULME_MASCHINENBAU_TAG,
      'Informatik (Tageskolleg)': import.meta.env
        .PUBLIC_CONTACT_FORM_ACCESS_KEY_BULME_INFORMATIK_TAG,
      'Elektronik & Technische Informatik': import.meta.env
        .PUBLIC_CONTACT_FORM_ACCESS_KEY_BULME_E_TECH_INFORMATIK_ABEND,
      'E-Techologies': import.meta.env.PUBLIC_CONTACT_FORM_ACCESS_KEY_BULME_E_TECH_ABEND,
      'Grafik- und Kommunikationsdesign': import.meta.env
        .PUBLIC_CONTACT_FORM_ACCESS_KEY_ORTWEIN_GRAFIK,
      'Fine Art Photography & Multimedia Art': import.meta.env
        .PUBLIC_CONTACT_FORM_ACCESS_KEY_ORTWEIN_FINEART,
      'Informatik (Berufsbegleitend)': import.meta.env
        .PUBLIC_CONTACT_FORM_ACCESS_KEY_INGENIUM_INFORMATIK,
      Chemie: import.meta.env.PUBLIC_CONTACT_FORM_ACCESS_KEY_CHEMIE,
    };

    const access_key = ACCESS_KEYS[form.area];
    if (!access_key) {
      console.warn(`Kein Access Key gefunden für Bereich: ${form.area}`);
      setFormErrorSummary('Unbekannter Bereich – bitte gültigen Kollegbereich wählen.');
      return;
    }

    const formData = {
      access_key,
      subject: `Anfrage von ${form.firstname} ${form.lastname} (karrierekolleg.at)`,
      from_name: `${form.firstname} ${form.lastname}`,
      name: `${form.firstname} ${form.lastname}`,
      email: form.email,
      phone: form.phone,
      Bereich: form.area,
      message: form.message,
    };

    try {
      const res = await fetch(formAction, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setSubmitted(true);
        resetForm();
      } else {
        setFormErrorSummary('Es gab ein Problem beim Versenden. Bitte versuch es erneut.');
      }
    } catch (error) {
      console.error(error);
      setFormErrorSummary('Verbindungsfehler. Bitte später erneut versuchen.');
    }
  };

  return (
    <div ref={wrapperRef}>
      {submitted ? (
        <FadeDownOnScroll duration={0.8} delay={0.2}>
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100 text-center lg:mb-20 mb-6">
            <div className="prose prose-lg mx-auto leading-relaxed">
              <h3 className="text-2xl font-bold text-primary mb-2">Danke für deine Nachricht!</h3>
              <p className="text-gray-700">
                Wir melden uns so bald wie möglich persönlich bei dir.
              </p>
            </div>
          </div>
        </FadeDownOnScroll>
      ) : (
        <form
          onSubmit={handleSubmit}
          id="form"
          action={formAction}
          method="POST"
          noValidate
          className="max-w-7xl z-10 p-8 lg:p-12 rounded-2xl shadow-xl border border-white/30 bg-white/60 backdrop-blur-sm space-y-6"
        >
          <fieldset className="space-y-4">
            <legend className="text-xl lg:text-2xl font-semibold text-primary mb-6">
              Persönliche Daten
            </legend>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2 flex flex-col gap-1.5">
                <label htmlFor="firstname" className="font-semibold">
                  Vorname *
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  required
                  value={form.firstname}
                  onChange={handleChange}
                  placeholder="Max"
                  className={clsx(
                    'focus:outline-none px-4 py-3 rounded-xl bg-white border shadow-inner text-base placeholder-gray-500',
                    errors.firstname ? 'border-red-500' : 'border-gray-200 focus:border-primary',
                  )}
                />
                {errors.firstname && (
                  <p className="mt-1 text-sm text-red-500 font-medium">{errors.firstname}</p>
                )}
              </div>

              <div className="w-full md:w-1/2 flex flex-col gap-1.5">
                <label htmlFor="lastname" className="font-semibold">
                  Nachname *
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  required
                  value={form.lastname}
                  onChange={handleChange}
                  placeholder="Mustermann"
                  className={clsx(
                    'focus:outline-none px-4 py-3 rounded-xl bg-white border shadow-inner text-base placeholder-gray-500',
                    errors.lastname ? 'border-red-500' : 'border-gray-200 focus:border-primary',
                  )}
                />
                {errors.lastname && (
                  <p className="mt-1 text-sm text-red-500 font-medium">{errors.lastname}</p>
                )}
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-xl lg:text-2xl font-semibold text-primary mb-6">
              Kontaktinformationen
            </legend>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2 flex flex-col gap-1.5">
                <label htmlFor="email" className="font-semibold">
                  E-Mail-Adresse *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={clsx(
                    'focus:outline-none px-4 py-3 rounded-xl bg-white border shadow-inner text-base placeholder-gray-500',
                    errors.email ? 'border-red-500' : 'border-gray-200 focus:border-primary',
                  )}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 font-medium">{errors.email}</p>
                )}
              </div>

              <div className="w-full md:w-1/2 flex flex-col gap-1.5">
                <label htmlFor="phone" className="font-semibold">
                  Telefon (optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+43 660 ..."
                  inputMode="tel"
                  className="focus:outline-none px-4 py-3 rounded-xl bg-white border shadow-inner text-base placeholder-gray-500 border-gray-200 focus:border-primary"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500 font-medium">{errors.phone}</p>
                )}
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-xl lg:text-2xl font-semibold text-primary mb-6">
              Interessenbereich
            </legend>
            <AreaWithModeSelect
              label="Für welchen Bereich interessierst du dich? *"
              onChange={(val) => setForm((prev) => ({ ...prev, area: val }))}
              error={errors.area}
            />
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-xl lg:text-2xl font-semibold text-primary mb-6">
              Deine Nachricht
            </legend>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="font-semibold">
                Nachricht *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Wie können wir dir helfen?"
                className={clsx(
                  'resize-none focus:outline-none px-4 py-3 rounded-xl bg-white border shadow-inner text-base placeholder-gray-500',
                  errors.message ? 'border-red-500' : 'border-gray-200 focus:border-primary',
                )}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500 font-medium">{errors.message}</p>
              )}
            </div>
          </fieldset>

          <div className="flex items-start gap-2">
            <input
              id="privacy"
              type="checkbox"
              name="privacy"
              checked={form.privacy}
              onChange={handleChange}
              required
              className="mt-1 accent-primary rounded-sm"
            />
            <label htmlFor="privacy" className="text-sm text-gray-700 select-none">
              Ich stimme der{' '}
              <a
                href={`${import.meta.env.BASE_URL}datenschutz/`}
                className="underline text-primary hover:text-primary/80"
              >
                Datenschutzerklärung
              </a>{' '}
              zu und bin damit einverstanden, dass meine Daten zur Bearbeitung meiner Anfrage
              gespeichert werden. *
            </label>
          </div>

          <input
            type="text"
            name="website"
            style={{ display: 'none' }}
            aria-hidden="true"
            tabIndex={-1}
          />

          {showCaptcha && <div className="h-captcha mb-8" data-captcha="true" />}
          {errors.captcha && (
            <p className="-mt-3 text-sm text-red-500 font-medium">{errors.captcha}</p>
          )}

          <button
            type="submit"
            onClick={(e) => {
              if (!form.privacy) {
                e.preventDefault();
                setFormErrorSummary('Bitte stimme der Datenschutzerklärung zu.');
              }
            }}
            className="w-full py-3 px-6 rounded-full font-semibold text-lg bg-accent border border-accent shadow-md hover:brightness-110 transition-all duration-300 cursor-pointer"
          >
            Nachricht senden
          </button>

          {formErrorSummary && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 shadow">
              {formErrorSummary}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
