import { create } from "zustand";
import axios from "axios";

const scriptStore = create((set) => ({
  scriptComponents: "",
  transScriptComponents: "",
  documents: [],
  setScriptComponents: (script) => set({ scriptComponents: script }),
  setTransScriptComponents: (transScript) =>
    set({ transScriptComponents: transScript }),
  setDocuments: (docs) => set({ documents: docs }),
}));

export default scriptStore;
