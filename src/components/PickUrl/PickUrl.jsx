

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { zoomIn, slideInUp } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

import cliboart from "../../assets/static/copy.svg"
import './styles.scss';

/* Url Verification */
const schema = yup.object({
    url: yup.string().url("Please enter a valid url").required("Url is required"),
});
/* Style Animations */
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

export default function PickUrl() {
    const [answer, setAnswer] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = async (data) => {
        await axios.post("http://localhost:3001/short/",
                {"origUrl": data.url, "callUrl": window.location.origin})
            .then((res) => {
                console.log("res",res)
                if (res.status === 200) {
                    console.log('data', res.data.shortUrl);
                    setAnswer(res.data.shortUrl);
                } else {
                    console.log('statusText', res.statusText);
                    setAnswer(res.statusText);
                } 
        })
    };


    return (<div className="main--pick"><StyleRoot>  
        <div>SHORT&LAZY</div>
        <div className="form--main" style={styles.zoomIn}>
            <form className="form--url" onSubmit={handleSubmit(onSubmit)} >
                {/* Original Url */}
                <input className="form--input" type="url" placeholder="Original Url" {
                    ...register("url", {})} />
                {errors.url && <div className="url--message-errors"> {errors.url.message} </div>}
                <input type="submit" className="url--button" value="Submit"/>
            </form>
            {/* Return Url Short */}
            {!answer ? null : 
                <div className="return--url" style={styles.slideInUp}>
                    <a href={answer} className="short-cut-url">{answer}</a>
                    {console.log(window.location.origin)}
                    <input type="image" src={cliboart} alt="Copy to Cliboard" 
                        onClick={() => {navigator.clipboard.writeText(answer)}} />
                </div>
            }
        </div>
    </StyleRoot></div>
    )
}