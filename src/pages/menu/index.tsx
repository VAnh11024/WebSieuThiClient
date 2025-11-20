import type { MenuCombo } from "@/types/menu.type";

// Dữ liệu 5 món ăn mẫu
export const menuCombos: MenuCombo[] = [
  {
    id: 1,
    name: "Gà kho sả",
    description: "Món gà kho sả thơm ngon, đậm đà hương vị truyền thống",
    price: 120000,
    status: 1,
    image_url:
      "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8790/357548/bhx/combo-ga-kho-sa_202510071345232069.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Phở gà",
    description: "Phở gà thơm ngon với nước dùng ngọt thanh từ gà ta",
    price: 85000,
    status: 1,
    image_url:
      "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8790/357951/bhx/combo-pho-ga_202510141618490613.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Cá basa kho tộ",
    description: "Cá basa kho tộ đậm đà, thấm gia vị, ăn cơm rất ngon",
    price: 95000,
    status: 1,
    image_url:
      "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/357551/bhx/ca-basa-kho-to_202510071355204357.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Mỳ Ý",
    description: "Mỳ Ý sốt bò bằm đậm đà kiểu Ý, hấp dẫn",
    price: 75000,
    status: 1,
    image_url:
      "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8158/357953/bhx/combo-my-y_202510141624025461.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: "Thịt đà điểu",
    //description: "Bò kho mềm thơm, ăn kèm bánh mỳ hoặc cơm đều ngon",
    description: "Thịt đà điểu mềm thơm, ăn kèm bánh mỳ hoặc cơm đều ngon",
    price: 110000,
    status: 1,
    image_url:
      "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8139/357937/bhx/combo-bo-kho_202510141443362130.jpg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
