document.getElementById("ask").addEventListener("click", async () => {
  const question = document.getElementById("question").value;
  const responseDiv = document.getElementById("response");

  if (!question.trim()) {
    responseDiv.textContent = "Per favore, inserisci una domanda.";
    return;
  }

  responseDiv.textContent = "Sto pensando...";

  try {
    const apiKey = "LA_TUA_API_KEY"; // Inserisci qui la tua chiave API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-tubo", // Assicurati di usare un modello valido
        messages: [{ role: "user", content: question }]
      })
    });

    if (!response.ok) {
      // Gestisce errori HTTP
      const errorData = await response.json();
      responseDiv.textContent = `Errore: ${errorData.error.message || response.status}`;
      return;
    }

    const data = await response.json();

    // Verifica che choices esista e contenga almeno un elemento
    if (data.choices && data.choices.length > 0) {
      responseDiv.textContent = data.choices[0].message.content;
    } else {
      responseDiv.textContent = "Nessuna risposta disponibile.";
    }
  } catch (error) {
    // Gestisce errori di rete o altri problemi
    responseDiv.textContent = `Errore: ${error.message}`;
  }
});
