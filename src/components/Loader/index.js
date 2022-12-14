import React from 'react';

const Loader = () => {
    return (
        <div class="flex justify-center items-center w-full h-[80vh]">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-[#F05D23]"></div>
        </div>
    );
};

export default Loader;