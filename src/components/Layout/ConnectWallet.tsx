import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@mui/material";
import { ReactNode } from "react";

type ComponentProps<T extends keyof JSX.IntrinsicElements> = {
    variant?: "secondary" | null | undefined;
    size?: "default" | "lg" | null | undefined;
    className?: string;
    variantType?: "button" | "link";
    leftIcon?: ReactNode;
} & Omit<JSX.IntrinsicElements[T], "variant" | "size" | "className">;

export const ConnectButton = <T extends keyof JSX.IntrinsicElements>({
    variant = "secondary",
    size,
    className,
    variantType,
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
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== "loading";
                const connected = ready && account && chain;
                // &&
                // (!authenticationStatus ||
                //     authenticationStatus === "authenticated");
                // if (account) setAccount && setAccount(account);
            
                return (
                    <div
                        {...(!ready && {
                            "aria-hidden": true,
                            style: {
                                opacity: 0,
                                pointerEvents: "none",
                                userSelect: "none",
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <Button
                                       
                                        onClick={openConnectModal}
                                       
                                    >
                                        
                                        Connect Wallet
                                    </Button>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <Button
                                       
                                        onClick={openChainModal}
                                        type="button"
                                    >
                                      
                                        Wrong network
                                    </Button>
                                );
                            }
                            return (
                                <div style={{ display: "flex", gap: 12 }}>
                                    {/* <Button
                                       
                                        onClick={openChainModal}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                        type="button"
                                    >
                                       

                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background:
                                                        chain.iconBackground,
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: 999,
                                                    overflow: "hidden",
                                                    marginRight: 4,
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={
                                                            chain.name ??
                                                            "Chain icon"
                                                        }
                                                        src={chain.iconUrl}
                                                        style={{
                                                            width: 12,
                                                            height: 12,
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        )}

                                        {chain.name}
                                    </Button> */}
                                    <Button
                                        
                                        onClick={openAccountModal}
                                        type="button"
                                    >
                                        {leftIcon && <span>{leftIcon}</span>}

                                        {account.displayName}
                                        {account.displayBalance
                                            ? ` (${account.displayBalance})`
                                            : ""}
                                    </Button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </RainbowConnectButton.Custom>
    );
};