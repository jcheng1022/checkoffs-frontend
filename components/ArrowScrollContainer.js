import React, {useCallback, useMemo, useState, useEffect, useRef} from 'react';
import {ChevronLeft, ChevronRight} from "react-feather";
import {FlexBox} from "@/components/core";
import {Avatar} from "antd";
import styled from "styled-components";

function ArrowScrollContainer({list =[], item: renderItem }) {
    const [range, setRange] = useState({
        start: 0,
        end: 3
    })
    const [visibleCount, setVisibleCount] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);
    const itemRef = useRef(null)



    const updateVisibleCount = () => {
        const screenWidth = window.innerWidth;
        console.log(`visible hit`)

        const count = Math.floor(screenWidth / 300);
        console.log(count, 'counter23232', screenWidth, 300, Math.floor(screenWidth / 300))
        setVisibleCount(count);
        setRange({
            start: 0,
            end: count
        });
    };

    useEffect(() => {
        updateVisibleCount();
        window.addEventListener('resize', updateVisibleCount);
        return () => {
            window.removeEventListener('resize', updateVisibleCount);
        };
    }, [itemWidth]);
    const visibleItems = useMemo(() => {
        return list?.slice(range.start, range.end)
    }, [list, range])

    const handleChangeRange = (direction) =>  () => {
        if (direction === 'decrease' && range.start > 0) {
            setRange(prev => {
                return {
                    start: prev.start - 1,
                    end: prev.end - 1
                }
            })
        }
        if (direction === 'increase' && range.end < list?.length) {
            setRange(prev => {
                return {
                    start: prev.start + 1,
                    end: prev.end + 1
                }
            })
        }

    }
    const showArrows = list.length > visibleCount;
    return (
        <Container gap={20} wrap={'no-wrap'}>
            {showArrows && (
                <div onClick={handleChangeRange('decrease')}> <ChevronLeft/> </div>

            )}
            {visibleItems?.map((member, index) => {
                return (
                    <div key={`scroll-container-item-${index}`} ref={itemRef}>
                        {
                            renderItem({item: member})
                        }
                    </div>
                )
            })}

            { showArrows && (
                <div onClick={handleChangeRange('increase')}> <ChevronRight/> </div>

            ) }

        </Container>
    )
}

export default ArrowScrollContainer;


const Container = styled(FlexBox)`
  
`
