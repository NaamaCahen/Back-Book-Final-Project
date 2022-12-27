import { useSelector,useDispatch } from "react-redux";

const Profile=()=>{
    const user=useSelector(state=>state.users.user);
    const dispatch=useDispatch();

    return(
        <>
            <h1>Your Profile:</h1>
            <form>
                <label htmlFor='firstName'>first name</label>
                <input id="firstName" name='firstName' type='text' defaultValue={user.user_first_name}  />
                
                <label htmlFor='lastName'>last name</label>
                <input id="lastName" name='lastName' type='text' defaultValue={user.user_last_name}  />
                
                <label htmlFor='email'>email</label>
                <input id="email" name='email' type='email' defaultValue={user.email}  />
                
                <label htmlFor='password'>password</label>
                <input id="password" name='password' type='text' defaultValue={user.password}  />
                
                <label htmlFor='address'>address</label>
                <input id="numHouse" name='numHouse' type='text' defaultValue={user.num_house}  />
                <input id="street" name='street' type='text' defaultValue={user.street}  />
                <input id="city" name='city' type='text' defaultValue={user.city}  />
                <input id="country" name='country' type='text' defaultValue={user.country}  />

                <button>save changes</button>
            </form>
        </>
    )
}

export default Profile