import React from 'react'

const Paginate = ({ setCurrentPage, currentPage, total, limit }) => {
    const totalPages = Math.ceil(total / limit);
    const getPageNumbers = () => {
        if (totalPages < 4) {
            return [...Array(totalPages + 1).keys()].slice(1);
        }
        else if (currentPage <= 4) {
            return [1, 2, 3, 4, 5];
        }
        else if (currentPage > totalPages - 4) {
            return [...Array(5).keys()].reverse().map(x => totalPages - x);
        }
        else {
            return [currentPage - 1, currentPage, currentPage + 1]
        }
    }

    return (
        //totalPages > 1 &&
        <ul className="pagination d-flex justify-content-end">
            <li className={"paginate_button page-item previous " + (currentPage === 1 ? "disabled" : "")} >
                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} >Previous</button>
            </li>
            {
                currentPage > 4 && <> <li className="paginate_button page-item">
                    <button className="page-link" onClick={() => setCurrentPage(1)}>1</button>
                </li>
                    <li className="paginate_button page-item active">
                        <button className="page-link">...</button>
                    </li>
                </>
            }
            {
                getPageNumbers().map(num =>
                    <li key={num} className={`paginate_button page-item ${num === currentPage ? "active" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage(num)} key={num}>{num}</button>
                    </li>
                )
            }
            {
                currentPage <= (totalPages - 4) && (<>
                    <li className="paginate_button page-item active">
                        <button className="page-link">...</button>
                    </li>
                    <li className="paginate_button page-item active">
                        <button className="page-link" onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
                    </li>
                </>
                )

            }
            <li className={"paginate_button page-item next " + (currentPage === totalPages ? "disabled" : "")}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </li>
        </ul>
    )
}



export default Paginate
