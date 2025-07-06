document.getElementById("aiForm").onsubmit = async (e) => {
  e.preventDefault();
  const prompt = document.getElementById("prompt").value.trim();
  const resultDiv = document.getElementById("result");

  if (!prompt) {
    resultDiv.innerText = "Iltimos, savolingizni kiriting.";
    return;
  }

  resultDiv.classList.add("loading");
  resultDiv.innerText = "";

  try {
    const res = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    resultDiv.classList.remove("loading");

    if (data && data.response) {
      resultDiv.innerText = data.response;
    } else {
      resultDiv.innerText = "Hech qanday javob topilmadi.";
    }
  } catch (error) {
    resultDiv.classList.remove("loading");
    resultDiv.innerText = "Xatolik yuz berdi. Internet yoki server holatini tekshiring.";
  }
};