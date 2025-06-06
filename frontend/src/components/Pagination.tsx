type PaginationProps = {
    totalTasks: number;
    tasksPerPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
};

const Pagination = ({ totalTasks, tasksPerPage, currentPage, setCurrentPage }: PaginationProps) => {
    const totalPages = Math.ceil(totalTasks / tasksPerPage);

    
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;

    return (
        <div className="text-center mt-4 fixed bottom-4 left-0 right-0">
            <div className="join">
                <div className="join">
                    {prevPage >= 1 && (
                        <button className="join-item btn" onClick={() => handlePageChange(prevPage)}>«</button>
                    )}

                    <button className="join-item btn">Page {currentPage}</button>

                    {nextPage <= totalPages && (
                        <button className="join-item btn" onClick={() => handlePageChange(nextPage)}>»</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pagination;
