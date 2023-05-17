import { ReactNode, useCallback, useState } from "react";
import { PortalContext } from "@/context/PortalContext";
import { PortalType } from "@/types/system";

export const AppPortalProvider = (props: { children: ReactNode }) => {
  const [portalMap, setPortalMap] = useState(new Map());

  const addPortalItem = useCallback((portalType: PortalType, component: ReactNode) => {
    portalMap.set(portalType, component);

    const clonedMapWithNewItem = new Map(portalMap);

    setPortalMap(clonedMapWithNewItem);
  }, []);

  const removePortalItem = useCallback((portalType: PortalType) => {
    portalMap.delete(portalType);

    const clonedMapWithoutItem = new Map(portalMap);

    setPortalMap(clonedMapWithoutItem);
  }, []);

  return (
    <PortalContext.Provider value={{ portalMap, addPortalItem, removePortalItem }}>
      {props.children}
    </PortalContext.Provider>
  );
};