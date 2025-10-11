import React, { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  discountPrice?: string;
  onBuy?: (quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  image, 
  name, 
  price, 
  discountPrice, 
  onBuy
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleBuy = () => {
    onBuy?.(quantity);
  };

  return (
    <div 
      className="group relative w-full max-w-sm rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* Container hình ảnh - Clickable */}
      <button 
        onClick={handleBuy}
        className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 overflow-hidden w-full text-left"
      >
        <div className={`transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-32 sm:h-40 md:h-48 object-contain drop-shadow-lg"
          />
        </div>
        
        {/* Overlay gradient khi hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/10 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </button>

      <div className="p-3 sm:p-4 md:p-5">
        <button 
          onClick={handleBuy}
          className="w-full text-left"
        >
          <h3 className="text-gray-800 font-medium text-sm sm:text-base mb-2 sm:mb-3 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] hover:text-blue-600 transition-colors">
            {name}
          </h3>
        </button>

        <div className="mb-3 sm:mb-4">
          <div className="flex items-baseline gap-2">
            {discountPrice ? (
              <>
                <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                  {discountPrice}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 line-through">{price}</p>
              </>
            ) : (
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{price}</p>
            )}
          </div>
        </div>

        <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden mb-2 sm:mb-3">
          <button
            onClick={handleDecrease}
            className="flex-1 p-1.5 sm:p-2 hover:bg-gray-100 transition-colors"
          >
            <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 mx-auto" />
          </button>
          <div className="flex-1 text-center font-semibold text-sm sm:text-base text-gray-800 border-x-2 border-gray-200 py-1.5 sm:py-2">
            {quantity}
          </div>
          <button
            onClick={handleIncrease}
            className="flex-1 p-1.5 sm:p-2 hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 mx-auto" />
          </button>
        </div>

        <button
          onClick={handleBuy}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 sm:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group text-sm sm:text-base"
        >
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
          <span>Mua ngay</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;