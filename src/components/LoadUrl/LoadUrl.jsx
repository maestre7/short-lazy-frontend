import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { zoomIn, slideInUp } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import Countdown from 'react-countdown';

const styles = {
    zoomIn: {
        animation: 'x 1s',
        animationName: Radium.keyframes(zoomIn, 'zoomIn')
    },
    slideInUp: {
        animation: 'x 1s',
        animationName: Radium.keyframes(slideInUp, 'slideInUp')
    }
}

export default function LoadUrl() {
    
    const [answer, setAnswer] = useState(false);

    let { urlId } = useParams();

    console.log('urlId',urlId);
    axios.get(`http://localhost:3001/${urlId}`)
    .then((res) => {
        console.log("res",res)
        if (res.status === 200) {
            console.log('data', res.data.shortUrl);
            setAnswer(res.data.shortUrl);            
        } else {
            console.log('statusText', res.statusText);
            setAnswer(res.statusText);
        }
    });

    // Redirect component
    const Redirect = () => {window.open(answer, "_self")};

    // Renderer callback with condition
    const renderer = ({ seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Redirect />;
        } else {
            // Render a countdown
            return <div className="redirect--text"> 
                You will be redirected in {seconds} seg
            </div>;
        }
    };
    
    return (<StyleRoot>
        <div className="redirect--url" style={styles.zoomIn}>
            {!answer ? <div> Loading...</div> : 
                <div>
                    <div className="return--url" style={styles.slideInUp}>
                        <a href={answer} className="short-cut-url">{answer}</a>   
                    </div>
                    <div>
                        <Countdown date={Date.now() + 10000} renderer={renderer} />
                    </div>
                </div>
            }       
        </div>
    </StyleRoot>
    )
}