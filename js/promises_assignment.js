/**
*
* Assume we are fetching the data from a rest endpoint in the get data function.
* we can simulate the same by replacing the setTimeout with fetch api and executing the same in a browser.
*
*/

/*function getData(uId) {
    setTimeout(() => {
    console.log("Fetched the data!");
    return "skc@gmail.com";
    }, 4000);
    }
    
    console.log("start");
    var email = getData("skc");
    console.log("Email id of the user id is: " + email);
    console.log("end");*/

// How do you solve this problem. How can we wait for till the function execution is completed, so that we can have correct email at line 10?

function getData(uId) {
    return new Promise((resolve, reject) => {
        /*

        fetch('/apiendpoint/java').then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            resolve(data.email);
        })
        .catch(error => {
            // Handle any errors that occur during the fetch operation
            reject(error);
        });
        */
        
        
        setTimeout(() => {   
            const errorOccurred = false;
            if (errorOccurred) {
                //error
                reject(new Error('Failed to fetch data'));
            } else {
                //no error
                console.log("Fetched the data!");
                resolve("skc@gmail.com");
            }
        }, 4000);
    });
}

console.log("start");
getData("skc").then(email=>{
    console.log("Email id of the user id is: " + email);
    console.log("end");
}).catch(error=>{
    console.log("Error occurred: "+error);
});
