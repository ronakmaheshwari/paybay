import { useNavigate } from "react-router-dom";

export default function Success({ title }) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center w-[400px] h-[400px] space-y-5 bg-white shadow-md rounded-lg p-6 animate-fade-in">
            {title === "success" ? (
                <>
                    <span className="text-5xl">🎉</span>
                    <h1 className="font-semibold text-xl text-green-600 mt-2">Transaction Successful!</h1>
                    <p className="text-gray-600 text-sm mt-1">Your money has been sent securely. 💸</p>
                    <button 
                        className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center"
                        onClick={() => navigate("/dashboard")}
                    >
                        <span className="mr-2">🏠</span> Go to Dashboard
                    </button>
                </>
            ) : (
                <>
                    <span className="text-5xl">⚠️</span>
                    <h1 className="font-semibold text-xl text-red-600 mt-2">Transaction Failed!</h1>
                    <p className="text-gray-600 text-sm mt-1">Something went wrong. Please try again. ❌</p>
                    <button 
                        className="mt-4 px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition flex items-center"
                        onClick={() => navigate("/dashboard")}
                    >
                        <span className="mr-2">🔄</span> Try Again
                    </button>
                </>
            )}
        </div>
    );
}
