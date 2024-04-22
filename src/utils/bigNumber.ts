import BigNumber from 'bignumber.js'

export const BIG_ZERO = new BigNumber(0)
export const BIG_TEN = new BigNumber(10)
export const ONE_BILLION = new BigNumber(1_000_000_000)
/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
export default function isZero(hexNumberString: string) {
  return /^0x0*$/.test(hexNumberString)
}
