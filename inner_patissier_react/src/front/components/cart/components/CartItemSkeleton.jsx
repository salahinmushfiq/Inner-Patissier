
import React from "react";
import { motion} from "framer-motion";
const CartItemSkeleton = () => (
    <motion.div className="border border-gray-200 p-4 shadow-sm bg-gray-100 animate-pulse md:p-6">
        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
            <div className="bg-gray-300 h-20 w-20 rounded-md" /> {/* Image placeholder */}
            <div className="flex items-center justify-between md:order-3 md:justify-end min-w-28">
                <div className="flex items-center">
                    <div className="h-5 w-5 bg-gray-300 rounded-md mr-2" /> {/* Minus button */}
                    <div className="w-10 bg-gray-300 h-6 rounded-md" /> {/* Count */}
                    <div className="h-5 w-5 bg-gray-300 rounded-md ml-2" /> {/* Plus button */}
                </div>
                <div className="text-end md:order-4 md:w-24">
                    <div className="h-6 bg-gray-300 w-12 rounded-md" /> {/* Price */}
                </div>
            </div>
            <div className="w-full min-w-32 flex-1 space-y-4 md:order-2 md:max-w-md">
                <div className="h-6 bg-gray-300 rounded-md w-3/4" /> {/* Title */}
                <div className="h-6 bg-gray-300 rounded-md w-1/3" /> {/* Remove button */}
            </div>
        </div>
    </motion.div>
);

export default CartItemSkeleton