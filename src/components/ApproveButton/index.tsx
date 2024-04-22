import React from 'react'
import { Button ,CircularProgress} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import { constants } from 'ethers'
import { toast } from 'react-toastify'
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { erc20Abi as erc20ABI } from 'viem'
import { getBalanceNumber } from '@utils/formatterBalance'

type EthereumAddress = `0x${string}`
interface ApproProps {
  className: string
  token: any
  contractAddr: EthereumAddress
  children?: any
}

const ApproveButton: React.FC<ApproProps> = ({ className = '', token, contractAddr, ...props }) => {
  const { AddressZero, MaxUint256 } = constants
  const [qLoading, setQLoading] = useState(false)
  const [aLoading, setALoading] = useState(false)
  const [allowance, setAllowance] = useState(0)
  const { address } = useAccount()
  if (!address) return
  const { data: hash, isPending, error, writeContract } = useWriteContract()

  const getAllowance = useCallback(async () => {
    if (qLoading) return
    setQLoading(true)
    const { data: allowance } = await useReadContract({
      address: token.address,
      abi: erc20ABI,
      functionName: 'allowance',
      args: [address, contractAddr],
    })

    allowance && setAllowance(getBalanceNumber(new BigNumber(allowance.toString()), token.decimals))
    setQLoading(false)
  }, [qLoading, token, address])

  const cProps = useMemo(() => props.children.props, [props.children.props])

  const loading = useMemo(() => {
    return cProps?.loading || aLoading || qLoading
  }, [aLoading, qLoading, cProps?.loading])

  const disabled = useMemo(() => cProps.disabled || loading, [cProps.disabled, loading])

  const isNeedApprove = useMemo(() => {
    return (
      token.address !== AddressZero && new BigNumber(token.amount).gt(allowance) && !cProps.disabled
    )
  }, [cProps.disabled, token.amount, allowance])

  const toApprove = useCallback(async () => {
    if (aLoading) return
    setALoading(true)
    try {
      await writeContract({
        address: token.address,
        abi: erc20ABI,
        functionName: 'approve',
        args: [contractAddr, BigInt(MaxUint256.toString())],
        // gas: '55000'
      })
      const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
      })
      if (isConfirmed) {
        toast('success')
        await getAllowance()
      } else {
        // hashNotify(hash, "error", "Approve Failed");
      }
      setALoading(false)
    } catch (error) {
      console.log('approve failed', error)
      // notify("Approve Failed", "error");
      setALoading(false)
    }
  }, [aLoading, token, address])

  const handClick = () => {
    if (isNeedApprove) {
      toApprove()
    }
  }

  useEffect(() => {
    console.log('token', token)
    if (token?.amount && token.address !== AddressZero) {
      getAllowance()
    }
  }, [token])

  return (
    <>
      {isNeedApprove ? (
        <Button className={`${className}`} color="primary" disabled={disabled} endIcon={loading ? <CircularProgress size={20} color="inherit" /> : null} onClick={handClick}>
          {isNeedApprove ? `Approve ${token.symbol}` : ''}
        </Button>
      ) : (
        props.children
      )}
    </>
  )
}

export default ApproveButton
