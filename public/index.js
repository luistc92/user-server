import {faker} from 'https://esm.sh/@faker-js/faker@7.3.0'
const url = 'http://165.232.128.198:3001'
//const url = 'http://localhost:3000'

document.getElementById('addUser').addEventListener('click', addUser);
document.getElementById('addUsers').addEventListener('click', addUsers);
document.getElementById('showUsers').addEventListener('click', showUsers);
document.getElementById('deleteUsers').addEventListener('click', deleteUsers);



const main = document.getElementById('main');
main.innerHTML =  'Hello'

function addUser(){
    
    const firstName = faker.name.firstName();
    const lastName= faker.name.lastName();
    const email= faker.internet.email(firstName, lastName);
    const address = faker.address.streetAddress(true)

    axios.post(`${url}/addUser`, {
        firstName,
        lastName,
        email,
        address
    }).then(response=> {
        
        console.log(response)
        main.innerHTML= (`<div class="main">You successfully saved a new user ${firstName} ${lastName}</div>`)
        
        }).catch(response=>{
            console.log(response)
        });

};

function addUsers(){
    const newUsers = []

    for (let i = 0; i < 20; i++) {
        
        const firstName = faker.name.firstName();
        const lastName= faker.name.lastName();
        const email= faker.internet.email(firstName, lastName);
        const address = faker.address.streetAddress(true)

        const newUser = {
            firstName,
            lastName,
            email,
            address
        }

        newUsers.push(newUser);

    }
    

    axios.post(`${url}/addUsers`, newUsers).then(response=> {
        
        console.log(response)
        main.innerHTML= (`<div class="main">You successfully saved 20 users</div>`)
        
        }).catch(response=>{
            console.log(response)
        });

};

function showUsers(){
    
    axios.get(`${url}/showUsers`).then(response=> {
        
        console.log(response.data)
        const data = response.data
        let html = `<div class = "usersContainer">`

        if(data.length>0){
            


        data.forEach((user)=>{
            html+= `<div class='userContainer'>
                <div class= 'name'>
                    ${user.firstName}  ${user.lastName}
                </div>
                <div>
                ${user.email}
                </div>
                <div>
                ${user.address}
                </div>
                </div>`
        });
        

        
        

        
        


        } else{
            html += 'No users in data base' 
        }

        html +=  '</div>'
        main.innerHTML= html
        
        }).catch(response=>{
            console.log(response)
        })
}


function deleteUsers(){
    
    axios.delete(`${url}/deleteUsers`).then(response=> {
        
        console.log(response)

        let html = '<div class = "userContainer">'

        
        main.innerHTML= (`<div class="main">You successfully deleted all users</div>`)
        
        
        }).catch(response=>{
            console.log(response)
        })
}

