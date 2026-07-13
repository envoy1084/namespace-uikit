interface ColorDefinition {
  border?: boolean;
  cssValue?: string;
  label: string;
  tooltip?: string;
  variable: string;
}

function Swatch({ color }: { color: ColorDefinition }) {
  return (
    <div
      className="border-separator flex min-h-16 min-w-0 flex-1 flex-col justify-center rounded-xl border px-4 py-2"
      style={{ backgroundColor: color.cssValue ?? `var(${color.variable})` }}
      title={color.tooltip}
    >
      <span className="text-sm font-semibold text-white mix-blend-difference">
        {color.label}
      </span>
      <span className="truncate font-mono text-[10px] text-white/70 mix-blend-difference">
        {color.variable}
      </span>
    </div>
  );
}

function ColorRow({
  colors,
  theme,
}: {
  colors: ColorDefinition[];
  theme: string;
}) {
  return (
    <div className="flex flex-col gap-2" data-theme={theme.toLowerCase()}>
      <span className="text-muted text-xs font-medium">{theme}</span>
      <div className="flex flex-col gap-2 sm:flex-row">
        {colors.map((color) => (
          <Swatch color={color} key={`${color.label}-${color.variable}`} />
        ))}
      </div>
    </div>
  );
}

export function ColorSectionStacked({
  darkColors,
  lightColors,
}: {
  darkColors: ColorDefinition[];
  lightColors: ColorDefinition[];
}) {
  return (
    <div className="not-prose my-6 grid gap-4">
      <ColorRow colors={lightColors} theme="Light" />
      <ColorRow colors={darkColors} theme="Dark" />
    </div>
  );
}

export function ColorSectionPrimitive({
  colors,
}: {
  colors: ColorDefinition[];
}) {
  return (
    <div className="not-prose my-6 flex flex-col gap-2 sm:flex-row">
      {colors.map((color) => (
        <Swatch color={color} key={`${color.label}-${color.variable}`} />
      ))}
    </div>
  );
}

export function ColorSectionSideBySide(props: {
  baseVariable: string;
  foregroundVariable: string;
  hoverCssValue?: string;
  hoverVariable: string;
  name: string;
  soft?: Record<string, string>;
}) {
  const colors = [
    { label: props.name, variable: props.baseVariable },
    {
      cssValue: props.hoverCssValue,
      label: "Hover",
      variable: props.hoverVariable,
    },
    { label: "Foreground", variable: props.foregroundVariable },
  ];
  return (
    <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
      <ColorRow colors={colors} theme="Light" />
      <ColorRow colors={colors} theme="Dark" />
    </div>
  );
}

export function ColorSectionFormField({
  colors,
}: {
  colors: Record<string, string>;
}) {
  const entries = Object.entries(colors).map(([label, variable]) => ({
    label,
    variable,
  }));
  return <ColorSectionPrimitive colors={entries} />;
}
