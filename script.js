const articles = [
  {
    title: "دیدگاه نوجوانان درباره شبکه‌های اجتماعی و سلامت روان",
    authors: "Popat & Tarrant (2022)",
    method: "کیفی (Qualitative)",
    summary: "تحلیل دیدگاه نوجوانان درباره تأثیر شبکه‌های اجتماعی بر سلامت روان در پنج محور: تأیید اجتماعی، مقایسه ظاهری، فشار ارتباط، تعامل همسالان، و قلدری آنلاین."
  },
  {
    title: "بررسی سیستماتیک تأثیر شبکه‌های اجتماعی",
    authors: "Khalaf et al. (2023)",
    method: "کمی (Quantitative)",
    summary: "استفاده بیش از حد از شبکه‌های اجتماعی با اضطراب، افسردگی و کاهش کیفیت خواب مرتبط است."
  },
  {
    title: "نقش واسطه‌ای سلامت روان",
    authors: "Springer (2025)",
    method: "ترکیبی (Mixed Methods)",
    summary: "تجربیات منفی کودکی منجر به اختلال استفاده از شبکه‌های اجتماعی از طریق سلامت روان ضعیف می‌شود."
  },
  {
    title: "مطالعه کیفی در نوجوانان هندی",
    authors: "2023",
    method: "کیفی (Qualitative)",
    summary: "شبکه‌های اجتماعی تأثیرات مثبت و منفی بر سلامت روان نوجوانان دارند؛ از جمله حمایت همسالان و فشار اجتماعی."
  },
  {
    title: "فراتحلیل اثر شبکه‌های اجتماعی",
    authors: "2023",
    method: "کمی (Quantitative)",
    summary: "مصرف بیشتر شبکه‌های اجتماعی با افسردگی، اضطراب و تنهایی بیشتر مرتبط است."
  }
];

const container = document.getElementById("articles");
articles.forEach(article => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <h3>${article.title}</h3>
    <p class="authors">${article.authors}</p>
    <p class="method">${article.method}</p>
    <p>${article.summary}</p>
  `;
  container.appendChild(div);
});