import styles from "./svg.module.css";
import SvgProps from "./SvgProps";

const Svg = ({
  children,
  title,
  fill = "#000",
  height = "48",
  viewBox,
  width = "48",
}: SvgProps) => {
  return (
    <div
      className={styles.svg}
      title={title}
      style={{
        fill: fill,
      }}
    >
      <svg
        height={height}
        viewBox={viewBox ?? `0 0 ${width} ${height}`}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    </div>
  );
};

export default Svg;
