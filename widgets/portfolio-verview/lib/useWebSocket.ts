import { useEffect } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks'
import { updateAssetPrices } from '../model/slice'

export const useWebSocket = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    let socket: WebSocket
    let retryCount = 0
    const maxRetries = 5
    const retryDelay = 3000 // 3 секунды между попытками

    const connect = () => {
      socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr')

      socket.onopen = () => {
        console.log('WebSocket connected')
        retryCount = 0 // Сброс счетчика при успешном подключении
      }

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          const relevantAssets = data.filter((asset: any) => 
            ['btcusdt', 'ethusdt', 'bnbusdt', 'solusdt', 'xrpusdt'].includes(asset.s.toLowerCase())
          )

          const updatedAssets = relevantAssets.map((asset: any) => ({
            symbol: asset.s.toLowerCase(),
            price: parseFloat(asset.c),
            change24h: parseFloat(asset.P),
          }))

          dispatch(updateAssetPrices(updatedAssets))
        } catch (error) {
          console.error('Error processing WebSocket message:', error)
        }
      }

      socket.onerror = (error) => {
        console.error('WebSocket error:', error)
      }

      socket.onclose = (event) => {
        console.log(`WebSocket closed: ${event.reason}`)
        if (retryCount < maxRetries) {
          retryCount++
          console.log(`Retrying connection (${retryCount}/${maxRetries})...`)
          setTimeout(connect, retryDelay)
        } else {
          console.error('Max retries reached, giving up')
        }
      }
    }

    connect()

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close(1000, 'Component unmounted')
      }
    }
  }, [dispatch])
}