import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type LayoutType = "auth" | "private" | "dashboard" | "settings";

export type PageLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layout?: LayoutType;
};

export type AppPropsLayout = AppProps & {
  Component: PageLayout;
};

export interface IMenuItem {
  name: string;
  to: string;
  slug: string;
  disabled: boolean;
  // childs: {
  //   name: string;
  //   to: string;
  //   slug: string;
  //   disabled: boolean;
  // }[];
}
