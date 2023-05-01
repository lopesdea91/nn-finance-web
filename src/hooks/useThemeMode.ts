import { useContext } from "react";
import { themeModeContext } from "@/context/themeModeContext";

export const useThemeMode = () => {
  const { toggleThemeMode } = useContext(themeModeContext);

  return { toggleThemeMode }
}
