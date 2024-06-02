const emailTemplate = (userName, amount, walletBalance) => {
    return `
      <h2>Automated Deposit Failed</h2>
      <p>Hi ${userName},</p>
      <p>Your automated deposit of ${amount} failed due to insufficient funds in your wallet.</p>
      <p>Your current wallet balance is ${walletBalance}.</p>
      <p>Please top up your wallet to continue using our services.</p>
    `;
  };
  
  module.exports = { emailTemplate };