import React from 'react';

import style from './banner.module.css';


const Banner = (props) => {
    return (
        <div className={style.container}>
           <h1 className={style.title}><span className={style.title1}>Coffee</span> shops</h1>

           <p className={style.subTitle}>Discover your local coffee shops</p>

            <div className={style.buttonWrapper}>
                <button
                    className={style.button}
                    onClick={props.handleOnClick}
                >
                    {props.buttonText}
                </button>
            </div>

        </div>
    );
};

export default Banner;