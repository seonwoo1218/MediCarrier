import { create } from "zustand";
import axios from "axios";

const scriptStore = create((set) => ({
  scriptComponents: "",
  localScript: "",
  setScriptComponents: (script) => set({ scriptComponents: script }),
}));

export default scriptStore;
