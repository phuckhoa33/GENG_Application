import React from 'react'
import {Pagination} from 'react-bootstrap';
 
function PaginationSlice({ numberOfPages, setPage }) {
  // const renderPagination = () => {
  //   if(currentPage === numberOfPages && currentPage ===1) return null;
  //   if(currentPage===1){
  //     return (
  //       <Pagination>
  //         <Pagination.First disabled/>
  //         <Pagination.Prev disabled/>
  //         <Pagination.Item active>{1}</Pagination.Item>
  //         <Pagination.Item>{2}</Pagination.Item>
  //         <Pagination.Ellipsis />
  //         <Pagination.Item>{numberOfPages}</Pagination.Item>
  //         <Pagination.Next onClick={() => dispatch(setCurrentPage(currentPage+1))}/>
  //         <Pagination.Last onClick={() => dispatch(setCurrentPage(numberOfPages))} />
  //       </Pagination>
  //     )
  //   }
  //   else if(currentPage !== numberOfPages){
  //     return (
  //       <Pagination>
  //         <Pagination.First onClick={() => dispatch(setCurrentPage(1))} />
  //         <Pagination.Prev  onClick={() => dispatch(setCurrentPage(currentPage-1))}/>
  //         <Pagination.Item>{1}</Pagination.Item>
  //         <Pagination.Ellipsis />
  //         <Pagination.Item active>{currentPage}</Pagination.Item>
  //         <Pagination.Ellipsis />
  //         <Pagination.Item>{numberOfPages}</Pagination.Item>
  //         <Pagination.Next  onClick={() => dispatch(setCurrentPage(currentPage+1))}/>
  //         <Pagination.Last  onClick={() => dispatch(setCurrentPage(numberOfPages))}/>
  //       </Pagination>
  //     )
  //   }
  //   else {
  //     <Pagination>
  //         <Pagination.First  onClick={() => dispatch(setCurrentPage(1))}/>
  //         <Pagination.Prev  onClick={() => dispatch(setCurrentPage(currentPage-1))}/>
  //         <Pagination.Item>{1}</Pagination.Item>
  //         <Pagination.Ellipsis />
  //         <Pagination.Item active>{currentPage}</Pagination.Item>
  //         <Pagination.Next disabled/>
  //         <Pagination.Last disabled/>
  //       </Pagination>
  //   }
  // }
  const renderPagination = () => {
    const arrayOfPage = []
    for(let i = 1; i < numberOfPages+1; i++){
      arrayOfPage.push(i);
    }

    return (
      <Pagination style={{}}>
        {arrayOfPage.map(page => (
          <Pagination.Item onClick={() => setPage(page)}>{page}</Pagination.Item>
        ))}
      </Pagination>
    )
  }

  return (
    <div style={{marginLeft: "15rem"}}>
      {renderPagination()}
    </div>
  )
}

export default PaginationSlice;