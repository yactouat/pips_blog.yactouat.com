import AppSection from "../../app-section/app-section";
import DataCard from "../data-card/data-card";
import DataCardsListProps from "./DataCardsListProps";
import styles from "./data-cards-list.module.css";

const DataCardsList = ({ data, sectionId, sectionTitle }: DataCardsListProps) => {
  return (
    <AppSection id={sectionId} title={sectionTitle}>
      <ul className={`list-none mx-auto my-12 gap-8 ${styles.dataCardsList}`}>
        {data.map((dataCard) => (
          <DataCard
            baseUrl={dataCard.baseUrl}
            key={dataCard.key}
            data={{
              subtext1: dataCard.data.subtext1,
              title: dataCard.data.title,
            }}
          />
        ))}
      </ul>
    </AppSection>
  );
};

export default DataCardsList;
