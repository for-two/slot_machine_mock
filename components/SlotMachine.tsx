'use client'

import { useState, useCallback, useRef } from 'react'
import Reel from './Reel'

// 和風スロットシンボル定義
export const SYMBOLS = [
  { emoji: '🌸', name: 'sakura', value: 10, label: '桜' },
  { emoji: '🎋', name: 'bamboo', value: 20, label: '竹' },
  { emoji: '🐯', name: 'tiger', value: 30, label: '虎' },
  { emoji: '🦅', name: 'eagle', value: 40, label: '鷹' },
  { emoji: '🎌', name: 'flag', value: 50, label: '日の丸' },
  { emoji: '⛩️', name: 'torii', value: 100, label: '鳥居' },
  { emoji: '🐉', name: 'dragon', value: 200, label: '龍' },
  { emoji: '👹', name: 'oni', value: 500, label: '鬼' }
] as const

export type Symbol = typeof SYMBOLS[number]

interface GameState {
  isSpinning: boolean
  credits: number
  bet: number
  winAmount: number
  lastWin: boolean
  jackpot: boolean
}

interface ReelState {
  isSpinning: boolean
  symbol: Symbol
}

export default function SlotMachine() {
  const [gameState, setGameState] = useState<GameState>({
    isSpinning: false,
    credits: 1000,
    bet: 10,
    winAmount: 0,
    lastWin: false,
    jackpot: false
  })

  const [reelStates, setReelStates] = useState<ReelState[]>([
    { isSpinning: false, symbol: SYMBOLS[0] },
    { isSpinning: false, symbol: SYMBOLS[1] },
    { isSpinning: false, symbol: SYMBOLS[2] }
  ])

  const reelRefs = useRef<Array<{ stop: () => void } | null>>([null, null, null])

  // スピン開始
  const startSpin = useCallback(() => {
    if (gameState.isSpinning || gameState.credits < gameState.bet) return

    setGameState(prev => ({
      ...prev,
      isSpinning: true,
      credits: prev.credits - prev.bet,
      winAmount: 0,
      lastWin: false,
      jackpot: false
    }))

    setReelStates(prev => prev.map(reel => ({ ...reel, isSpinning: true })))
  }, [gameState.isSpinning, gameState.credits, gameState.bet])

  // 個別リール停止
  const stopReel = useCallback((reelIndex: number) => {
    if (!gameState.isSpinning) return

    const ref = reelRefs.current[reelIndex]
    if (ref) {
      ref.stop()
    }
  }, [gameState.isSpinning])

  // 全リール停止
  const stopAllReels = useCallback(() => {
    if (!gameState.isSpinning) return

    reelRefs.current.forEach((ref, index) => {
      if (ref) {
        setTimeout(() => ref.stop(), index * 500) // 0.5秒ずつずらして停止
      }
    })
  }, [gameState.isSpinning])

  // リール停止時のコールバック
  const onReelStop = useCallback((reelIndex: number, symbol: Symbol) => {
    setReelStates(prev => {
      const newStates = [...prev]
      newStates[reelIndex] = { isSpinning: false, symbol }
      
      // 全リールが停止したかチェック
      const allStopped = newStates.every(reel => !reel.isSpinning)
      
      if (allStopped) {
        // 当たり判定
        const symbols = newStates.map(reel => reel.symbol)
        checkWin(symbols)
        
        setGameState(prev => ({ ...prev, isSpinning: false }))
      }
      
      return newStates
    })
  }, [])

  // 当たり判定
  const checkWin = useCallback((symbols: Symbol[]) => {
    const [first, second, third] = symbols
    
    // 3つ揃い
    if (first.name === second.name && second.name === third.name) {
      const winAmount = first.value * gameState.bet
      const isJackpot = first.name === 'oni'
      
      setGameState(prev => ({
        ...prev,
        credits: prev.credits + winAmount,
        winAmount,
        lastWin: true,
        jackpot: isJackpot
      }))
    }
    // 2つ揃い（小当たり）
    else if (first.name === second.name || second.name === third.name || first.name === third.name) {
      const winAmount = Math.floor(gameState.bet * 0.5)
      
      setGameState(prev => ({
        ...prev,
        credits: prev.credits + winAmount,
        winAmount,
        lastWin: true,
        jackpot: false
      }))
    }
  }, [gameState.bet])

  // ベット変更
  const changeBet = useCallback((newBet: number) => {
    if (!gameState.isSpinning && newBet <= gameState.credits) {
      setGameState(prev => ({ ...prev, bet: newBet }))
    }
  }, [gameState.isSpinning, gameState.credits])

  return (
    <div className="bg-gradient-to-b from-red-800 via-red-700 to-amber-800 rounded-3xl shadow-2xl p-8 border-8 border-amber-400 relative overflow-hidden">
      {/* 和風装飾パターン */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)`
        }} />
      </div>

      {/* ヘッダー情報 */}
      <div className="mb-6 text-center relative z-10">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-black rounded-lg p-3 border-2 border-amber-400">
            <div className="text-amber-400 text-sm font-serif font-bold">小判</div>
            <div className="text-amber-400 text-2xl font-mono font-bold">{gameState.credits}</div>
          </div>
          <div className="bg-black rounded-lg p-3 border-2 border-red-400">
            <div className="text-red-400 text-sm font-serif font-bold">賭け金</div>
            <div className="text-red-400 text-2xl font-mono font-bold">{gameState.bet}</div>
          </div>
          <div className="bg-black rounded-lg p-3 border-2 border-yellow-400">
            <div className="text-yellow-400 text-sm font-serif font-bold">当たり</div>
            <div className="text-yellow-400 text-2xl font-mono font-bold">{gameState.winAmount}</div>
          </div>
        </div>
        
        {/* 当たり演出 */}
        {gameState.lastWin && (
          <div className={`animate-bounce text-4xl font-bold font-serif ${
            gameState.jackpot ? 'text-red-200' : 'text-amber-200'
          }`}>
            {gameState.jackpot ? '🎊 大当たり！！ 🎊' : '✨ 当たり！ ✨'}
          </div>
        )}
      </div>

      {/* リール部分 */}
      <div className="bg-black rounded-2xl p-6 mb-6 border-4 border-amber-400 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-400/20 to-transparent rounded-2xl" />
        <div className="flex justify-center space-x-4 relative z-10">
          {reelStates.map((_, index) => (
            <Reel
              key={index}
              ref={(ref: { stop: () => void } | null) => { reelRefs.current[index] = ref }}
              onStop={(symbol: Symbol) => onReelStop(index, symbol)}
              isActive={gameState.isSpinning}
            />
          ))}
        </div>
      </div>

      {/* コントロール部分 */}
      <div className="space-y-4 relative z-10">
        {/* ベット選択 */}
        <div className="text-center">
          <div className="text-amber-100 font-bold mb-2 font-serif text-lg">賭け金を選ぶ</div>
          <div className="flex justify-center space-x-2">
            {[10, 20, 50, 100].map((bet) => (
              <button
                key={bet}
                onClick={() => changeBet(bet)}
                disabled={gameState.isSpinning || gameState.credits < bet}
                className={`px-4 py-2 rounded-lg font-bold transition-all font-serif border-2 ${
                  gameState.bet === bet
                    ? 'bg-red-600 text-white border-red-400'
                    : 'bg-amber-100 text-red-800 border-amber-400 hover:bg-amber-200'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {bet}両
              </button>
            ))}
          </div>
        </div>

        {/* メインボタン */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={startSpin}
            disabled={gameState.isSpinning || gameState.credits < gameState.bet}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl text-xl transition-all transform hover:scale-105 active:scale-95 border-2 border-red-400 font-serif shadow-lg"
          >
            {gameState.isSpinning ? '回転中...' : '回す'}
          </button>
          
          {gameState.isSpinning && (
            <button
              onClick={stopAllReels}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all transform hover:scale-105 active:scale-95 border-2 border-amber-400 font-serif shadow-lg"
            >
              全停止
            </button>
          )}
        </div>

        {/* 個別停止ボタン */}
        {gameState.isSpinning && (
          <div className="flex justify-center space-x-2">
            {reelStates.map((reel, index) => (
              <button
                key={index}
                onClick={() => stopReel(index)}
                disabled={!reel.isSpinning}
                className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-all border border-orange-400 font-serif"
              >
                {index + 1}番目
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 配当表 */}
      <div className="mt-6 bg-black rounded-lg p-4 border-2 border-amber-400 relative z-10">
        <div className="text-amber-100 text-center font-bold mb-2 font-serif">配当表</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {SYMBOLS.map((symbol) => (
            <div key={symbol.name} className="text-amber-100 flex justify-between font-serif">
              <span>{symbol.emoji} {symbol.label} ×3</span>
              <span>{symbol.value}倍</span>
            </div>
          ))}
        </div>
        <div className="text-amber-200 text-center mt-2 text-xs font-serif">
          ※2つ揃いでも小当たり（0.5倍）
        </div>
      </div>
    </div>
  )
} 