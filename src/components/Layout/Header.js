import React from 'react';
import mealsImage from '../../assets/meals.jpg'
import styles from "./Header.module.css";
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
    return <React.Fragment>
         <header className={styles.header}>
            <h1>Mathilde's Burgerbar</h1>
            <HeaderCartButton onClick={props.onClickCart}/>
         </header>
         <div className={styles['main-image']}>
            <img src={mealsImage} alt="Pic of table full of food."/>
         </div>
    </React.Fragment>
}

export default Header;
