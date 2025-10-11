import { CategoryNav } from "@/components/CategoryNav"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <CategoryNav />
      <div className="p-4">
        <h1 className="text-2xl font-bold">HomePage</h1>
      </div>
    </div>
  )
}
