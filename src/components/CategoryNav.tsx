"use client"

import { useRef, useState, useEffect } from "react"
import ScrollButton from "@/components/ScrollButton"

interface Category {
  id: string
  name: string
  image: string
  badge?: string
  badgeColor?: string
}

const categories: Category[] = [
  {
    id: "giat-xa",
    name: "Giặt xả",
    image: "https://cdnv2.tgdd.vn/bhx-static/bhx/menuheader/frame-1984079259_202510011356076995.gif",
    badgeColor: "bg-red-500",
  },
  {
    id: "dau-an",
    name: "Dầu ăn",
    image: "https://cdnv2.tgdd.vn/bhx-static/bhx/menuheader/dau-an-final_202510031117342125.gif",
    badgeColor: "bg-green-600",
  },
  {
    id: "gao-nep",
    name: "Gạo, nếp",
    image: "https://cdnv2.tgdd.vn/bhx-static/bhx/menuheader/gao-nep_202509272332404857.gif",
    badgeColor: "bg-purple-600",
  },
  {
    id: "mi-an-lien",
    name: "Mì ăn liền",
    image: "https://cdnv2.tgdd.vn/bhx-static/bhx/menuheader/gau-do_202510031119471876.gif", 
  },
  {
    id: "nuoc-suoi",
    name: "Nước suối",
    image: "https://cdnv2.tgdd.vn/bhx-static/bhx/menuheader/nuoc-suoi1_202510010943414955.gif",
    badgeColor: "bg-red-500",
  },
  {
    id: "sua-chua",
    name: "Sữa chu...",
    image: "https://cdnv2.tgdd.vn/bhx-static/bhx/menuheader/sua-chuaaaaaa_202510031048439232.gif", 
    badgeColor: "bg-green-600",
  },
  {
    id: "rau-la",
    name: "Rau lá",
    image: "https://cdnv2.tgdd.vn/bhx-static/bhx/menuheader/rau-la_202509272336201019.gif",
    badgeColor: "bg-red-500",
  },
  {
    id: "nuoc-tra",
    name: "Nước trà",
    image: "https://cdnv2.tgdd.vn/bhx-static/bhx/menuheader/tra_202510081101058749.gif",
    badgeColor: "bg-red-500",
  },
  {
    id: "banh",
    name: "Bánh snack",
    image: "https://cdnv2.tgdd.vn/bhx-static/bhx/Category/Images/3364/frame-3476166_202503191335420491.png",
  },
  {
    id: "ca-vien",
    name: "Cà viên, bò viên",
    image: "https://cdnv2.tgdd.vn/bhx-static/bhx/Category/Images/7170/1990403_202504021436547470.png",
  },
{
    id: "cu-qua",
    name: "Củ, quả",
    image: "https://cdnv2.tgdd.vn/bhx-static/bhx/Category/Images/8785/rau-cu_202509251624277482.png",
  },
  {
    id: "thit-heo",
    name: "Thịt heo",
    image: "https://cdnv2.tgdd.vn/bhx-static/bhx/Category/Images/8781/thit-heo_202509110924556310.png",
  },
  {
    id: "xuc-xich",
    name: "Xúc xích, lạp xưởng tươi",
    image: "https://cdnv2.tgdd.vn/bhx-static/bhx/Category/Images/7618/120x120-5_202410101421040963.png",
  },
  {
    id: "keo-cung",
    name: "Kẹo cứng",
    image: "https://cdnv2.tgdd.vn/bhx-static/bhx/Category/Images/2687/keo-cung_202508291640443457.png",
  },
  {
    id: "nam",
    name: "Nấm các loại",
    image: "https://cdnv2.tgdd.vn/bhx-static/bhx/Category/Images/8779/8779-id_202504021437339917.png",
  },
  {
    id: "trai-cay",
    name: "Trái cây",
    image: "https://cdnv2.tgdd.vn/bhx-static/bhx/Category/Images/8788/trai-cay_202509081009396955.png",
  },
  {
    id: "trai-cay",
    name: "Trái cây",
    image: "https://cdnv2.tgdd.vn/bhx-static/bhx/Category/Images/8788/trai-cay_202509081009396955.png",
  },
  {
    id: "trai-cay",
    name: "Trái cây",
    image: "https://cdnv2.tgdd.vn/bhx-static/bhx/Category/Images/8788/trai-cay_202509081009396955.png",
  },
  {
    id: "trai-cay",
    name: "Trái cây",
    image: "https://cdnv2.tgdd.vn/bhx-static/bhx/Category/Images/8788/trai-cay_202509081009396955.png",
  },
]

export function CategoryNav() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)
  const [isMouseOver, setIsMouseOver] = useState(false)

  const checkScroll = () => {
    const container = scrollContainerRef.current
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container
      setShowLeftButton(scrollLeft > 1)
      const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1
      setShowRightButton(!isAtEnd)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    checkScroll()
    window.addEventListener("resize", checkScroll)
    container.addEventListener("scroll", checkScroll)

    const handleWheel = (e: WheelEvent) => {
      if (isMouseOver) {
        e.preventDefault()
        container.scrollLeft += e.deltaY
      }
    }

    container.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("resize", checkScroll)
      container.removeEventListener("scroll", checkScroll)
      container.removeEventListener("wheel", handleWheel)
    }
  }, [isMouseOver])

  return (
    <div
      className="w-full bg-background relative group/container"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <div className="opacity-0 group-hover/container:opacity-100 transition-opacity">
        {showLeftButton && <ScrollButton direction="left" onClick={() => scroll("left")} />}
        {showRightButton && <ScrollButton direction="right" onClick={() => scroll("right")} />}
      </div>

      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div className="flex p-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className="flex flex-col items-center gap-2 min-w-[80px] group"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center transition-transform group-hover:scale-105">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {category.badge && (
                  <div
                    className={`absolute -top-1 -right-1 ${category.badgeColor} text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap`}
                  >
                    {category.badge}
                  </div>
                )}
              </div>
              <span className="text-xs text-center leading-tight text-foreground max-w-[80px] truncate">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}