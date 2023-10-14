import { auth, provider} from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate()

    const signIn = async () => {
        const result = await signInWithPopup(auth, provider)
        console.log(result)
        navigate('/')

    }


    return (
        <div className="login-div">
            <p>Sign In With Google to Continue</p>
            <button className="signin-btn" onClick={signIn}>Sign In With Google</button>
        </div>
    )
}