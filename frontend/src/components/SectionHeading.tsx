interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

const SectionHeading = ({ subtitle, title, description, align = "center" }: SectionHeadingProps) => {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignClass} mb-16`}>
      {subtitle && (
        <span className="text-xs tracking-[0.3em] uppercase text-secondary font-body font-medium mb-4">
          {subtitle}
        </span>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground tracking-wide mb-4">
        {title}
      </h2>
      <div className="gold-divider mb-6" style={align === "left" ? { marginLeft: 0 } : {}} />
      {description && (
        <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
