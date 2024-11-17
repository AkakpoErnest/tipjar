// Replace with your deployed contract address
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
// Load ABI from contractABI.json (or paste your ABI directly here)
const abi = [
    // Add your ABI here
];

let provider, signer, contract;

async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, abi, signer);

        const address = await signer.getAddress();
        document.getElementById("walletStatus").innerText = `Wallet Connected: ${address}`;
    } else {
        alert("Please install MetaMask!");
    }
}

async function depositTip() {
    const amount = document.getElementById("tipAmount").value;
    const parsedAmount = ethers.utils.parseUnits(amount, 6);
    const tx = await contract.depositTip(parsedAmount);
    await tx.wait();
    alert("Tip sent successfully!");
}

async function withdrawFunds() {
    const amount = document.getElementById("withdrawAmount").value;
    const parsedAmount = ethers.utils.parseUnits(amount, 6);
    const tx = await contract.withdrawFunds(parsedAmount);
    await tx.wait();
    alert("Funds withdrawn successfully!");
}

async function getBalance() {
    const balance = await contract.getBalance();
    const formattedBalance = ethers.utils.formatUnits(balance, 6);
    document.getElementById("balance").innerText = `Current Balance: ${formattedBalance} USDC`;
}
