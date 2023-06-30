import styles from './style.module.css'


const LoadingComponent = ({ loading }) => {
    return !!loading && (
        <div className='absolute top-0 left-0 w-full h-full min-h-fit bg-[#11111111]  z-10 flex justify-center items-center'>
            <div className='flex justify-center items-center mt-4'>
                <div className={`
                    p-5 border-4 border-b-transparent rounded-full  border-blue-500 
                    ${styles.loading}
                    `}></div>
            </div>
        </div>
    )
}

export default LoadingComponent