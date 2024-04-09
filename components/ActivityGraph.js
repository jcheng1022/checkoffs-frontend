'use client'

import styled from "styled-components";
import dayjs from "dayjs";
import {useRef} from "react";
import {Tooltip} from "antd";


const ActivityGraph = ({ activity = []}) => {
    let dayGrids = [];


    // TEMPORARILY COMMENTED OUT; MIGHT BE USED LATER
    // const generateMonthHeaders = () => {
    //     const monthHeaders = [];
    //     let currentDate = dayjs();
    //     for (let i = 0; i < 12; i++) {
    //         monthHeaders.unshift(
    //             <div className="month-header" key={i}>
    //                 {currentDate.format("MMMM")}
    //             </div>
    //         );
    //         currentDate = currentDate.subtract(1, "month");
    //     }
    //     return monthHeaders;
    // };
    for (let i = 0; i < 365; i++) {
        let dayGridDate = dayjs()
            .subtract(i, "days").format()

        const hasActivity = activity.find(o => dayjs(o).isSame(dayGridDate, 'day'))

        dayGrids.push(
            <Tooltip title={dayjs(dayGridDate).format('MMMM Do YYYY')} key={i}>
                <div className={`day ${hasActivity && (' day--active')}`} key={i} />
            </Tooltip>
        );


    }

    const containerRef = useRef(null); // Create a ref for the container div


    // useEffect(() => {
    //     if (containerRef.current) {
    //         containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    //     }
    // }, []);
    return (
        <Container  ref={containerRef}>

            <div className="days" >
                {dayGrids}
            </div>
        </Container>
    )
}

export default ActivityGraph;

const Container = styled.div`

  width: 100%;
  
  
  overflow-x: auto;
  box-shadow: 0 15px 35px 0 rgba(42, 51, 83, 0.12),
  0 5px 15px rgba(0, 0, 0, 0.06);


  .month-headers {
    display: flex;
    margin: 24px;
    width: 100%;
    justify-content: space-between;
  }

  .month-header {
    //flex: 0 0 auto;
    padding: 12px;
    text-align: center;
  }





  .days {
    margin: 24px;
    padding: 12px;
    display: grid;
    grid-template-rows: repeat(7, 1fr); /* Set minimum rows to 7 */
    grid-auto-flow: column;
    grid-gap: 5px;
   
    //overflow-x: auto; /* Add scrollbars if content exceeds maximum height */
    //box-shadow: 0 15px 35px 0 rgba(42, 51, 83, 0.12),
    //0 5px 15px rgba(0, 0, 0, 0.06);
  }
  
  .day {
    width: 16px;
    height: 16px;
    background-color: #e6e8e6;
  }

  .day--active {
    background-color: #a5c6e8;
  }
`
