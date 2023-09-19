import { FC, ReactNode, useCallback, useState } from "react";
import { TeleportContext } from "../context/teleportContext";
import { ITeleportType } from "@/types/system";

const TeleportProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [teleportMap, setPortalMap] = useState(new Map());

  const addTeleport = useCallback(({ type, el }: { type: ITeleportType, el: ReactNode }) => {
    teleportMap.set(type, el);

    const clonedMapWithNewItem = new Map(teleportMap);

    setPortalMap(clonedMapWithNewItem);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeTeleport = useCallback(({ type }: { type: ITeleportType }) => {
    teleportMap.delete(type);

    const clonedMapWithoutItem = new Map(teleportMap);

    setPortalMap(clonedMapWithoutItem);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TeleportContext.Provider value={{ teleportMap, addTeleport, removeTeleport }}>
      {children}
    </TeleportContext.Provider>
  );
};

export default TeleportProvider