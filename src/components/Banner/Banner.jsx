import styles from './Banner.module.css'

export default function Banner(props){

    const image_url = 'https://i.ibb.co/PQTMHFV/joanna-kosinska-7-ACu-Hoez-UYk-unsplash-3.jpg'

    return(
        <div 
            className={styles.bannerContainer} 
            style={{ 
                backgroundImage : `url(${image_url})`
                }}
            >
        </div>
    );
}