import { createContext } from "react";

import ContextInterface from "@/lib/interfaces/state/app-data/app-data-context";

const AppDataContext = createContext<ContextInterface>({
  setAppData: async () => new Promise(() => null),
  data: null,
});

export default AppDataContext;
