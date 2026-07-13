import { ComponentPreview } from "@/components/component-preview";
import { proDemoCatalog } from "@/demos/pro-catalog";

export function ProExamples({
  component,
}: {
  component: string;
  title: string;
}) {
  const demos = proDemoCatalog[component] ?? [];

  return (
    <div className="my-6">
      {demos.map((demo) => (
        <section className="mt-8" key={demo.name}>
          <h3 id={demo.name}>{demo.title}</h3>
          <ComponentPreview name={demo.name} />
        </section>
      ))}
    </div>
  );
}
