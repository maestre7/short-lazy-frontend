import React from "react";

import { fadeInRight, fadeInLeft } from "react-animations";
import Radium, {StyleRoot} from "radium";

import "./styles.scss";

/* Style Animations */
const styles = {
    fadeInLeft: {
        animation: "x 2s",
        animationName: Radium.keyframes(fadeInLeft, "fadeInLeft")
    },
    fadeInRight: {
        animation: "x 2s",
        animationName: Radium.keyframes(fadeInRight, "fadeInRight")
    }
}

export default function Info() {
    const infoTop = 'Free custom URL Shortener with many features that gives you better quality for links shortening. Shortened URLs will never expire. We do not display ads during direct redirecting to the original url.'
    const infoBottom = 'Target your customers to increase your reach and redirect them to a relevant page. Add a pixel to retarget them in your social media ad campaign to capture them.';

    return (<div className="info">
        <StyleRoot>
            <div className="info--top--text" style={styles.fadeInLeft}>
                {infoTop}
            </div>
            <div className="info--bottom--text" style={styles.fadeInRight}>
                {infoBottom}
            </div>
        </StyleRoot>
    </div>)
}