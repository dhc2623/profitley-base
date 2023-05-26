import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import { useDispatch, useSelector } from 'react-redux';
import animationData from '../../../helper/lottie-json/celebration-rocket-happy-fireworks.json';

const PlanAddCelebration = (props) => {
    const [visibility, setVisibility] = useState(false);
    const [count, setCount] = useState(false);
    const celebrationCount = useSelector((state) => state.plan.planCelebrationCount);

    useEffect(() => {
        if(celebrationCount != 0 && celebrationCount != count){
            setVisibility(true);
            setCount(celebrationCount);
            let hideAnimation = setTimeout(() => {
                setVisibility(false);
            }, 2000);
        }
    }, [celebrationCount]);

    const successAnimation = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div className={`success-animation ${!visibility && 'hide'}`}>
            <div className={'animation-block'}>
                <Lottie options={successAnimation} height={200} width={200} />
            </div>
        </div>
    );
};

export default React.memo(PlanAddCelebration);