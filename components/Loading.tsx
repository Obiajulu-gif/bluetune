import { motion } from 'framer-motion';

const LoadingComponent = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <motion.div
                className="flex items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            >
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-pink-500 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
            </motion.div>
        </div>
    );
};

export default LoadingComponent;
