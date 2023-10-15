import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import {getFirestore, doc, setDoc} from 'firebase/firestore'
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";


export const Survey = () => {

    function insertLineBreaks(description) {
        return description.split(/(Feedback:)/).map((text, index) => (
          text ? (
            <React.Fragment key={index}>
              {index > 0 && <br /> /* Add a line break if it's not the first element */}
              {text}
            </React.Fragment>
          ) : null
        ));
      }
      
    const [user] = useAuthState(auth);
    const user_id = user?.uid;
    
    const [answer, setAnswer] = useState({
        question1: 0,
        question2: 0,
        question3: 0,
        question4: 0,
        question5: 0,
        question6: 0,
        question7: 0,
        question8: 0,
        question9: 0,
        question10: 0,
        question11: 0,
        question12: 0,
        question13: 0,
        question14: 0,
        question15: 0,
    })
    const [total, setTotal] = useState(0); //set total to 0
    const navigate = useNavigate();
    const [carbonFootPrint, setCarbonFootPrint] = useState(null);
    const [description, setDescription] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleChange = (question, value) =>{
        setAnswer({ ...answer, [question]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const postData = {
            userId: user_id,
            totalScore: total,
            question1: answer.question1,
            question2: answer.question2,
            question3: answer.question3,
            question4: answer.question4,
            question5: answer.question5,
            question6: answer.question6,
            question7: answer.question7,
            question8: answer.question8,
            question9: answer.question9,
            question10: answer.question10,
            question11: answer.question11,
            question12: answer.question12,
            question13: answer.question13,
            question14: answer.question14,
            question15: answer.question15,
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/result', postData);

            const cfootprint = response.data.number;
            setCarbonFootPrint(cfootprint);
            const description = response.data.answer;
            setDescription(description);

            const carbonFootprintRef = await addDoc(collection(db, "carbonFootprints"), {
                userID: user_id,
                cFootprint: cfootprint,
                description: description,
              });
              
            console.log('Data sent to the backend:', response.data);
            // // navigate('/home')
            // navigate('/home', { state: { carbonFootPrint: cfootprint } });
        } catch (error) {
            console.error('Error sending data to the backend:', error);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() =>{
        setTotal(answer.question1 + 
            answer.question2 + answer.question3 + answer.question4 + answer.question5 + answer.question6
            + answer.question7 + answer.question8 + answer.question9 + answer.question10  + answer.question11
            + answer.question12 + answer.question13 + answer.question14 + answer.question15);
    }, [answer.question1, answer.question2, answer.question3, answer.question4, answer.question5,
        answer.question6,answer.question7,answer.question8,answer.question9,answer.question10,
        answer.question11,answer.question12,answer.question13,answer.question14,answer.question15 ])

  return (
    <div className='text-[#1e3932]'>
        <h1 className='mt-6 mb-6 text-center py-3 text-2xl'>Let's calculate your carbon footprint!</h1> 
      
        <form className= "text-center">
            <label className='font-serif font-bold'>How many Rooms are in your house? :</label>
                <br/>
                <input class="check" type="checkbox" value='0' checked= {answer.question1 === 0} onChange={() => handleChange(`question1`, 0)}/> 1 room
                <br/>
                <input class="check" type="checkbox" value = '1' checked= {answer.question1 === 1} onChange={() => handleChange(`question1`, 1)}/> 2 rooms
                <br/>
                <input class="check" type="checkbox" value = '2'checked= {answer.question1 === 2} onChange={() => handleChange(`question1`, 2)}/> 3 rooms
                <br/>
                <input class="check" type="checkbox" value = '3' checked= {answer.question1 === 3} onChange={() => handleChange(`question1`, 3)}/> 4 rooms
            <br/>
            <br/>
            <label className='font-serif font-bold'>What type of house do you live in? :</label>
                <br/>
                <input class="check" type="checkbox" value='0' checked= {answer.question2 === 0} onChange={() => handleChange(`question2`, 0)}/> Apartment
                <br/>
                <input class="check" type="checkbox" value = '1' checked= {answer.question2 === 1} onChange={() => handleChange(`question2`, 1)}/> Townhouse
                <br/>
                <input class="check" type="checkbox" value = '2' checked= {answer.question2 === 2} onChange={() => handleChange(`question2`, 2)}/> Bungalow
                <br/>
                <input class="check" type="checkbox" value = '3' checked= {answer.question2 === 3} onChange={() => handleChange(`question2`, 3)}/> House
            <br/>
            <br/>
            <label className='font-serif font-bold'>What type of heat source does your house use? :</label>
                <br/>
                <input class="check" type="checkbox" value='3' checked= {answer.question3 === 3} onChange={() => handleChange(`question3`, 3)}/> Gas
                <br/>
                <input class="check" type="checkbox" value='1' checked= {answer.question3 === 1} onChange={() => handleChange(`question3`, 1)}/> Electrical
                <br/>
                <input class="check" type="checkbox" value='2' checked= {answer.question3 === 2} onChange={() => handleChange(`question3`, 2)}/> Gas and Electrical
                <br/>
                <input class="check" type="checkbox" value='0' checked= {answer.question3 === 0} onChange={() => handleChange(`question3`, 0)}/> No Heating
            <br/>
            <br/>
            <label className='font-serif font-bold'>Does your home have AC? :</label>
                <br/>
                <input class="check" type="checkbox" value='2' checked= {answer.question4 === 2} onChange={() => handleChange(`question4`, 2)}/> Yes
                <br/>
                <input class="check" type="checkbox" value='0' checked= {answer.question4 === 0} onChange={() => handleChange(`question4`, 0)}/> No
            <br/>
            <br/>

            <label className='font-serif font-bold'>How many people live in your household?:</label>
                <br/>
                <input class="check" type="checkbox" value='0' checked= {answer.question5 === 0} onChange={() => handleChange(`question5`, 0)}/> 1-2
                <br/>
                <input class="check" type="checkbox" value='1' checked= {answer.question5 === 1} onChange={() => handleChange(`question5`, 1)}/> 3-4
                <br/>
                <input class="check" type="checkbox" value='2' checked= {answer.question5 === 2} onChange={() => handleChange(`question5`, 2)}/> 5-6
                <br/>
                <input class="check" type="checkbox" value='3' checked= {answer.question5 === 3} onChange={() => handleChange(`question5`, 3)}/> 7+
            <br/>
            <br/>
            <label className='font-serif font-bold'>How often do you fly per year, round trip counts as one trip? :</label>
            <br/>
                <input class="check" type="checkbox" value='0' checked= {answer.question6 === 0} onChange={() => handleChange(`question6`, 0)}/> 1-2
                <br/>
                <input class="check" type="checkbox" value='1' checked= {answer.question6 === 1} onChange={() => handleChange(`question6`, 1)}/> 3-4
                <br/>
                <input class="check" type="checkbox" value='2' checked= {answer.question6 === 2} onChange={() => handleChange(`question6`, 2)}/> 5-6
                <br/>
                <input class="check" type="checkbox" value='3' checked= {answer.question6 === 3} onChange={() => handleChange(`question6`, 3)}/> 7+
            <br/>
            <br/>
            <label className='font-serif font-bold'>How many cars does your household own? :</label>
            <br/>
                <input class="check" type="checkbox" value='0' checked= {answer.question7 === 0} onChange={() => handleChange(`question7`, 0)}/> 1
                <br/>
                <input class="check" type="checkbox" value='1' checked= {answer.question7 === 1} onChange={() => handleChange(`question7`, 1)}/> 2
                <br/>
                <input class="check" type="checkbox" value='2' checked= {answer.question7 === 2} onChange={() => handleChange(`question7`, 2)}/> 3
                <br/>
                <input class="check" type="checkbox" value='3' checked= {answer.question7 === 3} onChange={() => handleChange(`question7`, 3)}/> 4+
            <br/>
            <br/>
            <label className='font-serif font-bold'>What type of car do you mainly drive? :</label>
            <br/>
                <input class="check" type="checkbox" value='0' checked= {answer.question8 === 0} onChange={() => handleChange(`question8`, 0)}/> Electric/None
                <br/>
                <input class="check" type="checkbox" value='2' checked= {answer.question8 === 2} onChange={() => handleChange(`question8`, 2)}/> Gas
                <br/>
                <input class="check" type="checkbox" value='1' checked= {answer.question8 === 1} onChange={() => handleChange(`question8`, 1)}/> Hybrid
                <br/>
                <input class="check" type="checkbox" value='3' checked= {answer.question8 === 3} onChange={() => handleChange(`question8`, 3)}/> Diesel
            <br/>
            <br/>
            <label className='font-serif font-bold'>How many km do you drive each year? :</label>
            <br/>
                <input class="check" type="checkbox" value='0' checked= {answer.question9 === 0} onChange={() => handleChange(`question9`, 0)}/> less than 10,000
                <br/>
                <input class="check" type="checkbox" value='1' checked= {answer.question9 === 1} onChange={() => handleChange(`question9`, 1)}/> less than 15,000
                <br/>
                <input class="check" type="checkbox" value='2' checked= {answer.question9 === 2} onChange={() => handleChange(`question9`, 2)}/> less than 20,000
                <br/>
                <input class="check" type="checkbox" value='3' checked= {answer.question9 === 3} onChange={() => handleChange(`question9`, 3)}/> 20,000+
            <br/>
            <br/>
            <label className='font-serif font-bold'>Size of your most used car :</label>
            <br/>
                <input class="check" type="checkbox" value='0' checked= {answer.question10 === 0} onChange={() => handleChange(`question10`, 0)}/> Sedan
                <br/>
                <input class="check" type="checkbox" value='1' checked= {answer.question10 === 1} onChange={() => handleChange(`question10`, 1)}/> SUV
                <br/>
                <input class="check" type="checkbox" value='2' checked= {answer.question10 === 2} onChange={() => handleChange(`question10`, 2)}/> Pickup
                <br/>
                <input class="check" type="checkbox" value='3' checked= {answer.question10 === 3} onChange={() => handleChange(`question10`, 3)}/> Truck
            <br/>
            <br/>
            <label className='font-serif font-bold'>How often do you eat beef or lamb every week? :</label>
            <br/>
                <input class="check" type="checkbox"value='0' checked= {answer.question11 === 0} onChange={() => handleChange(`question11`, 0)}/> 0
                <br/>
                <input class="check" type="checkbox"value='1' checked= {answer.question11 === 1} onChange={() => handleChange(`question11`, 1)}/> 1-2 times
                <br/>
                <input class="check" type="checkbox"value='2' checked= {answer.question11 === 2} onChange={() => handleChange(`question11`, 2)}/> 3-5 times
                <br/>
                <input class="check" type="checkbox" value='3' checked= {answer.question11 === 3} onChange={() => handleChange(`question11`, 3)}/> 6+ times
            <br/>
            <br/>
            <label className='font-serif font-bold'>How often do you eat purely plant based meals each week? :</label>
            <br/>
                <input class="check" type="checkbox" value='0' checked= {answer.question12 === 0} onChange={() => handleChange(`question12`, 0)}/> 0
                <br/>
                <input class="check" type="checkbox" value='1' checked= {answer.question12 === 1} onChange={() => handleChange(`question12`, 1)}/> 1-2 times
                <br/>
                <input class="check" type="checkbox" value='2' checked= {answer.question12 === 2} onChange={() => handleChange(`question12`, 2)}/> 3-5 times
                <br/>
                <input class="check" type="checkbox" value='3' checked= {answer.question12 === 3} onChange={() => handleChange(`question12`, 3)}/> 6+ times
            <br/>
            <br/>
            <label className='font-serif font-bold'>Which of these statements best describes your attitude about wasting food? :</label>
            <br/>
                <input class="check" type="checkbox" value='0' checked= {answer.question13 === 0} onChange={() => handleChange(`question13`, 0)}/> I never waste food
                <br/>
                <input class="check" type="checkbox" value='1' checked= {answer.question13 === 1} onChange={() => handleChange(`question13`, 1)}/> I avoid wasting food
                <br/>
                <input class="check" type="checkbox" value='2' checked= {answer.question13 === 2} onChange={() => handleChange(`question13`, 2)}/> I often waste food
                <br/>
                <input class="check" type="checkbox" value='3' checked= {answer.question13 === 3} onChange={() => handleChange(`question13`, 3)}/> I don't even think about it
            <br/>
            <br/>
            <label className='font-serif font-bold'>I try to recycle as often as I can :</label>
            <br/>
                <input class="check" type="checkbox" value='0' checked= {answer.question14 === 0} onChange={() => handleChange(`question14`, 0)}/> Yes
                <br/>
                <input class="check" type="checkbox" value='2' checked= {answer.question14 === 2} onChange={() => handleChange(`question14`, 2)}/> No
            <br/>
            <br/>
            <label className='font-serif font-bold'>Do you actively try to reduce your carbon footprint? :</label>
                <br/>
                <input class="check"  type="checkbox" value='0' checked= {answer.question15 === 0} onChange={() => handleChange(`question15`, 0)}/> Yes
                <br/>
                <input class="check" type="checkbox" value='2' checked= {answer.question15 === 2} onChange={() => handleChange(`question15`, 2)}/> No
            <br/>
            <br/>

            {!loading ? ( // Show the calculate button only if loading is false
            <button
                onClick={handleSubmit}
                type="submit"
                className="mb-6 relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-lime-500 before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
            >
                Calculate my carbon footprint
            </button>
            ) : (
            <div className="flex justify-center items-center">
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div>
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500 ml-3"></div>
            </div>
            )}
            {/* <button onClick={handleSubmit} type="submit" class=" mb-6 relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500
                before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-lime-500 before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">Calculate my carbon footprint</button> */}
        </form>
        {carbonFootPrint !== null && description !== null && (
        <div className="result-container">
          <h2 className="text-center text-xl mt-6">
            Your Carbon Footprint: {carbonFootPrint} tons
          </h2>
          <p className="description text-center mt-4">
            Description: {insertLineBreaks(description)}
          </p>
        </div>
      )} 
    </div>
  )

}



