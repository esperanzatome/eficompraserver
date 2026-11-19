
const enviarEmailBrevo = async ({ toEmail, toName, subject, htmlContent }) => {
  const url = 'https://brevo.com';

  const body = {
    sender: {
      name: 'Eficompra',
      email: 'espetomeiglesias@gmail.com', 
    },
    to: [
      {
        email: toEmail,
        name: toName || toEmail,
      },
    ],
    subject: subject,
    htmlContent: htmlContent,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error de Brevo: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Fallo al enviar email:', error.message);
    throw error;
  }
};

module.exports = { enviarEmailBrevo };
