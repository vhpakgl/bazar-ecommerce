type SectionTitleProps = {
  title: string;
  description?: string;
};

export function SectionTitle({ title, description }: SectionTitleProps) {
  return (
    <header className="space-y-2">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {description ? <p className="text-sm text-neutral-500">{description}</p> : null}
    </header>
  );
}
