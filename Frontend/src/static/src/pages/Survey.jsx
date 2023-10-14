import React, {useState, useEffect} from 'react'
import axios from 'axios'

export const Survey = () => {

    
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

    const handleChange = (question, value) =>{
        setAnswer({ ...answer, [question]: value })
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
        {/* <img class = 'object-scale-down h-12 w-12 pd-5' src = {SustainifyLogoNoText} alt = 'logo' />    */}
        <h1 className='text-center py-3 text-4xl font-serif font-bold'>Survey</h1> 
        
        <form className= "text-center">
            <label className='font-serif font-bold'>How many Rooms are in your house? :</label>
                <br/>
                <input  type="checkbox" value='0' checked= {answer.question1 === 0} onChange={() => handleChange(`question1`, 0)}/> 1 room
                <br/>
                <input type="checkbox" value = '1' checked= {answer.question1 === 1} onChange={() => handleChange(`question1`, 1)}/> 2 rooms
                <br/>
                <input  type="checkbox" value = '2'checked= {answer.question1 === 2} onChange={() => handleChange(`question1`, 2)}/> 3 rooms
                <br/>
                <input type="checkbox" value = '3' checked= {answer.question1 === 3} onChange={() => handleChange(`question1`, 3)}/> 4 rooms
            <br/>
            <br/>
            <label className='font-serif font-bold'>What type of house do you live in? :</label>
                <br/>
                <input type="checkbox" value='0' checked= {answer.question2 === 0} onChange={() => handleChange(`question2`, 0)}/> Apartment
                <br/>
                <input type="checkbox" value = '1' checked= {answer.question2 === 1} onChange={() => handleChange(`question2`, 1)}/> Townhouse
                <br/>
                <input type="checkbox" value = '2' checked= {answer.question2 === 2} onChange={() => handleChange(`question2`, 2)}/> Bungalow
                <br/>
                <input type="checkbox" value = '3' checked= {answer.question2 === 3} onChange={() => handleChange(`question2`, 3)}/> House
            <br/>
            <br/>
            <label className='font-serif font-bold'>What type of heat source does your house use? :</label>
                <br/>
                <input type="checkbox" value='3' checked= {answer.question3 === 3} onChange={() => handleChange(`question3`, 3)}/> Gas
                <br/>
                <input type="checkbox" value='1' checked= {answer.question3 === 1} onChange={() => handleChange(`question3`, 1)}/> Electrical
                <br/>
                <input type="checkbox" value='2' checked= {answer.question3 === 2} onChange={() => handleChange(`question3`, 2)}/> Gas and Electrical
                <br/>
                <input type="checkbox" value='0' checked= {answer.question3 === 0} onChange={() => handleChange(`question3`, 0)}/> No Heating
            <br/>
            <br/>
            <label className='font-serif font-bold'>Does your home have AC? :</label>
                <br/>
                <input type="checkbox" value='2' checked= {answer.question4 === 2} onChange={() => handleChange(`question4`, 2)}/> Yes
                <br/>
                <input type="checkbox" value='0' checked= {answer.question4 === 0} onChange={() => handleChange(`question4`, 0)}/> No
            <br/>
            <br/>

            <label className='font-serif font-bold'>How many people live in your household?:</label>
                <br/>
                <input type="checkbox" value='0' checked= {answer.question5 === 0} onChange={() => handleChange(`question5`, 0)}/> 1-2
                <br/>
                <input type="checkbox" value='1' checked= {answer.question5 === 1} onChange={() => handleChange(`question5`, 1)}/> 3-4
                <br/>
                <input type="checkbox" value='2' checked= {answer.question5 === 2} onChange={() => handleChange(`question5`, 2)}/> 5-6
                <br/>
                <input type="checkbox" value='3' checked= {answer.question5 === 3} onChange={() => handleChange(`question5`, 3)}/> 7+
            <br/>
            <br/>
            <label className='font-serif font-bold'>How often do you fly per year, round trip counts as one trip? :</label>
            <br/>
                <input type="checkbox" value='0' checked= {answer.question6 === 0} onChange={() => handleChange(`question6`, 0)}/> 1-2
                <br/>
                <input type="checkbox" value='1' checked= {answer.question6 === 1} onChange={() => handleChange(`question6`, 1)}/> 3-4
                <br/>
                <input type="checkbox" value='2' checked= {answer.question6 === 2} onChange={() => handleChange(`question6`, 2)}/> 5-6
                <br/>
                <input type="checkbox" value='3' checked= {answer.question6 === 3} onChange={() => handleChange(`question6`, 3)}/> 7+
            <br/>
            <br/>
            <label className='font-serif font-bold'>How many cars does your household own? :</label>
            <br/>
                <input type="checkbox" value='0' checked= {answer.question7 === 0} onChange={() => handleChange(`question7`, 0)}/> 1
                <br/>
                <input type="checkbox" value='1' checked= {answer.question7 === 1} onChange={() => handleChange(`question7`, 1)}/> 2
                <br/>
                <input type="checkbox" value='2' checked= {answer.question7 === 2} onChange={() => handleChange(`question7`, 2)}/> 3
                <br/>
                <input type="checkbox" value='3' checked= {answer.question7 === 3} onChange={() => handleChange(`question7`, 3)}/> 4+
            <br/>
            <br/>
            <label className='font-serif font-bold'>What type of car do you mainly drive? :</label>
            <br/>
                <input type="checkbox" value='0' checked= {answer.question8 === 0} onChange={() => handleChange(`question8`, 0)}/> Electric/None
                <br/>
                <input type="checkbox" value='2' checked= {answer.question8 === 2} onChange={() => handleChange(`question8`, 2)}/> Gas
                <br/>
                <input type="checkbox" value='1' checked= {answer.question8 === 1} onChange={() => handleChange(`question8`, 1)}/> Hybrid
                <br/>
                <input type="checkbox" value='3' checked= {answer.question8 === 3} onChange={() => handleChange(`question8`, 3)}/> Diesel
            <br/>
            <br/>
            <label className='font-serif font-bold'>How many km do you drive each year? :</label>
            <br/>
                <input type="checkbox" value='0' checked= {answer.question9 === 0} onChange={() => handleChange(`question9`, 0)}/> less than 10,000
                <br/>
                <input type="checkbox" value='1' checked= {answer.question9 === 1} onChange={() => handleChange(`question9`, 1)}/> less than 15,000
                <br/>
                <input type="checkbox" value='2' checked= {answer.question9 === 2} onChange={() => handleChange(`question9`, 2)}/> less than 20,000
                <br/>
                <input type="checkbox" value='3' checked= {answer.question9 === 3} onChange={() => handleChange(`question9`, 3)}/> 20,000+
            <br/>
            <br/>
            <label className='font-serif font-bold'>Size of your most used car :</label>
            <br/>
                <input type="checkbox" value='0' checked= {answer.question10 === 0} onChange={() => handleChange(`question10`, 0)}/> Sedan
                <br/>
                <input type="checkbox" value='1' checked= {answer.question10 === 1} onChange={() => handleChange(`question10`, 1)}/> SUV
                <br/>
                <input type="checkbox" value='2' checked= {answer.question10 === 2} onChange={() => handleChange(`question10`, 2)}/> Pickup
                <br/>
                <input type="checkbox" value='3' checked= {answer.question10 === 3} onChange={() => handleChange(`question10`, 3)}/> Truck
            <br/>
            <br/>
            <label className='font-serif font-bold'>How often do you eat beef or lamb every week? :</label>
            <br/>
                <input type="checkbox"value='0' checked= {answer.question11 === 0} onChange={() => handleChange(`question11`, 0)}/> 0
                <br/>
                <input type="checkbox"value='1' checked= {answer.question11 === 1} onChange={() => handleChange(`question11`, 1)}/> 1-2 times
                <br/>
                <input type="checkbox"value='2' checked= {answer.question11 === 2} onChange={() => handleChange(`question11`, 2)}/> 3-5 times
                <br/>
                <input type="checkbox" value='3' checked= {answer.question11 === 3} onChange={() => handleChange(`question11`, 3)}/> 6+ times
            <br/>
            <br/>
            <label className='font-serif font-bold'>How often do you eat purely plant based meals each week? :</label>
            <br/>
                <input type="checkbox" value='0' checked= {answer.question12 === 0} onChange={() => handleChange(`question12`, 0)}/> 0
                <br/>
                <input type="checkbox" value='1' checked= {answer.question12 === 1} onChange={() => handleChange(`question12`, 1)}/> 1-2 times
                <br/>
                <input type="checkbox" value='2' checked= {answer.question12 === 2} onChange={() => handleChange(`question12`, 2)}/> 3-5 times
                <br/>
                <input type="checkbox" value='3' checked= {answer.question12 === 3} onChange={() => handleChange(`question12`, 3)}/> 6+ times
            <br/>
            <br/>
            <label className='font-serif font-bold'>Which of these statements best describes your attitude about wasting food? :</label>
            <br/>
                <input type="checkbox" value='0' checked= {answer.question13 === 0} onChange={() => handleChange(`question13`, 0)}/> I never waste food
                <br/>
                <input type="checkbox" value='1' checked= {answer.question13 === 1} onChange={() => handleChange(`question13`, 1)}/> I avoid wasting food
                <br/>
                <input type="checkbox" value='2' checked= {answer.question13 === 2} onChange={() => handleChange(`question13`, 2)}/> I often waste food
                <br/>
                <input type="checkbox" value='3' checked= {answer.question13 === 3} onChange={() => handleChange(`question13`, 3)}/> I don't even think about it
            <br/>
            <br/>
            <label className='font-serif font-bold'>I try to recycle as often as I can :</label>
            <br/>
                <input type="checkbox" value='0' checked= {answer.question14 === 0} onChange={() => handleChange(`question14`, 0)}/> Yes
                <br/>
                <input type="checkbox" value='2' checked= {answer.question14 === 2} onChange={() => handleChange(`question14`, 2)}/> No
            <br/>
            <br/>
            <label className='font-serif font-bold'>Do you actively try to reduce your carbon footprint? :</label>
                <br/>
                <input type="checkbox" value='0' checked= {answer.question15 === 0} onChange={() => handleChange(`question15`, 0)}/> Yes
                <br/>
                <input type="checkbox" value='2' checked= {answer.question15 === 2} onChange={() => handleChange(`question15`, 2)}/> No
            <br/>
            <br/>
            

        </form>
        <p>Total: {total}</p>
    </div>
  )
}

