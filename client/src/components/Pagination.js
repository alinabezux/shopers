import Pagination from "react-bootstrap/Pagination";

export default function generatePagination(totalPages, currentPage, handleSetCurrentPage) {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => handleSetCurrentPage(number)}
            >
                {number}
            </Pagination.Item>
        );
    }
    return items;
}