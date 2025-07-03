'use client';

import { useState, useEffect } from 'react';
import DropdownSelect from '@components/visual/animation/AnimatedDropdown.tsx';

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

const areaModes: Record<string, string[]> = {
  Bautechnik: ['Abendkolleg', 'Tageskolleg'],
  Maschinenbau: ['Abendkolleg', 'Tageskolleg'],
  Informatik: ['Tageskolleg', 'Berufsbegleitend'],
};

const RadioGroup = ({
  options,
  value,
  onChange,
  hasError,
}: {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  hasError?: boolean;
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
        <span className={hasError ? 'text-red-500' : ''}>{opt}</span>
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

  useEffect(() => {
    setMode('');
    if (!areaModes[area]) {
      onChange(area);
    }
  }, [area]);

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
          <RadioGroup
            options={areaModes[area]}
            value={mode}
            onChange={setMode}
            hasError={!!error}
          />
        </div>
      )}
    </div>
  );
}
