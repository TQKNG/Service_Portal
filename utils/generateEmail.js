const formatPhoneNumber = (phoneNumberString) => {
  let cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return match[1] + "-" + match[2] + "-" + match[3];
  }
  return null;
};

const generateEmail = (type, placeholders) => {
  const { deptName, visitorName, phoneNumber } = placeholders;

  if (type === 1) {
    return {
      subject: `**TESTING** Your guest is at the front door`,
      content: `Dear ${deptName},

Please come to the main lobby to meet your visitor.   
${visitorName}
${formatPhoneNumber(phoneNumber)}
      
Thank you.
Buzz`,
    };
  } else if (type === 2) {
    return {
      subject: `**TESTING** First visit - training required`,
      content: `Dear Reception,

This visitor requires first visit training.
${visitorName}
${formatPhoneNumber(phoneNumber)}

Thank you.
Buzz`,
    };
  } else if (type === 3) {
    return {
      subject: `**TESTING** Symptoms reported`,
      content: `Dear Reception,

Please ensure this visitor does not enter until their symptoms are resolved.
${visitorName}
${formatPhoneNumber(phoneNumber)}

Thank you.
Buzz`,
    };
  } else {
    return null;
  }
};

module.exports = { generateEmail };
