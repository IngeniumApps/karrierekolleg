'use client';

import {useState} from 'react';
import clsx from 'clsx';
import GraduationCapIcon from "../assets/icons/custom/GraduationCapIcon.tsx";
import MessageIcon from "../assets/icons/custom/MessageIcon.tsx";
import DropdownSelect from "@components/visual/animation/AnimatedDropdown.tsx";

const areas = [
    'Technik & Informatik',
    'Design',
    'Bau & Architektur',
    'Naturwissenschaft',
];

export default function ContactForm() {
    const [form, setForm] = useState({
        area: '',
        message: '',
        privacy: false,
    });
    const [errors, setErrors] = useState<{ area?: string; message?: string }>({});
    const [submitted, setSubmitted] = useState(false);
    const [formErrorSummary, setFormErrorSummary] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const {name, type, value} = e.target;
        const newValue =
            type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setForm((prev) => ({...prev, [name]: newValue}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { area?: string; message?: string } = {};
        if (!form.area) newErrors.area = "Bitte wähle einen Bereich.";
        if (!form.message) newErrors.message = "Bitte gib eine Nachricht ein.";
        if (!form.privacy) return;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setFormErrorSummary("Bitte überprüfe die markierten Felder.");
            return;
        } else {
            setFormErrorSummary(null);
        }

        alert(
            `📩 Kontaktformular ausgefüllt – Datenübermittlung ist aktuell noch deaktiviert.\n\n` +
            `Studienrichtung: ${form.area}\n` +
            `Nachricht:\n${form.message}`
        );
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-white/80 border border-primary/20 shadow-xl rounded-3xl p-8 animate-fade-in">
                <h3 className="text-2xl font-bold text-primary mb-2">
                    Danke für deine Nachricht!
                </h3>
                <p className="text-gray-700">
                    Wir melden uns so bald wie möglich persönlich bei dir.
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white/60 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-8 w-full max-w-2xl mx-auto text-left space-y-6"
        >
            <DropdownSelect
                label={"Kolleg-Bereich"}
                value={form.area}
                onChange={(val) =>
                    setForm((prev) => ({...prev, area: val}))
                }
                error={errors.area}
            />

            <div className="flex items-center gap-2 text-primary font-semibold">
                <MessageIcon className="w-6 h-6 text-primary shrink-0"/>
                Deine Nachricht
            </div>
            <textarea
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Wie können wir dir helfen?"
                className={clsx(
                    "cursor-none w-full rounded-xl bg-white/90 px-4 py-3 text-sm shadow-inner border transition-all duration-300 resize-none",
                    errors.message ? "border-red-500 ring-1 ring-red-300" : "border-gray-200 focus:ring-2 focus:ring-primary"
                )}
            />
            {errors.message && (
                <p className="-mt-5 text-sm text-red-500 font-medium pl-1">
                    {errors.message}
                </p>
            )}

            <label className="flex items-start gap-2 text-sm text-gray-700 select-none cursor-none">
                <input
                    type="checkbox"
                    name="privacy"
                    checked={form.privacy}
                    onChange={handleChange}
                    required
                    className="mt-1 accent-primary rounded-sm pointer-events-none"
                />
                <span>
    Ich stimme der Verarbeitung meiner Daten laut{' '}
                    <a
                        href={`${import.meta.env.BASE_URL}datenschutz/`}
                        className="underline text-primary hover:text-primary/80 cursor-none"
                        onClick={(e) => e.stopPropagation()} // ← verhindert, dass Klick auf Link Checkbox toggelt
                    >
      Datenschutzerklärung
    </a>{' '}
                    zu.
  </span>
            </label>

            <button
                type="submit"
                disabled={!form.privacy}
                className={clsx(
                    'w-full py-3 px-6 rounded-full font-semibold text-lg transition-all duration-300',
                    form.privacy
                        ? 'bg-accent border border-accent shadow-md hover:brightness-110'
                        : 'bg-white text-primary border border-primary shadow-sm cursor-not-allowed pointer-events-none',
                )}
            >
                Nachricht senden
            </button>
            {formErrorSummary && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 shadow">
                    {formErrorSummary}
                </div>
            )}
        </form>
    );
}