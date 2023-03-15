import styles from "@/styles/Use.module.css"
import Image from "next/image"

const Use = () => {
  return (
      <div className="h-screen bg-primary w-full">
      
          <div className ="flex-col text-gray-200 font-mono pt-10 pb-32  text-center text-[4vw] font-extrabold">
            <h1>Manage Your Work Smartly</h1>  
          </div>
          
          <div className={styles.row}>
            <section className ={styles.workcard_container}>
                <div className={styles.workcard}>
                    <div className ={styles.imgbox}>
                        <img src="img/image1.png" />
                    </div>
                    <div className ={styles.content}>
                        <h2>Step I</h2>
                        <p> Do Something</p>
                    </div>
                </div>
                <div className={styles.workcard}>
                    <div className ={styles.imgbox}>
                        <img src="img/image2.png" />
                    </div>
                    <div className ={styles.content}>
                        <h2>Step II</h2>
                        <p> Do Something</p>
                    </div>
                </div>
                <div className={styles.workcard}>
                    <div className ={styles.imgbox}>
                        <img src="img/image3.png" />
                    </div>
                    <div className ={styles.content}>
                        <h2>Step III</h2>
                        <p> Do Something</p>
                    </div>
                </div>
                <div className={styles.workcard}>
                    <div className ={styles.imgbox}>
                        <img src="img/image4.png" />
                    </div>
                    <div className ={styles.content}>
                        <h2>Step IV</h2>
                        <p> Do Something</p>
                    </div>
                </div>
            </section>
          </div>
          
      </div>
          )
}

export default Use