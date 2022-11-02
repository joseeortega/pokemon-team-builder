import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IPagination } from "../models/pagination.model";

function TableFilterScroll(props: {
  quantityDisplay: number;
  elements: any[];
  filterData: any;
  setFilterData: (filterData: any) => void;
  filterElements: (elements: any[], filterData: any) => any[];
  generateChildren: (element: any, index: number) => JSX.Element;
}) {
  const [elementsFiltered, setElementsFiltered] = useState<any[]>([]);

  const [displayPagination, setDisplayPagination] = useState<IPagination>({
    limit: props.quantityDisplay,
    offset: 0,
  });
  const [elementsDisplay, setElementsDisplay] = useState<any[]>([]);

  const totalElements: number = props.elements.length;

  useEffect(() => {
    setElementsFiltered(props.elements);
  }, [props.elements]);

  useEffect(() => {
    getNextElementsDisplay();
  }, [props.elements, displayPagination]);

  useEffect(() => {
    const newPagination = {
      limit: props.quantityDisplay,
      offset: 0,
    };
    setElementsDisplay([]);
    setDisplayPagination(newPagination);
  }, [elementsFiltered]);

  useEffect(() => {
    filterElementEffect(props.filterData);
  }, [props.filterData]);

  const getNextElementsDisplay = () => {
    setElementsDisplay([
      ...elementsDisplay,
      ...chunkElementByPagination(displayPagination, elementsFiltered),
    ]);
  };

  const displayMoreElements = () => {
    setDisplayPagination(getNextPagination());
  };

  const getNextPagination = (): IPagination => {
    let nextLimit = 0;

    if (totalElements) {
      nextLimit = totalElements - elementsDisplay.length;
    }

    nextLimit =
      nextLimit > props.quantityDisplay ? props.quantityDisplay : nextLimit;

    return {
      limit: nextLimit,
      offset: elementsDisplay.length,
    };
  };

  const chunkElementByPagination = (pagination: IPagination, data: any[]) => {
    return [...data].slice(
      pagination.offset,
      pagination.offset + pagination.limit
    );
  };

  const filterElementEffect = (elementFilter: any) => {
    const elementsFiltered: any[] = props.filterElements(
      props.elements,
      elementFilter
    );
    console.log("elementsFiltered", elementsFiltered);
    console.log("elementFilter.name", elementFilter.name);

    setElementsFiltered(elementsFiltered);
  };

  return (
    <div id="ElementsPick">
      {elementsDisplay && (
        <InfiniteScroll
          dataLength={elementsDisplay.length} //This is important field to render the next data
          next={displayMoreElements}
          hasMore={elementsDisplay.length !== totalElements}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              background: "#e5e5e5",
              borderTop: "1em solid #939393",
              margin: "1em",
            }}
          >
            {elementsDisplay.map((element, index) =>
              props.generateChildren(element, index)
            )}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default TableFilterScroll;
