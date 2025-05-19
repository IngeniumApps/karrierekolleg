export interface NavItem {
  id: string;
  label: string;
  shape?: 1 | 2 | 3;
  color?: string;
}

export const navItems: NavItem[] = [
  { id: 'hero', label: 'Startseite', shape: 2, color: '#f39d40' },
  // { id: 'intro', label: 'Was ist ein Kolleg?' },
  { id: 'benefits', label: 'Vorteile', shape: 2, color: '#e1544c' },
  // { id: 'structure', label: 'Aufbau & Formen' },
  // { id: 'skills', label: 'Kompetenzen' },
  // { id: 'recognition', label: 'Anerkennung' },
  // { id: 'study-path', label: 'Weiterführendes Studium' },
  { id: 'colleges', label: 'Kollegs', shape: 2, color: '#e9669e' },
  { id: 'contact', label: 'Kontakt', shape: 2, color: '#0d94cb' },
];
