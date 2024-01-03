import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Signup() {
   const navigate = useNavigate();
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [phone, setPhone] = useState('');
   const [gender, setGender] = useState('');
   const [heardFrom, setHeardFrom] = useState([]);
   const [city, setCity] = useState('');
   const [state, setState] = useState('');

   async function handleRegister(event) {
      event.preventDefault();
    
      const data = {
         name,
         email,
         password,
         phone,
      };
    
      const response = await fetch('http://localhost:5000/api/register', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (result.message === 'ok') {
         localStorage.setItem('token', result.token);
         window.location.href = '/';
      }

    }
    

   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
         <h1 className="mb-4 text-4xl font-bold">Register</h1>
         <form onSubmit={handleRegister} className="w-full max-w-md">
            <div className="mb-4">
               <div className="flex justify-between items-center w-full max-w-md">
                  <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="text-gray-900 hover:underline">Login</Link></p>
               </div>
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
               </label>
               <input
               required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
               </label>
               <input
               required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
               </label>
               <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2 ml-28" htmlFor="heardFrom">
                  How did you hear about this?
               </label>
               <div className="flex space-x-20">
                  <div >
                     <input
                        className='ml-12'
                        id="linkedin"
                        type="checkbox"
                        checked={heardFrom.includes('linkedin')}
                        onChange={(e) => setHeardFrom(prev => e.target.checked ? [...prev, 'linkedin'] : prev.filter(item => item !== 'linkedin'))}
                     />
                     <label htmlFor="linkedin">LinkedIn</label>
                  </div>
                  <div>
                     <input
                     className='ml-20'
                        id="friends"
                        type="checkbox"
                        checked={heardFrom.includes('friends')}
                        onChange={(e) => setHeardFrom(prev => e.target.checked ? [...prev, 'friends'] : prev.filter(item => item !== 'friends'))}
                     />
                     <label htmlFor="friends">Friends</label>
                  </div>
               </div>
               <div className="flex space-x-20">
                  <div>
                     <input
                        className='ml-12'
                        id="jobPortal"
                        type="checkbox"
                        checked={heardFrom.includes('jobPortal')}
                        onChange={(e) => setHeardFrom(prev => e.target.checked ? [...prev, 'jobPortal'] : prev.filter(item => item !== 'jobPortal'))}
                     />
                     <label className='ml-2' htmlFor="jobPortal">Job Portal</label>
                  </div>
                  <div>
                     <input
                        className='ml-16'
                        id="others"
                        type="checkbox"
                        checked={heardFrom.includes('others')}
                        onChange={(e) => setHeardFrom(prev => e.target.checked ? [...prev, 'others'] : prev.filter(item => item !== 'others'))}
                     />
                     <label htmlFor="others">Others</label>
                  </div>
               </div>
            </div>
            {/* ...existing input fields... */}
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Phone
               </label>
               <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="Phone"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                  Gender
               </label>
               <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
               </select>
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                  City
               </label>
               <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               >
                  <option value="">Select City</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="pune">Pune</option>
                  <option value="ahmedabad">Ahmedabad</option>
               </select>
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                  State
               </label>
               <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               >
                  <option value="">Select State</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="karnataka">Karnataka</option>
               </select>
            </div>
            <button type="submit" className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
               Register
            </button>
         </form>
      </div>
   );
}

export default Signup;
