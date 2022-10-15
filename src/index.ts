import express from 'express';
import parseUrl from 'body-parser';
import cookieParser from 'cookie-parser';
const app = express()
const encodeUrl = parseUrl.urlencoded({ extended: false })

const user = {
  username: 'user1',
  password: 'password1'
}

app.use(cookieParser());

app.get('/', async (req, res) => {
  console.log(req.cookies)
  res.sendFile(__dirname + '/form/login.html')
})

app.post('/login', encodeUrl, (req, res) => {
  console.log(req.cookies)
  const { username, password } = req.body;
  if (username === user.username && password === user.password) {
    res.cookie("loggedin", "true");
    res.send("Cookie sent!");
  } else {
    res.send("Login fail");
  }
});

app.get('/auth', (req: any, res: any) => {
  let response = "Not logged in!";

  if(req.cookies.loggedin == "true") {
      response = "Yup! You are logged in!";
  }

  res.send(response);
})

app.listen(4000, () => {
  console.log("App running with http://localhost:" + 4000)
});