
function payWithPaystack(email, amount, callback) {
  var handler = PaystackPop.setup({
    key: 'pk_live_691f0137e7ce1a10814b51da0710d626f7c1ed38',
    email: email,
    amount: amount * 100,
    currency: 'NGN',
    callback: function(response) {
      alert("Payment successful: " + response.reference);
      callback(response);
    },
    onClose: function() {
      alert("Transaction was cancelled");
    }
  });
  handler.openIframe();
}
