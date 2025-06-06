import { motion } from 'framer-motion';
import { useState } from 'react';
import GraduationCapIcon from '../../../assets/icons/custom/GraduationCapIcon.tsx';
import clsx from 'clsx';

const areas = ['Bautechnik', 'Kunst und Design', 'Naturwissenschaft', 'Technik & Informatik'];

interface DropdownSelectProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

const wrapperVariants = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      delayChildren: 0.05,
      staggerChildren: 0.08,
      duration: 0.2,
    },
  },
  closed: {
    scaleY: 0.9,
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
  },
  closed: {
    opacity: 0,
    y: -10,
  },
};

const DropdownSelect = ({ label, value, onChange, error }: DropdownSelectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <GraduationCapIcon className="w-6 h-6 text-primary shrink-0" />
          {label}
        </div>
        <div
          role="button"
          data-no-cursor-hover
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((pv) => !pv)}
          className={clsx(
            'w-full rounded-xl bg-white px-4 py-3 text-base shadow-inner border transition-all duration-150 appearance-none select-none cursor-none',
            value ? 'text-gray-900' : 'text-gray-500 italic',
            error ? 'border-red-500' : open ? 'border-primary' : 'border-gray-200',
          )}
        >
          {value || 'Bitte wählen …'}
        </div>
      </div>
      {/* Error */}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {/* Dropdown-List */}
      {open && (
        <motion.ul
          role="listbox"
          initial="closed"
          animate="open"
          variants={wrapperVariants}
          className="absolute mt-2 w-full rounded-xl bg-white border border-gray-200 shadow-xl z-10 overflow-hidden"
        >
          {areas.map((area) => (
            <motion.li
              role="option"
              key={area}
              variants={itemVariants}
              onClick={() => {
                onChange(area);
                setOpen(false);
              }}
              className="px-4 py-3 text-sm text-gray-800 transition-colors duration-200 hover:bg-primary/10 select-none"
              style={{ cursor: 'default' }} // 👈 Kein Cursorwechsel!
            >
              {area}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default DropdownSelect;
