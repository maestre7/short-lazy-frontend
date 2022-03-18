import React, { useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';

export default function pickUrl(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        userData.username = data.username;
        userData.password = md5(data.password);
        userData.email = data.email
    };

    return (<div className='form--main'>
        <form className='form--url' onSubmit={handleSubmit(onSubmit)} >
            {/* Original Url */}
            <input spellCheck="false" className='form--input' type="url" placeholder="Original Url" {
                ...register("url",
                    {
                        required: { value: true, message: 'Campo requerido' }
                    })} />
            {errors.url && <div className='url--message-errors'><p >{errors.url.message}</p></div>}
            <input type="submit" className='url--button' />
        </form>
        <button className='url--button' onClick={() => props.setView(true)}>Volver a Login</button>
    </div>
    )
}