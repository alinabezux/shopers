import React from "react";
import Pagination from "react-bootstrap/Pagination";

export default function generatePagination(totalPages, currentPage, handleSetCurrentPage) {
    if (!totalPages || totalPages <= 1) return null;

    let items = [];

    // First and Prev buttons
    items.push(
        <Pagination.First
            key="first"
            disabled={currentPage === 1}
            onClick={() => handleSetCurrentPage(1)}
        />
    );
    items.push(
        <Pagination.Prev
            key="prev"
            disabled={currentPage === 1}
            onClick={() => handleSetCurrentPage(currentPage - 1)}
        />
    );

    // Calculate smart window with ellipsis
    let pages = [];
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        if (currentPage <= 4) {
            pages = [1, 2, 3, 4, 5, 'ellipsis-end', totalPages];
        } else if (currentPage >= totalPages - 3) {
            pages = [1, 'ellipsis-start', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        } else {
            pages = [1, 'ellipsis-start', currentPage - 1, currentPage, currentPage + 1, 'ellipsis-end', totalPages];
        }
    }

    pages.forEach((p, idx) => {
        if (typeof p === 'string' && p.startsWith('ellipsis')) {
            items.push(<Pagination.Ellipsis key={`ellipsis-${idx}`} disabled />);
        } else {
            items.push(
                <Pagination.Item
                    key={p}
                    active={p === currentPage}
                    onClick={() => handleSetCurrentPage(p)}
                >
                    {p}
                </Pagination.Item>
            );
        }
    });

    // Next and Last buttons
    items.push(
        <Pagination.Next
            key="next"
            disabled={currentPage === totalPages}
            onClick={() => handleSetCurrentPage(currentPage + 1)}
        />
    );
    items.push(
        <Pagination.Last
            key="last"
            disabled={currentPage === totalPages}
            onClick={() => handleSetCurrentPage(totalPages)}
        />
    );

    return items;
}
