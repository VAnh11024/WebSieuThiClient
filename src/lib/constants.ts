import { SiFacebook, SiYoutube, SiInstagram } from "react-icons/si";
import {
  type SocialLink,
  type Collaborates,
  type NavItem,
  type ContactItem,
} from "@/types/constants.type";
import { Phone, Mail, MapPin } from "lucide-react";

export const socials = [
  { label: "SiFacebook", to: "#", Icon: SiFacebook },
  { label: "SiYoutube", to: "#", Icon: SiYoutube },
  { label: "SiInstagram", to: "#", Icon: SiInstagram },
] as const satisfies ReadonlyArray<SocialLink>;

export const collaborates = [
  {
    label: "MWG",
    to: "https://mwg.vn/",
    image:
      "https://cdnv2.tgdd.vn/bhx/product-fe/cart/home/_next/public/static/images/logo_mwg.png",
  },
  {
    label: "thegioididong",
    to: "https://www.thegioididong.com/",
    image:
      "https://cdnv2.tgdd.vn/bhx/product-fe/cart/home/_next/public/static/images/logo_tgdd.png",
  },
  {
    label: "dienmayxanh",
    to: "https://www.dienmayxanh.com/",
    image:
      "https://cdnv2.tgdd.vn/bhx/product-fe/cart/home/_next/public/static/images/logo_dmx.png",
  },
  {
    label: "topzone",
    to: "https://www.topzone.vn/",
    image:
      "https://cdnv2.tgdd.vn/bhx/product-fe/cart/home/_next/public/static/images/logo_topzone.png",
  },
  {
    label: "nhathuocankhang",
    to: "https://www.nhathuocankhang.com/",
    image:
      "https://cdnv2.tgdd.vn/bhx/product-fe/cart/home/_next/public/static/images/logo_ak.png",
  },
  {
    label: "avakids",
    to: "https://www.avakids.com/",
    image:
      "https://cdnv2.tgdd.vn/bhx/product-fe/cart/home/_next/public/static/images/logo_ava.png",
  },
  {
    label: "erablue",
    to: "https://www.erablue.id/",
    image:
      "https://cdnv2.tgdd.vn/bhx/product-fe/cart/home/_next/public/static/images/logo_era.png",
  },
  {
    label: "thodienmayxanh",
    to: "https://www.thodienmayxanh.com/",
    image:
      "https://cdnv2.tgdd.vn/bhx/product-fe/cart/home/_next/public/static/images/logo_tdmx.png",
  },
] as const satisfies ReadonlyArray<Collaborates>;

export const suportLinks = [
  { label: "Câu hỏi thường gặp", to: "#" },
  { label: "Chính sách đổi trả", to: "#" },
  { label: "Chính sách bảo mật", to: "#" },
  { label: "Điều khoản sử dụng", to: "#" },
  { label: "Hướng dẫn mua hàng", to: "#" },
] as const satisfies ReadonlyArray<NavItem>;

export const aboutLinks = [
  { label: "Giới thiệu", to: "#" },
  { label: "Tuyển dụng", to: "#" },
  { label: "Tin tức", to: "#" },
  { label: "Hệ thống cửa hàng", to: "#" },
  { label: "Liên hệ", to: "#" },
] as const satisfies ReadonlyArray<NavItem>;

export const contacts = [
  { title: "Hotline", value: "1900 1234", Icon: Phone },
  { title: "Email", value: "hotro@bachhoaxanh.com", Icon: Mail },
  { title: "Địa chỉ", value: "123 Đường ABC, Quận 1, TP.HCM", Icon: MapPin },
] as const satisfies ReadonlyArray<ContactItem>;
