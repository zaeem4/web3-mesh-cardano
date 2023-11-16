import { useWalletList } from '@meshsdk/react';

export default function WalletList() {
  const wallets = useWalletList();

  return (
    <>
      {wallets.map((wallet, i) => {
        return (
          <p key={i}>
            <img src={wallet.icon} style={{ width: '48px' }} />
            <b>{wallet.name}</b>
          </p>
        );
      })}
    </>
  );
}