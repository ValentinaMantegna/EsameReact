import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { LuLayoutDashboard as DashboardIcon } from "react-icons/lu";
import { IoEyeSharp as ShowPassword } from "react-icons/io5";
import { FaEyeSlash as HidePassword } from "react-icons/fa6";
import { Link} from "react-router-dom";





import Header from "../components/Header";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

function Signup() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [confermaPassword, setConfermaPassword] = useState("");
  const [ConfermaPasswordInputType, setConfermaPasswordInputType] = useState("password");
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate(); 

  function handleNomeChange(event) {
    const value = event.target.value;
    setNome(value);
  }

  function changePasswordInputType() {
    setPasswordInputType(prevType => prevType === "text" ? "password" : "text");
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function changeConfermaPasswordInputType() {
    setConfermaPasswordInputType(prevType => prevType === "text" ? "password" : "text");
  }

  function handleConfermaPasswordChange(event) {
    setConfermaPassword(event.target.value);
  }

  // Lista dei requisiti per la password
  const passwordRequirements = [
    { text: "Almeno 8 caratteri", isValid: password.length >= 8 },
    { text: "Almeno una lettera maiuscola", isValid: /[A-Z]/.test(password) },
    { text: "Almeno una lettera minuscola", isValid: /[a-z]/.test(password) },
    { text: "Almeno un numero", isValid: /\d/.test(password) }
  ];

  // Verifica se tutti i requisiti sono soddisfatti
  const isPasswordValid = passwordRequirements.every(req => req.isValid);

useEffect(() => {
    if (isRegistered) {
        // Salvataggio dei dati nel localStorage
        localStorage.setItem("nome", nome);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("confermaPassword", confermaPassword);
        navigate("/login");
    }
}, [nome, email, password, confermaPassword, isRegistered, navigate]);

  function handleSubmit() {
    // Verifica se tutti i campi sono compilati
    if (nome.trim() === "" || email.trim() === "" || password.trim() === "" || confermaPassword.trim() === "") {
      alert("Per favore, compila tutti i campi.");
      return;
    }

    if (nome.length < 3) {
      alert("Il nome deve contenere almeno 3 caratteri!");
      return;
    }

    // Verifica se la password soddisfa i requisiti
    if (!isPasswordValid) {
      alert("La password non soddisfa tutti i requisiti.");
      return;
    }

    // Verifica se le password coincidono
    if (password !== confermaPassword) {
      alert("Le password non corrispondono. Per favore, riprova.");
      return;
    }
   
    setIsRegistered(true);

  }



  return (
    <div>
      <Header title="Signup" icon={<DashboardIcon />} to="/" />
      <Card>
        <h1 className="text-2xl">SignUp</h1>
        <hr className="h-1 w-32 bg-dark-green" />
        <form className="w-full">
          {/* nome */}
          <div className="w-full">
            <Input type="text" placeholder="Inserisci nome" value={nome} onChange={handleNomeChange} />
          </div>
          {/* email div */}
          <div className="w-full">
            <Input type="email" placeholder="example@test.com" value={email} onChange={event => setEmail(event.target.value)} />
          </div>
          {/* password div */}
          <div className="w-full flex relative">
            <Input type={passwordInputType} placeholder="password" value={password} onChange={handlePasswordChange} />
            <span className="absolute right-3 top-3.5 cursor-pointer" onClick={changePasswordInputType}>
              {passwordInputType === "text" ? <HidePassword /> : <ShowPassword />}
            </span>
          </div>
          <div className="w-full flex relative">
            <Input type={ConfermaPasswordInputType} placeholder="conferma password" value={confermaPassword} onChange={handleConfermaPasswordChange} />
            <span className="absolute right-3 top-3.5 cursor-pointer" onClick={changeConfermaPasswordInputType}>
              {ConfermaPasswordInputType === "text" ? <HidePassword /> : <ShowPassword />}
            </span>
            {isRegistered && 
        <div className="w-full">
          <p>Registrazione avvenuta con successo! Vai alla pagina di <Link to="/login"></Link>.</p>
        </div>
      }
          </div>

          {/* Button div */}
          <div className="w-full">
            <Button title="SignUp" onClick={handleSubmit} />
          </div>
        </form>
      </Card>
      
      {/* Lista dei requisiti per la password */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Requisiti della Password:</h2>
        <ul className="list-disc pl-6">
          {passwordRequirements.map((requirement, index) => (
            <li key={index} className={requirement.isValid ? "text-green-500" : "text-red-500"}>
              {requirement.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Signup;
