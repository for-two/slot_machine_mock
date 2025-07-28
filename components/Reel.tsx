'use client'

import { useState, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react'
import { SYMBOLS, Symbol } from './SlotMachine'

interface ReelProps {
  onStop: (symbol: Symbol) => void
  isActive: boolean
}

interface ReelRef {
  stop: () => void
}

const Reel = forwardRef<ReelRef, ReelProps>(({ onStop, isActive }, ref) => {
  const [currentSymbolIndex, setCurrentSymbolIndex] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinSpeed, setSpinSpeed] = useState(100)

  // スピン制御
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive && isSpinning) {
      interval = setInterval(() => {
        setCurrentSymbolIndex(prev => (prev + 1) % SYMBOLS.length)
      }, spinSpeed)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, isSpinning, spinSpeed])

  // アクティブ状態変更時の処理
  useEffect(() => {
    if (isActive) {
      setIsSpinning(true)
      setSpinSpeed(50) // 高速スピン
    }
  }, [isActive])

  // 停止処理
  const stop = useCallback(() => {
    if (!isSpinning) return

    // スピードを徐々に落とす
    setSpinSpeed(prev => prev * 2)
    
    setTimeout(() => {
      setSpinSpeed(prev => prev * 2)
      
      setTimeout(() => {
        // ランダムなシンボルで停止
        const randomIndex = Math.floor(Math.random() * SYMBOLS.length)
        setCurrentSymbolIndex(randomIndex)
        setIsSpinning(false)
        onStop(SYMBOLS[randomIndex])
      }, 300)
    }, 200)
  }, [isSpinning, onStop])

  // ref経由で停止関数を公開
  useImperativeHandle(ref, () => ({ stop }), [stop])

  const currentSymbol = SYMBOLS[currentSymbolIndex]

  return (
    <div className="relative">
      {/* リール背景 */}
      <div className="bg-gradient-to-b from-amber-700 via-amber-800 to-red-900 rounded-xl border-4 border-amber-400 w-24 h-32 flex items-center justify-center overflow-hidden relative shadow-lg">
        {/* 和風パターン背景 */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 2px, transparent 2px)`,
            backgroundSize: '10px 10px'
          }} />
        </div>

        {/* スピンエフェクト */}
        {isSpinning && (
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-amber-300/30 to-transparent animate-pulse" />
        )}
        
        {/* シンボル表示 */}
        <div className={`text-6xl transition-all duration-200 relative z-10 ${
          isSpinning ? 'blur-sm scale-110' : 'blur-0 scale-100'
        } ${currentSymbol.name === 'oni' ? 'animate-pulse' : ''} ${
          currentSymbol.name === 'dragon' ? 'animate-bounce' : ''
        }`}>
          {currentSymbol.emoji}
        </div>
        
        {/* 輝きエフェクト（高価値シンボル用） */}
        {!isSpinning && currentSymbol.value >= 100 && (
          <div className="absolute inset-0 bg-gradient-radial from-amber-400/40 to-transparent animate-ping" />
        )}
        
        {/* 特別エフェクト（鬼シンボル用） */}
        {!isSpinning && currentSymbol.name === 'oni' && (
          <>
            <div className="absolute inset-0 bg-gradient-radial from-red-500/40 to-transparent animate-pulse" />
            <div className="absolute -inset-2">
              <div className="w-full h-full border-2 border-red-400 rounded-xl animate-ping" />
            </div>
          </>
        )}
      </div>
      
      {/* リール下のライト（和風） */}
      <div className={`mt-2 h-3 rounded-full transition-all duration-300 border ${
        isSpinning 
          ? 'bg-red-500 border-red-400 animate-pulse shadow-red-500/50 shadow-lg' 
          : !isActive
          ? 'bg-gray-600 border-gray-500'
          : 'bg-amber-500 border-amber-400 shadow-amber-500/50 shadow-lg'
      }`} />
      
      {/* シンボル名表示 */}
      <div className="text-center mt-1">
        <div className="text-amber-100 text-xs font-serif font-bold">
          {!isSpinning && currentSymbol.label}
        </div>
      </div>
    </div>
  )
})

Reel.displayName = 'Reel'

export default Reel 