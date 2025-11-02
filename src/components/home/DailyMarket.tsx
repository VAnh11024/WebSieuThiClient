import { useState } from "react";
import type { MenuComboWithIngredients, Ingredient } from "@/types/menu.type";
import { menuCombos } from "@/pages/menu";
import { getIngredientsForDish } from "@/lib/geminiService";

export default function DailyMarket() {
  const [selectedCombo, setSelectedCombo] =
    useState<MenuComboWithIngredients | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Danh sách các tab món ăn
  const tabs = [
    { id: "all", name: "Món măn" },
    { id: "appetizer", name: "Món xào, lược" },
    { id: "fish", name: "Món canh" },
    { id: "vegetable", name: "Rau sống, nêm" },
    { id: "fruit", name: "Trái cây" },
    { id: "dessert", name: "Đồ ăn nhanh" },
    { id: "drink", name: "Tráng miệng" },
  ];

  const handleBuyIngredients = async (combo: MenuComboWithIngredients) => {
    setSelectedCombo(combo);
    setIsModalOpen(true);
    setIsLoadingIngredients(true);
    setError(null);
    setIngredients([]);

    try {
      const fetchedIngredients = await getIngredientsForDish(combo.name);
      setIngredients(fetchedIngredients);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setIsLoadingIngredients(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCombo(null);
    setIngredients([]);
    setError(null);
  };

  const calculateTotalPrice = () => {
    return ingredients.reduce((sum, item) => sum + item.price, 0);
  };

  return (
    <div className="mb-6 sm:mb-8">
      {/* Section Header */}
      <div className="mb-4">
        <h2 className="text-lg sm:text-2xl font-bold text-green-700 uppercase mb-3">
          ĐI CHỢ MỖI NGÀY
        </h2>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap text-xs sm:text-sm font-medium transition-colors ${
                tab.id === "all"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Dishes Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {menuCombos.map((combo) => (
          <div
            key={combo.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={combo.image_url}
                alt={combo.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-3">
              <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-1 line-clamp-2">
                {combo.name}
              </h3>

              {/* Button */}
              <button
                onClick={() => handleBuyIngredients(combo)}
                className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-medium py-2 rounded-md transition-colors"
              >
                MUA NGUYÊN LIỆU
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Ingredients */}
      {isModalOpen && selectedCombo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-green-600 text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg sm:text-xl font-bold">
                  Nguyên liệu món {selectedCombo.name}
                </h3>
                <p className="text-sm opacity-90">
                  Lựa chọn loại nguyên liệu chính
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200 text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {isLoadingIngredients ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                  <p className="text-gray-600">
                    Đang tải danh sách nguyên liệu...
                  </p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={() => handleBuyIngredients(selectedCombo)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
                  >
                    Thử lại
                  </button>
                </div>
              ) : ingredients.length > 0 ? (
                <>
                  {/* Main Ingredients Section */}
                  <div className="mb-6">
                    <h4 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">
                      Lựa chọn loại nguyên liệu chính
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {ingredients.map((ingredient) => (
                        <div
                          key={ingredient.id}
                          className="border border-gray-200 rounded-lg overflow-hidden hover:border-green-500 transition-colors group"
                        >
                          {/* Image with badges */}
                          <div className="relative aspect-square overflow-hidden bg-gray-50">
                            <img
                              src={ingredient.image_url}
                              alt={ingredient.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            {/* Badges */}
                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                                -20%
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-2">
                            <h5 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 mb-1">
                              {ingredient.name}
                            </h5>
                            <p className="text-xs text-gray-500 mb-1">
                              {ingredient.quantity}
                            </p>
                            <p className="text-sm sm:text-base font-bold text-green-600">
                              {ingredient.price.toLocaleString()}đ
                            </p>

                            {/* Quantity controls */}
                            <div className="flex items-center justify-between mt-2 bg-gray-100 rounded p-1">
                              <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-white rounded">
                                −
                              </button>
                              <span className="text-sm font-medium">1</span>
                              <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-white rounded">
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">
                    Không tìm thấy nguyên liệu phù hợp
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {!isLoadingIngredients && !error && ingredients.length > 0 && (
              <div className="border-t bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-gray-600">Tổng tiền</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-600">
                    {calculateTotalPrice().toLocaleString()}đ
                  </p>
                </div>
                <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors">
                  MUA
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
