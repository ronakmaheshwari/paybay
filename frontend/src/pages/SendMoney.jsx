import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import Success from '../components/Success';

export default function SendMoney() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState("");
    const [showSuccess, setShowSuccess] = useState(false); // Controls Success UI
    const navigate = useNavigate();

    const handleTransfer = async () => {
        if (!amount || amount <= 0) return;

        try {
            await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: id,
                amount: parseFloat(amount)
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            setAmount(""); // Clear input
            setShowSuccess(true); // Show Success UI
        } catch (error) {
            console.error("Transfer failed:", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {showSuccess ? (
                <Success title="success" />
            ) : (
                <div className="border text-card-foreground max-w-md p-6 space-y-6 w-96 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-center">Send Money</h2>
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-xl text-white">{name?.[0]?.toUpperCase() || "?"}</span>
                        </div>
                        <h3 className="text-lg font-semibold">{name || "Unknown"}</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="amount" className="text-sm font-medium">Amount (Rs)</label>
                            <input
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                type="number"
                                className="block w-full mt-1 border rounded-md px-3 py-2 text-sm"
                                id="amount"
                                placeholder="Enter amount" 
                                min="1"
                            />
                        </div>
                        <button
                            onClick={handleTransfer}
                            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                        >
                            Initiate Transfer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
