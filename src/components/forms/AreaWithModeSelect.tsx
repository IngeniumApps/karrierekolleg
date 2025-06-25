'use client';

import { useState, useEffect } from 'react';
import DropdownSelect from '@components/visual/animation/AnimatedDropdown.tsx';

// allgemeine Bereiche
const areasGeneral = [
  'Bautechnik',
  'Chemie',
  'Elektronik & Technische Informatik',
  'E-Techologies',
  'Fine Art Photography & Multimedia Art',
  'Grafik- und Kommunikationsdesign',
  'Informatik',
  'Maschinenbau',
];

// verfügbare Kursformen pro Bereich
const areaModes: Record<string, string[]> = {
  Bautechnik: ['Abendkolleg', 'Tageskolleg'],
  Maschinenbau: ['Abendkolleg', 'Tageskolleg'],
  Informatik: ['Tageskolleg', 'Berufsbegleitend'],
};

// Einfacher Radio-Button-Wrapper
const RadioGroup = ({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (val: string) => void;
}) => (
  <div className="mt-2 flex gap-4">
    {options.map((opt) => (
      <label key={opt} className="inline-flex items-center space-x-1 cursor-none">
        <input
          type="radio"
          name="kursform"
          value={opt}
          checked={value === opt}
          onChange={() => onChange(opt)}
          className="form-radio cursor-none"
        />
        <span>{opt}</span>
      </label>
    ))}
  </div>
);

interface AreaWithModeSelectProps {
  label?: string;
  onChange: (val: string) => void;
  error?: string;
}

export default function AreaWithModeSelect({
  label,

  onChange,
  error,
}: AreaWithModeSelectProps) {
  const [area, setArea] = useState('');
  const [mode, setMode] = useState('');

  // Reset & direkte Rückgabe, wenn kein Mehrfach-Modus
  useEffect(() => {
    setMode('');
    if (!areaModes[area]) {
      onChange(area);
    }
  }, [area]);

  // Kombiniere erst, wenn Mode gewählt
  useEffect(() => {
    if (mode) {
      onChange(`${area} (${mode})`);
    }
  }, [mode]);

  return (
    <div className="space-y-4">
      <DropdownSelect
        label={label}
        options={areasGeneral}
        value={area}
        onChange={setArea}
        error={error}
      />

      {area && areaModes[area] && (
        <div>
          <RadioGroup options={areaModes[area]} value={mode} onChange={setMode} />
        </div>
      )}

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
