const baseURL = "http://numbersapi.com";
const favNumber = 5;

// 1.Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number.
let favNumResponse = axios.get(`${baseURL}/${favNumber}?json`);
favNumResponse.then(res => {
  $('#factsul').append(`<p>${res.data.text}</p>`)
  console.log(res.data);
})
favNumResponse.catch(err => {
  console.log("rejected promise!!!!", err)
})



// 2.Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
let favNumbers = [3, 16, 20];
let favNumsResponse = axios.get(`${baseURL}/${favNumbers}?json`);
favNumsResponse.then(res => {
  favNumbers.forEach((num) => {
    $('#factsul2').append(`<p>${res.data[num]}</p>`)
  })
  console.log(res.data);
})
favNumsResponse.catch(err => {
  console.log("rejected promise!!!!", err)
})



// 3.Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${baseURL}/${favNumber}?json`);
  })
).then(facts => {
  facts.forEach(data => $('#factsul3').append(`<p>${data.text}</p>`));
});
$.getJSON(`${baseURL}/${favNumber}?json`).then(data => {
  console.log(data);
});
