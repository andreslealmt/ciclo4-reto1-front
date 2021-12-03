

const loginForm = document.querySelector('#loginForm');

const login = async (e) => {
    e.preventDefault();

    const email = document.querySelector('#emailLogin').value;
    const password = document.querySelector('#passwordLogin').value;

    try {
        const res = await fetch(`http://168.138.233.89:8080/api/user/${email}`);
        const datos = await res.json();  
              
        if(!datos){
            return swal("inicio de sesion fallido", "el correo no esta registrado", "error"); 
        }
        
    } catch (error) {
        console.error(error)
    }
    
    try {
        const res = await fetch(`http://168.138.233.89:8080/api/user/${email}/${password}`);
        const datos = await res.json();

        if(!datos.id){
            swal("Error", "Contraseña no coincide", "error");
        }else{
            swal("Bien", `Bienvenido ${datos.name}`, "success");
        }
        
    } catch (error) {
        console.error(error)
    }
}

loginForm.addEventListener('submit', login);