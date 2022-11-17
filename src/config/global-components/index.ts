import { App } from "vue";

import BaseComponents from "@/components/base/install";

export default {
    install: (app: App) => {
        Object.entries(BaseComponents)
            .forEach(([name, component]) => {
                app.component(name, component);
            });
    },
};