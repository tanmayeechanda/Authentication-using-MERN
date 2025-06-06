import styles from "./styles.module.css";


const handleLogout=()=>{
    localStorage.removeItem("token");
    window.location.reload();
}
const Main=()=>{
    return(
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>NighaTech Global pvt Ltd</h1>
                <button className={styles.white_btn} onClick={handleLogout}> LogOut</button>
            </nav>
        </div>
    );
}

export default Main;