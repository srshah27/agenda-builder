import styles from "@/styles/Use.module.css"
import Image from "next/image"

const Use = () => {
  return (
       <div className="h-screen bg-primary w-full">
          <div className ="flex-col text-gray-200 font-mono p-32 text-center text-[4vw] font-extrabold">
            <h1>Manage Your Work Smartly</h1>  
          </div>
          <div className={styles.row}>
            <div className ={styles.workcard_container}>

                <div className={styles.workcard}>
                    <div className ={styles.imgbox}>
                        <img src="img/" />
                    </div>
                    <div className ={styles.content}>
                        <h2>Step I</h2>
                    
                    </div>
                </div>
                <div className ="workcard">
                    <div className ="imgbox">
                        <img src="images/pcdetails.jpg" />

                    </div>
                    <div className ="content">
                        <h2>Step II</h2>
                        <p>Enter personal details.
                        </p>
                    </div>
                </div>
                <div className ="workcard">
                    <div className ="imgbox">
                        <img src="images/lg.jpg" />

                    </div>
                    <div className ="content">
                        <h2>Step III</h2>
                        <p>Enter educational details.
                        </p>
                    </div>
                </div>
                <div className ="workcard">
                    <div className ="imgbox">
                        <img src="images/search.jpg" />

                    </div>
                    <div class="content">
                        <h2>Step IV</h2>
                        <p>Find your match.
                        </p>
                    </div>
                </div>
            </div>

        </div>
        </div>
          )
}

export default Use