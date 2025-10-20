import React, { useMemo, useState } from 'react'
import { Card } from 'react-bootstrap'

function CardContainer({ data, regionName, selectedRegion }) {
    const [visibleCount, setVisibleCount] = useState(20);
    const filteredData = useMemo(() => {
        return regionName && selectedRegion !== "All" ? data?.filter((e) => e.region === regionName) : data;
    }, [data, regionName, selectedRegion]);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 20);
    };

    const visibleData = filteredData?.slice(0, visibleCount);
    return (
        <>
            <div className="d-flex region-cards">
                {visibleData?.map((item, index) => {
                    return (
                        <Card key={index}>
                            <Card.Img variant="top" src={item.flag} />
                            <Card.Body>
                                <Card.Title>{item.region}</Card.Title>
                                <Card.Text>
                                    {item.name}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>

            <div className="btn-container">
                <button className={`load-more-btn ${filteredData?.length === visibleData.length ? "disabled" : ''}`} onClick={handleLoadMore}>Load More</button>
            </div>
        </>
    )
}

export default CardContainer