import { useReadContracts,useAccount ,useReadContract} from 'wagmi';
import { useMemo } from 'react';
import eggAbi from '../config/abi/eggAbi.json'
import { MainContractAddr } from '../config/contants'
import { NULL_ADDRESS } from '@config/contants'


const useBatchFetchData = () => {
    const { address } = useAccount()
    const enabled = !!address && address !== NULL_ADDRESS


  // 使用 useReadContracts 钩子来执行批量读取
  const { data, isError, isLoading } = useReadContract({
    abi: eggAbi,
    address: MainContractAddr,
    functionName: 'validFollowers',
    args: [address],
    query: {
      enabled: enabled,
    },
  });
  const flowwers = data as BigInt | undefined;
  return {
    flowwers,
    isError,
    isLoading,
  };
};

export default useBatchFetchData;
