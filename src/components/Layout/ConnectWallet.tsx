import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from '@mui/material'
import { ReactNode } from 'react'

type ComponentProps<T extends keyof JSX.IntrinsicElements> = {
  variant?: 'secondary' | null | undefined
  size?: 'default' | 'lg' | null | undefined
  className?: string
  variantType?: 'button' | 'link'
  leftIcon?: ReactNode
} & Omit<JSX.IntrinsicElements[T], 'variant' | 'size' | 'className'>

export const ConnectButton = <T extends keyof JSX.IntrinsicElements>({
  leftIcon,
}: ComponentProps<T>) => {
  const styleVariants = Button

  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected = ready && account && chain
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return <Button onClick={openConnectModal}>链接钱包</Button>
              }
              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} type="button">
                    Wrong network
                  </Button>
                )
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <div
                    onClick={openChainModal}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 24,
                              height: 24,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{
                              width: 24,
                              height: 24,
                            }}
                          />
                        )}
                      </div>
                    )}

                    {/* {chain.name} */}
                  </div>
                  <Button onClick={openAccountModal} type="button">
                    {leftIcon && <span>{leftIcon}</span>}

                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ''}
                  </Button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </RainbowConnectButton.Custom>
  )
}
