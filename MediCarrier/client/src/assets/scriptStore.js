import { create } from "zustand";

const useScriptStore = create((set) => ({
  scriptComponents: "",
  transScriptComponents: "",
  documents: [],
  setScriptComponents: (script) => set({ scriptComponents: script }),
  setTransScriptComponents: (transScript) =>
    set({ transScriptComponents: transScript }),
  setDocuments: (docs) => set({ documents: docs }),
}));

export default useScriptStore;
