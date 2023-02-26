//Redux

import { resetMessage } from "../slices/photoSlice";

export const useResetComponentMessage = (dispath) => {
  return () => {
    setTimeout(() => {
      dispath(resetMessage());
    }, 2000);
  };
};
