import { useAddress } from '@meshsdk/react';

export default function WalletAddress() {
  const address = useAddress();

  return (
    <div><p>Your wallet address is: <code>{address}</code></p></div>
  );
}