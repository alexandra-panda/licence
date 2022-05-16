const baseUrl = 'http://192.168.0.89:3500';

export async function getPosts() {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  // myHeaders.append(
  //   'Authorization',
  //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImVtYWlsIjoidml0aW9rQG1haWwucnUiLCJpYXQiOjE2NDczNjE0ODksImV4cCI6MTY0NzUzNDI4OX0.CDJ2pyMhX-wpV6RMuOtiq2huLI_PXEvzanXulfZ1EMc',
  // );

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  let response = await fetch(baseUrl + '/api/posts', requestOptions);
  let json = await response.json();
  return json;
}
