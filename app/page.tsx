import SlotMachine from '@/components/SlotMachine'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-amber-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 和風背景パターン */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      {/* 浮遊する桜の花びら */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 opacity-60 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            🌸
          </div>
        ))}
      </div>

      <div className="text-center relative z-10">
        <h1 className="text-6xl font-bold text-amber-100 mb-2 drop-shadow-2xl font-serif">
          🎌 和風スロット 🎌
        </h1>
        <p className="text-xl text-red-100 mb-8 drop-shadow font-serif">
          縁起の良いシンボルで大当たりを目指せ！
        </p>
        <SlotMachine />
      </div>
    </main>
  )
}
