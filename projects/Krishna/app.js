  const messages = [
    "Spread love, not fear.",
    "Joy is your true nature.",
    "Be playful, but purposeful.",
    "Protect the innocent, always."
  ];
  function showMessage() {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    document.getElementById("krishnaMessage").innerText = msg;
  }