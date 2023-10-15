import { auth, provider} from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import ReactTyped from 'react-typed'
import image from '../images/carbon-footprint 복사본.png'

export const Login = () => {
    const navigate = useNavigate()

    const signIn = async () => {
        const result = await signInWithPopup(auth, provider)
        console.log(result)
        navigate('/')

    }


    return (
        <div className="text-center pt-12">
            <p className="mt-6 text-4xl font-bold">Start your eco-journey today.</p>
            <button class="mt-12 relative py-2 px-8 text-black text-base font-bold uppercase rounded-[50px] overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-house-green before:to-primary-green before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-[50px] hover:before:left-0" onClick={signIn}>
                Sign in with Google
            </button>
            <div className="mt-12 flex justify-center"> {/* Center the image */}
                <img src={image} className="w-60 h-auto" alt="Image" /> 
            </div>

        </div>
    )
}