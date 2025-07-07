import { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

export default function Payment() {
  const [wallet, setWallet] = useState('');
  const [txHash, setTxHash] = useState('');
  const [loading, setLoading] = useState(false);

  const sendPayment = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask');
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const wallet = accounts[0];
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: '0x54623f2cFB1C07AE8C0CEfBab3d9055C52A33d74', // TODO: Replace with your real wallet address
        value: ethers.parseEther('0.001'),
      });

      await tx.wait();
      setWallet(wallet);
      setTxHash(tx.hash);
      localStorage.setItem('wallet', wallet);

      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/api/payment/log',
        {
          wallet,
          txHash: tx.hash,
          amount: '0.001',
        },
        {
          headers: { 'x-auth-token': token },
        }
      );

      alert('✅ Payment successful! You can now post a job.');
    } catch (err) {
      console.error(err);
      alert('❌ Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Pay to Post a Job</h1>
      <p className="mb-4 text-center">Connect MetaMask and send 0.001 MATIC to proceed.</p>
      <button
        onClick={sendPayment}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full"
      >
        {loading ? 'Processing...' : 'Pay with MetaMask'}
      </button>

      {wallet && (
        <div className="mt-4 text-sm text-center">
          <p><strong>Wallet:</strong> {wallet}</p>
          <p><strong>Tx Hash:</strong> <a href={`https://mumbai.polygonscan.com/tx/${txHash}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">{txHash}</a></p>
        </div>
      )}
    </div>
  );
}