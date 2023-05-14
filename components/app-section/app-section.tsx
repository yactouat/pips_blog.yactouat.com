import AppSectionProps from "./AppSectionProps";
import styles from "./app-section.module.css";

export default function AppSection({ children, id, title }: AppSectionProps) {
  return (
    <section
      id={id}
      className="p-3 my-4 scroll-mt-20 widescreen:section-min-height tallscreen:section-min-height"
    >
      {title != "" && (
        <h2 className="text-4xl font-bold text-center sm:text-5xl mb-6 text-slate-900 dark:text-white">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
