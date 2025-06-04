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
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const {name, type, value} = e.target;
        const newValue =
            type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setForm((prev) => ({...prev, [name]: newValue}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.privacy) return;
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
            className="bg-white/60 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-8 w-full max-w-2xl mx-auto text-left space-y-6"
        >
            {/*<div className="flex items-center gap-2 text-primary font-semibold">*/}
            {/*    <GraduationCapIcon className="w-6 h-6" />*/}
            {/*    Kolleg-Bereich*/}
            {/*</div>*/}
            {/*<select*/}
            {/*    name="area"*/}
            {/*    required*/}
            {/*    value={form.area}*/}
            {/*    onChange={handleChange}*/}
            {/*    className="w-full mt-1 rounded-xl bg-white px-4 py-3 pr-12 text-sm shadow-inner border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary appearance-none relative"*/}
            {/*>*/}
            {/*    <option value="">Bitte wählen …</option>*/}
            {/*    {areas.map((s) => (*/}
            {/*        <option key={s} value={s}>{s}</option>*/}
            {/*    ))}*/}
            {/*</select>*/}

            <DropdownSelect
                label={"Kolleg-Bereich"}
                value={form.area}
                onChange={(val) =>
                    setForm((prev) => ({...prev, area: val}))
                }
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
                className="cursor-none w-full rounded-xl bg-white/90 px-4 py-3 text-sm shadow-inner border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />

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
        </form>
    );
}