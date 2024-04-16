'use client'

import { client, smartWalletConfig } from './provider'
import { useEffect, useState } from 'react'
import { WalletId, createWallet } from 'thirdweb/wallets'
import { useConnect } from 'thirdweb/react'
import { LAST_CONNECT_PERSONAL_WALLET_ID } from './constants'

export const useIsAutoConnecting = () => {
  const [isAutoConnecting, setIsAutoConnecting] = useState<boolean>()

  return { isAutoConnecting, setIsAutoConnecting }
}

export const ThirdwebAutoConnect = () => {
  const { setIsAutoConnecting } = useIsAutoConnecting()
  const { connect } = useConnect()

  useEffect(() => {
    const main = async () => {
      setIsAutoConnecting(true)
      try {
        const personalWalletId = localStorage.getItem(
          LAST_CONNECT_PERSONAL_WALLET_ID
        )
        if (!personalWalletId) return
        const personalWallet = createWallet(personalWalletId as WalletId)
        const personalAccount = await personalWallet.autoConnect({
          client: client,
        })
        const smartWallet = createWallet('smart', smartWalletConfig)
        await smartWallet.connect({ personalAccount, client: client })
        await connect(smartWallet)
      } finally {
        setIsAutoConnecting(false)
      }
    }

    main()
  }, [setIsAutoConnecting, connect])

  return <></>
}
