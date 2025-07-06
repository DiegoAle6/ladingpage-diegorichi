  const form = document.querySelector("form");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = grecaptcha.getResponse(); // <- Obtiene token del widget

    if (!token) {
      alert("⚠️ Por favor, confirma que no eres un robot.");
      return;
    }

    const data = {
      nombre_completo: document.querySelector("#fullName").value,
      correo: document.querySelector("#email").value,
      telefono: document.querySelector("#phone").value,
      mensaje: document.querySelector("#message").value,
      recaptchaToken: token, // <- Se envía al backend
    };
console.log("Token enviado:", token);

    try {
      const res = await fetch("http://146.190.215.127:3000/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Mensaje enviado correctamente");
        form.reset();
        grecaptcha.reset(); // <- Resetea el widget
      } else {
        alert("❌ Error: " + result.message);
        console.log(result.errors);
        grecaptcha.reset(); // <- También reset si hay error
      }
    } catch (error) {
      alert("❌ Error en el envío del formulario");
      console.error(error);
      grecaptcha.reset();
    }
  });
