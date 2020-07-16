const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const enforce = require("express-sslify");
// const compression = require("compression");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

const port = process.env.PORT || 5000;

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
    cancel_url,
  );
  res.status(200).send({ session_id: session.id });
  } catch (error) {
    res.send({error})
  }
  
});
