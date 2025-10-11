"use client";

import type React from "react";

import { useState } from "react";
import { ChevronDown, Tag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface SubCategory {
  name: string;
  href: string;
}

interface Category {
  name: string;
  href: string;
  icon?: React.ReactNode;
  subCategories?: SubCategory[];
}

const categories: Category[] = [
  {
    name: "KHUYẾN MÃI SỐC",
    href: "/khuyen-mai",
    icon: <Tag className="h-5 w-5 text-red-600" />,
  },
  {
    name: "THỊT, CÁ, TRỨNG, HẢI SẢN",
    href: "/thit-ca-trung",
    subCategories: [
      { name: "Thịt heo", href: "/thit-ca-trung/thit-heo" },
      { name: "Thịt bò", href: "/thit-ca-trung/thit-bo" },
      { name: "Thịt gà, vịt", href: "/thit-ca-trung/thit-gia-cam" },
      { name: "Nội tạng, xương", href: "/thit-ca-trung/noi-tang-xuong" },
      { name: "Cá tươi", href: "/thit-ca-trung/ca-tuoi" },
      { name: "Hải sản tươi/đông lạnh", href: "/thit-ca-trung/hai-san" },
      { name: "Trứng gà/vịt/cút", href: "/thit-ca-trung/trung" },
      { name: "Thịt/đồ ướp sẵn", href: "/thit-ca-trung/do-uop-san" },
      { name: "Xúc xích, chả giò", href: "/thit-ca-trung/xuc-xich-cha-gio" },
    ],
  },

  // 2
  {
    name: "RAU, CỦ, NẤM, TRÁI CÂY",
    href: "/rau-cu-nam-trai-cay",
    subCategories: [
      { name: "Rau lá", href: "/rau-cu-nam-trai-cay/rau-la" },
      { name: "Củ, quả", href: "/rau-cu-nam-trai-cay/cu-qua" },
      { name: "Nấm các loại", href: "/rau-cu-nam-trai-cay/nam" },
      { name: "Rau gia vị", href: "/rau-cu-nam-trai-cay/rau-gia-vi" },
      { name: "Trái cây tươi", href: "/rau-cu-nam-trai-cay/trai-cay" },
      {
        name: "Trái cây cắt sẵn",
        href: "/rau-cu-nam-trai-cay/trai-cay-cat-san",
      },
      { name: "Rau củ sơ chế", href: "/rau-cu-nam-trai-cay/so-che" },
      { name: "Salad & mix", href: "/rau-cu-nam-trai-cay/salad" },
    ],
  },

  // 3
  {
    name: "DẦU ĂN, NƯỚC CHẤM, GIA VỊ",
    href: "/dau-an-nuoc-cham-gia-vi",
    subCategories: [
      { name: "Dầu ăn", href: "/dau-an-nuoc-cham-gia-vi/dau-an" },
      { name: "Nước mắm", href: "/dau-an-nuoc-cham-gia-vi/nuoc-mam" },
      { name: "Nước tương", href: "/dau-an-nuoc-cham-gia-vi/nuoc-tuong" },
      {
        name: "Dầu hào, xì dầu",
        href: "/dau-an-nuoc-cham-gia-vi/dau-hao-xi-dau",
      },
      {
        name: "Mayonnaise, sốt chấm",
        href: "/dau-an-nuoc-cham-gia-vi/mayonnaise-sot",
      },
      { name: "Tương ớt, tương cà", href: "/dau-an-nuoc-cham-gia-vi/tuong" },
      { name: "Giấm, sa tế", href: "/dau-an-nuoc-cham-gia-vi/giam-sa-te" },
      { name: "Muối, đường", href: "/dau-an-nuoc-cham-gia-vi/muoi-duong" },
      {
        name: "Bột ngọt, hạt nêm",
        href: "/dau-an-nuoc-cham-gia-vi/bot-ngot-hat-nem",
      },
      {
        name: "Bột canh, tiêu, ngũ vị",
        href: "/dau-an-nuoc-cham-gia-vi/bot-canh-tieu",
      },
      { name: "Bột chiên giòn/xù", href: "/dau-an-nuoc-cham-gia-vi/bot-chien" },
      {
        name: "Bột năng/bắp/mì",
        href: "/dau-an-nuoc-cham-gia-vi/bot-lam-banh",
      },
    ],
  },

  // 4
  {
    name: "GẠO, BỘT, ĐỒ KHÔ",
    href: "/gao-bot-do-kho",
    subCategories: [
      { name: "Gạo thơm, gạo dẻo", href: "/gao-bot-do-kho/gao" },
      { name: "Gạo lứt, ngũ cốc", href: "/gao-bot-do-kho/gao-lut-ngu-coc" },
      { name: "Nếp, bột nếp", href: "/gao-bot-do-kho/nep" },
      { name: "Bột mì/bột gạo", href: "/gao-bot-do-kho/bot-mi-bot-gao" },
      { name: "Bột năng, bột bắp", href: "/gao-bot-do-kho/bot-nang-bot-bap" },
      { name: "Đậu, hạt khô", href: "/gao-bot-do-kho/dau-hat" },
      { name: "Rong biển, nấm khô", href: "/gao-bot-do-kho/rong-bien-nam-kho" },
      { name: "Mè, đậu phộng", href: "/gao-bot-do-kho/me-dau-phong" },
    ],
  },

  // 5
  {
    name: "MÌ, MIẾN, CHÁO, PHỞ",
    href: "/mi-mien-chao-pho",
    subCategories: [
      { name: "Mì gói", href: "/mi-mien-chao-pho/mi-goi" },
      { name: "Mì ly", href: "/mi-mien-chao-pho/mi-ly" },
      { name: "Miến, bún khô", href: "/mi-mien-chao-pho/mien-bun-kho" },
      { name: "Phở khô", href: "/mi-mien-chao-pho/pho-kho" },
      { name: "Cháo ăn liền", href: "/mi-mien-chao-pho/chao-an-lien" },
      { name: "Nui, pasta", href: "/mi-mien-chao-pho/nui-pasta" },
    ],
  },

  // 6
  {
    name: "THỰC PHẨM ĐÔNG MÁT",
    href: "/thuc-pham-dong-mat",
    subCategories: [
      { name: "Thực phẩm đông lạnh", href: "/thuc-pham-dong-mat/dong-lanh" },
      { name: "Hải sản đông lạnh", href: "/thuc-pham-dong-mat/hai-san-dong" },
      { name: "Rau củ đông lạnh", href: "/thuc-pham-dong-mat/rau-cu-dong" },
      {
        name: "Chả giò, thịt viên",
        href: "/thuc-pham-dong-mat/cha-gio-thit-vien",
      },
      { name: "Đậu hũ, đồ chay mát", href: "/thuc-pham-dong-mat/do-chay-mat" },
      {
        name: "Xúc xích, giò chả mát",
        href: "/thuc-pham-dong-mat/xuc-xich-gio-cha",
      },
      {
        name: "Đồ ăn chế biến sẵn",
        href: "/thuc-pham-dong-mat/do-che-bien-mat",
      },
    ],
  },

  // 7
  {
    name: "SỮA CÁC LOẠI",
    href: "/sua",
    subCategories: [
      { name: "Sữa tươi/tiệt trùng", href: "/sua/sua-tuoi-tiet-trung" },
      { name: "Sữa hạt, sữa đậu nành", href: "/sua/sua-hat" },
      { name: "Sữa bột", href: "/sua/sua-bot" },
      { name: "Sữa đặc", href: "/sua/sua-dac" },
      { name: "Sữa chua uống", href: "/sua/sua-chua-uong" },
    ],
  },

  // 8
  {
    name: "KEM, SỮA CHUA",
    href: "/kem-sua-chua",
    subCategories: [
      { name: "Sữa chua ăn", href: "/kem-sua-chua/sua-chua-an" },
      { name: "Kem que/kem hộp", href: "/kem-sua-chua/kem" },
      { name: "Sữa chua uống", href: "/kem-sua-chua/sua-chua-uong" },
      { name: "Thạch, rau câu", href: "/kem-sua-chua/thach-rau-cau" },
    ],
  },

  // 9
  {
    name: "BIA, NƯỚC GIẢI KHÁT",
    href: "/bia-nuoc-giai-khat",
    subCategories: [
      { name: "Bia", href: "/bia-nuoc-giai-khat/bia" },
      { name: "Nước ngọt", href: "/bia-nuoc-giai-khat/nuoc-ngot" },
      { name: "Nước suối", href: "/bia-nuoc-giai-khat/nuoc-suoi" },
      { name: "Nước tăng lực", href: "/bia-nuoc-giai-khat/nuoc-tang-luc" },
      { name: "Trà uống liền", href: "/bia-nuoc-giai-khat/tra-dong-chai" },
      { name: "Cà phê lon, hộp", href: "/bia-nuoc-giai-khat/ca-phe-dong-lon" },
      { name: "Nước ép đóng chai", href: "/bia-nuoc-giai-khat/nuoc-ep" },
      { name: "Sữa đậu nành", href: "/bia-nuoc-giai-khat/sua-dau-nanh" },
    ],
  },

  // 10
  {
    name: "BÁNH KẸO CÁC LOẠI",
    href: "/banh-keo-cac-loai",
    subCategories: [
      { name: "Snack", href: "/banh-keo-cac-loai/snack" },
      { name: "Bánh quy", href: "/banh-keo-cac-loai/banh-quy" },
      {
        name: "Bánh xốp, bánh gạo",
        href: "/banh-keo-cac-loai/banh-xop-banh-gao",
      },
      { name: "Bánh bông lan", href: "/banh-keo-cac-loai/banh-bong-lan" },
      { name: "Bánh que/quế", href: "/banh-keo-cac-loai/banh-que" },
      { name: "Sô-cô-la", href: "/banh-keo-cac-loai/socola" },
      { name: "Kẹo cứng", href: "/banh-keo-cac-loai/keo-cung" },
      { name: "Kẹo mềm, kẹo dẻo", href: "/banh-keo-cac-loai/keo-mem-deo" },
      { name: "Kẹo gum", href: "/banh-keo-cac-loai/keo-gum" },
      {
        name: "Hạt sấy, trái cây sấy",
        href: "/banh-keo-cac-loai/hat-trai-cay-say",
      },
      { name: "Khô bò/khô gà", href: "/banh-keo-cac-loai/kho-bo-kho-ga" },
    ],
  },

  // 11
  {
    name: "CHĂM SÓC CÁ NHÂN",
    href: "/cham-soc-ca-nhan",
    subCategories: [
      { name: "Dầu gội, dầu xả", href: "/cham-soc-ca-nhan/dau-goi-dau-xa" },
      { name: "Sữa tắm", href: "/cham-soc-ca-nhan/sua-tam" },
      { name: "Sữa rửa mặt", href: "/cham-soc-ca-nhan/sua-rua-mat" },
      {
        name: "Kem đánh răng, bàn chải",
        href: "/cham-soc-ca-nhan/kem-danh-rang-ban-chai",
      },
      { name: "Dao cạo, gel cạo râu", href: "/cham-soc-ca-nhan/dao-cao" },
      { name: "Khăn giấy ướt/khô", href: "/cham-soc-ca-nhan/khan-giay" },
      { name: "Lăn khử mùi", href: "/cham-soc-ca-nhan/lan-khu-mui" },
      { name: "Băng vệ sinh", href: "/cham-soc-ca-nhan/bang-ve-sinh" },
      { name: "Tã người lớn", href: "/cham-soc-ca-nhan/ta-nguoi-lon" },
    ],
  },

  // 12
  {
    name: "VỆ SINH NHÀ CỬA",
    href: "/ve-sinh-nha-cua",
    subCategories: [
      { name: "Bột giặt, nước giặt", href: "/ve-sinh-nha-cua/bot-nuoc-giat" },
      { name: "Nước xả vải", href: "/ve-sinh-nha-cua/nuoc-xa" },
      { name: "Nước rửa chén", href: "/ve-sinh-nha-cua/nuoc-rua-chen" },
      {
        name: "Nước lau sàn, lau kính",
        href: "/ve-sinh-nha-cua/nuoc-lau-san-kinh",
      },
      { name: "Tẩy rửa nhà bếp/nhà tắm", href: "/ve-sinh-nha-cua/tay-rua" },
      {
        name: "Giấy vệ sinh, khăn giấy",
        href: "/ve-sinh-nha-cua/giay-ve-sinh",
      },
      { name: "Túi rác, màng bọc", href: "/ve-sinh-nha-cua/tui-rac-mang-boc" },
      { name: "Diệt côn trùng", href: "/ve-sinh-nha-cua/diet-con-trung" },
      {
        name: "Găng tay, miếng chà",
        href: "/ve-sinh-nha-cua/gang-tay-mieng-cha",
      },
    ],
  },

  // 13
  {
    name: "SẢN PHẨM MẸ VÀ BÉ",
    href: "/me-va-be",
    subCategories: [
      { name: "Tã/bỉm", href: "/me-va-be/ta-bim" },
      { name: "Khăn ướt", href: "/me-va-be/khan-uot" },
      { name: "Sữa bột cho bé", href: "/me-va-be/sua-bot-be" },
      { name: "Bột/cháo ăn dặm", href: "/me-va-be/an-dam" },
      { name: "Sữa tươi cho bé", href: "/me-va-be/sua-tuoi-be" },
      { name: "Đồ tắm gội cho bé", href: "/me-va-be/tam-goi" },
      { name: "Dụng cụ ăn dặm", href: "/me-va-be/dung-cu-an-dam" },
      { name: "Vệ sinh răng miệng bé", href: "/me-va-be/ve-sinh-rang-mieng" },
    ],
  },

  // 14
  {
    name: "ĐỒ DÙNG GIA ĐÌNH",
    href: "/do-dung-gia-dinh",
    subCategories: [
      { name: "Dụng cụ nhà bếp", href: "/do-dung-gia-dinh/dung-cu-nha-bep" },
      {
        name: "Chén, dĩa, muỗng, đũa",
        href: "/do-dung-gia-dinh/chen-dia-muong-dua",
      },
      { name: "Ly tách, bình nước", href: "/do-dung-gia-dinh/ly-binh" },
      { name: "Hộp đựng, túi zip", href: "/do-dung-gia-dinh/hop-tui" },
      {
        name: "Màng bọc, giấy bạc",
        href: "/do-dung-gia-dinh/mang-boc-giay-bac",
      },
      { name: "Đồ vệ sinh, cây lau", href: "/do-dung-gia-dinh/do-ve-sinh" },
      { name: "Pin, bật lửa, đèn cầy", href: "/do-dung-gia-dinh/pin-bat-lua" },
      { name: "Nhang – đèn", href: "/do-dung-gia-dinh/nhang-den" },
    ],
  },

  // 15 (điều hướng)
  {
    name: "ƯU ĐÃI TỪ HÃNG",
    href: "/uu-dai-tu-hang",
  },

  // 16 (điều hướng)
  {
    name: "XEM CỬA HÀNG",
    href: "/cua-hang",
  },
];

export function CategorySidebar({
  isMobile = false,
  onClose,
}: {
  isMobile?: boolean;
  onClose?: () => void;
}) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <aside
      className={cn(
        "w-64 bg-white border-r border-gray-200 flex flex-col z-10 2xl:ml-33",
        isMobile ? "h-full" : "fixed left-0 top-[64px] bottom-0 hidden lg:flex"
      )}
    >
      {/* Header */}
      <div className=" text-gray-800 p-4 font-bold text-sm uppercase flex-shrink-0 flex items-center justify-between border-b-2">
        <span>Danh mục sản phẩm</span>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="hover:bg-primary-foreground/10 rounded p-1"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Categories */}
      <nav className="py-2 overflow-y-auto flex-1 no-scrollbar">
        {categories.map((category) => (
          <div key={category.name} className="border-b border-gray-100">
            {/* Parent Category */}
            <button
              onClick={() =>
                category.subCategories && toggleCategory(category.name)
              }
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 text-left text-sm font-semibold hover:bg-gray-50 transition-colors",
                category.name === "KHUYẾN MÃI SỐC" && "text-red-600"
              )}
            >
              <div className="flex items-center gap-2">
                {category.icon}
                <span>{category.name}</span>
              </div>
              {category.subCategories && (
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform text-gray-400",
                    expandedCategories.includes(category.name) && "rotate-180"
                  )}
                />
              )}
            </button>

            {/* Sub Categories */}
            {category.subCategories &&
              expandedCategories.includes(category.name) && (
                <div className="bg-gray-50 py-1">
                  {category.subCategories.map((subCategory) => (
                    <Link
                      key={subCategory.name}
                      to={subCategory.href}
                      onClick={() => isMobile && onClose?.()}
                      className="block px-4 py-2 pl-8 text-sm text-gray-700 hover:text-primary hover:bg-white transition-colors"
                    >
                      {subCategory.name}
                    </Link>
                  ))}
                </div>
              )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
