import { useState } from "react";

type CounterProps = {
	maxAmount: number;
	changeAmount: (value: number) => void;
	variant?: "inline" | "separate";
};

export const Counter = ({ maxAmount, changeAmount, variant = "inline" }: CounterProps) => {
	const [amount, setAmount] = useState(maxAmount > 0 ? 1 : 0);
	const handleDecreaseAmount = () => {
		const newAmount = amount - 1 >= 0 ? amount - 1 : 0;
		setAmount(newAmount);
		changeAmount(newAmount);
	};
	const handleIncreaseAmount = () => {
		const newAmount = amount + 1 <= maxAmount ? amount + 1 : maxAmount;
		setAmount(newAmount);
		changeAmount(newAmount);
	};
	return (
		<div className={`${variant === "inline" ? "inline-block px-2" : "py-2"}`}>
			<button
				disabled={maxAmount === 0 || amount === 0}
				type="button"
				className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-100 px-4 py-3 text-sm font-semibold text-blue-800 hover:bg-blue-200 disabled:pointer-events-none disabled:opacity-50 dark:text-blue-400 dark:hover:bg-blue-900"
				onClick={handleDecreaseAmount}
			>
				-
			</button>
			<span className="inline-flex w-6 justify-center">
				{amount < maxAmount ? amount : maxAmount}
			</span>
			<button
				disabled={maxAmount === 0 || amount === maxAmount}
				type="button"
				className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-100 px-4 py-3 text-sm font-semibold text-blue-800 hover:bg-blue-200 disabled:pointer-events-none disabled:opacity-50 dark:text-blue-400 dark:hover:bg-blue-900"
				onClick={handleIncreaseAmount}
			>
				+
			</button>
		</div>
	);
};
