import { faSearchengin, faViber } from "@fortawesome/free-brands-svg-icons";
import {
  faChartLine,
  faFileInvoice,
  faMailBulk,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";

export const WorkProps = [
  { link: "/reception", text: "Prijem tepiha", id: 1 },
  { link: "/measuringandpreparingcarpet", text: "Priprema tepiha", id: 2 },
  { link: "/deliverylist", text: "Lista za isporuku", id: 3 },
  { link: "/schedulingcarpetretrivals", text: "Zakazivanje", id: 4 },
  { link: "/downloadlist", text: "Lista preuzimanja", id: 5 },
];

export const AdminProps = [
  {
    icon: faChartLine,
    title: "Analiza",
    link: "/administrator/analysis",
    id: 1,
  },
  {
    icon: faFileInvoice,
    title: "Troskovi",
    link: "/administrator/costs",
    id: 2,
  },
  {
    icon: faMoneyBillTransfer,
    title: "Prihodi",
    link: "/administrator/otherincome",
    id: 3,
  },
  { icon: faViber, title: "Viber", link: "", id: 4 },
  { icon: faMailBulk, title: "Mail", link: "", id: 5 },
  { icon: faSearchengin, title: "Pretraga", link: "", id: 6 },
];
