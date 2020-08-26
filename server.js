const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const enforce = require("express-sslify");
const Mpesa = require("mpesa-api").Mpesa;
const prettyjson = require("prettyjson");
const { response } = require("express");
const ngrok = require("ngrok");
const opn = require("opn");

// const compression = require("compression");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const credentials = {
  client_key: "hllJcrljyovXdQnRJhPceBctJJQqxvqs",
  client_secret: "kY8S1qkQZfB1n4WJ",
  initiator_password: "Safaricom111!",
  certificatepath: null,
};

// create a new instance of the api
const mpesa = new Mpesa(credentials, "sandbox");

const app = express();

const port = process.env.PORT || 5000;

const url =
  process.env.NODE_ENV === "production"
    ? "https://shop-onclick.herokuapp.com"
    : "http://localhost:3000";

// app.use(compression);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});

app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "service-worker.js"));
});

// Fetch the Checkout Session to display the JSON result on the success page
app.get("/checkout-session", async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId.toString());
  res.send(session);
});

const createStripeSession = async (line_items, success_url, cancel_url) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${success_url}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url,
  });

  return session;
};

app.post("/stripe-payment", async (req, res) => {
  try {
    const { cartItems, success_url, cancel_url } = req.body;
    const line_items = cartItems.map((cartItem) => {
      return {
        name: cartItem.name,
        amount: cartItem.price * 100,
        quantity: cartItem.quantity,
        currency: "kes",
      };
    });

    const session = await createStripeSession(
      line_items,
      success_url,
      cancel_url
    );
    res.status(200).send({ session_id: session.id });
  } catch (error) {
    res.send({ error });
  }
});

app.post("/stkpush", async (req, res) => {
  try {
    // console.log(req.body)
    let { MSISDN, Amount } = req.body;

    MSISDN = "254" + MSISDN.substring(MSISDN.length - 9);

    let hookUrl =
      process.env.NODE_ENV === "production"
        ? `https://shop-onclick.herokuapp.com/hooks/mpesa`
        : "https://5bb7a108bd08.ngrok.io/hooks/mpesa";
    console.log(hookUrl)
    mpesa
      .lipaNaMpesaOnline({
        BusinessShortCode: 174379,
        Amount,
        PartyA: MSISDN,
        PartyB: "174379",
        PhoneNumber: MSISDN,
        CallBackURL:hookUrl,
        AccountReference: "Shop OnClick Test",
        passKey:
          "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
        TransactionType: "CustomerPayBillOnline",
      })
      .then((response) => {
        // console.log(response)
        res.json(response);
        // console.log(response);
      })
      .catch((error) => {
        res.json({ error: error.data.errorMessage });
      });
    // ngrok
    //   .connect(port)
    //   .then((url) => {
    //     console.log("local server is available publicly on port " + url)

    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  } catch (error) {
    console.log(error.message);
  }
});

const options = {
  noColor: true,
};

app.post("/hooks/mpesa", (req, res) => {
  console.log("-----------Received M-Pesa webhook-----------");

  // format and dump the request payload recieved from safaricom in the terminal
  console.log(prettyjson.render(req.body, options));
  console.log("-----------------------");

  let redirectUrl = "";
  const resultCode = req.body.Body.stkCallback.ResultCode;
  console.log(url)
  console.log(resultCode);
  if (resultCode === 0) {
    const mpesaRef = req.body.Body.stkCallback.CallbackMetadata.Item[1].Value;
    console.log(mpesaRef);
    redirectUrl = `${url}/success?mpesa_ref=${mpesaRef}`;
  } else {
    const errorMessage = req.body.Body.stkCallback.ResultDesc;
    console.log(errorMessage);
    redirectUrl = `${url}/failure?error_message= ` + decodeURI(errorMessage);
  }
  console.log(redirectUrl);
  res.status(200).end(); // Responding is important
  opn(redirectUrl);
  // res.setHeader("Content-Type", "text/html")
  // res.redirect(redirectUrl);
  // let message = {
  //   ResponseCode: "00000000",
  //   ResponseDesc: "success",
  // };
  // respond to safaricom servers with a success message
  // res.json(req.body.Body.stkCallback);
});

app.post("/hooks/test", (req, res) => {
  console.log("-----------Received M-Pesa webhook-----------");

  // format and dump the request payload recieved from safaricom in the terminal
  console.log(prettyjson.render(req.body, options));
  console.log("-----------------------");
  
  let message = {
    ResponseCode: "00000000",
    ResponseDesc: "success",
  };
  // respond to safaricom servers with a success message
  res.json(message);
});

app.get("/test", (req, res) => {
  console.log("testing");
  opn("http://localhost:3000");
});
