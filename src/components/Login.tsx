import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs";
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";

// import { useEffect } from "react";

const Login = () => {

  const navigate = useNavigate();

  const getPasswordFromDb = async (email: string) => {
    const request = await fetch(`http://192.168.5.181:3000/login`, {
      method: "GET",
      headers: {
        email: email,
      },
    });
    const cryptedPassword = await request.json();
    return cryptedPassword[0].password;
  };

  async function comparePassword(
    userPassword: string,
    cryptedPasswordFromDb: string,

  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(userPassword, cryptedPasswordFromDb, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    });
  }

  async function getToken(email: string) {
    const request = await fetch(`http://192.168.5.181:3000/token`, {
      headers: {
        'email': email,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });
    const token = await request.json();    
    return token;
  }

  // fetch à passer en useEffect?
  async function execOrder(data: any) {
    const dbPassword = await getPasswordFromDb(data.email);
    // console.log(dbPassword);
    const result = await comparePassword(data.password, dbPassword);    
    if (result) {
      console.log("JE SUIS DANS LE IF RESULT")
      const token = await getToken(data.email)
      await Cookies.set('token', token, { secure: true });
      
    } else {
      alert('wrong password')
    }
    navigate(-1);
  }

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => execOrder(data);

  return (
    <>
      <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col items-center p-10">
          <div className="flex flex-col gap-4 w-3/4 pb-4">
            <div>
              <label htmlFor="email">Email : </label>
              <input
                type="text"
                className="border w-full"
                {...register("email")}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Mot de passe : </label>
              <input
                type="text"
                className="border w-full"
                {...register("password")}
              ></input>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="border py-4 px-8" type="submit">
              Se connecter
            </button>
            <a href="/register">
              <button className="border py-4 px-8" type="button">
                Créer mon compte
              </button>
            </a>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
