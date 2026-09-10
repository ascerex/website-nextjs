interface OrbiterGlyphProps {
  className?: string;
}

export function OrbiterGlyph({ className }: OrbiterGlyphProps) {
  return (
    <svg className={className} viewBox="0 0 120 72" aria-hidden="true">
      <path d="M9 37 42 25 55 9h10l13 16 33 12-4 9-33-4-9 20H55L46 42l-33 4Z" />
      <path d="M49 29h22M55 36h10" />
    </svg>
  );
}
