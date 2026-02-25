import { useFlowStore } from "../features/flow/store/flow.store";

export const interpolate = (text: string) => {
  const { simulationVariables } = useFlowStore.getState();
  return text.replace(/\{\{(.*?)\}\}/g, (_, key) => {
    const val = simulationVariables[key.trim()];
    return val !== undefined ? val : `{{${key}}}`;
  });
};
