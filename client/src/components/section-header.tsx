interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({ title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <div className={`mb-10 md:mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3" data-testid="text-section-title">
        {title}
      </h2>
      <div className={`w-16 h-1 bg-accent rounded-full mb-4 ${centered ? "mx-auto" : ""}`} />
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-section-subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
}
