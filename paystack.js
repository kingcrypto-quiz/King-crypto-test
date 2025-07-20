function startPayment() {
  const email = document.getElementById('email').value;
  const handler = PaystackPop.setup({
    key: 'pk_live_691f0137e7ce1a10814b51da0710d626f7c1ed38',
    email: email,
    amount: 20000,
    currency: 'NGN',
    callback: function(response) {
      alert("Payment successful: " + response.reference);
      window.location.href = "dashboard.html";
    },
    onClose: function() {
      alert("Payment was cancelled.");
    }
  });
  handler.openIframe();
}