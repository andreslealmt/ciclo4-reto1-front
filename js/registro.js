

const validar = document.querySelector('#validar');



const registrar = async (usuario) => {
    
    

    try {
        const res = await fetch(`http://168.138.233.89:8080/api/user/${usuario.email}`);
        const datos = await res.json();
        if(datos){
            return swal("No fue posible crear la cuenta", "el correo ya existe", "error"); 
        }
        
    } catch (error) {
        console.error(error)
    }



   
    try {

        const res = await fetch('http://168.138.233.89:8080/api/user/new',{
            method:'POST',
            body:JSON.stringify(usuario),
            mode:'cors',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const datos = await res.json();
        if(datos.id === 0){
            swal("Error", "el correo ya existe", "error");            
        }else{
            swal("Bien", "Cuenta creada de forma correcta!", "success");
        }
        
        
    } catch (error) {
        console.error(error);
    }
}

const validarDatos = (e) => {
    e.preventDefault();

    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    
    
    const errorName = document.querySelector('#errorName');
    const errorEmail = document.querySelector('#errorEmail');
    

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmar = document.querySelector('#confirmar').value;

    if(name == ''){        
        return errorName.innerHTML = 'el campo Nombre no puede estar vacio';
    }else{
        errorName.innerHTML = '';
    }

    
    if(!(emailRegex.test(email))){
        return errorEmail.innerHTML = 'email no valido';    
    }else{
        errorEmail.innerHTML = '';
    }


    if(!(password ==  confirmar)){
      return swal("Error", "los password no coinciden", "error");
    }

    registrar({name,email, password});
    

}

validar.addEventListener('submit',validarDatos);
