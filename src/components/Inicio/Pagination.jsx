import React from "react";

const Pagination = ({ cardsPerPage, totalCards, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
        pageNumbers.push(i);
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="mt-4 mb-4">
            <ul className="flex justify-center space-x-2">
                {pageNumbers.map((number) => {
                    return (
                        <li key={number}>
                            <button
                                onClick={() => {
                                    paginate(number);
                                    scrollToTop();
                                }}
                                className={`bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded shadow-md mb-2 ml-2 ${currentPage === number ? "bg-slate-600" : ""
                                    }`}
                            >
                                {number}
                            </button>
                        </li>
                    );
                })}

            </ul>
        </div>
    );
};

export default Pagination;
