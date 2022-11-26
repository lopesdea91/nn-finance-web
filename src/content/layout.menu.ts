import { MenuItem } from "@/types/system";

const list: MenuItem[] = [
    { icon: "fa-solid fa-house", label: "Dashboard", to: "/dashboard", class: "" },
    { icon: "fa-solid fa-cash-register", label: "Novo registro", to: "/finance/item/new", class: "--plus" },
    { icon: "fa-solid fa-receipt", label: "Extrato", to: "/finance/extract", class: "" },
    { icon: "fa-solid fa-cash-register", label: "Novo lista", to: "/finance/list/new", class: "--plus" },
    { icon: "fa-solid fa-rectangle-list", label: "Lista", to: "/finance/list", class: "" },
    { icon: "fa-solid fa-cash-register", label: "Novo fatura", to: "/finance/invoice/new", class: "--plus" },
    { icon: "fa-solid fa-credit-card", label: "Fatura", to: "/finance/invoice", class: "" },
    // { icon: "fa-solid fa-house", label: "Dashboard" , to: "Dashboard"},
    // { icon: "fa-solid fa-house", label: "Dashboard" , to: "Dashboard"},
];

export default list;
